import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import Mark from "../../components/Mark.jsx";

const nav = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/work", label: "Work" },
  { to: "/admin/podcast", label: "Podcast" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/packages", label: "Packages" },
  { to: "/admin/faqs", label: "FAQs" },
  { to: "/admin/inquiries", label: "Inquiries", badgeKey: "inquiries" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const studio = useStudio();
  const location = useLocation();

  if (!studio.authed) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const newCount = studio.inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="admin">
      <aside className="aside">
        <div className="aside__brand">
          <Mark size={20} />
          <span className="aside__word">TOYE</span>
        </div>

        <nav className="aside__nav">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `aside__link ${isActive ? "active" : ""}`}
            >
              <span>{n.label}</span>
              {n.badgeKey === "inquiries" && newCount > 0 && (
                <span className="aside__badge">{newCount}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="aside__foot">
          <a className="aside__view" href="/" target="_blank" rel="noreferrer">
            View live site →
          </a>
          <button className="aside__logout" onClick={studio.logout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="amain">
        <Outlet />
      </div>
    </div>
  );
}
