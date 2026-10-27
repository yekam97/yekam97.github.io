'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { getProjects } from '@/lib/projects';
import Squiggle from './Squiggle';
import { Sparkle, Plus, Ring, Wave } from './Shapes';
import styles from './Portfolio.module.css';

// Projects as a field of floating images: each one drifts gently at its own
// pace, tilts slightly, and straightens up on hover. Just a category and a
// short title under each; clicking opens that project's own page.
//
// Layout classes (.p0 … .p4) place the cards on a 12-column grid with
// deliberate vertical offsets so it reads as scattered, not as a table.

const TILT = [-2.2, 1.8, -1.2, 2.4, -1.8];

export default function Portfolio() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
  const projects = getProjects(language);

  return (
    <section id="portfolio" className={styles.section}>
      <div className="container">
        <h2 className="newsreader" style={{ fontSize: '3.5rem' }}>
          <span className="squiggle-host">
            {t('proyectos')}
            <Squiggle />
          </span>
        </h2>
        <p className="description" style={{ marginTop: '0.75rem' }}>{t('descripcion_proyectos')}</p>

        <div className={styles.field}>
          {/* decorative floaters behind the cards */}
          <span className={`${styles.deco} ${styles.decoA}`}><Sparkle color="var(--sun)" /></span>
          <span className={`${styles.deco} ${styles.decoB}`}><Plus color="var(--primary)" /></span>
          <span className={`${styles.deco} ${styles.decoC}`}><Ring color="var(--accent-uxui)" /></span>
          <span className={`${styles.deco} ${styles.decoD}`}><Wave color="var(--accent-mentoring)" /></span>

          {projects.map((project, i) => {
            const accent = `var(--accent-${project.accent})`;
            return (
              <motion.div
                key={project.slug}
                className={`${styles.item} ${styles[`p${i}`]}`}
                initial={{ y: 50, scale: 0.94 }}
                whileInView={{ y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 110, damping: 16, delay: (i % 3) * 0.08 }}
              >
                {/* outer: endless drift; inner link: hover state (kept separate so the transforms don't fight) */}
                <div
                  className={styles.float}
                  style={{ '--dur': `${6 + (i % 3) * 1.4}s`, '--delay': `${i * -1.3}s`, '--rot': `${TILT[i % TILT.length]}deg` }}
                >
                  <Link href={`/proyectos/${project.slug}/`} className={styles.card} style={{ '--accent': accent }}>
                    <span className={styles.imgWrap}>
                      <img src={project.image} alt={project.title} loading="lazy" />
                      <span className={styles.num} style={{ background: accent }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.go} aria-hidden="true">→</span>
                    </span>
                    <span className={styles.cap}>
                      <span className={styles.cat} style={{ color: accent }}>{project.category.split(' / ')[0]}</span>
                      <span className={styles.title}>{project.title}</span>
                      <span className={styles.more}>{isEs ? 'Ver proyecto' : 'View project'} →</span>
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
