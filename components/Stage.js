'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MascotaRig, { MASCOT_ASPECT } from './MascotaRig';
import PopIn from './PopIn';
import { Blob, SHAPES } from './Shapes';
import styles from './Stage.module.css';

// A large illustrated "stage": organic blobs + floating shapes + sticker
// chips behind a big animated mascot. Everything drifts at its own speed
// as the stage scrolls through the viewport (parallax), and the blob
// breathes/rotates with the scroll — so these spaces feel alive instead
// of being a static picture.

const C = {
  primary: 'var(--primary)',
  purple: 'var(--accent-software)',
  teal: 'var(--accent-uxui)',
  ochre: 'var(--accent-branding)',
  green: 'var(--accent-mentoring)',
  sun: 'var(--sun)',
  coral: 'var(--coral)',
  light: 'rgba(255,255,255,0.85)'
};

// x / y are percentages of the stage box; `depth` is the parallax travel in px
const LAYOUTS = {
  hero: {
    tint: ['var(--accent-industrial-tint)', 'var(--accent-software-tint)'],
    shapes: [
      { t: 'sparkle', x: 80, y: 8, s: 56, c: C.sun, d: -40 },
      { t: 'ring', x: 6, y: 30, s: 44, c: C.teal, d: 30 },
      { t: 'plus', x: 12, y: 72, s: 40, c: C.primary, d: -26 },
      { t: 'bolt', x: 84, y: 56, s: 78, c: C.purple, d: 36, r: -8 },
      { t: 'dots', x: 70, y: 86, s: 52, c: C.ochre, d: 20 },
      { t: 'triangle', x: 22, y: 8, s: 34, c: C.coral, d: -34, r: 12 }
    ]
  },
  skills: {
    tint: ['var(--accent-uxui-tint)', 'var(--accent-industrial-tint)'],
    shapes: [
      { t: 'wave', x: 6, y: 18, s: 86, c: C.primary, d: -30 },
      { t: 'sparkle', x: 84, y: 14, s: 50, c: C.sun, d: 36 },
      { t: 'ring', x: 90, y: 62, s: 40, c: C.purple, d: -28 },
      { t: 'plus', x: 8, y: 78, s: 36, c: C.teal, d: 24 },
      { t: 'moon', x: 74, y: 88, s: 46, c: C.coral, d: -20, r: 20 }
    ]
  },
  experience: {
    tint: ['var(--accent-mentoring-tint)', 'var(--accent-branding-tint)'],
    shapes: [
      { t: 'bolt', x: 4, y: 50, s: 70, c: C.sun, d: -34, r: 10 },
      { t: 'sparkle', x: 82, y: 12, s: 52, c: C.primary, d: 32 },
      { t: 'ring', x: 88, y: 66, s: 42, c: C.green, d: -24 },
      { t: 'dots', x: 12, y: 80, s: 46, c: C.purple, d: 22 },
      { t: 'triangle', x: 70, y: 90, s: 32, c: C.teal, d: -28, r: -10 }
    ]
  },
  contact: {
    dark: true,
    tint: ['rgba(0,0,0,0.14)', 'rgba(204,2,0,0.6)'],
    shapes: [
      { t: 'sparkle', x: 82, y: 10, s: 54, c: C.sun, d: -38 },
      { t: 'ring', x: 8, y: 34, s: 42, c: C.light, d: 28 },
      { t: 'plus', x: 14, y: 76, s: 38, c: 'var(--bg)', d: -24 },
      { t: 'bolt', x: 86, y: 58, s: 74, c: 'var(--red)', d: 32, r: -8 },
      { t: 'dots', x: 66, y: 90, s: 48, c: C.light, d: 18 }
    ]
  }
};

const Shape = ({ cfg, progress, reduce }) => {
  const Cmp = SHAPES[cfg.t];
  const y = useTransform(progress, [0, 1], [cfg.d, -cfg.d]);
  return (
    <motion.div
      className={styles.shape}
      style={{ left: `${cfg.x}%`, top: `${cfg.y}%`, width: cfg.s, height: cfg.s, y: reduce ? 0 : y, rotate: cfg.r || 0 }}
    >
      <Cmp color={cfg.c} className={styles.shapeSvg} style={{ animationDelay: `${(cfg.x % 7) * -0.6}s` }} />
    </motion.div>
  );
};

/**
 * @param pose     'salto' | 'pensando' | 'parado'
 * @param variant  key of LAYOUTS (colours + shapes)
 * @param chips    [{ label, color, x, y }] sticker labels floating around the mascot
 * @param flip     mirror the mascot horizontally
 * @param hop      trigger the mascot's reaction (e.g. while a nearby button is hovered)
 */
export default function Stage({ pose = 'parado', variant = 'hero', chips = [], flip = false, hop = false, className, height }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const cfg = LAYOUTS[variant];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.78, 1.06, 0.9]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const blob2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.8, 1.05]);
  const mascotY = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <div
      ref={ref}
      className={`${styles.stage} ${cfg.dark ? styles.dark : ''} ${className || ''}`}
      data-pose={pose}
      style={height ? { '--stage-h': height } : undefined}
    >
      <motion.div className={styles.blob} style={{ scale: reduce ? 1 : blobScale, rotate: reduce ? 0 : blobRotate }}>
        <Blob seed={variant.length + 3} color={cfg.tint[0]} className={styles.blobSvg} />
      </motion.div>
      <motion.div className={`${styles.blob} ${styles.blob2}`} style={{ scale: reduce ? 1 : blob2Scale }}>
        <Blob seed={variant.length + 11} color={cfg.tint[1]} opacity={0.55} className={styles.blobSvg} />
      </motion.div>

      {cfg.shapes.map((sh, i) => (
        <Shape key={i} cfg={sh} progress={scrollYProgress} reduce={reduce} />
      ))}

      <motion.div className={styles.mascotBox} style={{ y: reduce ? 0 : mascotY }}>
        <PopIn className={styles.popin} delay={0.15} amount={0.15}>
          <MascotaRig pose={pose} flip={flip} hop={hop} className={styles.mascot} style={{ '--aspect': MASCOT_ASPECT[pose] }} />
        </PopIn>
      </motion.div>

      {chips.map((chip, i) => (
        <motion.span
          key={chip.label}
          className={styles.chip}
          style={{ left: `${chip.x}%`, top: `${chip.y}%`, '--chip': chip.color }}
          initial={reduce ? false : { opacity: 0, scale: 0.4, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.5 + i * 0.12 }}
        >
          <span className={styles.chipFloat} style={{ animationDelay: `${i * -1.1}s` }}>
            {chip.label}
          </span>
        </motion.span>
      ))}
    </div>
  );
}
