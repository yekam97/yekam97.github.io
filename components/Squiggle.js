'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Hand-drawn wavy underline that "writes itself" under a word — the
// reference site's purple squiggle under "insights". Wrap the word in an
// element with `position: relative` (the `.squiggle-host` class) and drop
// this inside it.
//
// By default it draws the first time it scrolls into view. Pass `play`
// (boolean) to drive it yourself instead, e.g. to wait for the intro.
// Purely decorative, so if it never plays nothing is lost.
const WAVE =
  'M2 8 C 14 1, 24 1, 36 8 S 58 15, 70 8 S 92 1, 104 8 S 126 15, 138 8 S 160 1, 172 8 S 194 13, 198 8';

export default function Squiggle({
  color = 'var(--accent-software)',
  opacity = 0.5,
  delay = 0,
  duration = 1,
  play
}) {
  const reduce = useReducedMotion();
  const controlled = typeof play === 'boolean';

  const target = { pathLength: 1, opacity };
  const motionProps = reduce
    ? { initial: target }
    : controlled
      ? { initial: { pathLength: 0, opacity: 0 }, animate: play ? target : { pathLength: 0, opacity: 0 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: target,
          viewport: { once: true, amount: 0.9 }
        };

  return (
    <svg
      className="squiggle"
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={WAVE}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
        {...motionProps}
      />
    </svg>
  );
}
