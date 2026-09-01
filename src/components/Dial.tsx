/**
 * The gauge face, drawn rather than photographed — used oversized and faint
 * behind the hero, and small as a section ornament. Every tick is real
 * geometry, so it stays crisp at any size and costs nothing to load.
 */
export default function Dial({
  className = "",
  needle = 218,
  ticks = 41,
  needleOpacity = 1,
}: {
  className?: string;
  /** needle angle in degrees, 0 = pointing right, sweeps clockwise */
  needle?: number;
  ticks?: number;
  /** Behind the hero the dial sits at 7% — the needle must be dialled back with
      it, or a full-strength red line cuts straight across the headline stats. */
  needleOpacity?: number;
}) {
  const R = 100;
  const start = 150; // dial sweep runs 150° → 390° (i.e. 30°), like a real gauge
  const sweep = 240;

  const marks = Array.from({ length: ticks }, (_, i) => {
    const a = ((start + (sweep * i) / (ticks - 1)) * Math.PI) / 180;
    const major = i % 5 === 0;
    const r1 = major ? R - 16 : R - 9;
    const r2 = R - 2;
    return {
      x1: 110 + r1 * Math.cos(a),
      y1: 110 + r1 * Math.sin(a),
      x2: 110 + r2 * Math.cos(a),
      y2: 110 + r2 * Math.sin(a),
      major,
    };
  });

  const na = (needle * Math.PI) / 180;

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <circle cx="110" cy="110" r="104" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="86" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      {marks.map((m, i) => (
        <line
          key={i}
          x1={m.x1}
          y1={m.y1}
          x2={m.x2}
          y2={m.y2}
          stroke="currentColor"
          strokeWidth={m.major ? 2.5 : 1}
          opacity={m.major ? 1 : 0.55}
          strokeLinecap="round"
        />
      ))}
      <g opacity={needleOpacity}>
        <line
          x1={110 - 18 * Math.cos(na)}
          y1={110 - 18 * Math.sin(na)}
          x2={110 + 74 * Math.cos(na)}
          y2={110 + 74 * Math.sin(na)}
          stroke="var(--color-signal)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="110" cy="110" r="8" fill="var(--color-signal)" />
        <circle cx="110" cy="110" r="3" fill="var(--color-paper)" />
      </g>
    </svg>
  );
}
