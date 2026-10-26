'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Squiggle from './Squiggle';
import SectionCta from './SectionCta';
import styles from './Portfolio.module.css';

import { getProjects } from '@/lib/projects';

// First sentence of the (untouched) description — used as the 1-2 line
// context under the headline, without introducing new copy.
const firstSentence = (text) => {
    const idx = text.indexOf('. ');
    return idx === -1 ? text : text.slice(0, idx + 1);
};

const ArrowIcon = ({ direction }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? <path d="M15 5 L8 12 L15 19" /> : <path d="M9 5 L16 12 L9 19" />}
    </svg>
);

const slideVariants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40 })
};

const Slide = ({ project, language }) => (
    <div className={`container ${styles.storyGrid}`}>
        <div className={`image-reveal ${styles.storyImage}`}>
            <img src={project.image} alt={project.title} />
        </div>

        <div className={styles.storyContent}>
            <span className={styles.storyCategory} style={{ color: `var(--accent-${project.accent})` }}>
                <span className={styles.dot} style={{ background: `var(--accent-${project.accent})` }} />
                {project.category}
            </span>

            <h3 className={styles.storyTitle}>{project.title}</h3>

            <p className={styles.storyContext}>{firstSentence(project.description)}</p>

            {project.highlights && (
                <ul className={styles.storyStats}>
                    {project.highlights.map((h) => (
                        <li key={h.label}>
                            <strong style={{ color: `var(--accent-${project.accent})` }}>{h.value}</strong>
                            <span>{h.label}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.storyFooter}>
                <span className={styles.storyYear}>{project.year}</span>
                <Link
                    href={`/proyectos/${project.slug}/`}
                    className={styles.storyCta}
                    style={{ color: `var(--accent-${project.accent})` }}
                >
                    {language === 'es' ? 'Ver más información' : 'More information'} →
                </Link>
            </div>
        </div>
    </div>
);

const Portfolio = () => {
    const { language } = useLanguage();
    const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
    const projects = getProjects(language);

    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const activeProject = projects[active];

    // Preload every project image up front (audit finding 1.2): the
    // carousel's <img> only started fetching its src the moment a
    // slide mounted, so navigating to a project whose image hadn't
    // been requested yet raced the 0.45s slide transition — the first
    // visit showed a blank rectangle, and only a second visit (now
    // served from cache) painted correctly. There are only a handful
    // of images, so preloading all of them (not just the adjacent ones)
    // is simpler and just as cheap.
    useEffect(() => {
        projects.forEach((p) => {
            const img = new Image();
            img.src = p.image;
        });
        // projects is re-derived every render (language toggle), but
        // the image URLs themselves never change with language — only
        // need this once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const goTo = (idx) => {
        setDirection(idx > active ? 1 : -1);
        setActive(idx);
    };
    const goNext = () => goTo((active + 1) % projects.length);
    const goPrev = () => goTo((active - 1 + projects.length) % projects.length);

    return (
        <section id="portfolio">
            <div className="container" style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 className="newsreader" style={{ fontSize: '3.5rem' }}>
                    <span className="squiggle-host">
                        {t('proyectos')}
                        <Squiggle />
                    </span>
                </h2>
                <p className="description" style={{ marginTop: '0.5rem' }}>{t('descripcion_proyectos')}</p>
            </div>

            <div
                className={styles.carouselBand}
                style={{ backgroundColor: `var(--accent-${activeProject.accent}-tint)` }}
            >
                <div className={styles.carouselViewport}>
                    <button
                        className={`${styles.navArrow} ${styles.navArrowPrev}`}
                        onClick={goPrev}
                        aria-label={language === 'es' ? 'Proyecto anterior' : 'Previous project'}
                    >
                        <ArrowIcon direction="prev" />
                    </button>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Slide
                                project={activeProject}
                                language={language}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <button
                        className={`${styles.navArrow} ${styles.navArrowNext}`}
                        onClick={goNext}
                        aria-label={language === 'es' ? 'Siguiente proyecto' : 'Next project'}
                    >
                        <ArrowIcon direction="next" />
                    </button>
                </div>

                <div className={styles.dotRow}>
                    {projects.map((project, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot2} ${idx === active ? styles.dotActive : ''}`}
                            style={idx === active ? { background: `var(--accent-${project.accent})` } : undefined}
                            onClick={() => goTo(idx)}
                            aria-label={project.title}
                        />
                    ))}
                    {/* How many projects there are isn't obvious before you start
                        clicking through the dots (audit finding, section 4) — a
                        plain "1 / 4" makes that immediately clear. */}
                    <span className={styles.slideCounter} aria-hidden="true">{active + 1} / {projects.length}</span>
                </div>
            </div>

            {/* Next step: from the projects to the story behind them */}
            <div className={`container ${styles.nextRow}`}>
                <p className={styles.nextText}>
                    {language === 'es' ? 'Detrás de cada proyecto hay un camino.' : 'Behind every project there is a path.'}
                </p>
                <SectionCta to="experiencia">{language === 'es' ? 'Ver trayectoria' : 'See journey'}</SectionCta>
            </div>
        </section>
    );
};

export default Portfolio;
