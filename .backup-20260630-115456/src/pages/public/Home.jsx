import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStudio } from "../../store/StudioContext.jsx";
import Mark from "../../components/Mark.jsx";
import Reveal from "../../components/Reveal.jsx";
import FilmFrame from "../../components/FilmFrame.jsx";
import FaqList from "../../components/FaqList.jsx";
import ContactForm from "../../components/ContactForm.jsx";

const process = [
  { h: "Discover", t: "We learn the story, the audience and the single thing this film has to do." },
  { h: "Shape", t: "Treatment, shot list and schedule — so nothing is improvised on the day." },
  { h: "Shoot", t: "A calm, prepared set. Two cameras when the brief calls for it." },
  { h: "Deliver", t: "Edit, sound and colour, cut for every screen the work will live on." },
];

const layoutFor = (i) =>
  i === 0 ? "work__item--wide" : i % 3 === 0 ? "work__item--tall" : "work__item";

export default function Home() {
  const { settings, services, works, episodes, testimonials, packages, faqs } = useStudio();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
    }
  }, [hash]);

  const featured = works.filter((w) => w.featured).slice(0, 5);
  const latest = episodes.filter((e) => e.published).slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow hero__eyebrow">
              <Mark size={18} />
              {settings.heroEyebrow}
            </span>
            <h1 className="hero__title">{settings.heroTitle}</h1>
            <p className="hero__sub">{settings.heroSubtitle}</p>
            <div className="hero__actions">
              <a href="#contact" className="btn btn--solid">
                {settings.primaryCtaLabel}
              </a>
              <Link to="/work" className="btn btn--ghost">
                {settings.secondaryCtaLabel}
              </Link>
            </div>
            <div className="hero__meta">
              <div className="hero__stat">
                <span className="n">120+</span>
                <span className="l">Films delivered</span>
              </div>
              <div className="hero__stat">
                <span className="n">12</span>
                <span className="l">Podcast episodes</span>
              </div>
              <div className="hero__stat">
                <span className="n">7 yrs</span>
                <span className="l">Behind the lens</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> What we do
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                One studio, every part of the story.
              </h2>
            </div>
            <p className="section__lead">
              Video is the centre of gravity. Photography, post and podcast work orbit it, so a
              single brief can become a whole campaign.
            </p>
          </Reveal>

          <Reveal className="svc__grid">
            {services.map((s, i) => (
              <div className="svc__cell" key={s.id}>
                <span className="svc__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="svc__name">{s.title}</h3>
                <p className="svc__desc">{s.summary}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> Selected work
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                Frames that earned a second look.
              </h2>
            </div>
            <Link to="/work" className="btn btn--ghost">
              View all work
            </Link>
          </Reveal>

          <div className="work__grid">
            {featured.map((w, i) => (
              <Reveal className={layoutFor(i)} key={w.id}>
                <Link to="/work" className="work__a">
                  <FilmFrame
                    ratio={i === 0 ? "2.39:1" : w.ratio}
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
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PODCAST */}
      <section className="section pod" id="podcast">
        <div className="wrap">
          <Reveal className="pod__top">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> The podcast
              </span>
              <h2 className="pod__title" style={{ marginTop: 18 }}>
                <em>{settings.podcastName}</em>
              </h2>
              <p className="pod__lead">{settings.podcastTagline}</p>
              <div style={{ marginTop: 28 }}>
                <Link to="/podcast" className="btn btn--ghost">
                  All episodes
                </Link>
              </div>
            </div>
            <div className="pod__cover">
              <div>
                <h4>{settings.podcastName}</h4>
                <p>A Toye Studios production</p>
              </div>
            </div>
          </Reveal>

          <div>
            {latest.map((ep) => (
              <Episode key={ep.id} ep={ep} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="wrap about__grid">
          <Reveal>
            <FilmFrame ratio="4:5" label="Toye Studios" timecode="EST. LAGOS" />
          </Reveal>
          <Reveal>
            <span className="eyebrow">
              <Mark size={16} /> The studio
            </span>
            <h2 className="about__title" style={{ marginTop: 18 }}>
              We make work that holds up after the launch.
            </h2>
            <p className="about__p">
              Toye Studios was built on one idea: a story told well outlasts the campaign it was
              made for. We bring the same care to a founder's first brand film as to a full season
              of the podcast.
            </p>
            <p className="about__p">
              Storytelling, growth and purpose are not taglines here — they are how we decide what
              to shoot, what to cut, and what to keep.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> How we work
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                A clear path from idea to delivery.
              </h2>
            </div>
            <p className="section__lead">
              Four stages, no surprises. You always know what is happening and what comes next.
            </p>
          </Reveal>

          <Reveal className="proc__grid">
            {process.map((p, i) => (
              <div className="proc__step" key={p.h}>
                <span className="proc__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="proc__h">{p.h}</h3>
                <p className="proc__t">{p.t}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> In their words
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                Founders who came back.
              </h2>
            </div>
          </Reveal>

          <Reveal className="tst__grid">
            {testimonials.map((t) => (
              <figure className="tst__card" key={t.id}>
                <blockquote className="tst__q">“{t.quote}”</blockquote>
                <figcaption className="tst__by">
                  <div className="tst__name">{t.name}</div>
                  <div className="tst__role">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section" id="packages">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> Ways to work together
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                Pricing that fits the brief.
              </h2>
            </div>
            <p className="section__lead">
              Starting points, not ceilings. Every project gets a quote tailored to its scope.
            </p>
          </Reveal>

          <Reveal className="pkg__grid">
            {packages.map((p) => (
              <div
                className={`pkg__card ${p.featured ? "pkg__card--featured" : ""}`}
                key={p.id}
              >
                <span className="pkg__tag">{p.featured ? "Most booked" : ""}</span>
                <h3 className="pkg__name">{p.name}</h3>
                <div className="pkg__price">{p.price}</div>
                <ul className="pkg__list">
                  {p.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${p.featured ? "btn--solid" : "btn--ghost"}`}>
                  Choose {p.name}
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section__head">
            <div>
              <span className="eyebrow">
                <Mark size={16} /> Questions
              </span>
              <h2 className="section__title" style={{ marginTop: 18 }}>
                Answers before you ask.
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <FaqList faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="wrap contact__grid">
          <Reveal>
            <span className="eyebrow">
              <Mark size={16} /> Start a project
            </span>
            <h2 className="contact__title" style={{ marginTop: 18 }}>
              Let's make something <em>worth watching.</em>
            </h2>
            <p className="contact__lead">
              Tell us what you're building. We reply to every serious enquiry within two working
              days.
            </p>
            <div className="contact__details">
              <div className="contact__row">
                <div className="k">Email</div>
                <a className="v" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </div>
              <div className="contact__row">
                <div className="k">Studio</div>
                <div className="v">{settings.location}</div>
              </div>
              <div className="contact__row">
                <div className="k">Phone</div>
                <div className="v">{settings.phone}</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Episode({ ep }) {
  return (
    <div className="ep">
      <div className="ep__num">{String(ep.number).padStart(2, "0")}</div>
      <div className="ep__body">
        <h4>{ep.title}</h4>
        <div className="ep__guest">With {ep.guest}</div>
        <p className="ep__desc">{ep.description}</p>
      </div>
      <div className="ep__side">
        {ep.duration}
        <br />
        {ep.date}
      </div>
    </div>
  );
}
