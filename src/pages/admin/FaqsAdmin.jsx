import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Area } from "../../components/admin/Forms.jsx";

const blank = { q: "", a: "" };

export default function FaqsAdmin() {
  const { faqs, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);

  const openNew = () => {
    setForm(blank);
    setEditing({ __new: true });
  };
  const openEdit = (f) => {
    setForm(f);
    setEditing(f);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: v }));

  const save = () => {
    if (!form.q.trim()) return;
    if (editing.__new) add("faqs", form);
    else update("faqs", editing.id, form);
    close();
  };
  const del = (f) => {
    if (window.confirm("Delete this question?")) remove("faqs", f.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>FAQs</h1>
          <p>The accordion in the “Questions” section.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add question
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{faqs.length} questions</h2>
            </div>
          </div>
          {faqs.length === 0 ? (
            <div className="empty">No questions yet.</div>
          ) : (
            <div className="rows">
              {faqs.map((f) => (
                <div className="row" key={f.id}>
                  <div className="row__main">
                    <div className="row__title">{f.q}</div>
                    <div className="row__sub">{f.a}</div>
                  </div>
                  <div className="row__actions">
                    <button className="abtn abtn--sm" onClick={() => openEdit(f)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(f)}>
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
          title={editing.__new ? "Add question" : "Edit question"}
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
          <Text label="Question" value={form.q} onChange={set("q")} />
          <Area label="Answer" value={form.a} onChange={set("a")} />
        </Drawer>
      )}
    </>
  );
}
