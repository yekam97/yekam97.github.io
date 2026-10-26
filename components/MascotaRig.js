'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { PROFILES, hopEnvelope } from '@/lib/mascotaMotion';

// The mascot as a vector rig (see assets/mascota/README.md). Three poses,
// each split into body parts that rotate around their own joints:
//   salto    — mid-air jump
//   pensando — hand on chin, one leg kicked up
//   parado   — standing, front view
//
// - The vector data (~120-150 KB per pose) is only fetched once the mascot
//   is within ~1500px of the viewport, so it never weighs on first load.
// - Idle: a gentle float with limbs/head swaying. `hop` triggers a short
//   reaction (jump / bounce / "idea!"), used by hover on a nearby button.
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
        const h = hopEnvelope(now, hopStart.current);
        const out = profile({ t, h, piv, u });
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
