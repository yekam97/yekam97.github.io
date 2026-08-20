'use client';

import { usePageAccent } from '@/context/PageAccentContext';
import styles from './LivingBackground.module.css';

/**
 * A page-wide "watercolor wash" behind everything. Its color follows
 * whichever project is active in the Portfolio carousel (see
 * PageAccentContext) — picking a new project doesn't cut the old color
 * away, it lets each blurred stain drift to the new hue on its own
 * slightly-offset timer, so for a couple of seconds the old and new
 * colors genuinely overlap and blend (via mix-blend-mode: multiply)
 * before settling, like pigment diffusing across wet paper.
 */
const LivingBackground = () => {
  const { accent } = usePageAccent();
  const color = `var(--accent-${accent})`;

  return (
    <div className={styles.wash} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobA}`} style={{ background: color }} />
      <div className={`${styles.blob} ${styles.blobB}`} style={{ background: color }} />
      <div className={`${styles.blob} ${styles.blobC}`} style={{ background: color }} />
      <div className={`${styles.blob} ${styles.blobD}`} style={{ background: color }} />
    </div>
  );
};

export default LivingBackground;
