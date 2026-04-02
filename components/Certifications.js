import { motion } from 'framer-motion';
import styles from './Certifications.module.css';

const certifications = [
  {
    name: 'CERTIFICACIÓN DISEÑO UX/UI',
    issuer: 'GOOGLE CAREER CERTIFICATES',
    date: '2024',
    url: 'https://coursera.org/share/f2a7baa8b7079d330169a8c490fb749b',
    id: 'Credential ID: GX-9921'
  },
  {
    name: 'INGLÉS B2',
    issuer: 'EF SET certificate',
    date: '2024',
    url: 'https://cert.efset.org/es/exPUj4',
    id: 'B2 Upper Intermediate'
  },
  {
    name: 'MODELADO 3D Y RENDER AVANZADO',
    issuer: 'CERTIFICADO TÉCNICO',
    date: '2023',
    id: 'Credential ID: SL-4412'
  },
  {
    name: 'PRODUCCIÓN DE CONTENIDOS 360°',
    issuer: 'REALIDAD VIRTUAL',
    date: '2023',
    id: 'Credential ID: RV-1122'
  },
  {
    name: 'EMPRENDIMIENTO E INNOVACIÓN',
    issuer: 'MINCIENCIAS / SENNOVA',
    date: '2023',
    id: 'Credential ID: MS-2212'
  },
  {
    name: 'CERTIFICADO METODOLOGÍAS ÁGILES',
    issuer: 'SCRUM FUNDAMENTALS',
    date: '2024',
    id: 'Credential ID: SF-7712'
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

              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                  <h3 className={styles.name}>{cert.name} <span style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>↗</span></h3>
                </a>
              ) : (
                <h3 className={styles.name}>{cert.name}</h3>
              )}

              <p className={styles.credential}>{cert.id}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;