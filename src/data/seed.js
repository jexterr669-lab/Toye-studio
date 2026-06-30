// Initial content. Everything here can be edited live from the admin dashboard;
// edits are saved to the browser so the public site updates immediately.

let _id = 0;
const uid = (p) => `${p}-${(++_id).toString().padStart(3, "0")}`;

export const seed = {
  settings: {
    studioName: "Toye Studios",
    tagline: "Storytelling · Growth · Purpose",
    heroEyebrow: "Media studio — videography first",
    heroTitle: "Stories worth\nwatching twice.",
    heroSubtitle:
      "Toye Studios is a media house built around cinematic videography — with photography, brand films, and the Life is a Skit podcast under one roof.",
    primaryCtaLabel: "Start a project",
    secondaryCtaLabel: "See the work",
    email: "hello@toyestudios.com",
    phone: "+234 000 000 0000",
    location: "Lagos, Nigeria",
    instagram: "https://instagram.com/toyestudios",
    youtube: "https://youtube.com/@toyestudios",
    podcastName: "Life is a Skit",
    podcastTagline: "Real conversations that started as a joke.",
    adminPassword: "toye-admin",
  },

  services: [
    {
      id: uid("svc"),
      title: "Videography",
      summary:
        "Brand films, commercials, music videos and event coverage shot and graded for the screen they live on.",
    },
    {
      id: uid("svc"),
      title: "Photography",
      summary:
        "Editorial portraits, product and campaign stills with a consistent, considered look.",
    },
    {
      id: uid("svc"),
      title: "Podcast production",
      summary:
        "End-to-end production for Life is a Skit and partner shows — recording, edit, and publishing.",
    },
    {
      id: uid("svc"),
      title: "Post & colour",
      summary:
        "Editing, sound, motion and colour grading that hold the story together after the shoot.",
    },
  ],

  works: [
    {
      id: uid("work"),
      title: "First Light",
      client: "Aria Coffee",
      category: "Brand film",
      year: "2025",
      ratio: "2.39:1",
      thumbUrl: "",
      videoUrl: "",
      featured: true,
    },
    {
      id: uid("work"),
      title: "Run It Back",
      client: "Tempo Athletics",
      category: "Commercial",
      year: "2025",
      ratio: "16:9",
      thumbUrl: "",
      videoUrl: "",
      featured: true,
    },
    {
      id: uid("work"),
      title: "Quiet Hours",
      client: "Independent",
      category: "Music video",
      year: "2024",
      ratio: "2.39:1",
      thumbUrl: "",
      videoUrl: "",
      featured: true,
    },
    {
      id: uid("work"),
      title: "Open House",
      client: "Mara Studio",
      category: "Event film",
      year: "2024",
      ratio: "16:9",
      thumbUrl: "",
      videoUrl: "",
      featured: false,
    },
    {
      id: uid("work"),
      title: "The Maker",
      client: "Oru Ceramics",
      category: "Documentary",
      year: "2024",
      ratio: "4:5",
      thumbUrl: "",
      videoUrl: "",
      featured: false,
    },
    {
      id: uid("work"),
      title: "Night Shift",
      client: "Lumen",
      category: "Commercial",
      year: "2023",
      ratio: "16:9",
      thumbUrl: "",
      videoUrl: "",
      featured: false,
    },
  ],

  episodes: [
    {
      id: uid("ep"),
      number: 12,
      title: "When the bit goes too far",
      guest: "Dami & Tola",
      description:
        "The crew unpacks the skit that almost got them cancelled — and why they would do it again.",
      duration: "48 min",
      date: "2025-05-18",
      embedUrl: "",
      published: true,
    },
    {
      id: uid("ep"),
      number: 11,
      title: "Comedy is just timing and pain",
      guest: "Funke A.",
      description:
        "A guest who has been on every stage in Lagos talks failing in front of a live crowd.",
      duration: "52 min",
      date: "2025-05-04",
      embedUrl: "",
      published: true,
    },
    {
      id: uid("ep"),
      number: 10,
      title: "We filmed a whole season in a kitchen",
      guest: "The Toye crew",
      description:
        "How a one-room set became the most-watched series the studio has shipped.",
      duration: "41 min",
      date: "2025-04-20",
      embedUrl: "",
      published: true,
    },
  ],

  testimonials: [
    {
      id: uid("tst"),
      quote:
        "They treated a small budget like a feature. The film still gets us asked who shot it.",
      name: "Michael R.",
      role: "Founder, Aria Coffee",
    },
    {
      id: uid("tst"),
      quote:
        "Calm on set, ruthless in the edit. Exactly the combination you want.",
      name: "Jason L.",
      role: "Marketing lead, Tempo",
    },
    {
      id: uid("tst"),
      quote: "The podcast production turned our show from a hobby into a brand.",
      name: "Emily B.",
      role: "Host, partner show",
    },
  ],

  packages: [
    {
      id: uid("pkg"),
      name: "Single",
      price: "From ₦450,000",
      featured: false,
      items: [
        "Half-day shoot",
        "One finished film up to 90s",
        "Licensed music & colour grade",
        "Two rounds of revisions",
      ],
    },
    {
      id: uid("pkg"),
      name: "Campaign",
      price: "From ₦1,200,000",
      featured: true,
      items: [
        "Full-day shoot, two cameras",
        "Hero film + 4 social cutdowns",
        "Stills set included",
        "Dedicated producer",
      ],
    },
    {
      id: uid("pkg"),
      name: "Retainer",
      price: "Let's talk",
      featured: false,
      items: [
        "Monthly content drops",
        "Podcast episode production",
        "Priority scheduling",
        "Quarterly strategy review",
      ],
    },
  ],

  faqs: [
    {
      id: uid("faq"),
      q: "How long does a video project take?",
      a: "Most brand films run two to four weeks from kickoff to final delivery, depending on shoot days and revisions. We give you a clear timeline at the start.",
    },
    {
      id: uid("faq"),
      q: "Do you only do videography?",
      a: "Video is the core, but the same team handles photography, post-production and the Life is a Skit podcast, so a project can cover all of it.",
    },
    {
      id: uid("faq"),
      q: "Can we book the studio for our own podcast?",
      a: "Yes. We produce partner shows end-to-end — recording, editing and publishing. Tell us about your show in the contact form.",
    },
    {
      id: uid("faq"),
      q: "Where are you based?",
      a: "Lagos, Nigeria. We travel for the right project, and remote post-production work is straightforward.",
    },
  ],

  inquiries: [
    {
      id: uid("inq"),
      name: "Sade Okoro",
      email: "sade@example.com",
      projectType: "Brand film",
      message: "We're launching a skincare line and need a 60s hero film plus social cuts.",
      date: "2025-05-20",
      status: "new",
    },
  ],
};
