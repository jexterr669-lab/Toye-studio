import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";

const Play = () => (<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>);
const Arrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);

function reveal() {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  return io;
}

export default function Podcast() {
  const { settings, episodes } = useStudio();
  const published = episodes.filter((e) => e.published);
  const featured = published[0];
  const rest = published.slice(1);

  useEffect(() => { window.scrollTo(0, 0); const io = reveal(); return () => io.disconnect(); }, []);

  const subs = [
    { label: "Spotify", href: settings.spotify || "#" },
    { label: "Apple Podcasts", href: settings.apple || "#" },
    { label: "YouTube", href: settings.youtube || "#" },
  ];

  return (
    <main className="ppage" id="top">
      {/* HERO */}
      <section className="pp-hero">
        <div className="bg" /><div className="tint" /><div className="grain" /><div className="glow glow-h" /><div className="vig" />
        <div className="pp-hero-in">
          <span className="eyebrow c">The Toye Studios Podcast</span>
          <h1><em>{settings.podcastName}</em></h1>
          <p>{settings.podcastTagline}</p>
          <div className="pp-cta">
            <a href="#latest" className="btn btn-gold"><Play /> Play latest episode</a>
            <Link to="/#contact" className="btn btn-ghost">Work with us</Link>
          </div>
          <div className="pp-sub">
            {subs.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured && (
        <section className="section">
          <div className="wrap">
            <div className="section-head left reveal" style={{ textAlign: "left", margin: "0 0 56px" }}>
              <span className="eyebrow">Featured episode</span>
            </div>
            <div className="pp-feat reveal">
              <div className="pp-feat-cover">
                <div className="ph" /><div className="tint" /><div className="grain" />
                <span className="badge">Now playing</span>
                <div className="bigplay"><div className="play"><Play /></div></div>
              </div>
              <div className="pp-feat-meta">
                <span className="epn">Episode {featured.number}</span>
                <h2>{featured.title}</h2>
                <div className="guest">With <b>{featured.guest}</b></div>
                <p>{featured.description}</p>
                <div className="meta-row">
                  <a href="#latest" className="btn btn-gold"><Play /> Listen now</a>
                  <span className="pp-dur">{featured.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LATEST EPISODES */}
      <section className="section dark" id="latest">
        <div className="wrap">
          <div className="section-head left reveal" style={{ textAlign: "left", margin: "0 0 50px" }}>
            <span className="eyebrow">Latest episodes</span>
            <h2 style={{ textAlign: "left" }}>Every episode, a release.</h2>
          </div>
          <div className="pp-list reveal">
            {(rest.length ? rest : published).map((e, i) => (
              <article className="pp-ep" key={e.id}>
                <div className="pp-ep-cover">
                  <div className={"ph pp-ep-c" + (i % 4)} /><div className="tint" /><div className="grain" />
                  <div className="miniplay"><Play /></div>
                </div>
                <div className="pp-ep-body">
                  <span className="epn">Episode {e.number}</span>
                  <h3>{e.title}</h3>
                  <div className="guest">With <b>{e.guest}</b></div>
                  <p>{e.description}</p>
                  <div className="pp-ep-foot">
                    <span className="pp-dur">{e.duration}</span>
                    {e.embedUrl
                      ? <a className="pp-listen" href={e.embedUrl} target="_blank" rel="noreferrer">Listen <Arrow /></a>
                      : <a className="pp-listen" href="#watch">Listen <Arrow /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WATCH */}
      <section className="pp-watch" id="watch">
        <div className="bg" /><div className="tint" /><div className="grain" /><div className="vig" />
        <div className="pp-watch-in reveal">
          <span className="eyebrow">Watch the podcast</span>
          <h2 style={{ marginTop: 24 }}>Shot like a film, not a webcam.</h2>
          <p>Full multi-camera episodes, graded and cut in the Toye studio. Press play and see the difference.</p>
          {featured && featured.embedUrl ? (
            <div className="pp-embed"><iframe src={featured.embedUrl} title={featured.title} allowFullScreen /></div>
          ) : (
            <div className="pp-embed" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg,#241B10,#0E0A06)" }}>
              <div className="play"><Play /></div>
            </div>
          )}
        </div>
      </section>

      {/* HOSTS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Meet the hosts</span><h2>The voices behind the skit</h2></div>
          <div className="pp-hosts reveal">
            <div className="pp-host">
              <div className="ph pp-host0" /><div className="tint" /><div className="grain" /><div className="scrim" />
              <div className="ov"><span className="role">Host · Creator</span><h3>Dami</h3></div>
            </div>
            <div className="pp-host">
              <div className="ph pp-host1" /><div className="tint" /><div className="grain" /><div className="scrim" />
              <div className="ov"><span className="role">Host · Producer</span><h3>Tola</h3></div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="section dark">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Listen everywhere</span><h2>Subscribe to {settings.podcastName}</h2><p>New episodes drop regularly. Follow on your platform of choice and never miss one.</p></div>
          <div className="pp-sub reveal" style={{ marginTop: 10 }}>
            {subs.map((s) => (<a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>))}
          </div>
        </div>
      </section>
    </main>
  );
}
