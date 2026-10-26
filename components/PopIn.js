'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Elastic "pop" reveal for illustrations — ported from the reference
// site's Rive wrapper: it enters from scale 0.75 / 100px below with an
// elastic overshoot while sliding in sideways, and its opacity snaps on
// almost immediately (0.15s) so it never sits half-faded.
const spring = (delay) => ({
  type: 'spring',
  stiffness: 150,
  damping: 8,
  mass: 1,
  delay
});

export default function PopIn({ children, delay = 0, fromX = '0%', className, style, amount = 0.3 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { scale: 0.75, y: 100, x: fromX, opacity: 0 }}
      whileInView={{ scale: 1, y: 0, x: '0%', opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        scale: spring(delay),
        y: spring(delay),
        x: { duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] },
        opacity: { duration: 0.15, delay }
      }}
    >
      {children}
    </motion.div>
  );
}
