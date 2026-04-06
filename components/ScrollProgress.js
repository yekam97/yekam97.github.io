import { useState, useEffect } from 'react';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const maxPosition = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (position / maxPosition) * 100;
    setScroll(scrollPercentage);
  };

  useEffect(() => {
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
