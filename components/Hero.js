import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { usePreloaderDone } from '@/lib/preloader';
import MagneticButton from './MagneticButton';
import ArrowChip from './ArrowChip';
import Squiggle from './Squiggle';
import Stats from './Stats';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Headline reveal: each line sits in its own clipped mask and slides up
// from below it (the reference site's line-by-line title reveal).
const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } }
};

const lineVariants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const getTitleLines = (language) =>
  language === 'es'
    ? [{ text: 'Donde las' }, { text: 'ideas', italic: true }, { text: 'tomaron forma.' }]
    : [{ text: 'Where' }, { text: 'ideas', italic: true }, { text: 'came to life.' }];

const Hero = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
  // The entrance waits for the intro curtain; if the intro isn't playing
  // (reduced motion, phones) this is already true on the first render.
  const ready = usePreloaderDone();

  return (
    <section id="hero" className={`container ${styles.heroSection}`}>
      {/* Decorative — a real word, purposely not announced twice */}
      <span className={styles.ghostWord} aria-hidden="true">INDUSTRIAL</span>

      <motion.div
        className={styles.textColumn}
        variants={containerVariants}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className={styles.availabilityBadge}>
          <span className={styles.pulseDot} />
          {language === 'es' ? 'Abierto a nuevas oportunidades' : 'Open to new opportunities'}
        </motion.div>

        <motion.p variants={itemVariants} className={styles.name}>Camilo Gamba</motion.p>

        <motion.span variants={itemVariants} className={styles.label}>{t('diseñador')}</motion.span>

        <motion.h1 variants={titleVariants} className={styles.title}>
          {getTitleLines(language).map((line) => (
            <span key={line.text} className={styles.lineMask}>
              <motion.span variants={lineVariants} className={styles.line}>
                {line.italic ? (
                  <span className={`${styles.italic} squiggle-host`}>
                    {line.text}
                    <Squiggle play={ready} delay={1.1} />
                  </span>
                ) : (
                  line.text
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.description}>
          {language === 'es' ? (
            'Diseñador industrial con pasión por la innovación, la estrategia y la creación de experiencias de usuario memorables. Transformo ideas en soluciones tangibles que combinan estética, funcionalidad e impacto real.'
          ) : (
            'Industrial designer passionate about innovation, strategy, and creating memorable user experiences. I transform ideas into tangible solutions that combine aesthetics, functionality, and real impact.'
          )}
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctaGroup}>
          <MagneticButton href="#contacto" className="btn-neon">
            {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
            <ArrowChip />
          </MagneticButton>
          <MagneticButton
            href="/cv-yeison-camilo-gamba.pdf"
            download
            className="btn-outline"
            strength={0.25}
          >
            {language === 'es' ? 'Descargar CV ↓' : 'Download CV ↓'}
          </MagneticButton>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Stats />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
