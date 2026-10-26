'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// The mascot as a vector rig (see assets/mascota/README.md). Three poses,
// each split into body parts that rotate around their own joints:
//   salto    — mid-air jump
//   pensando — hand on chin, one leg kicked up
//   parado   — standing, front view (waves hello)
//
// - The vector data (~120-150 KB per pose) is only fetched once the mascot
//   is within ~1500px of the viewport, so it never weighs on first load.
// - Idle: a gentle float with limbs/head swaying. `hop` triggers a short
//   reaction (jump / wave / "idea!"), used by hover on a nearby button.
// - Reduced motion: renders the still pose, no loop.
// - The white "die-cut sticker" edge is an SVG filter (dilate + white), so
//   it follows every limb as it moves.

const LOADERS = {
  salto: () => import('@/assets/mascota/salto/mascota-rig.json'),
  pensando: () => import('@/assets/mascota/pensando/mascota-rig.json'),
  parado: () => import('@/assets/mascota/parado/mascota-rig.json'),
};

// Framing of each pose [x, y, w, h] in the rig's own coordinates. `parado`
// is framed wider than the figure so its raised waving arm stays inside.
const CROPS = {
  salto: [20, 20, 1157, 1210],
  pensando: [250, 26, 741, 1125],
  parado: [300, 28, 710, 1194],
};
export const MASCOT_ASPECT = {
  salto: CROPS.salto[2] / CROPS.salto[3],
  pensando: CROPS.pensando[2] / CROPS.pensando[3],
  parado: CROPS.parado[2] / CROPS.parado[3],
};

const HOP_MS = 800;
const rot = (deg, p) => `rotate(${deg.toFixed(2)} ${p.x} ${p.y})`;
const T = (x, y) => `translate(${x.toFixed(1)} ${y.toFixed(1)})`;
const s = Math.sin;
const PI = Math.PI;

// ----------------------------------------------------------------- motion
// Each profile returns { partId: transformString }. Parts are siblings, so
// a "child" part (shoe, forearm…) composes its parent's transform first.
const PROFILES = {
  salto: ({ t, h, piv }) => {
    const w = 2.2;
    const root = T(0, s(t * w) * 26 - h * 150);
    const up = rot(s(t * w) * 1.8 - h * 5, piv.torso);
    const arm = s(t * w + 0.4) * 6;
    const kick = s(t * w + 2) * 5 - h * 9;
    const sway = s(t * w + 0.8) * 3.5 + h * 6;
    return {
      torso: `${root} ${up}`,
      head: `${root} ${up} ${rot(s(t * w + 1) * 3.5 - h * 6, piv.head)}`,
      'arm-left': `${root} ${up} ${rot(arm + h * 24, piv['arm-left'])}`,
      'arm-right': `${root} ${up} ${rot(-arm - h * 24, piv['arm-right'])}`,
      'leg-right': `${root} ${rot(kick, piv['leg-right'])}`,
      'shoe-right': `${root} ${rot(kick, piv['leg-right'])} ${rot(s(t * w + 3) * 7 - h * 10, piv['shoe-right'])}`,
      'leg-left': `${root} ${rot(sway, piv['leg-left'])}`,
      'shoe-left': `${root} ${rot(sway, piv['leg-left'])} ${rot(s(t * w + 1.6) * 6 + h * 8, piv['shoe-left'])}`,
    };
  },

  pensando: ({ t, h, piv }) => {
    const w = 1.5;
    const root = T(0, s(t * w) * 13 - h * 70);
    const up = rot(s(t * w) * 1.1 - h * 2, piv.torso);
    const kick = s(t * w + 2) * 4 - h * 9;
    const sway = s(t * w + 0.8) * 2.4;
    return {
      pelvis: root,
      torso: `${root} ${up}`,
      head: `${root} ${up} ${rot(s(t * w * 0.8 + 1) * 3.2 - h * 6, piv.head)}`,
      'arm-right': `${root} ${up} ${rot(s(t * w * 1.3 + 1) * 2.2 - h * 12, piv['arm-right'])}`,
      'arm-left': `${root} ${up} ${rot(s(t * w + 0.5) * 2, piv['arm-left'])}`,
      'leg-right': `${root} ${rot(kick, piv['leg-right'])}`,
      'shoe-right': `${root} ${rot(kick, piv['leg-right'])} ${rot(s(t * w + 3) * 6 - h * 8, piv['shoe-right'])}`,
      'leg-left': `${root} ${rot(sway, piv['leg-left'])}`,
      'shoe-left': `${root} ${rot(sway, piv['leg-left'])} ${rot(s(t * w + 1.6) * 4, piv['shoe-left'])}`,
    };
  },

  parado: ({ t, h, piv, wave }) => {
    const w = 1.8;
    const k = Math.max(h, wave);                     // 0..1: how much he is waving
    const root = T(0, s(t * w) * 5 - h * 36);
    const up = rot(s(t * w) * 0.7, piv.torso);
    // the viewer-right arm rises (upper arm about the shoulder) and the forearm flaps about the elbow
    const rUp = `${root} ${up} ${rot(-70 * k + s(t * w + 0.5) * 1.6, piv['arm-right-upper'])}`;
    const lUp = `${root} ${up} ${rot(s(t * w + 0.5) * -1.6 + h * 8, piv['arm-left-upper'])}`;
    return {
      pelvis: root,
      torso: `${root} ${up}`,
      head: `${root} ${up} ${rot(s(t * w + 1) * 1.8 - k * 4, piv.head)}`,
      'arm-right-upper': rUp,
      'arm-right-lower': `${rUp} ${rot(s(t * 9) * 20 * k - 4 * k, piv['arm-right-lower'])}`,
      'arm-left-upper': lUp,
      'arm-left-lower': `${lUp} ${rot(s(t * w + 1.2) * 1.5, piv['arm-left-lower'])}`,
      'leg-left': `${root} ${rot(s(t * w) * 0.8, piv['leg-left'])}`,
      'shoe-left': root,
      'leg-right': `${root} ${rot(-s(t * w) * 0.8, piv['leg-right'])}`,
      'shoe-right': root,
    };
  },
};

// A greeting wave every ~8 seconds (0 -> 1 -> 0 over 2s) for the standing pose
const autoWave = (t) => {
  const ph = t % 8;
  return ph > 5.6 && ph < 7.6 ? s((PI * (ph - 5.6)) / 2) : 0;
};

export default function MascotaRig({ pose = 'salto', hop = false, flip = false, outline = true, className, style }) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const wrapRef = useRef(null);
  const groups = useRef({});
  const hopStart = useRef(-1);
  const [rig, setRig] = useState(null);
  const crop = CROPS[pose];

  // Lazy-load the vector data when the mascot gets close to the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        LOADERS[pose]().then((m) => {
          if (!cancelled) setRig(m.default || m);
        });
      },
      { rootMargin: '1500px' }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [pose]);

  useEffect(() => {
    if (hop) hopStart.current = performance.now();
  }, [hop]);

  // Animation loop (paused while off-screen).
  useEffect(() => {
    if (!rig || reduce) return undefined;
    const piv = Object.fromEntries(rig.parts.map((p) => [p.id, p.pivot]));
    const g = groups.current;
    const profile = PROFILES[pose];
    const u = crop[3] / 1210; // normalises float/hop distances to the pose's size

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(wrapRef.current);

    const t0 = performance.now();
    let raf = 0;
    const frame = (now) => {
      if (visible) {
        const t = (now - t0) / 1000;
        const hu = hopStart.current < 0 ? 2 : (now - hopStart.current) / HOP_MS; // >1 = finished
        const h = hu < 1 ? s(PI * hu) : 0;
        const out = profile({ t, h, piv, wave: pose === 'parado' ? autoWave(t) : 0, u });
        for (const id in out) {
          if (g[id]) g[id].setAttribute('transform', out[id]);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [rig, reduce, pose, crop]);

  const [cx, cy, cw, ch] = crop;
  const fid = `sticker-${uid}`;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ aspectRatio: `${cw} / ${ch}`, transform: flip ? 'scaleX(-1)' : undefined, ...style }}
      aria-hidden="true"
    >
      {rig && (
        <svg
          viewBox={`${cx} ${cy} ${cw} ${ch}`}
          width="100%"
          height="100%"
          style={{ display: 'block', overflow: 'visible' }}
          role="presentation"
        >
          {outline && (
            <defs>
              <filter
                id={fid}
                filterUnits="userSpaceOnUse"
                x={cx - cw * 0.5}
                y={cy - ch * 0.15}
                width={cw * 2}
                height={ch * 1.3}
                colorInterpolationFilters="sRGB"
              >
                <feMorphology in="SourceAlpha" operator="dilate" radius={Math.round(ch * 0.0115)} result="grow" />
                <feFlood floodColor="#ffffff" result="white" />
                <feComposite in="white" in2="grow" operator="in" result="edge" />
                <feMerge>
                  <feMergeNode in="edge" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          )}
          <g filter={outline ? `url(#${fid})` : undefined}>
            {rig.parts.map((part) => (
              <g key={part.id} data-part={part.id} ref={(el) => { groups.current[part.id] = el; }}>
                {part.paths.map((p, i) => (
                  <path key={i} d={p.d} fill={p.fill} transform={`translate(${p.x} ${p.y})`} />
                ))}
              </g>
            ))}
          </g>
        </svg>
      )}
    </div>
  );
}
