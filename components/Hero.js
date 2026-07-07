import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
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

const Hero = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 100]);
  const scaleParallax = useTransform(scrollY, [0, 600], [1, 0.94]);

  return (
    <section id="hero" className={`container ${styles.heroSection}`}>
      <div className={styles.radialGlow} />
      <motion.div
        className={styles.textColumn}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className={styles.label}>{t('diseñador')}</motion.span>

        <motion.h1 variants={itemVariants} className={styles.title}>
          {language === 'es' ? (
            <>
              Donde las <br />
              <span className={styles.italic}>ideas</span> <br />
              tomaron forma.
            </>
          ) : (
            <>
              Where <br />
              <span className={styles.italic}>ideas</span> <br />
              came to life.
            </>
          )}
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.description}>
          {language === 'es' ? (
            'Diseñador industrial con pasión por la innovación, la estrategia y la creación de experiencias de usuario memorables. Transformo ideas en soluciones tangibles que combinan estética, funcionalidad e impacto real.'
          ) : (
            'Industrial designer passionate about innovation, strategy, and creating memorable user experiences. I transform ideas into tangible solutions that combine aesthetics, functionality, and real impact.'
          )}
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctaGroup}>
          <a href="#contacto" className="btn-neon">
            {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.photoColumn}
        style={{ y: yParallax, scale: scaleParallax }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.photoGlow} />
          <img
            src="/images/camilo-portrait.png"
            alt="Yeison Camilo Gamba Gonzalez — Diseñador Industrial y Gestor de Proyectos de Innovación"
            className={styles.profileImage}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
