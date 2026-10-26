'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { getExperienceData } from '@/lib/experience';
import SubpageHeader from './SubpageHeader';
import SubpageFooter from './SubpageFooter';
import Stage from './Stage';
import styles from './Subpage.module.css';

// /trayectoria — the full professional trajectory (every role, every bullet).
// The home page only shows a 4-line summary with a button that leads here.
export default function TrayectoriaPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const data = getExperienceData(language);

  return (
    <div className={`container ${styles.page}`}>
      <SubpageHeader
        backHref="/#experiencia"
        backLabel={isEs ? 'Volver' : 'Back'}
        label={isEs ? 'Cronología' : 'Timeline'}
        titleStart={isEs ? 'Trayectoria' : 'Professional'}
        titleEnd={isEs ? 'Profesional' : 'Trajectory'}
        lead={
          isEs
            ? `${data.length} roles, del diseño de producto a la gestión de innovación.`
            : `${data.length} roles, from product design to innovation management.`
        }
        stage={
          <Stage
            pose="salto"
            variant="experience"
            height="min(420px, 56vh)"
            chips={[
              { label: isEs ? '3+ años' : '3+ years', color: 'var(--accent-mentoring)', x: 4, y: 16 },
              { label: isEs ? `${data.length} roles` : `${data.length} roles`, color: 'var(--accent-branding)', x: 66, y: 70 }
            ]}
          />
        }
      />

      <ol className={styles.roles}>
        {data.map((exp, i) => (
          <motion.li
            key={`${exp.company}-${exp.period}`}
            className={styles.roleCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.roleMeta}>
              <span className={styles.rolePeriod}>{exp.period}</span>
              <span className={styles.roleCompany}>{exp.company}</span>
            </div>
            <div>
              <h2 className={styles.roleTitle}>{exp.role}</h2>
              <ul className={styles.bullets}>
                {exp.responsibilities.map((r, k) => (
                  <li key={k}>{r}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      <SubpageFooter backHref="/#experiencia" backLabel={isEs ? 'Volver al inicio' : 'Back to home'} />
    </div>
  );
}
