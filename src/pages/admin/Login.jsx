import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import Mark from "../../components/Mark.jsx";

export default function Login() {
  const { login, authed } = useStudio();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  if (authed) {
    navigate("/admin", { replace: true });
  }

  const submit = (e) => {
    e.preventDefault();
    if (login(pw)) {
      navigate("/admin", { replace: true });
    } else {
      setErr("That password didn't match. Try again.");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__brand">
          <Mark size={22} />
          <span className="login__word">TOYE</span>
        </div>
        <h1>Studio dashboard</h1>
        <p>Sign in to manage the site content.</p>

        <form className="login__form" onSubmit={submit}>
          <div className="afield">
            <label style={{ color: "var(--stone)" }}>Password</label>
            <input
              type="password"
              value={pw}
              autoFocus
              onChange={(e) => {
                setPw(e.target.value);
                setErr("");
              }}
              placeholder="••••••••"
              style={{
                background: "var(--ink)",
                borderColor: "var(--ink-line)",
                color: "var(--off-white)",
              }}
            />
          </div>
          <div className="login__err" role="alert">
            {err}
          </div>
          <button className="abtn abtn--gold" type="submit" style={{ justifyContent: "center" }}>
            Sign in
          </button>
        </form>

        <p className="login__hint">Demo password: toye-admin (change it in Settings)</p>
        <Link to="/" className="login__back">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
