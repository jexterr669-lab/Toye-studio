import { useState } from "react";
import { useStudio } from "../store/StudioContext.jsx";

const projectTypes = [
  "Brand film",
  "Commercial",
  "Music video",
  "Event coverage",
  "Photography",
  "Podcast production",
  "Other",
];

const empty = { name: "", email: "", projectType: "Brand film", message: "" };

export default function ContactForm() {
  const { submitInquiry } = useStudio();
  const [form, setForm] = useState(empty);
  const [note, setNote] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNote("Add your name, email and a short note so we can reply.");
      return;
    }
    submitInquiry(form);
    setForm(empty);
    setNote("Sent. We'll be in touch within two working days.");
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" value={form.name} onChange={set("name")} placeholder="Jane Doe" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="you@brand.com"
        />
      </div>
      <div className="field">
        <label htmlFor="cf-type">Project type</label>
        <select id="cf-type" value={form.projectType} onChange={set("projectType")}>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Tell us about it</label>
        <textarea
          id="cf-msg"
          value={form.message}
          onChange={set("message")}
          placeholder="What are you making, and when do you need it?"
        />
      </div>
      <div className="form__note" role="status">
        {note}
      </div>
      <button className="btn btn--solid" type="submit">
        Send enquiry
      </button>
    </form>
  );
}
