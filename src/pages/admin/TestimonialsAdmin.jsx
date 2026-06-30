import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Area } from "../../components/admin/Forms.jsx";

const blank = { quote: "", name: "", role: "" };

export default function TestimonialsAdmin() {
  const { testimonials, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);

  const openNew = () => {
    setForm(blank);
    setEditing({ __new: true });
  };
  const openEdit = (t) => {
    setForm(t);
    setEditing(t);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.quote.trim() || !form.name.trim()) return;
    if (editing.__new) add("testimonials", form);
    else update("testimonials", editing.id, form);
    close();
  };
  const del = (t) => {
    if (window.confirm(`Delete the quote from ${t.name}?`)) remove("testimonials", t.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Testimonials</h1>
          <p>Client quotes shown on the homepage.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add testimonial
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{testimonials.length} quotes</h2>
            </div>
          </div>
          {testimonials.length === 0 ? (
            <div className="empty">No testimonials yet.</div>
          ) : (
            <div className="rows">
              {testimonials.map((t) => (
                <div className="row" key={t.id}>
                  <div className="row__main">
                    <div className="row__title">“{t.quote}”</div>
                    <div className="row__sub">
                      {t.name} — {t.role}
                    </div>
                  </div>
                  <div className="row__actions">
                    <button className="abtn abtn--sm" onClick={() => openEdit(t)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(t)}>
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
          title={editing.__new ? "Add testimonial" : "Edit testimonial"}
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
          <Area label="Quote" value={form.quote} onChange={set("quote")} />
          <div className="afield__row">
            <Text label="Name" value={form.name} onChange={set("name")} placeholder="Michael R." />
            <Text label="Role" value={form.role} onChange={set("role")} placeholder="Founder, Aria Coffee" />
          </div>
        </Drawer>
      )}
    </>
  );
}
