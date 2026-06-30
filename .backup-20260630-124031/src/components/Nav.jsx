import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStudio } from "../store/StudioContext.jsx";

const links = [
  { label: "Work", to: "/work" },
  { label: "Podcast", to: "/podcast" },
  { label: "Services", hash: "#services" },
  { label: "About", hash: "#about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { settings } = useStudio();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = (link) => {
    setOpen(false);
    if (link.to) {
      navigate(link.to);
    } else if (link.hash) {
      if (pathname !== "/") navigate("/" + link.hash);
      else document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const word = (settings.studioName || "Toye").split(" ")[0].toUpperCase();

  return (
    <header>
      <div className="wrap">
        <nav>
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="mark"><span /><span /><span /></span>
            <span><span className="wordmark">{word}</span><small>Studios</small></span>
          </Link>

          <div className={`navlinks ${open ? "open" : ""}`}>
            {links.map((l) => (
              <a key={l.label} className="lnk" onClick={() => go(l)}>{l.label}</a>
            ))}
            <Link to="/#contact" className="nav-cta" onClick={() => setOpen(false)}>
              {settings.primaryCtaLabel}
            </Link>
          </div>

          <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? (
              <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 6l14 14M20 6L6 20" /></svg>
            ) : (
              <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7h20M3 13h20M3 19h20" /></svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
