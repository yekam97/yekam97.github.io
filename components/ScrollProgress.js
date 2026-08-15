'use client';

import { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const position = window.pageYOffset;
      const maxPosition = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = maxPosition > 0 ? (position / maxPosition) * 100 : 0;
      setScroll(scrollPercentage);
      ticking = false;
    };

    // Coalesce scroll events to one state update per animation frame
    // instead of firing on every raw scroll event.
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${scroll}%` }} />
    </div>
  );
}
