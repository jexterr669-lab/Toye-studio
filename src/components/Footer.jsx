import { Link } from "react-router-dom";
import Mark from "./Mark.jsx";
import { useStudio } from "../store/StudioContext.jsx";

export default function Footer() {
  const { settings } = useStudio();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <div className="nav__brand" style={{ marginBottom: 4 }}>
              <Mark size={22} />
              <span className="footer__word">TOYE</span>
            </div>
            <p className="footer__tag">{settings.tagline}</p>
          </div>

          <div className="footer__col">
            <h5>Studio</h5>
            <Link to="/work">Work</Link>
            <Link to="/podcast">Podcast</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#about">About</Link>
          </div>

          <div className="footer__col">
            <h5>Connect</h5>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <a href={settings.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={settings.youtube} target="_blank" rel="noreferrer">
              YouTube
            </a>
            <Link to="/admin">Studio login</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {settings.studioName}. All rights reserved.
          </span>
          <span>{settings.location}</span>
        </div>
      </div>
    </footer>
  );
}
