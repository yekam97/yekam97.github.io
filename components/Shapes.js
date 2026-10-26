// Decorative vector shapes for the big illustration "stages" (see Stage.js).
// All of them are pure SVG, take their colour from `color`, and are
// aria-hidden. Sizes are set by the parent via CSS (width/height).

// Deterministic pseudo-random so every blob keeps the same shape on every render
const rng = (seed) => {
  let a = seed * 2654435761;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Smooth closed organic blob: points around a circle, joined with Catmull-Rom curves
export const blobPath = (seed = 1, points = 8, radius = 100, variance = 0.2) => {
  const r = rng(seed);
  const pts = Array.from({ length: points }, (_, i) => {
    const ang = (i / points) * Math.PI * 2;
    const rad = radius * (1 - variance + r() * variance * 2);
    return [Math.cos(ang) * rad, Math.sin(ang) * rad];
  });
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
};

const Svg = ({ viewBox, className, style, children }) => (
  <svg viewBox={viewBox} className={className} style={style} fill="none" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

export const Blob = ({ seed = 1, color = 'currentColor', opacity = 1, className, style }) => (
  <Svg viewBox="-115 -115 230 230" className={className} style={style}>
    <path d={blobPath(seed)} fill={color} opacity={opacity} />
  </Svg>
);

// Four-point sparkle
export const Sparkle = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="-12 -12 24 24" className={className} style={style}>
    <path
      d="M0 -11 C1 -4 4 -1 11 0 C4 1 1 4 0 11 C-1 4 -4 1 -11 0 C-4 -1 -1 -4 0 -11Z"
      fill={color}
    />
  </Svg>
);

export const Ring = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="-12 -12 24 24" className={className} style={style}>
    <circle r="9" stroke={color} strokeWidth="3.2" />
  </Svg>
);

export const Plus = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="-12 -12 24 24" className={className} style={style}>
    <path d="M0 -8 V8 M-8 0 H8" stroke={color} strokeWidth="4.2" strokeLinecap="round" />
  </Svg>
);

// Chunky zig-zag, like the yellow squiggle in the reference site
export const Bolt = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="0 0 60 34" className={className} style={style}>
    <path d="M5 28 L18 6 L28 26 L42 4 L55 24" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Wave = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="0 0 80 24" className={className} style={style}>
    <path d="M4 12 C14 0, 22 0, 32 12 S50 24, 60 12 S72 4, 76 8" stroke={color} strokeWidth="5" strokeLinecap="round" />
  </Svg>
);

export const Dots = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="0 0 48 48" className={className} style={style}>
    {[6, 24, 42].flatMap((x) => [6, 24, 42].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={color} />))}
  </Svg>
);

export const Triangle = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="-14 -14 28 28" className={className} style={style}>
    <path d="M0 -10 L10 8 L-10 8 Z" fill={color} stroke={color} strokeWidth="4" strokeLinejoin="round" />
  </Svg>
);

export const HalfMoon = ({ color = 'currentColor', className, style }) => (
  <Svg viewBox="-12 -12 24 24" className={className} style={style}>
    <path d="M-10 4 A10 10 0 0 1 10 4 Z" fill={color} />
  </Svg>
);

export const SHAPES = { sparkle: Sparkle, ring: Ring, plus: Plus, bolt: Bolt, wave: Wave, dots: Dots, triangle: Triangle, moon: HalfMoon };
