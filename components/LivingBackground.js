'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePageAccent } from '@/context/PageAccentContext';
import styles from './LivingBackground.module.css';

// Position/shape live in CSS (blobA-D); opacity target + stagger order
// live here so they can differ between desktop and mobile and so
// Framer Motion can animate them.
const DESKTOP_BLOBS = [
  { cls: 'blobA', opacity: 0.92, delay: 0 },
  { cls: 'blobB', opacity: 0.75, delay: 0.5 },
  { cls: 'blobC', opacity: 0.85, delay: 0.9 },
  { cls: 'blobD', opacity: 0.65, delay: 1.3 }
];

// Smaller blobs already shrink the effect on mobile (see the module's
// media query) — opacity can stay closer to the desktop values since
// this blends toward the same pale tint already used elsewhere on the
// page (the carousel band itself), not a separate saturated color.
const MOBILE_BLOBS = [
  { cls: 'blobA', opacity: 0.75, delay: 0 },
  { cls: 'blobB', opacity: 0.6, delay: 0.5 },
  { cls: 'blobC', opacity: 0.68, delay: 0.9 },
  { cls: 'blobD', opacity: 0.5, delay: 1.3 }
];

const blobVariants = {
  hidden: { opacity: 0 },
  visible: ({ opacity, delay }) => ({
    opacity,
    transition: { duration: 2.4, delay, ease: [0.22, 1, 0.36, 1] }
  }),
  exit: { opacity: 0, transition: { duration: 1.6, ease: 'easeInOut' } }
};

let nextLayerId = 1;

/**
 * A page-wide watercolor wash behind everything, following whichever
 * project is active in the Portfolio carousel (PageAccentContext).
 * Each project switch pushes a new color "layer" of 4 blurred stains
 * — the previous layer isn't yanked away, it keeps fading out for a
 * couple of seconds while the new one blooms in stain by stain
 * (staggered, increasing opacity), so the two colors genuinely
 * overlap and mix (mix-blend-mode: multiply) before the new one
 * settles. The blobs use the exact same `-tint` color as the active
 * project's carousel band, so the wash arrives at that same soft hue
 * — not a separate, more saturated color of its own.
 */
const LivingBackground = () => {
  const { accent } = usePageAccent();
  const [layers, setLayers] = useState(() => [{ id: 0, accent }]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    setLayers((prev) => {
      if (prev[prev.length - 1].accent === accent) return prev;
      const next = [...prev, { id: nextLayerId++, accent }];
      // Keep only the current + previous layer so old ones don't pile up.
      return next.slice(-2);
    });
  }, [accent]);

  const blobConfig = isMobile ? MOBILE_BLOBS : DESKTOP_BLOBS;

  return (
    <div className={styles.wash} aria-hidden="true">
      <AnimatePresence>
        {layers.map((layer) => (
          <div key={layer.id} className={styles.layer}>
            {blobConfig.map((blob) => (
              <motion.div
                key={blob.cls}
                className={`${styles.blob} ${styles[blob.cls]}`}
                style={{ background: `var(--accent-${layer.accent}-tint)` }}
                custom={blob}
                variants={blobVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LivingBackground;
