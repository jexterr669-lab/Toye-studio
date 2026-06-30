import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import Mark from "../../components/Mark.jsx";
import Reveal from "../../components/Reveal.jsx";

export default function Podcast() {
  const { settings, episodes } = useStudio();
  const [openId, setOpenId] = useState(null);
  const published = episodes.filter((e) => e.published);

  return (
    <main>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">
            <Mark size={16} /> The podcast
          </span>
          <h1 className="pagehead__title" style={{ marginTop: 18 }}>
            <em>{settings.podcastName}</em>
          </h1>
          <p className="pagehead__lead">{settings.podcastTagline}</p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: 24 }}>
        <div className="wrap">
          {published.length === 0 && (
            <p className="section__lead">New episodes are on the way. Check back soon.</p>
          )}

          {published.map((ep) => {
            const open = openId === ep.id;
            return (
              <Reveal className="ep" key={ep.id}>
                <div className="ep__num">{String(ep.number).padStart(2, "0")}</div>
                <div className="ep__body">
                  <h4>{ep.title}</h4>
                  <div className="ep__guest">With {ep.guest}</div>
                  <p className="ep__desc">{ep.description}</p>
                  <button
                    className="ep__play"
                    onClick={() => setOpenId(open ? null : ep.id)}
                  >
                    {open ? "Hide episode" : ep.embedUrl ? "Play episode" : "Listen"}
                  </button>
                </div>
                <div className="ep__side">
                  {ep.duration}
                  <br />
                  {ep.date}
                </div>
                {open && (
                  <div className="ep__embed">
                    {ep.embedUrl ? (
                      <iframe
                        src={ep.embedUrl}
                        height="180"
                        title={ep.title}
                        allow="encrypted-media"
                      />
                    ) : (
                      <p className="ep__desc" style={{ paddingTop: 12 }}>
                        Audio for this episode will be linked here once published. Add an embed URL
                        from the studio dashboard.
                      </p>
                    )}
                  </div>
                )}
              </Reveal>
            );
          })}

          <div style={{ marginTop: 64 }}>
            <Link to="/#contact" className="btn btn--ghost">
              Pitch us a guest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
