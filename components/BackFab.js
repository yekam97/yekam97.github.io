'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/context/LanguageContext';
import { goBack, sectionFor } from '@/lib/returnPoint';
import styles from './BackFab.module.css';

// Floating "Back" pill on inner pages: appears once the visitor has scrolled
// past the header link, so there is always a way back to where they were.
export default function BackFab() {
  const router = useRouter();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fallback = sectionFor(router.pathname);

  return (
    <a
      href={fallback}
      className={`${styles.fab} ${show ? styles.show : ''}`}
      aria-label={isEs ? 'Volver a donde estabas' : 'Back to where you were'}
      tabIndex={show ? 0 : -1}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        goBack(router, fallback);
      }}
    >
      <span aria-hidden="true">←</span> {isEs ? 'Volver' : 'Back'}
    </a>
  );
}
