import { createContext, useContext, useEffect, useState } from "react";
import { seed } from "../data/seed.js";

const STORAGE_KEY = "toye_studio_state_v1";
const AUTH_KEY = "toye_admin_auth";

const StudioContext = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    // Merge so new seed keys are never missing after an update.
    return { ...structuredClone(seed), ...parsed, settings: { ...seed.settings, ...parsed.settings } };
  } catch {
    return structuredClone(seed);
  }
}

const newId = (prefix) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export function StudioProvider({ children }) {
  const [state, setState] = useState(load);
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // ---- generic collection helpers ----
  const add = (key, item) =>
    setState((s) => ({ ...s, [key]: [{ id: newId(key), ...item }, ...s[key]] }));

  const update = (key, id, patch) =>
    setState((s) => ({
      ...s,
      [key]: s[key].map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));

  const remove = (key, id) =>
    setState((s) => ({ ...s, [key]: s[key].filter((x) => x.id !== id) }));

  const updateSettings = (patch) =>
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));

  // Public contact form -> lands in the admin inbox.
  const submitInquiry = (data) =>
    setState((s) => ({
      ...s,
      inquiries: [
        {
          id: newId("inq"),
          date: new Date().toISOString().slice(0, 10),
          status: "new",
          ...data,
        },
        ...s.inquiries,
      ],
    }));

  const resetAll = () => setState(structuredClone(seed));

  // ---- auth ----
  const login = (password) => {
    if (password === state.settings.adminPassword) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const value = {
    ...state,
    authed,
    add,
    update,
    remove,
    updateSettings,
    submitInquiry,
    resetAll,
    login,
    logout,
  };

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside StudioProvider");
  return ctx;
}
