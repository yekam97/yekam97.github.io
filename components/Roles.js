import { motion } from 'framer-motion';
import styles from './Roles.module.css';

const rolesData = [
  {
    category: 'PREGRADO',
    title: 'Diseñador Industrial',
    description: 'Universidad Pedagógica y Tecnológica de Colombia. Profesional orientado al desarrollo de productos, innovación y soluciones funcionales que integran creatividad, tecnología y sostenibilidad. Enfoque estratégico y prototipado.',
    pdfUrl: '/DIPLOMA PREGRADO.pdf'
  },
  {
    category: 'ESPECIALIZACIÓN',
    title: 'Alta Gerencia en Mercadotecnia',
    description: 'Universidad Pedagógica y Tecnológica de Colombia. Formación en diseño de estrategias de mercado, posicionamiento y modelos de negocio. Gestión estratégica del marketing y fortalecimiento de emprendimientos.',
    pdfUrl: '/DIPLOMA DE GRADO ESPECIALIZACIÓN.pdf'
  },
  {
    category: 'MAESTRÍA',
    title: 'Proyectos de Desarrollo Sostenible',
    description: 'Magíster con enfoque en la formulación, gestión y evaluación de proyectos territoriales e innovación social. Integración de impacto económico, ambiental y social para soluciones sostenibles.'
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
        <span className="label-md">Estudios</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>Mis Estudios</h2>

        <div className={styles.facetsGrid}>
          {rolesData.map((role, idx) => (
            <motion.div
              key={idx}
              className={styles.facetCard}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={styles.facetLabel}>{role.category}</span>
              <h3 className={styles.facetTitle}>{role.title}</h3>
              <p className={styles.facetDescription}>{role.description}</p>
              {role.pdfUrl && (
                <a href={role.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                  Ver Diploma ↗
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Roles;