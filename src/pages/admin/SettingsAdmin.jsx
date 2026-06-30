import { useState } from "react";
import { useStudio } from "../../store/StudioContext.jsx";
import { Text, Area } from "../../components/admin/Forms.jsx";

export default function SettingsAdmin() {
  const { settings, updateSettings, resetAll } = useStudio();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  const save = () => {
    updateSettings(form);
    setSaved(true);
  };

  const reset = () => {
    if (
      window.confirm(
        "Reset ALL content back to the starting demo data? This cannot be undone."
      )
    ) {
      resetAll();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="atop">
        <div>
          <h1>Settings</h1>
          <p>Studio details, homepage copy and the dashboard password.</p>
        </div>
        <button className="abtn abtn--primary" onClick={save}>
          Save settings
        </button>
      </div>

      <div className="acontent">
        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Studio</h2>
            </div>
          </div>
          <div className="acontent" style={{ paddingBottom: 28 }}>
            <div className="settings-grid">
              <Text label="Studio name" value={form.studioName} onChange={set("studioName")} />
              <Text label="Tagline" value={form.tagline} onChange={set("tagline")} />
              <Text label="Email" value={form.email} onChange={set("email")} />
              <Text label="Phone" value={form.phone} onChange={set("phone")} />
              <Text label="Location" value={form.location} onChange={set("location")} />
              <Text label="Instagram URL" value={form.instagram} onChange={set("instagram")} />
              <Text label="YouTube URL" value={form.youtube} onChange={set("youtube")} />
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Homepage hero</h2>
              <p>The headline and intro at the top of the site. Use a line break for two lines.</p>
            </div>
          </div>
          <div className="acontent" style={{ paddingBottom: 28, display: "grid", gap: 18 }}>
            <Text label="Eyebrow" value={form.heroEyebrow} onChange={set("heroEyebrow")} />
            <Area label="Hero title" value={form.heroTitle} onChange={set("heroTitle")} />
            <Area label="Hero subtitle" value={form.heroSubtitle} onChange={set("heroSubtitle")} />
            <div className="afield__row">
              <Text label="Primary button" value={form.primaryCtaLabel} onChange={set("primaryCtaLabel")} />
              <Text label="Secondary button" value={form.secondaryCtaLabel} onChange={set("secondaryCtaLabel")} />
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Podcast</h2>
            </div>
          </div>
          <div className="acontent" style={{ paddingBottom: 28, display: "grid", gap: 18 }}>
            <Text label="Podcast name" value={form.podcastName} onChange={set("podcastName")} />
            <Text label="Podcast tagline" value={form.podcastTagline} onChange={set("podcastTagline")} />
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <div>
              <h2>Security</h2>
              <p>The password used to sign in to this dashboard.</p>
            </div>
          </div>
          <div className="acontent" style={{ paddingBottom: 28 }}>
            <Text label="Dashboard password" value={form.adminPassword} onChange={set("adminPassword")} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <button className="abtn abtn--primary" onClick={save}>
            Save settings
          </button>
          {saved && <span style={{ color: "var(--gold)" }}>Saved.</span>}
          <button className="abtn abtn--danger" onClick={reset} style={{ marginLeft: "auto" }}>
            Reset all content to demo
          </button>
        </div>
      </div>
    </>
  );
}
