import { useEffect } from "react";

export function Drawer({ title, onClose, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="drawer__scrim" onMouseDown={onClose}>
      <div className="drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer__head">
          <h3>{title}</h3>
          <button className="drawer__x" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="drawer__body">{children}</div>
        <div className="drawer__foot">{footer}</div>
      </div>
    </div>
  );
}

export function Text({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="afield">
      <label>{label}</label>
      <input
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function Area({ label, value, onChange, placeholder }) {
  return (
    <div className="afield">
      <label>{label}</label>
      <textarea
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function Select({ label, value, onChange, options }) {
  return (
    <div className="afield">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Check({ label, checked, onChange }) {
  return (
    <div className="acheck">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        id={`chk-${label}`}
      />
      <label htmlFor={`chk-${label}`}>{label}</label>
    </div>
  );
}
