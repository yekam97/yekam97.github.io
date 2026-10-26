'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { isPreloaderDone, finishPreloader } from '@/lib/preloader';
import styles from './Preloader.module.css';

// Intro curtain, ported from the reference site's preloader: the brand
// mark draws itself in (stroke "draw" via pathLength), a dot pops in with
// an elastic bounce, then the whole curtain lifts to reveal the page.
// Timings follow the original timeline (1s draw, elastic pop, ~1.25s
// before the page is considered loaded).

const DRAW = [0.4, 0, 0.2, 1];
const CURTAIN = [0.76, 0, 0.24, 1];

// Beats, in ms from mount.
const LIFT_AT = 2250;        // curtain starts rising
const PAGE_READY_AT = 2600;  // hero entrance may start (curtain mostly gone)
const UNMOUNT_AT = 3300;     // remove the overlay from the DOM
const HARD_LIMIT = 4800;     // fail-safe: never keep the page hidden longer

export default function Preloader() {
  // Decided once, on mount, from the shared store: if the intro isn't
  // going to play (reduced motion / phones) this renders nothing at all.
  const [visible, setVisible] = useState(() => !isPreloaderDone());
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    if (!visible) return undefined;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden'; // no scrolling behind the curtain

    const timers = [
      setTimeout(() => setLifting(true), LIFT_AT),
      setTimeout(finishPreloader, PAGE_READY_AT),
      setTimeout(() => setVisible(false), UNMOUNT_AT),
      setTimeout(() => {
        finishPreloader();
        setVisible(false);
      }, HARD_LIMIT)
    ];

    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = prevOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      className={styles.curtain}
      role="presentation"
      aria-hidden="true"
      initial={false}
      animate={{ y: lifting ? '-115%' : '0%' }}
      transition={{ duration: 0.95, ease: CURTAIN }}
    >
      <motion.div
        className={styles.markWrap}
        initial={{ y: '15%', opacity: 0 }}
        animate={lifting ? { y: '-15%', opacity: 1 } : { y: '0%', opacity: 1 }}
        transition={lifting ? { duration: 0.9, ease: CURTAIN } : { duration: 1, ease: [0.45, 0, 0.55, 1] }}
      >
        <svg className={styles.mark} viewBox="0 0 150 80" fill="none">
          {/* Y */}
          <motion.path
            d="M8 10 L26 38 L44 10 M26 38 L26 68"
            className={styles.stroke}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: DRAW }}
          />
          {/* G */}
          <motion.path
            d="M106.4 21.6 A26 26 0 1 0 113.6 44.5 L92 44.5"
            className={styles.stroke}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease: DRAW }}
          />
          {/* Accent dot — elastic pop, like the original's circle */}
          <motion.circle
            cx="136"
            cy="64"
            r="5.5"
            className={styles.dot}
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 9, mass: 0.8, delay: 1.25 }}
          />
        </svg>
      </motion.div>

      {/* Rounded lip that trails the curtain as it rises */}
      <span className={styles.lip} />
    </motion.div>
  );
}
