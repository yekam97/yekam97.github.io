import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section id="contacto" className={styles.ctaSection}>
      <motion.div
        className={styles.ctaContent}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.ctaTitle}>Construyamos precisión.</h2>
        <a href="mailto:contato@studio.com" className={styles.blackBtn}>
          INICIAR UN PROYECTO
        </a>
      </motion.div>

      <div className={styles.bottomBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem' }}>
          <span>UN ESTUDIO DE DISEÑO INDUSTRIAL - CONSTRUIDO PARA LA PRECISIÓN</span>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            <a href="#">LINKEDIN</a>
            <a href="#">INSTAGRAM</a>
            <a href="#">BEHANCE</a>
            <a href="#">DRIBBBLE</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;