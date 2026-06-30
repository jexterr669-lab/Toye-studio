import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Select, Check } from "../../components/admin/Forms.jsx";

const blank = {
  title: "",
  client: "",
  category: "Brand film",
  year: String(new Date().getFullYear()),
  ratio: "16:9",
  thumbUrl: "",
  videoUrl: "",
  featured: false,
};

const categories = [
  "Brand film",
  "Commercial",
  "Music video",
  "Event film",
  "Documentary",
  "Photography",
];

export default function WorkAdmin() {
  const { works, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null); // item or {__new:true}
  const [form, setForm] = useState(blank);

  const openNew = () => {
    setForm(blank);
    setEditing({ __new: true });
  };
  const openEdit = (w) => {
    setForm(w);
    setEditing(w);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.title.trim()) return;
    if (editing.__new) add("works", form);
    else update("works", editing.id, form);
    close();
  };

  const del = (w) => {
    if (window.confirm(`Delete “${w.title}” from the portfolio?`)) remove("works", w.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Work</h1>
          <p>Projects shown on the homepage and portfolio page.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add project
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{works.length} projects</h2>
              <p>Toggle “Featured” to show a project on the homepage.</p>
            </div>
          </div>

          {works.length === 0 ? (
            <div className="empty">No projects yet. Add your first one.</div>
          ) : (
            <div className="rows">
              {works.map((w) => (
                <div className="row" key={w.id}>
                  <div className="row__main">
                    <div className="row__title">
                      {w.title}{" "}
                      {w.featured && <span className="pill pill--on">Featured</span>}
                    </div>
                    <div className="row__sub">
                      {w.client} · {w.category} · {w.year} · {w.ratio}
                    </div>
                  </div>
                  <div className="row__actions">
                    <button
                      className="abtn abtn--sm"
                      onClick={() => update("works", w.id, { featured: !w.featured })}
                    >
                      {w.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button className="abtn abtn--sm" onClick={() => openEdit(w)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(w)}>
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
          title={editing.__new ? "Add project" : "Edit project"}
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
          <Text label="Title" value={form.title} onChange={set("title")} placeholder="First Light" />
          <Text label="Client" value={form.client} onChange={set("client")} placeholder="Aria Coffee" />
          <div className="afield__row">
            <Select label="Category" value={form.category} onChange={set("category")} options={categories} />
            <Text label="Year" value={form.year} onChange={set("year")} />
          </div>
          <Select
            label="Aspect ratio"
            value={form.ratio}
            onChange={set("ratio")}
            options={["16:9", "2.39:1", "4:5"]}
          />
          <Text
            label="Thumbnail image URL"
            value={form.thumbUrl}
            onChange={set("thumbUrl")}
            placeholder="https://…  (optional)"
          />
          <Text
            label="Video link"
            value={form.videoUrl}
            onChange={set("videoUrl")}
            placeholder="https://youtube.com/…  (optional)"
          />
          <Check label="Featured on homepage" checked={form.featured} onChange={set("featured")} />
        </Drawer>
      )}
    </>
  );
}
