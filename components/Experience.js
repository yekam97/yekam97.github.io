import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experienceData = [
  {
    period: '2020 - 2025',
    role: 'Arquitecto Diseñador y Cofundador',
    company: 'CREAT3D DISEÑO Y ARQUITECTURA',
    description: 'Liderazgo en el desarrollo de proyectos de arquitectura interior, mobiliario y visualización. Integración de materiales naturales y sostenibilidad.'
  },
  {
    period: '2019 - 2020',
    role: 'Contratista de Apoyo Académico',
    company: 'UPTC COLOMBIA',
    description: 'Investigación académica y desarrollo de procesos artesanales en proyectos de innovación y cultura material.'
  },
  {
    period: '2015 - 2018',
    role: 'Diseñador Industrial Freelance',
    company: 'PROYECTOS INDEPENDIENTES',
    description: 'Desarrollo de soluciones de diseño para diversos sectores, desde mobiliario hasta identidad visual y modelado 3D.'
  }
];

const Experience = () => {
  return (
    <section id="experiencia" className="container section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="label-md">Cronología</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)', textAlign: 'center' }}>Trayectoria Profesional</h2>

        <div className={styles.timelineContainer}>
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.periodPill}>{exp.period}</div>

              <div className={styles.content}>
                <div className={styles.dot} />
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;