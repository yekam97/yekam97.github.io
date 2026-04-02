import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experienceData = [
  {
    period: '2020 - 2025',
    role: 'Senior Project Lead',
    company: 'GLOBAL DESIGN COLLECTIVE',
    description: 'Directing cross-functional teams across hardware and digital divisions. Managed the successful launch of 12+ award winning products.'
  },
  {
    period: '2015 - 2020',
    role: 'Industrial Designer',
    company: 'ARSENA DESIGN LAB',
    description: 'Focus on additive manufacturing and structural optimization for aerospace components. Led a team of 4 in material research.'
  },
  {
    period: '2012 - 2015',
    role: 'Junior UX Architect',
    company: 'DISTRIC NETWORKS INC',
    description: 'Bridging physical control surfaces with responsive software environments. Specializing in automotive console design.'
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
        <span className="label-md">Chronology</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)', textAlign: 'center' }}>Career Trajectory</h2>

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