'use client';

import { useLanguage } from '@/context/LanguageContext';
import SubpageHeader from './SubpageHeader';
import SubpageFooter from './SubpageFooter';
import Stage from './Stage';
import Roles from './Roles';
import Certifications from './Certifications';
import styles from './Subpage.module.css';

// /estudios — degrees (with diplomas) and all the certifications, in full.
export default function EstudiosPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className={`container ${styles.page}`}>
      <SubpageHeader
        backHref="/#roles"
        backLabel={isEs ? 'Volver' : 'Back'}
        label={isEs ? 'Formación' : 'Education'}
        titleStart={isEs ? 'Estudios y' : 'Education &'}
        titleEnd={isEs ? 'certificaciones' : 'certifications'}
        lead={isEs ? 'Pregrado, especialización, maestría y formación continua.' : 'Undergraduate, specialization, master’s and continuing education.'}
        stage={
          <Stage
            pose="pensando"
            variant="skills"
            flip
            height="min(420px, 56vh)"
            chips={[
              { label: isEs ? 'Pregrado' : 'Bachelor', color: 'var(--accent-industrial)', x: 4, y: 22 },
              { label: isEs ? 'Maestría' : 'Master’s', color: 'var(--accent-software)', x: 68, y: 74 }
            ]}
          />
        }
      />

      <div className={styles.twoCols}>
        <Roles full />
        <Certifications full />
      </div>

      <SubpageFooter backHref="/#roles" backLabel={isEs ? 'Volver al inicio' : 'Back to home'} />
    </div>
  );
}
