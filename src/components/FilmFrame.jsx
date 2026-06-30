// Cinematic frame used across the work grid. Shows the real thumbnail when
// one is set in the admin; otherwise a clean labelled placeholder.
export default function FilmFrame({ ratio = "16:9", src, label, timecode }) {
  return (
    <div className="frame" data-ratio={ratio}>
      {src ? (
        <img className="frame__img" src={src} alt={label || ""} loading="lazy" />
      ) : (
        <div className="frame__center">{label}</div>
      )}
      <span className="frame__corner tl" />
      <span className="frame__corner tr" />
      <span className="frame__corner bl" />
      <span className="frame__corner br" />
      {timecode && <span className="frame__tc">{timecode}</span>}
    </div>
  );
}
