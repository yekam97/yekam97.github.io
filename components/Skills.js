import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SectionCta from './SectionCta';
import Squiggle from './Squiggle';
import Stage from './Stage';
import styles from './Skills.module.css';

// Small hand-drawn line icons — one per discipline, matching the site's
// editorial line-art language rather than a generic icon-font look.
const icons = {
  design: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L28 12 L14 26 L6 28 L8 20 Z" />
      <path d="M17 7 L25 15" />
    </svg>
  ),
  development: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 8 L4 16 L11 24" />
      <path d="M21 8 L28 16 L21 24" />
    </svg>
  ),
  methodologies: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 9 L8 12 L13 6" />
      <line x1="17" y1="9" x2="27" y2="9" />
      <path d="M5 17 L8 20 L13 14" />
      <line x1="17" y1="17" x2="27" y2="17" />
      <path d="M5 25 L8 28 L13 22" />
      <line x1="17" y1="25" x2="27" y2="25" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 5 L15.5 12.5 L23 15 L15.5 17.5 L13 25 L10.5 17.5 L3 15 L10.5 12.5 Z" />
      <path d="M24 4 V9 M21.5 6.5 H26.5" />
      <path d="M25 21 V27 M22 24 H28" />
    </svg>
  ),
  languages: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7 H27 V21 H14 L8 27 V21 H5 Z" />
    </svg>
  )
};

const getSkillGroups = (language) => {
  const isEn = language === 'en';
  return [
    {
      icon: 'design',
      accent: 'industrial',
      label: isEn ? 'DESIGN' : 'DISEÑO',
      items: ['Figma', 'Illustrator', 'Photoshop', 'CAD', isEn ? 'Parametric Modeling' : 'Modelado Paramétrico', isEn ? '3D Rendering' : 'Renderizado 3D', 'Branding']
    },
    {
      icon: 'development',
      accent: 'uxui',
      label: isEn ? 'DEVELOPMENT' : 'DESARROLLO',
      items: ['HTML', 'JavaScript', 'Vercel', 'Firestore']
    },
    {
      icon: 'methodologies',
      accent: 'mentoring',
      label: isEn ? 'METHODOLOGIES' : 'METODOLOGÍAS',
      items: ['Design Thinking', 'Lean Startup', 'Scrum / Agile', 'Canvas']
    },
    {
      icon: 'languages',
      accent: 'branding',
      label: isEn ? 'LANGUAGES' : 'IDIOMAS',
      items: [isEn ? 'Spanish (Native)' : 'Español (Nativo)', isEn ? 'English (B2)' : 'Inglés (B2)']
    },
    // Full-width card under the four above: it has the longest list
    {
      icon: 'ai',
      accent: 'software',
      wide: true,
      label: isEn ? 'ARTIFICIAL INTELLIGENCE' : 'INTELIGENCIA ARTIFICIAL',
      items: isEn
        ? ['Image generation', 'Video generation', 'Vibe coding', 'Prompt engineering', 'AI assistants & agents (Claude)', 'Workflow automation', 'AI-assisted concepting & rendering', 'AI image editing & retouching']
        : ['Generación de imágenes', 'Generación de video', 'Vibe coding', 'Prompt engineering', 'Asistentes y agentes de IA (Claude)', 'Automatización de flujos', 'Conceptos y renders asistidos por IA', 'Edición y retoque con IA']
    }
  ];
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// A slight, alternating tilt per card gives the resting grid a loose,
// "dealt hand of cards" feel instead of a rigid grid.
const restingTilt = [-2.5, 1.5, -1.5, 2.5];

const Skills = () => {
  const { language } = useLanguage();
  const skillGroups = getSkillGroups(language);
  const isEs = language === 'es';
  // The thinking mascot reacts (nods / kicks) while the main button is hovered
  const [hop, setHop] = useState(false);

  return (
    <section id="skills" className="container section-padding">
      {/* Short copy + clear next steps, with a big illustrated stage beside it */}
      <div className={styles.intro}>
        <div className={styles.introText}>
          <span className="label-md">{isEs ? 'Qué hago' : 'What I do'}</span>
          <h2 className="newsreader" style={{ fontSize: '3rem', marginTop: 'var(--spacing-2)' }}>
            {isEs ? 'Cinco áreas, ' : 'Five areas, '}
            <span className="squiggle-host">
              {isEs ? 'una mirada' : 'one view'}
              <Squiggle />
            </span>
            .
          </h2>
          <p className={styles.lead}>
            {isEs
              ? 'De la idea al producto: diseño, desarrollo, IA y método.'
              : 'From idea to product: design, development, AI and method.'}
          </p>
          <div className={styles.introCtas}>
            <SectionCta to="portfolio" onHoverStart={() => setHop(true)} onHoverEnd={() => setHop(false)}>
              {isEs ? 'Ver proyectos' : 'See projects'}
            </SectionCta>
            <SectionCta to="experiencia" variant="outline">
              {isEs ? 'Mi trayectoria' : 'My journey'}
            </SectionCta>
          </div>
        </div>

        <div className={styles.introStage}>
          <Stage
            pose="pensando"
            variant="skills"
            flip
            hop={hop}
            chips={[
              { label: 'Figma', color: 'var(--accent-uxui)', x: 4, y: 20 },
              { label: 'CAD', color: 'var(--accent-industrial)', x: 70, y: 12 },
              { label: 'HTML + JS', color: 'var(--accent-software)', x: 66, y: 80 }
            ]}
          />
        </div>
      </div>

      <motion.div
        className={styles.skillsGrid}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillGroups.map((group, idx) => (
          <motion.div
            key={idx}
            className={`${styles.skillCard} ${group.wide ? styles.skillCardWide : ''}`}
            data-tone={idx % 2 === 0 ? 'green' : 'red'}
            variants={cardVariants}
            style={{ rotate: group.wide ? 0 : restingTilt[idx % restingTilt.length] }}
            whileHover={{ rotate: 0, scale: 1.045, y: -10 }}
            whileTap={{ rotate: 0, scale: 1.06, y: -6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            <span className={styles.skillIcon}>
              {icons[group.icon]}
            </span>
            <span className={styles.skillLabel}>{group.label}</span>
            <div className={styles.chipRow}>
              {group.items.map((item, i) => (
                <span key={i} className={styles.chip}>{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
