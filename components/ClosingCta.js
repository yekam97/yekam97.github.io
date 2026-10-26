'use client';

import { useLanguage } from '@/context/LanguageContext';
import SectionCta from './SectionCta';
import styles from './ClosingCta.module.css';

// Last nudge before the Contact section: one short line, one button.
export default function ClosingCta() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  return (
    <div className={`container ${styles.row}`}>
      <p className={styles.text}>
        {isEs ? '¿Hablamos de tu proyecto?' : 'Shall we talk about your project?'}
      </p>
      <SectionCta to="contacto">{isEs ? 'Contactar' : 'Get in touch'}</SectionCta>
    </div>
  );
}
