import { motion } from 'framer-motion';
import styles from './Portfolio.module.css';

const projects = [
    {
        category: 'PROTOTYPING & RENDERING',
        title: 'Axis-7 Modular Housing',
        year: '2023',
        image: '/images/industrial-remodelacion-departamento.png'
    },
    {
        category: 'MATERIAL STUDY',
        title: 'Titanium Lattice Structure',
        year: '2024',
        image: '/images/industrial-locales-creat3d.png'
    },
    {
        category: 'FURNITURE DESIGN',
        title: 'Mono-Block Seating',
        year: '2022',
        image: '/images/industrial-cabaña-mazamitla.png'
    },
    {
        category: 'COMPUTATIONAL DESIGN',
        title: 'Nexus Control OS',
        year: '2024',
        image: '/images/ux-dashboard-biofabricas.png'
    }
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="container section-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-12)' }}>
                <div>
                    <h2 className="newsreader" style={{ fontSize: '3.5rem' }}>Selected Artifacts</h2>
                    <p className="description" style={{ marginTop: '0.5rem' }}>A curation of projects defining industrial innovation.</p>
                </div>
                <a href="#" className={styles.viewMore}>VIEW ARCHIVE →</a>
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
