import { Link } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";

export default function Dashboard() {
  const { works, episodes, services, testimonials, packages, inquiries } = useStudio();
  const newInq = inquiries.filter((i) => i.status === "new");
  const recent = inquiries.slice(0, 5);

  const stats = [
    { n: works.length, l: "Projects", accent: false },
    { n: episodes.filter((e) => e.published).length, l: "Episodes live", accent: false },
    { n: services.length, l: "Services", accent: false },
    { n: newInq.length, l: "New inquiries", accent: true },
  ];

  return (
    <>
      <div className="atop">
        <div>
          <h1>Overview</h1>
          <p>A snapshot of everything on the live site.</p>
        </div>
        <a className="abtn abtn--ghost" href="/" target="_blank" rel="noreferrer">
          View site
        </a>
      </div>

      <div className="acontent">
        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className={`stat__n ${s.accent ? "stat__accent" : ""}`}>{s.n}</div>
              <div className="stat__l">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Recent inquiries</h2>
              <p>Messages sent through the site contact form.</p>
            </div>
            <Link className="abtn abtn--ghost" to="/admin/inquiries">
              Open inbox
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="empty">No inquiries yet. They'll appear here as soon as the form is used.</div>
          ) : (
            <div className="rows">
              {recent.map((i) => (
                <div className="row" key={i.id}>
                  <div className="row__main">
                    <div className="row__title">
                      {i.name}{" "}
                      {i.status === "new" && <span className="pill pill--new">New</span>}
                    </div>
                    <div className="row__sub">
                      {i.projectType} · {i.email} · {i.date}
                    </div>
                  </div>
                  <div className="row__actions">
                    <Link className="abtn abtn--sm" to="/admin/inquiries">
                      Read
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Quick edits</h2>
              <p>Jump straight to the content you update most.</p>
            </div>
          </div>
          <div className="rows">
            <QuickRow to="/admin/work" title="Work" sub={`${works.length} projects in the portfolio`} />
            <QuickRow
              to="/admin/podcast"
              title="Podcast"
              sub={`${episodes.length} episodes of Life is a Skit`}
            />
            <QuickRow
              to="/admin/packages"
              title="Packages"
              sub={`${packages.length} pricing tiers`}
            />
            <QuickRow
              to="/admin/testimonials"
              title="Testimonials"
              sub={`${testimonials.length} quotes`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function QuickRow({ to, title, sub }) {
  return (
    <div className="row">
      <div className="row__main">
        <div className="row__title">{title}</div>
        <div className="row__sub">{sub}</div>
      </div>
      <div className="row__actions">
        <Link className="abtn abtn--sm" to={to}>
          Manage
        </Link>
      </div>
    </div>
  );
}
