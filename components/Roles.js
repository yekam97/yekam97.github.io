import { motion } from 'framer-motion';
import styles from './Roles.module.css';

const rolesData = [
  {
    category: 'ENFOQUE',
    title: 'Diseñador Industrial',
    description: 'Transformo requisitos complejos en productos físicos elegantes, funcionales y listos para fabricación. Enfoque en ergonomía y materiales sostenibles.'
  },
  {
    category: 'DIGITAL',
    title: 'Diseñador UX/UI',
    description: 'Traduzco el feedback centrado en el humano en interfaces fluidas de alta fidelidad. Cerrando la brecha entre el software y la intención del usuario.'
  },
  {
    category: 'ESTRATEGIA',
    title: 'Gestor de Proyectos',
    description: 'Orquestando ciclos de vida complejos desde el prototipo hasta el mercado. Asegurando precisión en cada hito con una gestión meticulosa.'
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
        <span className="label-md">Facetas</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>Mis Enfoques</h2>

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