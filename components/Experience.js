'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Squiggle from './Squiggle';
import SectionCta from './SectionCta';
import PageCta from './PageCta';
import Stage from './Stage';
import styles from './Experience.module.css';

// Hand-drawn wavy vertical line (in px, so it never gets stretched) that
// runs down the milestone list and "draws" itself as you scroll — the
// reference site's scroll-driven path.
const WAVE_X = 8;
const buildWave = (h) => {
  if (!h) return `M${WAVE_X} 0`;
  const step = 110;
  let d = `M${WAVE_X} 0`;
  for (let y = 0, i = 0; y < h; y += step, i++) {
    const s = i % 2 === 0 ? 1 : -1;
    const y2 = Math.min(y + step, h);
    const len = y2 - y;
    d += ` C ${WAVE_X + 5 * s} ${y + len / 3}, ${WAVE_X - 5 * s} ${y + (2 * len) / 3}, ${WAVE_X} ${y2}`;
  }
  return d;
};

import { getExperienceData, getMilestones } from '@/lib/experience';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const Experience = () => {
  const { language } = useLanguage();
  const experienceData = getExperienceData(language);
  const milestones = getMilestones(language);
  const reduce = useReducedMotion();

  // Scroll-drawn timeline line: it draws as the list scrolls through the
  // viewport, and each milestone's dot lights up once the line reaches it.
  const timelineRef = useRef(null);
  const rowRefs = useRef([]);
  const [dims, setDims] = useState({ h: 0, fracs: [] });
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return undefined;
    const measure = () => {
      const h = el.offsetHeight;
      const fracs = rowRefs.current.map((r) => (r && h ? (r.offsetTop + 26) / h : 1));
      setDims((prev) =>
        prev.h === h && prev.fracs.length === fracs.length && prev.fracs.every((f, i) => Math.abs(f - fracs[i]) < 0.001)
          ? prev
          : { h, fracs }
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  useMotionValueEvent(draw, 'change', (v) => {
    const n = dims.fracs.filter((f) => f <= v).length;
    setLit((prev) => (prev === n ? prev : n));
  });
  const litCount = reduce ? milestones.length : lit;
  const wave = buildWave(dims.h);

  const headingWords = language === 'es' ? ['Trayectoria', 'Profesional'] : ['Professional', 'Trajectory'];

  return (
    <section id="experiencia" className="container section-padding">
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className="label-md">{language === 'es' ? 'Cronología' : 'Timeline'}</span>
          <h2 className="newsreader" style={{ fontSize: '3rem' }}>
            {headingWords[0]}{' '}
            <span className="squiggle-host">
              {headingWords[1]}
              <Squiggle />
            </span>
          </h2>
          <p className={styles.lead}>
            {language === 'es'
              ? 'Del diseño de producto a la gestión de innovación.'
              : 'From product design to innovation management.'}
          </p>
        </div>
        <div className={styles.headerStage}>
          <Stage
            pose="salto"
            variant="experience"
            height="min(460px, 60vh)"
            chips={[
              { label: language === 'es' ? '3+ años' : '3+ years', color: 'var(--accent-mentoring)', x: 4, y: 16 },
              { label: `${experienceData.length} roles`, color: 'var(--accent-branding)', x: 66, y: 70 }
            ]}
          />
        </div>
      </div>

      {/* Milestones — one line each, quiet index-page rhythm */}
      <div className={styles.timeline} ref={timelineRef}>
        <svg
          className={styles.timelineSvg}
          width="16"
          height={dims.h}
          viewBox={`0 0 16 ${dims.h || 1}`}
          aria-hidden="true"
        >
          <path d={wave} className={styles.timelineTrack} />
          <motion.path d={wave} className={styles.timelineFill} style={{ pathLength: reduce ? 1 : draw }} />
        </svg>

        <motion.ol
          className={styles.milestoneList}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {milestones.map((m, i) => {
            const exp = experienceData[m.idx];
            return (
              <motion.li
                key={m.idx}
                ref={(el) => { rowRefs.current[i] = el; }}
                className={styles.milestoneRow}
                variants={rowVariants}
              >
                <span className={`${styles.node} ${i < litCount ? styles.nodeLit : ''}`} aria-hidden="true" />
                <span className={styles.milestonePeriod}>{exp.period}</span>
                <span className={styles.milestoneRole}>
                  {exp.role} <span className={styles.milestoneCompany}>· {exp.company}</span>
                </span>
                <span className={styles.milestoneHeadline}>{m.headline}</span>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>

      {/* The full trajectory lives on its own page: here only a short summary + one click */}
      <div className={styles.nextRow}>
        <PageCta href="/trayectoria/">
          {language === 'es' ? 'Ver trayectoria completa' : 'See full trajectory'}
        </PageCta>
        <SectionCta to="roles" variant="outline">{language === 'es' ? 'Ver estudios' : 'See education'}</SectionCta>
      </div>
    </section>
  );
};

export default Experience;
