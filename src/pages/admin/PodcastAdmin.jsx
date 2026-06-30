import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Area, Check } from "../../components/admin/Forms.jsx";

const blank = {
  number: "",
  title: "",
  guest: "",
  description: "",
  duration: "",
  date: new Date().toISOString().slice(0, 10),
  embedUrl: "",
  published: true,
};

export default function PodcastAdmin() {
  const { episodes, settings, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);

  const openNew = () => {
    const nextNum = episodes.reduce((m, e) => Math.max(m, Number(e.number) || 0), 0) + 1;
    setForm({ ...blank, number: String(nextNum) });
    setEditing({ __new: true });
  };
  const openEdit = (e) => {
    setForm(e);
    setEditing(e);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.title.trim()) return;
    const payload = { ...form, number: Number(form.number) || 0 };
    if (editing.__new) add("episodes", payload);
    else update("episodes", editing.id, payload);
    close();
  };

  const del = (e) => {
    if (window.confirm(`Delete episode “${e.title}”?`)) remove("episodes", e.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>{settings.podcastName}</h1>
          <p>Episodes shown on the podcast page and homepage.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add episode
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{episodes.length} episodes</h2>
              <p>Unpublished episodes stay hidden from the public site.</p>
            </div>
          </div>

          {episodes.length === 0 ? (
            <div className="empty">No episodes yet. Add your first one.</div>
          ) : (
            <div className="rows">
              {episodes.map((e) => (
                <div className="row" key={e.id}>
                  <div className="row__main">
                    <div className="row__title">
                      {String(e.number).padStart(2, "0")} — {e.title}{" "}
                      {!e.published && <span className="pill">Draft</span>}
                    </div>
                    <div className="row__sub">
                      With {e.guest} · {e.duration} · {e.date}
                    </div>
                  </div>
                  <div className="row__actions">
                    <button
                      className="abtn abtn--sm"
                      onClick={() => update("episodes", e.id, { published: !e.published })}
                    >
                      {e.published ? "Unpublish" : "Publish"}
                    </button>
                    <button className="abtn abtn--sm" onClick={() => openEdit(e)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(e)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {editing && (
        <Drawer
          title={editing.__new ? "Add episode" : "Edit episode"}
          onClose={close}
          footer={
            <>
              <button className="abtn abtn--primary" onClick={save}>
                Save changes
              </button>
              <button className="abtn abtn--ghost" onClick={close}>
                Cancel
              </button>
            </>
          }
        >
          <div className="afield__row">
            <Text label="Episode number" value={form.number} onChange={set("number")} type="number" />
            <Text label="Duration" value={form.duration} onChange={set("duration")} placeholder="48 min" />
          </div>
          <Text label="Title" value={form.title} onChange={set("title")} placeholder="When the bit goes too far" />
          <Text label="Guest" value={form.guest} onChange={set("guest")} placeholder="Dami & Tola" />
          <Area label="Description" value={form.description} onChange={set("description")} />
          <Text label="Publish date" value={form.date} onChange={set("date")} type="date" />
          <Text
            label="Embed URL (Spotify / YouTube / Apple)"
            value={form.embedUrl}
            onChange={set("embedUrl")}
            placeholder="https://open.spotify.com/embed/…  (optional)"
          />
          <Check label="Published" checked={form.published} onChange={set("published")} />
        </Drawer>
      )}
    </>
  );
}
