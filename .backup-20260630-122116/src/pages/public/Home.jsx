import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import ContactForm from "../../components/ContactForm.jsx";

// Cinematic fallbacks used when a work item has no thumbUrl yet (set real ones in admin).
const WORK_FALLBACK = [
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=1000&auto=format&fit=crop",
];

const whyCards = [
  { t: "Cinematic storytelling", d: "Narrative, pacing, and light treated with the discipline of film — so the work lingers.", p: "M4 5h16v14H4z M4 9h16M9 5v14" },
  { t: "Videography first", d: "Motion is our craft, not an add-on. Every frame is shot, graded, and cut in-house.", p: "M3 7l13-2v14L3 17z M16 9l5-2v10l-5-2" },
  { t: "Premium visual identity", d: "A consistent, elevated look across film, photo, and social — your brand at its best.", p: "M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v8M8 12h8" },
  { t: "Clear creative process", d: "You always know what's next. No guesswork, no chaos — just a calm path to delivery.", p: "M4 12l5 5L20 6" },
];

const steps = [
  { n: "01", h: "Share your vision", t: "Tell us the story, the audience, and the feeling. We listen, then shape the brief with you." },
  { n: "02", h: "We design it", t: "Pre-production, shoot, and edit — handled end to end with reviews at every stage." },
  { n: "03", h: "Ready to launch", t: "Final cuts delivered in every format you need, on time, ready to publish anywhere." },
];

const bentoAreas = ["wc feat b-feat", "wc b-a", "wc b-b", "wc b-c"];
const Check = () => (<svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" /></svg>);

export default function Home() {
  const { settings, services, works, episodes, testimonials, packages, faqs } = useStudio();
  const { hash } = useLocation();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [hash]);

  // Motion: reveal, cursor light, parallax, tilt, hero dust.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const fine = window.matchMedia("(pointer:fine)").matches;
    const cg = document.getElementById("cursor-glow");
    const onMove = (e) => { if (cg) { cg.style.opacity = "1"; cg.style.left = e.clientX + "px"; cg.style.top = e.clientY + "px"; } };
    const onLeave = () => { if (cg) cg.style.opacity = "0"; };
    if (fine) { window.addEventListener("mousemove", onMove); window.addEventListener("mouseleave", onLeave); }

    const pars = [].slice.call(document.querySelectorAll("[data-par]"));
    const onScroll = () => window.requestAnimationFrame(() => {
      const y = window.scrollY;
      pars.forEach((el) => {
        const s = parseFloat(el.getAttribute("data-par"));
        const cx = /glow-a|glow-b|glow-c/.test(el.className) ? "translateX(-50%) " : "";
        el.style.transform = cx + "translateY(" + (y * s * -0.4) + "px)";
      });
    });
    window.addEventListener("scroll", onScroll);

    const tilts = [].slice.call(document.querySelectorAll(".tilt"));
    const tiltMove = function (e) {
      const r = this.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      this.style.transform = "perspective(900px) rotateX(" + (-py * 5) + "deg) rotateY(" + (px * 5) + "deg) translateY(-9px)";
    };
    const tiltLeave = function () { this.style.transform = ""; };
    if (fine) tilts.forEach((c) => { c.addEventListener("mousemove", tiltMove); c.addEventListener("mouseleave", tiltLeave); });

    const hero = document.querySelector(".hero");
    const dust = [];
    if (hero) {
      for (let i = 0; i < 7; i++) {
        const d = document.createElement("span");
        d.className = "dust";
        const sz = 2 + Math.random() * 3;
        d.style.cssText = "width:" + sz + "px;height:" + sz + "px;left:" + (10 + Math.random() * 80) + "%;top:" + (20 + Math.random() * 55) + "%;opacity:" + (0.2 + Math.random() * 0.5) + ";animation:dustf " + (7 + Math.random() * 8) + "s ease-in-out " + (Math.random() * 4) + "s infinite";
        hero.appendChild(d); dust.push(d);
      }
      if (!document.getElementById("dust-kf")) {
        const st = document.createElement("style"); st.id = "dust-kf";
        st.textContent = "@keyframes dustf{0%,100%{transform:translateY(0)}50%{transform:translateY(-26px)}}";
        document.head.appendChild(st);
      }
    }

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (fine) tilts.forEach((c) => { c.removeEventListener("mousemove", tiltMove); c.removeEventListener("mouseleave", tiltLeave); });
      dust.forEach((d) => d.remove());
    };
  }, []);

  const ordered = [...works].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 4);
  const ep = episodes.find((e) => e.published) || episodes[0];

  return (
    <main id="top">
      <div id="cursor-glow" />

      {/* HERO */}
      <section className="hero">
        <div className="glow glow-a" data-par="0.18" /><div className="glow glow-b" data-par="0.28" /><div className="glow glow-c" data-par="0.12" />
        <div className="wrap hero-inner">
          <span className="eyebrow c">{settings.heroEyebrow}</span>
          <h1>Stories worth <em>watching</em> twice.</h1>
          <p>{settings.heroSubtitle}</p>
          <div className="hero-cta">
            <Link to="/#contact" className="btn btn-gold">{settings.primaryCtaLabel}</Link>
            <Link to="/work" className="btn btn-ghost">{settings.secondaryCtaLabel}</Link>
          </div>
        </div>
        <div className="wrap">
          <div className="hero-frame">
            <div className="still" /><div className="tint" /><div className="streak" /><div className="grain" /><div className="vig" />
            <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
            <div className="center"><div className="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div></div>
            <span className="tc">REEL 01 · ON SET</span><span className="tc r">00:00:24:12</span>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Why Toye</span><h2>Why clients work with us</h2><p>We treat every brief like a film — built to be felt, not just watched.</p></div>
          <div className="grid g4 reveal">
            {whyCards.map((c) => (
              <div className="card tilt" key={c.t}>
                <div className="card-ico"><svg viewBox="0 0 24 24"><path d={c.p} /></svg></div>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WOW BAND */}
      <section className="band">
        <div className="bg" data-par="0.15" /><div className="tint" /><div className="flare" /><div className="grain" /><div className="vig" />
        <div className="band-inner reveal">
          <span className="eyebrow">The Toye difference</span>
          <h2>We don't make videos.<br />We make things <em>worth watching.</em></h2>
          <p>Direction, light, and edit handled like cinema — because attention is the only currency that matters.</p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section dark">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">How it works</span><h2>The process: fast, clear, done</h2><p>Three steps from first conversation to a finished, ready-to-publish piece.</p></div>
          <div className="grid g3 reveal">
            {steps.map((s) => (
              <div className="card step tilt" key={s.n}><span className="num">{s.n}</span><h3>{s.h}</h3><p>{s.t}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK — broken bento */}
      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Selected work</span><h2>Featured work</h2><p>A look at the films, frames, and stories we've shaped for brands and creators.</p></div>
          <div className="bento reveal">
            {ordered.map((w, i) => (
              <div className={bentoAreas[i]} key={w.id}>
                <div className="ph" style={{ backgroundImage: `url(${w.thumbUrl || WORK_FALLBACK[i]})` }} />
                <div className="tint" /><div className="grain" /><div className="scrim" /><div className="vig" />
                <div className="ov">
                  <span className="cat">{w.category}</span>
                  <h3>{w.title}</h3>
                  <span className="run">{w.client}{w.year ? " · " + w.year : ""}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 50 }} className="reveal">
            <Link to="/work" className="btn btn-ghost">View all work</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section dark" id="services">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">What we do</span><h2>Services built for stories that matter.</h2><p>One studio, every layer of the craft — from concept to the final frame.</p></div>
          <div className="grid g3 reveal">
            {services.map((s, i) => (
              <div className="svc" key={s.id}><span className="n">{String(i + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.summary}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* PODCAST */}
      <section className="section podcast" id="podcast">
        <div className="glow glow-p" /><div className="glow glow-p2" />
        <div className="wrap">
          <div className="pod-grid reveal">
            <div className="pod-visual"><div className="ph" /><div className="tint" /><div className="grain" /></div>
            <div className="pod-copy">
              <span className="eyebrow">The Podcast</span>
              <h2>{settings.podcastName}</h2>
              <p>{settings.podcastTagline}</p>
              {ep && (<>
                <span className="ep">Episode {ep.number} · Latest</span>
                <div className="pod-ep-title">{ep.title}</div>
              </>)}
              <div className="pod-bar">
                <div className="pp"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div>
                <div className="pod-wave">
                  {[40,72,28,90,54,78,34,62,88,46,66,30,82,50].map((h, i) => (<i key={i} style={{ height: h + "%" }} />))}
                </div>
                <span className="pod-time">{ep ? ep.duration : ""}</span>
              </div>
              <Link to="/podcast" className="btn btn-gold">Explore podcast</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="pull">
        <div className="glow glow-q" />
        <div className="wrap reveal">
          <span className="markq">&ldquo;</span>
          <blockquote>Attention is the only currency that matters — and we make sure your story <em>earns</em> it.</blockquote>
          <cite>The Toye approach</cite>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Kind words</span><h2>What founders are saying</h2></div>
          <div className="grid g3 reveal">
            {testimonials.map((t) => (
              <div className="card quote tilt" key={t.id}>
                <span className="q">&ldquo;</span>
                <p>{t.quote}</p>
                <div className="who">
                  <span className="av">{t.name.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase()}</span>
                  <span><b>{t.name}</b><small>{t.role}</small></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section dark" id="packages">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">Packages</span><h2>Straightforward pricing that fits</h2><p>Transparent tiers to start with — every project can be tailored from here.</p></div>
          <div className="grid g3 reveal">
            {packages.map((p) => (
              <div className={"card price" + (p.featured ? " feat" : "")} key={p.id}>
                {p.featured && <span className="tag">Most chosen</span>}
                <span className="tier">{p.name}</span>
                <div className="amt">{p.price}</div>
                <ul>{p.items.map((it, i) => (<li key={i}><Check />{it}</li>))}</ul>
                <Link to="/#contact" className={"btn " + (p.featured ? "btn-gold" : "btn-ghost")}>{settings.primaryCtaLabel}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal"><span className="eyebrow c">FAQ</span><h2>Questions? We've got answers.</h2></div>
          <div className="faq reveal">
            {faqs.map((f, i) => (
              <div className={"faq-item" + (openFaq === i ? " open" : "")} key={f.id}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}<span className="pl">+</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section dark" id="contact">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <span className="eyebrow">Start a project</span>
              <h2>Let's make something worth watching.</h2>
              <p>Tell us what you're building and when you need it. We reply within two working days.</p>
              <span className="ci"><span>Email</span>{settings.email}</span>
              <span className="ci"><span>Studio</span>{settings.location}</span>
              <span className="ci"><span>Phone</span>{settings.phone}</span>
            </div>
            <div className="reveal"><ContactForm /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
