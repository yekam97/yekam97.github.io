import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Hero.module.css';

const Hero = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

  return (
    <section id="hero" className={`container ${styles.heroSection}`}>
      <motion.div
        className={styles.textColumn}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={styles.label}>{t('diseñador')}</span>

        <h1 className={styles.title}>
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
        </h1>

        <p className={styles.description}>
          {language === 'es' ? (
            'Diseñador industrial con pasión por la innovación, la estrategia y la creación de experiencias de usuario memorables. Transformo ideas en soluciones tangibles que combinan estética, funcionalidad e impacto real.'
          ) : (
            'Industrial designer passionate about innovation, strategy, and creating memorable user experiences. I transform ideas into tangible solutions that combine aesthetics, functionality, and real impact.'
          )}
        </p>

        <div className={styles.ctaGroup}>
          <a href="#contacto" className="btn-neon">
            {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
          </a>
        </div>
      </motion.div>

      <motion.div
        className={styles.photoColumn}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className={styles.imageWrapper}>
          <img
            src="/images/camilo-portrait.jpg"
            alt="Camilo Gamba"
            className={styles.profileImage}
          />
          <div className={styles.neonBoxOverlay} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
