# Toye Studios

A media-company website (videography-led) with a built-in **Life is a Skit** podcast section and a full, functional **admin dashboard**. Built with React + Vite + React Router. All content on the public site is editable from the dashboard and persists in the browser.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (defaults to `http://localhost:3000`).

If you prefer to install the router explicitly:

```bash
npm install react react-dom react-router-dom
npm install -D vite @vitejs/plugin-react
```

### On CodeSandbox
1. Create a **Vite + React** sandbox (or import this folder as a zip).
2. In the terminal: `npm install` then `npm run dev`.
3. The preview opens the public site. Add `/admin` to the preview URL for the dashboard.

## Admin dashboard

- URL: `/admin` (or click **Studio login** in the footer)
- Default password: `toye-admin` — change it in **Settings**.

From the dashboard you control everything the public site shows:

- **Work** — portfolio pieces (title, client, category, year, aspect ratio, thumbnail URL, video URL, featured flag)
- **Podcast** — Life is a Skit episodes (auto-numbered, embed URL, publish toggle)
- **Services** — what the studio offers
- **Testimonials** — client quotes
- **Packages** — pricing tiers (one feature per line)
- **FAQs** — accordion items
- **Inquiries** — every public contact-form submission lands here (new / read / archived, reply by email)
- **Settings** — studio name, tagline, hero copy, contact details, social links, podcast name, admin password, and a reset-to-demo button

## How content/storage works

Content lives in the browser via `localStorage` (key `toye_studio_state_v1`); the admin session uses `sessionStorage`. Edits in the dashboard reflect immediately on the public site **in the same browser**. There is no server, so it runs anywhere with zero backend setup.

For multi-device / multi-user persistence later, swap the data layer in `src/store/StudioContext.jsx` for a backend (e.g. Supabase) — the rest of the app reads/writes through that single context, so no component changes are needed.

## Media fields

Thumbnails and podcast players are URL fields the admin fills in:
- **Work thumbnail** — any image URL; **video URL** — link to the full piece.
- **Podcast embed URL** — a standard embed link (YouTube/Spotify/etc.); the episode page renders it in a player frame.

## Structure

```
src/
  components/        Nav, Footer, Mark (brand symbol), Reveal, FilmFrame, ContactForm, FaqList
    admin/Forms.jsx  Drawer + field helpers used by every admin editor
  pages/
    public/          Home, Work, Podcast
    admin/           Login, AdminLayout, Dashboard + one editor per content type
  store/             StudioContext.jsx  (single source of truth)
  data/seed.js       demo content shipped on first load
  styles/            public.css, admin.css
  index.css          design tokens (brand colours + fonts)
```

## Design

Built strictly to the brand card: charcoal `#1C1C1A`, off-white `#F5F3EE`, warm gold `#C4A45A` (hairline accent only), stone `#8A8880`, linen `#E9E7E1`; Cormorant Garamond for display, DM Sans for body. The public site is cinematic dark; the dashboard uses the brand's light treatment for working legibility. No gradients, no icon/emoji filler — the recurring mark is the brand's ascending growth-bars symbol, and videography work sits in film-frame panels with hairline corners and timecode labels.
