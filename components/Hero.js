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
    <section className={styles.heroSection}>
      {/* Columna izquierda opcional para foto */}
      {/* <div className={styles.photoColumn}></div> */}
      <motion.div 
        className={styles.textColumn}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Hola, soy Camilo Gamba</h1>
        <h2 className={styles.subtitle}>
          <Typewriter />
        </h2>
        <a href="#roles" className={styles.ctaButton}>
          Ver Portafolio ↓
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
