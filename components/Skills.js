import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Skills.module.css';

const getSkillGroups = (language) => {
  const isEn = language === 'en';
  return [
    {
      label: isEn ? 'DESIGN' : 'DISEÑO',
      items: ['Figma', 'Illustrator', 'Photoshop', 'CAD', isEn ? 'Parametric Modeling' : 'Modelado Paramétrico', isEn ? '3D Rendering' : 'Renderizado 3D', 'Branding']
    },
    {
      label: isEn ? 'DEVELOPMENT' : 'DESARROLLO',
      items: ['HTML', 'JavaScript', 'Vercel', 'Firestore']
    },
    {
      label: isEn ? 'METHODOLOGIES' : 'METODOLOGÍAS',
      items: ['Design Thinking', 'Lean Startup', 'Scrum / Agile', 'Canvas']
    },
    {
      label: isEn ? 'LANGUAGES' : 'IDIOMAS',
      items: [isEn ? 'Spanish (Native)' : 'Español (Nativo)', isEn ? 'English (B2)' : 'Inglés (B2)']
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

const Skills = () => {
  const { language } = useLanguage();
  const skillGroups = getSkillGroups(language);

  return (
    <section id="skills" className="container section-padding">
      <div style={{ marginBottom: 'var(--spacing-12)' }}>
        <span className="label-md">{language === 'es' ? 'Herramientas' : 'Tools'}</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginTop: 'var(--spacing-2)' }}>
          {language === 'es' ? 'Habilidades y Stack' : 'Skills & Stack'}
        </h2>
      </div>

      <motion.div
        className={styles.skillsGrid}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillGroups.map((group, idx) => (
          <motion.div key={idx} className={styles.skillCard} variants={cardVariants} whileHover={{ y: -4 }}>
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
