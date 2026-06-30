import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer, Text, Area, Check } from "../../components/admin/Forms.jsx";

const blank = { name: "", price: "", items: "", featured: false };

const toForm = (p) => ({ ...p, items: (p.items || []).join("\n") });
const toPayload = (f) => ({
  name: f.name,
  price: f.price,
  featured: f.featured,
  items: f.items
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean),
});

export default function PackagesAdmin() {
  const { packages, add, update, remove } = useStudio();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);

  const openNew = () => {
    setForm(blank);
    setEditing({ __new: true });
  };
  const openEdit = (p) => {
    setForm(toForm(p));
    setEditing(p);
  };
  const close = () => setEditing(null);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    const payload = toPayload(form);
    if (editing.__new) add("packages", payload);
    else update("packages", editing.id, payload);
    close();
  };
  const del = (p) => {
    if (window.confirm(`Delete the “${p.name}” package?`)) remove("packages", p.id);
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Packages</h1>
          <p>Pricing tiers in the “Ways to work together” section.</p>
        </div>
        <button className="abtn abtn--primary" onClick={openNew}>
          + Add package
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>{packages.length} packages</h2>
              <p>One package can be marked as “Most booked”.</p>
            </div>
          </div>
          {packages.length === 0 ? (
            <div className="empty">No packages yet.</div>
          ) : (
            <div className="rows">
              {packages.map((p) => (
                <div className="row" key={p.id}>
                  <div className="row__main">
                    <div className="row__title">
                      {p.name} · {p.price}{" "}
                      {p.featured && <span className="pill pill--on">Most booked</span>}
                    </div>
                    <div className="row__sub">{(p.items || []).join(" · ")}</div>
                  </div>
                  <div className="row__actions">
                    <button
                      className="abtn abtn--sm"
                      onClick={() => update("packages", p.id, { featured: !p.featured })}
                    >
                      {p.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button className="abtn abtn--sm" onClick={() => openEdit(p)}>
                      Edit
                    </button>
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(p)}>
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
          title={editing.__new ? "Add package" : "Edit package"}
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
            <Text label="Name" value={form.name} onChange={set("name")} placeholder="Campaign" />
            <Text label="Price" value={form.price} onChange={set("price")} placeholder="From ₦1,200,000" />
          </div>
          <Area
            label="What's included (one per line)"
            value={form.items}
            onChange={set("items")}
            placeholder={"Full-day shoot, two cameras\nHero film + 4 social cutdowns"}
          />
          <Check label="Mark as “Most booked”" checked={form.featured} onChange={set("featured")} />
        </Drawer>
      )}
    </>
  );
}
