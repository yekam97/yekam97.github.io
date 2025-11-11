import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const roles = ["Diseñador Industrial", "Diseñador UX/UI", "Gestor de Proyectos", "Formador", "Content Manager"];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000); // Pausa antes de borrar
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className={styles.typewriter}>
      {`${roles[index].substring(0, subIndex)}`}
      <span className={styles.cursor}>|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className={styles.heroSection}>
      <motion.div 
        className={styles.textColumn}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Camilo Gamba</h1>
          <h2 className={styles.subtitle}>
            <Typewriter />
          </h2>
        </div>
        
        <p className={styles.description}>
          Diseñador industrial con pasión por la innovación, la estrategia y la creación de experiencias de usuario memorables. Transformo ideas en soluciones tangibles que combinan estética, funcionalidad y impacto real.
        </p>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Años de Experiencia</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Proyectos Completados</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Equipos Liderados</span>
          </div>
        </div>

        <div className={styles.ctaGroup}>
          <a href="#roles" className={`${styles.ctaButton} ${styles.primary}`}>
            Explorar Portafolio
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className={`${styles.ctaButton} ${styles.secondary}`}>
            Contactar
          </a>
        </div>
      </motion.div>
      <div className={styles.photoColumn}>
        <img src="/images/profile-placeholder-placeholder.png" alt="Camilo Gamba" className={styles.profileImage} />
      </div>
    </section>
  );
};

export default Hero;
