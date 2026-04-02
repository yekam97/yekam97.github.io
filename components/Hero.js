import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={`container ${styles.heroSection}`}>
      <motion.div
        className={styles.textColumn}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={styles.label}>INDUSTRIAL DESIGNER & PM</span>

        <h1 className={styles.title}>
          Donde las <br />
          <span className={styles.italic}>ideas</span> <br />
          tomaron forma.
        </h1>

        <p className={styles.description}>
          Architecting physical experiences through a lens of technical
          precision and project leadership. Precision in form. Integrity in management.
        </p>

        <div className={styles.ctaGroup}>
          <a href="#contacto" className="btn-neon">
            Enviar Mensaje
          </a>
          <a href="#" className="btn-outline">
            Download CV
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
            src="/avatar-sticker.png"
            alt="Camilo Gamba Portrait"
            className={styles.profileImage}
          />
          <div className={styles.neonBox}>A</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
