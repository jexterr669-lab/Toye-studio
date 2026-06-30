import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Area } from "../../components/admin/Forms.jsx";

const blank = { title: "", summary: "" };

export default function ServicesAdmin() {
  const { services, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);

  const openNew = () => {
    setForm(blank);
    setEditing({ __new: true });
  };
  const openEdit = (s) => {
    setForm(s);
    setEditing(s);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.title.trim()) return;
    if (editing.__new) add("services", form);
    else update("services", editing.id, form);
    close();
  };
  const del = (s) => {
    if (window.confirm(`Delete the “${s.title}” service?`)) remove("services", s.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Services</h1>
          <p>The “What we do” grid on the homepage.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add service
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{services.length} services</h2>
            </div>
          </div>
          {services.length === 0 ? (
            <div className="empty">No services yet.</div>
          ) : (
            <div className="rows">
              {services.map((s) => (
                <div className="row" key={s.id}>
                  <div className="row__main">
                    <div className="row__title">{s.title}</div>
                    <div className="row__sub">{s.summary}</div>
                  </div>
                  <div className="row__actions">
                    <button className="abtn abtn--sm" onClick={() => openEdit(s)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(s)}>
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
          title={editing.__new ? "Add service" : "Edit service"}
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
          <Text label="Title" value={form.title} onChange={set("title")} placeholder="Videography" />
          <Area label="Summary" value={form.summary} onChange={set("summary")} />
        </Drawer>
      )}
    </>
  );
}
