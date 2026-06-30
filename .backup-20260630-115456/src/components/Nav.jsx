import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Mark from "./Mark.jsx";
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
      if (pathname !== "/") {
        navigate("/" + link.hash);
      } else {
        document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <Mark size={20} />
          <span className="nav__word">TOYE</span>
        </Link>

        <nav className={`nav__links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <button key={l.label} className="nav__link" onClick={() => go(l)}>
              {l.label}
            </button>
          ))}
          <Link to="/#contact" className="btn btn--solid" onClick={() => setOpen(false)}>
            {settings.primaryCtaLabel}
          </Link>
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
