import { motion } from 'framer-motion';
import styles from './Portfolio.module.css';

const projects = [
    {
        category: 'DISEÑO INDUSTRIAL',
        title: 'Remodelación de departamento',
        year: '2023',
        image: '/images/industrial-remodelacion-departamento.png'
    },
    {
        category: 'ARQUITECTURA TEMÁTICA',
        title: 'Diseño de cabaña en Mazamitla',
        year: '2024',
        image: '/images/industrial-cabaña-mazamitla.png'
    },
    {
        category: 'VISUALIZACIÓN 3D',
        title: 'Locales comerciales Creat3d',
        year: '2022',
        image: '/images/industrial-locales-creat3d.png'
    },
    {
        category: 'UX/UI DESIGN',
        title: 'Dashboard de control de biofábricas',
        year: '2024',
        image: '/images/ux-dashboard-biofabricas.png'
    }
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="container section-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-12)' }}>
                <div>
                    <h2 className="newsreader" style={{ fontSize: '3.5rem' }}>Proyectos</h2>
                    <p className="description" style={{ marginTop: '0.5rem' }}>Una curaduría de proyectos que definen la innovación industrial.</p>
                </div>
                <a href="#" className={styles.viewMore}>VER ARCHIVO →</a>
            </div>

            <div className={styles.projectGrid}>
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        className={styles.projectCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <div className={`image-reveal ${styles.imageBox}`}>
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className={styles.meta}>
                            <div>
                                <span className={styles.category}>{project.category}</span>
                                <h3 className={styles.title}>{project.title}</h3>
                            </div>
                            <span className={styles.year}>{project.year}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
