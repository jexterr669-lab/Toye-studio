// The growth-bars symbol from the Toye wordmark, rebuilt as crisp SVG.
// It is the studio's recurring signature mark.
export default function Mark({ size = 22, color = "var(--gold)", muted = "var(--stone)" }) {
  const w = size;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Toye Studios mark"
      style={{ flex: "none" }}
    >
      <rect x="2" y="13" width="3.2" height="9" rx="0.5" fill={muted} />
      <rect x="8" y="9" width="3.2" height="13" rx="0.5" fill={muted} />
      <rect x="14" y="5" width="3.2" height="17" rx="0.5" fill={color} />
      <rect x="20" y="2" width="3.2" height="20" rx="0.5" fill={color} />
    </svg>
  );
}
