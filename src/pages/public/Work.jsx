import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import Mark from "../../components/Mark.jsx";
import Reveal from "../../components/Reveal.jsx";
import FilmFrame from "../../components/FilmFrame.jsx";

export default function Work() {
  const { works } = useStudio();
  const [filter, setFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(works.map((w) => w.category)))],
    [works]
  );

  const shown = filter === "All" ? works : works.filter((w) => w.category === filter);

  return (
    <main>
      <section className="pagehead">
        <div className="wrap">
          <span className="eyebrow">
            <Mark size={16} /> Portfolio
          </span>
          <h1 className="pagehead__title" style={{ marginTop: 18 }}>
            The <em>work.</em>
          </h1>
          <p className="pagehead__lead">
            Brand films, commercials, music videos and documentaries — every frame shot and graded
            in-house.
          </p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: 24 }}>
        <div className="wrap">
          <div className="section__head" style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`btn ${filter === c ? "btn--solid" : "btn--ghost"}`}
                  style={{ padding: "10px 18px" }}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="section__lead" style={{ maxWidth: "20ch" }}>
              {shown.length} {shown.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <div className="work__grid">
            {shown.map((w, i) => (
              <Reveal className={i % 3 === 0 ? "work__item--wide" : "work__item"} key={w.id}>
                <FilmFrame
                  ratio={i % 3 === 0 ? "2.39:1" : w.ratio}
                  src={w.thumbUrl}
                  label={w.title}
                  timecode={`${w.year} · ${w.category}`}
                />
                <div className="work__caption">
                  <div className="work__name">
                    {w.title}
                    <span>{w.client}</span>
                  </div>
                  <div className="work__meta">
                    {w.category}
                    <br />
                    {w.year}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 64 }}>
            <Link to="/#contact" className="btn btn--solid">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
