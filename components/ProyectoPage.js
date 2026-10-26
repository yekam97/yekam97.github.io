'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { getProjects } from '@/lib/projects';
import PageCta from './PageCta';
import SubpageFooter from './SubpageFooter';
import subpage from './Subpage.module.css';
import styles from './ProyectoPage.module.css';

// /proyectos/<slug> — the full case for one project. The home carousel only
// shows a one-line summary, three figures and a button that leads here.
export default function ProyectoPage({ slug }) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
  const projects = getProjects(language);
  const idx = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const [shot, setShot] = useState(0);
  const accent = `var(--accent-${project.accent})`;
  const count = project.images.length;

  return (
    <div className={`container ${subpage.page}`}>
      <div className={styles.top}>
        <Link href="/#portfolio" className={subpage.back}>
          <span aria-hidden="true">←</span> {isEs ? 'Todos los proyectos' : 'All projects'}
        </Link>
        <span className={styles.category} style={{ color: accent }}>
          <span className={styles.dot} style={{ background: accent }} />
          {project.category}
        </span>
        <h1 className={subpage.title}>{project.title}</h1>
        <p className={styles.year}>{project.year}</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.gallery}>
          <motion.div
            key={shot}
            className={styles.shot}
            initial={{ opacity: 0.4, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <img src={project.images[shot]} alt={project.captions?.[shot] || project.title} />
          </motion.div>
          {project.captions?.[shot] && <p className={styles.caption}>{project.captions[shot]}</p>}
          {count > 1 && (
            <div className={styles.thumbs} role="tablist" aria-label={isEs ? 'Imágenes del proyecto' : 'Project images'}>
              {project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === shot}
                  className={`${styles.thumb} ${i === shot ? styles.thumbActive : ''}`}
                  style={i === shot ? { borderColor: accent } : undefined}
                  onClick={() => setShot(i)}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.description}>{project.description}</p>

          {project.highlights && (
            <ul className={styles.results}>
              {project.highlights.map((h) => (
                <li key={h.label}>
                  <strong style={{ color: accent }}>{h.value}</strong>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          )}

          {project.links && (
            <div className={styles.links}>
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={l.primary ? 'btn-neon' : 'btn-outline'}
                >
                  {l.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {(project.details || project.technologies) && (
        <div className={styles.more}>
          {project.details && (
            <section>
              <h2 className={styles.h2}>{t('detalles')}</h2>
              <ul className={subpage.bullets}>
                {project.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </section>
          )}
          {project.technologies && (
            <section>
              <h2 className={styles.h2}>{t('tecnologias')}</h2>
              <div className={styles.tags}>
                {project.technologies.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <div className={styles.nextRow}>
        <span className={styles.nextLabel}>{isEs ? 'Siguiente proyecto' : 'Next project'}</span>
        <PageCta href={`/proyectos/${next.slug}/`}>{next.title}</PageCta>
      </div>

      <SubpageFooter backHref="/#portfolio" backLabel={isEs ? 'Ver todos los proyectos' : 'See all projects'} />
    </div>
  );
}
