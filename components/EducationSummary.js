'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { getRolesData, certifications } from '@/lib/education';
import PageCta from './PageCta';
import Squiggle from './Squiggle';
import styles from './EducationSummary.module.css';

// Home page "Estudios": three one-line degrees and a count of certifications,
// with a button to /estudios for the full detail (diplomas, every certificate).
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } })
};

export default function EducationSummary() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const roles = getRolesData(language);

  // First sentence of each description = the institution
  const institution = (text) => {
    const cut = text.indexOf('. ');
    return cut === -1 ? text : text.slice(0, cut + 1);
  };

  return (
    <section id="roles" className={`container section-padding ${styles.section}`}>
      <div className={styles.head}>
        <span className="label-md">{isEs ? 'Formación' : 'Education'}</span>
        <h2 className="newsreader" style={{ fontSize: '3rem' }}>
          {isEs ? 'Mis ' : 'My '}
          <span className="squiggle-host">
            {isEs ? 'estudios' : 'education'}
            <Squiggle />
          </span>
        </h2>
      </div>

      <ul className={styles.list}>
        {roles.map((role, i) => (
          <motion.li
            key={role.title}
            className={styles.row}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className={styles.category}>{role.category}</span>
            <span className={styles.title}>{role.title}</span>
            <span className={styles.institution}>{institution(role.description)}</span>
          </motion.li>
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.count}>
          <strong>{certifications.length}</strong>{' '}
          {isEs ? 'certificaciones y diplomados' : 'certifications and diplomas'}
        </p>
        <PageCta href="/estudios/">{isEs ? 'Ver estudios y certificaciones' : 'See education and certifications'}</PageCta>
      </div>
    </section>
  );
}
