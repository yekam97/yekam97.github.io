import { motion } from 'framer-motion';
import styles from './Roles.module.css';

const rolesData = [
  {
    category: 'ENFOQUE',
    title: 'Industrial Designer',
    description: 'Transforming complex requirements into elegant, functional, and manufacturing-ready physical products. Focus on ergonomics and sustainable materials.'
  },
  {
    category: 'DIGITAL',
    title: 'UX/UI Specialist',
    description: 'Translating human-centric feedback into fluid, high-fidelity interfaces. Bridging the gap between software and user intent.'
  },
  {
    category: 'ESTRATEGIA',
    title: 'Project Manager',
    description: 'Orchestrating complex lifecycles from prototype to market. Ensuring precision at every milestone with meticulous management.'
  }
];

const Roles = () => {
  return (
    <section id="roles" className="container section-padding">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="label-md">Facets</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>Core Facets</h2>

        <div className={styles.facetsGrid}>
          {rolesData.map((role, idx) => (
            <motion.div
              key={idx}
              className={styles.facetCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <span className={styles.facetLabel}>{role.category}</span>
              <h3 className={styles.facetTitle}>{role.title}</h3>
              <p className={styles.facetDescription}>{role.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Roles;