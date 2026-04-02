import { motion } from 'framer-motion';
import styles from './Certifications.module.css';

const certifications = [
  'Certificación en Diseño UX/UI – Google',
  'Curso de Modelado 3D y Render avanzado – SketchUp & Lumion',
  'Taller de Emprendimiento e Innovación – MinCiencias / Sennova',
  'Certificado en Metodologías ágiles – Scrum Fundamentals',
  'Curso de Producción de contenidos 360° y Realidad Virtual',
];

export default function Certifications() {
  return (
    <section id="certificaciones" className="card" aria-labelledby="certs-heading">
      <motion.h2
        id="certs-heading"
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Certificaciones y aprendizaje continuo
      </motion.h2>
      <motion.div
        className={styles.chips}
        role="list"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {certifications.map((cert, index) => (
          <motion.div
            role="listitem"
            tabIndex={0}
            aria-label={`Certificación ${index + 1}: ${cert}`}
            className={styles.chip}
            key={index}
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <span className={styles['chip-icon']} aria-hidden>🏅</span>
            <span>{cert}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}