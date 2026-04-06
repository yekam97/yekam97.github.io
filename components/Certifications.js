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
    name: 'DISEÑO GRÁFICO',
    issuer: 'LINKEDIN LEARNING',
    date: '2021',
    url: 'https://www.linkedin.com/learning/certificates/ce1e321bbee3b0af651a8321602d50b335ef11b980a9b6c4c0ce77621cfb069f?trk=backfilled_certificate',
    id: '40 h · 13 cursos'
  },
  {
    name: 'DOCENCIA UNIVERSITARIA',
    issuer: 'POLITÉCNICO DE SURAMÉRICA',
    date: '2025',
    url: 'https://api-certificate.polisura.edu.co/certificate.php?data=LVYBQBxdGAReWCxrbXR2cFwNT14LbnZZEw5aAg4UGg9wZmdqIHNbCBIKR2h0WxEXSFAJBFJoITMsMywkBQ0XHENidghAFkMFWl0HBQ==',
    id: '120 h · Diplomado'
  },
  {
    name: 'PEDAGOGÍA PARA PROFESIONALES NO LICENCIADOS',
    issuer: 'POLITÉCNICO INTERCONTINENTAL',
    date: '2025',
    url: 'https://api-certificate.polinterco.edu.co/certificate.php?data=LVYBQBxdGAReWCxrPX92e1RZFA4LZ3EISw5aBw5IGlZ7MD1qdSFeXhVQFDl0CkESSFAJBFJoITMsMywkBQ0XHENidghAFkMFWV0FAA==',
    id: '120 h · Diplomado'
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