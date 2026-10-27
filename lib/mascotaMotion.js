// Motion profiles for the vector mascot rigs (see components/MascotaRig.js).
// Pure functions: given a time and the pose's pivots, return an SVG
// `transform` string per body part. Kept free of React so it can also be
// rendered frame-by-frame in a test page (assets/mascota/frames.html).
//
// Design rules (these came from reviewing frame sheets of the first version):
//  - One slow breathing/float cycle drives everything; limbs only TRAIL it
//    (rotation proportional to the body's vertical speed) instead of each one
//    oscillating on its own phase — that independent motion read as jelly.
//  - Anything that touches something else (the hand on the chin) uses exactly
//    the same transform as what it touches, so the art hidden underneath is
//    never uncovered.
//  - Amplitudes are small; the only big moves are the explicit gestures
//    (the hop), which is eased in and out.

export const HOP_MS = 800;

const s = Math.sin;
const c = Math.cos;
const PI = Math.PI;
const smooth = (x) => x * x * (3 - 2 * x);

export const rot = (deg, p) => `rotate(${deg.toFixed(2)} ${p.x} ${p.y})`;
export const T = (x, y) => `translate(${x.toFixed(1)} ${y.toFixed(1)})`;

export const PROFILES = {
  // ---------------------------------------------------------------- salto
  salto: ({ t, h, piv }) => {
    const ph = t * 2;
    const rise = -c(ph); // +1 while rising fastest, -1 while falling fastest
    const k = smooth(h);
    const root = T(0, s(ph) * 20 - k * 130);
    const up = rot(-rise * 1.1 - k * 4, piv.torso);
    const headTilt = rot(rise * 1.6 - k * 5, piv.head);
    const kick = rise * 3 - k * 8;
    return {
      torso: `${root} ${up}`,
      head: `${root} ${up} ${headTilt}`,
      // arms trail the motion; during the hop they swing up together
      'arm-left': `${root} ${up} ${rot(-rise * 6 + k * 22, piv['arm-left'])}`,
      'arm-right': `${root} ${up} ${rot(rise * 6 - k * 22, piv['arm-right'])}`,
      'leg-right': `${root} ${rot(kick, piv['leg-right'])}`,
      'shoe-right': `${root} ${rot(kick, piv['leg-right'])} ${rot(rise * 3 - k * 6, piv['shoe-right'])}`,
      'leg-left': `${root} ${rot(s(ph + 1.2) * 2 + k * 4, piv['leg-left'])}`,
      'shoe-left': `${root} ${rot(s(ph + 1.2) * 2 + k * 4, piv['leg-left'])} ${rot(-rise * 3 + k * 6, piv['shoe-left'])}`,
    };
  },

  // ------------------------------------------------------------- pensando
  // Head and the hand on the chin share the torso's transform exactly.
  pensando: ({ t, h, piv }) => {
    const ph = t * 1.3;
    const rise = -c(ph);
    const k = smooth(h);
    const root = T(0, s(ph) * 9 - k * 60);
    const up = rot(s(ph + 0.4) * 0.7 - k * 1.5, piv.torso);
    const kick = rise * 2.5 - k * 8;
    const sway = s(ph + 1) * 1.6;
    return {
      pelvis: root,
      torso: `${root} ${up}`,
      head: `${root} ${up}`,
      'arm-right': `${root} ${up}`,
      'arm-left': `${root} ${up} ${rot(s(ph + 0.6) * 1.2, piv['arm-left'])}`,
      'leg-right': `${root} ${rot(kick, piv['leg-right'])}`,
      'shoe-right': `${root} ${rot(kick, piv['leg-right'])} ${rot(rise * 3 - k * 5, piv['shoe-right'])}`,
      'leg-left': `${root} ${rot(sway, piv['leg-left'])}`,
      'shoe-left': `${root} ${rot(sway, piv['leg-left'])} ${rot(-sway * 0.8, piv['shoe-left'])}`,
    };
  },

  // --------------------------------------------------------------- parado
  // Calm standing pose: breathing, a very slight sway, and a small bounce on `h` (arms stay down).
  // (It used to wave; that read as odd, so the arm now just hangs.)
  parado: ({ t, h, piv }) => {
    const ph = t * 1.6;
    const k = smooth(h);
    const root = T(0, s(ph) * 4 - k * 22);
    const up = rot(s(ph + 0.3) * 0.5, piv.torso);
    // arms just hang, with a barely visible sway (nothing that reads as a wave, not even on the bounce)
    const rUp = `${root} ${up} ${rot(s(ph + 0.5) * 0.8, piv['arm-right-upper'])}`;
    const lUp = `${root} ${up} ${rot(-s(ph + 0.5) * 0.8, piv['arm-left-upper'])}`;
    return {
      pelvis: root,
      torso: `${root} ${up}`,
      head: `${root} ${up} ${rot(s(ph + 1) * 1.1 - k * 1.5, piv.head)}`,
      'arm-right-upper': rUp,
      'arm-right-lower': `${rUp} ${rot(s(ph + 1.2) * 1.1, piv['arm-right-lower'])}`,
      'arm-left-upper': lUp,
      'arm-left-lower': `${lUp} ${rot(s(ph + 1.2) * 1.1, piv['arm-left-lower'])}`,
      'leg-left': `${root} ${rot(s(ph) * 0.4, piv['leg-left'])}`,
      'shoe-left': root,
      'leg-right': `${root} ${rot(-s(ph) * 0.4, piv['leg-right'])}`,
      'shoe-right': root,
    };
  },
};

// hop envelope: 0 -> 1 -> 0 over HOP_MS from `start` (performance.now() style ms)
export const hopEnvelope = (now, start) => {
  const u = start < 0 ? 2 : (now - start) / HOP_MS;
  return u < 1 ? s(PI * u) : 0;
};
