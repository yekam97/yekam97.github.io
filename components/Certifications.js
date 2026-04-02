import { motion } from 'framer-motion';
import styles from './Certifications.module.css';

const certifications = [
  {
    name: 'CERTIFICACIÓN DISEÑO UX/UI',
    issuer: 'GOOGLE CAREER CERTIFICATES',
    date: '2024',
    id: 'Credential ID: GX-9921'
  },
  {
    name: 'MODELADO 3D Y RENDER AVANZADO',
    issuer: 'SKETCHUP & LUMION',
    date: '2023',
    id: 'Credential ID: SL-4412'
  },
  {
    name: 'CERTIFICADO METODOLOGÍAS ÁGILES',
    issuer: 'SCRUM FUNDAMENTALS',
    date: '2024',
    id: 'Credential ID: SF-7712'
  },
  {
    name: 'EMPRENDIMIENTO E INNOVACIÓN',
    issuer: 'MINCIENCIAS / SENNOVA',
    date: '2023',
    id: 'Credential ID: MS-2212'
  },
  {
    name: 'PRODUCCIÓN DE CONTENIDOS 360°',
    issuer: 'REALIDAD VIRTUAL',
    date: '2023',
    id: 'Credential ID: RV-1122'
  }
];

const Certifications = () => {
  return (
    <section id="certificaciones" className="container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="label-md">Reconocimientos</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>Hitos de Aprendizaje</h2>

        <div className={styles.certsGrid}>
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              className={styles.certCard}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className={styles.header}>
                <span className={styles.issuer}>{cert.issuer}</span>
                <span className={styles.date}>{cert.date}</span>
              </div>
              <h3 className={styles.name}>{cert.name}</h3>
              <p className={styles.credential}>{cert.id}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;