'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const nextLabel = language === 'es' ? 'EN' : 'ES';

  return (
    <button
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={styles.flipWindow}>
        {/* Keying by the label forces a fresh DOM node each time it
            changes, which restarts the CSS flip-in animation below —
            no imperative animation/promise chain to keep in sync with
            React state, so it can't drift out of sync with `language`. */}
        <span key={nextLabel} className={styles.label}>
          {nextLabel}
        </span>
      </span>
    </button>
  );
}
