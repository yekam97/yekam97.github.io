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
  // Galería: el video del proyecto (si tiene) va primero, luego las imágenes
  const media = [
    ...(project.video ? [{ type: 'video', ...project.video }] : []),
    ...project.images.map((src, i) => ({ type: 'image', src, caption: project.captions?.[i] })),
  ];
  const item = media[Math.min(shot, media.length - 1)];
  const count = media.length;

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
            {item.type === 'video' ? (
              <video src={item.src} poster={item.poster} controls playsInline preload="metadata" aria-label={item.caption || project.title} />
            ) : (
              <img src={item.src} alt={item.caption || project.title} />
            )}
          </motion.div>
          {item.caption && <p className={styles.caption}>{item.caption}</p>}
          {count > 1 && (
            <div className={styles.thumbs} role="tablist" aria-label={isEs ? 'Imágenes y video del proyecto' : 'Project images and video'}>
              {media.map((m, i) => (
                <button
                  key={m.src}
                  type="button"
                  role="tab"
                  aria-selected={i === shot}
                  aria-label={m.type === 'video' ? (isEs ? 'Ver el video' : 'Watch the video') : undefined}
                  className={`${styles.thumb} ${i === shot ? styles.thumbActive : ''}`}
                  style={i === shot ? { borderColor: accent } : undefined}
                  onClick={() => setShot(i)}
                >
                  <img src={m.type === 'video' ? m.poster : m.src} alt="" loading="lazy" />
                  {m.type === 'video' && <span className={styles.play} aria-hidden="true">▶</span>}
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
