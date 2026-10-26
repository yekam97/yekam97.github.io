'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './ScrollPath.module.css';

// A continuous "thread" that runs down the whole page and draws itself as
// you scroll — the reference site's route-through-the-sections effect.
//
// It hugs the left/right margin inside each section, then sweeps across
// the empty gap between sections to the opposite margin, and finally lands
// on the Contact button. A guide dot marks the drawing head, which always
// sits ~60% down the viewport.
//
// The geometry is measured from the DOM (so it follows layout changes such
// as the experience accordion) and rebuilt on resize. Decorative only.

const LANE = 22;          // distance of the thread from the page edge
const WIGGLE = 7;         // sideways wobble while running along a lane
const STEP = 150;         // length of each wobble segment
const SAMPLES = 900;      // path samples used to map scroll -> drawn length
const HEAD_AT = 0.6;      // viewport fraction where the drawing head sits

// Which direct children of <main> share one lane (hero+rail, skills, ...)
const GROUPS = [[0, 1], [2], [3], [4], [5, 6], [7]];

const num = (v) => parseFloat(v) || 0;

function measure(main) {
  const kids = [...main.children].filter((el) => el.dataset.pathIgnore !== 'true');
  const groups = kids.length === 8 ? GROUPS : kids.map((_, i) => [i]);
  const base = main.getBoundingClientRect().top + window.scrollY;

  return groups.map((ids, gi) => {
    const first = kids[ids[0]];
    const last = kids[ids[ids.length - 1]];
    const fr = first.getBoundingClientRect();
    const lr = last.getBoundingClientRect();
    const fs = getComputedStyle(first);
    const ls = getComputedStyle(last);
    return {
      lane: gi % 2 === 0 ? 'right' : 'left',
      top: fr.top + window.scrollY - base + num(fs.paddingTop),
      bottom: lr.bottom + window.scrollY - base - num(ls.paddingBottom)
    };
  });
}

function buildPath(main, W) {
  const blocks = measure(main);
  if (!blocks.length || W < 10) return null;
  const x = (lane) => (lane === 'left' ? LANE : W - LANE);
  const base = main.getBoundingClientRect().top + window.scrollY;

  // Where the thread finishes: the left edge of the Contact button, approached horizontally
  const endEl = main.querySelector('[data-path-end]');
  let target = null;
  if (endEl) {
    const er = endEl.getBoundingClientRect();
    target = { x: er.left - 14, y: er.top + er.height / 2 + window.scrollY - base };
  }

  let d = '';
  blocks.forEach((b, i) => {
    const lx = x(b.lane);
    const isLast = i === blocks.length - 1;
    const y0 = i === 0 ? b.top + 20 : b.top;
    // the last lane stops early so the final curve (below) only ever heads downward
    const yEnd = isLast && target ? Math.max(y0 + 40, target.y - 420) : b.bottom;
    // run down the lane with a gentle wobble
    if (i === 0) d += `M ${lx} ${y0}`;
    let flip = 1;
    for (let y = y0; y < yEnd; y += STEP) {
      const y2 = Math.min(y + STEP, yEnd);
      const len = y2 - y;
      d += ` C ${lx + WIGGLE * flip} ${y + len / 3}, ${lx - WIGGLE * flip} ${y + (2 * len) / 3}, ${lx} ${y2}`;
      flip = -flip;
    }
    // sweep across the gap to the next block's lane (vertical tangents at both ends)
    const next = blocks[i + 1];
    if (next) {
      const nx = x(next.lane);
      const dy = Math.max(next.top - b.bottom, 80);
      d += ` C ${lx} ${b.bottom + dy * 0.55}, ${nx} ${next.top - dy * 0.55}, ${nx} ${next.top}`;
    } else if (target) {
      d += ` C ${lx} ${target.y}, ${target.x - 260} ${target.y}, ${target.x} ${target.y}`;
    }
  });

  return { d, height: main.scrollHeight, base };
}

export default function ScrollPath({ mainRef }) {
  const reduce = useReducedMotion();
  const svgRef = useRef(null);
  const drawRef = useRef(null);
  const trackRef = useRef(null);
  const headRef = useRef(null);
  const [geo, setGeo] = useState(null);
  const samples = useRef({ ys: [], xs: [], ls: [], total: 0, base: 0 });

  // Measure + rebuild whenever the layout changes
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return undefined;
    let raf = 0;
    const rebuild = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.innerWidth <= 768) {
          setGeo(null);
          return;
        }
        const g = buildPath(main, main.clientWidth);
        if (g) setGeo({ ...g, w: main.clientWidth });
      });
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(main);
    window.addEventListener('resize', rebuild);
    window.addEventListener('load', rebuild);
    const late = setTimeout(rebuild, 1200); // fonts / images settling
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
      ro.disconnect();
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('load', rebuild);
    };
  }, [mainRef]);

  // Sample the path once per geometry so scroll -> length is a cheap lookup
  useEffect(() => {
    const path = trackRef.current;
    if (!geo || !path) return undefined;
    const total = path.getTotalLength();
    const ys = new Float32Array(SAMPLES + 1);
    const xs = new Float32Array(SAMPLES + 1);
    const ls = new Float32Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) {
      const len = (i / SAMPLES) * total;
      const p = path.getPointAtLength(len);
      ys[i] = p.y;
      xs[i] = p.x;
      ls[i] = len;
    }
    samples.current = { ys, xs, ls, total, base: geo.base };
    const draw = drawRef.current;
    if (draw) {
      draw.style.strokeDasharray = `${total}`;
      draw.style.strokeDashoffset = `${total}`;
    }

    const update = () => {
      const { ys: Y, xs: X, ls: L, total: tot, base } = samples.current;
      if (!Y.length) return;
      const targetY = window.scrollY + window.innerHeight * HEAD_AT - base;
      // y is monotonic along the path -> binary search
      let lo = 0;
      let hi = Y.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (Y[mid] < targetY) lo = mid + 1;
        else hi = mid;
      }
      const i = Math.min(lo, Y.length - 1);
      const len = targetY <= Y[0] ? 0 : L[i];
      if (reduce) {
        draw.style.strokeDashoffset = '0';
        headRef.current?.setAttribute('visibility', 'hidden');
        return;
      }
      draw.style.strokeDashoffset = `${tot - len}`;
      const head = headRef.current;
      if (head) {
        head.setAttribute('transform', `translate(${X[i]} ${Y[i]})`);
        head.setAttribute('visibility', len > 0 && len < tot - 1 ? 'visible' : 'hidden');
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [geo, reduce]);

  if (!geo) return <span data-path-ignore="true" hidden />;

  return (
    <svg
      ref={svgRef}
      data-path-ignore="true"
      className={styles.path}
      width={geo.w}
      height={geo.height}
      viewBox={`0 0 ${geo.w} ${geo.height}`}
      aria-hidden="true"
    >
      <path ref={trackRef} d={geo.d} className={styles.track} />
      <path ref={drawRef} d={geo.d} className={styles.draw} />
      <g ref={headRef} visibility="hidden">
        <circle r="16" className={styles.pulse} />
        <circle r="7.5" className={styles.head} />
      </g>
    </svg>
  );
}
