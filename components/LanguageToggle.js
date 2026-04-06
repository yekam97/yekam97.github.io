'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className={styles.toggle} 
      onClick={toggleLanguage}
      aria-label="Toggle language"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={styles.label}>
        {language === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}
