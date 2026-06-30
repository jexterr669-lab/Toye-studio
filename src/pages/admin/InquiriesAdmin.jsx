import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Drawer } from "../../components/admin/Forms.jsx";

const filters = ["All", "New", "Read", "Archived"];

export default function InquiriesAdmin() {
  const { inquiries, update, remove } = useStudio();
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);

  const shown =
    filter === "All"
      ? inquiries
      : inquiries.filter((i) => i.status === filter.toLowerCase());

  const openMsg = (i) => {
    if (i.status === "new") update("inquiries", i.id, { status: "read" });
    setOpen({ ...i, status: i.status === "new" ? "read" : i.status });
  };

  const del = (i) => {
    if (window.confirm(`Delete the message from ${i.name}?`)) {
      remove("inquiries", i.id);
      setOpen(null);
    }
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Inquiries</h1>
          <p>Every message sent through the site contact form lands here.</p>
        </div>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`abtn abtn--sm ${filter === f ? "abtn--gold" : "abtn--ghost"}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="empty">Nothing here. New messages will show up automatically.</div>
          ) : (
            <div className="rows">
              {shown.map((i) => (
                <div className="row" key={i.id}>
                  <div className="row__main">
                    <div className="row__title">
                      {i.name}{" "}
                      {i.status === "new" && <span className="pill pill--new">New</span>}
                      {i.status === "archived" && <span className="pill">Archived</span>}
                    </div>
                    <div className="row__sub">
                      {i.projectType} · {i.email} · {i.date}
                    </div>
                  </div>
                  <div className="row__actions">
                    <button className="abtn abtn--sm" onClick={() => openMsg(i)}>
                      Open
                    </button>
                    {i.status !== "archived" ? (
                      <button
                        className="abtn abtn--sm"
                        onClick={() => update("inquiries", i.id, { status: "archived" })}
                      >
                        Archive
                      </button>
                    ) : (
                      <button
                        className="abtn abtn--sm"
                        onClick={() => update("inquiries", i.id, { status: "read" })}
                      >
                        Restore
                      </button>
                    )}
                    <button className="abtn abtn--sm abtn--danger" onClick={() => del(i)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {open && (
        <Drawer
          title={open.name}
          onClose={() => setOpen(null)}
          footer={
            <>
              <a className="abtn abtn--primary" href={`mailto:${open.email}`}>
                Reply by email
              </a>
              <button
                className="abtn abtn--ghost"
                onClick={() => {
                  update("inquiries", open.id, { status: "archived" });
                  setOpen(null);
                }}
              >
                Archive
              </button>
            </>
          }
        >
          <div className="afield">
            <label>From</label>
            <div style={{ fontSize: "1.05rem" }}>
              {open.name} · {open.email}
            </div>
          </div>
          <div className="afield">
            <label>Project type</label>
            <div>{open.projectType}</div>
          </div>
          <div className="afield">
            <label>Received</label>
            <div>{open.date}</div>
          </div>
          <div className="afield">
            <label>Message</label>
            <p style={{ lineHeight: 1.6 }}>{open.message}</p>
          </div>
        </Drawer>
      )}
    </>
  );
}
