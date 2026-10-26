'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ToolsRail.module.css';

// Infinite marquee of tools/skills — the reference site's "rail". It
// drifts on its own, speeds up while you scroll (the faster the scroll,
// the faster the rail) and flips direction when you scroll back up.
// Everything it lists already appears in the Skills / Projects sections.

const BASE_SPEED = 55;      // px/s when the page is idle
const SCROLL_GAIN = 0.32;   // extra px/s per px/s of scroll velocity
const MAX_BOOST = 1100;     // cap so a hard flick can't blur the text

const getItems = (isEn) => [
  'Figma',
  'Illustrator',
  'Photoshop',
  'CAD',
  isEn ? '3D Rendering' : 'Renderizado 3D',
  'Branding',
  'HTML',
  'JavaScript',
  'C# / .NET',
  'Vercel',
  'Firestore',
  'Design Thinking',
  'Lean Startup',
  'Scrum / Agile'
];

const Row = ({ items, hidden }) => (
  <ul className={styles.row} aria-hidden={hidden || undefined}>
    {items.map((item, i) => (
      <li key={item} className={`${styles.item} ${i % 2 ? styles.outline : ''}`}>
        <span>{item}</span>
        <span className={styles.sep} aria-hidden="true" />
      </li>
    ))}
  </ul>
);

export default function ToolsRail() {
  const { language } = useLanguage();
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const items = getItems(language === 'en');

  useEffect(() => {
    if (reduce) return undefined;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return undefined;

    let x = 0;
    let dir = -1;          // current direction, eased (-1 = left, 1 = right)
    let dirTarget = -1;
    let vel = 0;           // smoothed scroll velocity, px/s
    let lastY = window.scrollY;
    let last = performance.now();
    let visible = true;
    let raf = 0;

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    const tick = (now) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;

      const y = window.scrollY;
      const instant = dt > 0 ? (y - lastY) / dt : 0;
      lastY = y;
      vel += (instant - vel) * 0.12;

      if (vel > 40) dirTarget = -1;
      else if (vel < -40) dirTarget = 1;
      dir += (dirTarget - dir) * 0.08; // eases through 0 when it reverses

      if (visible) {
        const speed = BASE_SPEED + Math.min(Math.abs(vel) * SCROLL_GAIN, MAX_BOOST);
        const half = track.scrollWidth / 2;
        x += dir * speed * dt;
        if (half > 0) {
          if (x <= -half) x += half;
          else if (x > 0) x -= half;
        }
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduce, language]);

  return (
    <section
      ref={wrapRef}
      className={`${styles.rail} ${reduce ? styles.static : ''}`}
      aria-label={language === 'en' ? 'Tools and methods' : 'Herramientas y métodos'}
    >
      <div ref={trackRef} className={styles.track}>
        <Row items={items} />
        {/* Second copy makes the loop seamless; hidden from screen readers */}
        {!reduce && <Row items={items} hidden />}
      </div>
    </section>
  );
}
