'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// The mascot as a vector rig (see assets/mascota/README.md): 8 body parts,
// each rotating around its own joint. Replaces the old flat sticker image.
//
// - The vector data (~150 KB) is only fetched once the mascot is within
//   ~1500px of the viewport, so it never weighs on the first load.
// - Idle: a gentle float with arms/legs/head swaying. `hop` triggers a
//   short jump (arms up, legs tucked), used by the CTA hover.
// - Reduced motion: renders the still pose, no loop.
// - The white "die-cut sticker" edge is an SVG filter (dilate + white), so
//   it follows every limb as it moves.

const VIEWBOX = '20 20 1157 1210';
const HOP_MS = 800;

const rot = (deg, p) => `rotate(${deg.toFixed(2)} ${p.x} ${p.y})`;

export default function MascotaRig({ hop = false, className }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const groups = useRef({});
  const hopStart = useRef(-1);
  const [rig, setRig] = useState(null);

  // Lazy-load the vector data when the mascot gets close to the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        import('@/assets/mascota/mascota-rig.json').then((m) => {
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
  }, []);

  useEffect(() => {
    if (hop) hopStart.current = performance.now();
  }, [hop]);

  // Animation loop (paused while off-screen).
  useEffect(() => {
    if (!rig || reduce) return undefined;
    const piv = Object.fromEntries(rig.parts.map((p) => [p.id, p.pivot]));
    const g = groups.current;
    const set = (id, v) => g[id] && g[id].setAttribute('transform', v);

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
        const s = Math.sin;
        const w = 2.2;

        // 0 -> 1 -> 0 arc while a hop is playing, otherwise 0
        const u = hopStart.current < 0 ? 2 : (now - hopStart.current) / HOP_MS;
        const h = u < 1 ? s(Math.PI * u) : 0;

        const root = `translate(0 ${(s(t * w) * 26 - h * 150).toFixed(1)})`;
        const up = rot(s(t * w) * 1.8 - h * 5, piv.torso);       // upper body pivots at the waist
        const arm = s(t * w + 0.4) * 6;
        const kick = s(t * w + 2) * 5 + h * -9;
        const sway = s(t * w + 0.8) * 3.5 + h * 6;

        set('torso', `${root} ${up}`);
        set('head', `${root} ${up} ${rot(s(t * w + 1) * 3.5 - h * 6, piv.head)}`);
        set('arm-left', `${root} ${up} ${rot(arm + h * 24, piv['arm-left'])}`);
        set('arm-right', `${root} ${up} ${rot(-arm - h * 24, piv['arm-right'])}`);
        set('leg-right', `${root} ${rot(kick, piv['leg-right'])}`);
        set('shoe-right', `${root} ${rot(kick, piv['leg-right'])} ${rot(s(t * w + 3) * 7 - h * 10, piv['shoe-right'])}`);
        set('leg-left', `${root} ${rot(sway, piv['leg-left'])}`);
        set('shoe-left', `${root} ${rot(sway, piv['leg-left'])} ${rot(s(t * w + 1.6) * 6 + h * 8, piv['shoe-left'])}`);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [rig, reduce]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ aspectRatio: '1157 / 1210' }}
      aria-hidden="true"
    >
      {rig && (
        <svg viewBox={VIEWBOX} width="100%" height="100%" style={{ display: 'block' }} role="presentation">
          <defs>
            <filter
              id="mascota-sticker"
              filterUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1197"
              height="1314"
              colorInterpolationFilters="sRGB"
            >
              <feMorphology in="SourceAlpha" operator="dilate" radius="14" result="grow" />
              <feFlood floodColor="#ffffff" result="white" />
              <feComposite in="white" in2="grow" operator="in" result="edge" />
              <feMerge>
                <feMergeNode in="edge" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#mascota-sticker)">
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
