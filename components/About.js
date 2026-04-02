import { motion } from 'framer-motion';
import styles from './About.module.css';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

export default function About() {
  return (
    <section id="about" className={styles['about-section']}>
      <motion.div
        className={styles['about-grid']}
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className={styles['about-profile']}>
          <motion.div className={styles['profile-header']} variants={fadeInUp}>
            <div className={styles['profile-image']}>
              <img
                src="/avatar-sticker.png"
                alt="Camilo Gamba — Diseñador Industrial"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
              />
              <div className={styles['image-overlay']}></div>
            </div>
            <div className={styles['profile-info']}>
              <h2 className={styles['profile-name']}>Camilo Gamba</h2>
              <p className={styles['profile-title']}>
                Diseñador Industrial y Gestor de Proyectos
              </p>
            </div>
          </motion.div>

          <motion.div className={styles['profile-bio']} variants={staggerContainer}>
            <motion.p className={styles['bio-text']} variants={fadeInUp}>
              Soy un diseñador industrial con enfoque en arquitectura, innovación y estrategia. Combino la creatividad del diseño con el pensamiento empresarial para transformar ideas en proyectos sostenibles y funcionales.
            </motion.p>
            <motion.p className={styles['bio-focus']} variants={fadeInUp}>
              <strong>Enfoque personal:</strong> Busco conectar la estética con la utilidad, integrando la experiencia del usuario, la sostenibilidad y la narrativa visual en cada proyecto que desarrollo.
            </motion.p>
          </motion.div>
        </div>

        <motion.div className={styles['about-education']} variants={fadeInUp}>
          <div className={styles['education-card']}>
            <h3 className={styles['card-title']}>Formación Académica</h3>
            <div className={styles['skills-grid']}>
              {[
                {
                  title: 'Diseñador Industrial',
                  icon: '🎓',
                  category: 'Principal'
                },
                {
                  title: 'Diseño UX/UI',
                  icon: '💻',
                  category: 'Especialización'
                }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className={styles['skill-card']}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles['skill-icon']}>{skill.icon}</span>
                  <div className={styles['skill-info']}>
                    <h4>{skill.title}</h4>
                    <span className={styles['skill-category']}>{skill.category}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}