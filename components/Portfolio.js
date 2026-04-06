import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Portfolio.module.css';
import ProjectModal from './ProjectModal';

const projects = [
    {
        category: 'DISEÑO INDUSTRIAL',
        title: 'Remodelación de departamento',
        year: '2023',
        image: '/images/industrial-remodelacion-departamento.png',
        images: ['/images/industrial-remodelacion-departamento.png'],
        description: 'Proyecto de remodelación integral de departamento enfocado en maximizar espacios, funcionalidad e iluminación natural. Diseño moderno con acabados premium.',
        details: [
            'Diseño completo de distribución espacial',
            'Selección de materiales y acabados',
            'Integración de soluciones de almacenamiento',
            'Iluminación y mobiliario funcional'
        ],
        technologies: ['Diseño 3D', 'Visualización', 'CAD', 'Materiales']
    },
    {
        category: 'ARQUITECTURA TEMÁTICA',
        title: 'Diseño de cabaña en Mazamitla',
        year: '2024',
        image: '/images/industrial-cabaña-mazamitla.png',
        images: ['/images/industrial-cabaña-mazamitla.png'],
        description: 'Proyecto de arquitectura temática para vivienda en entorno natural. Diseño que respeta el paisaje local manteniendo confort y modernidad.',
        details: [
            'Integración con el paisaje natural',
            'Diseño bioclimático y sostenible',
            'Espacios abiertos y fluidos',
            'Materiales locales y sostenibles'
        ],
        technologies: ['Arquitectura', 'Diseño 3D', 'Sostenibilidad', 'Render']
    },
    {
        category: 'VISUALIZACIÓN 3D',
        title: 'Locales comerciales Creat3d',
        year: '2022',
        image: '/images/industrial-locales-creat3d.png',
        images: ['/images/industrial-locales-creat3d.png'],
        description: 'Visualización 3D de espacios comerciales con distribución moderna y atractiva. Renders de alta calidad para presentación a inversores.',
        details: [
            'Modelado 3D detallado',
            'Renders fotorrealistas',
            'Propuestas de distribución comercial',
            'Materiales y acabados realistas'
        ],
        technologies: ['3D Studio Max', 'V-Ray', 'Render', 'Diseño comercial']
    },
    {
        category: 'UX/UI DESIGN',
        title: 'Dashboard de control de biofábricas',
        year: '2024',
        image: '/images/ux-dashboard-biofabricas.png',
        images: ['/images/ux-dashboard-biofabricas.png'],
        description: 'Interfaz de usuario para gestión y monitoreo de procesos en biofábricas. Diseño intuitivo con visualización de datos en tiempo real.',
        details: [
            'Investigación UX exhaustiva',
            'Diseño de interfaz intuitiva',
            'Visualización de datos complejos',
            'Prototipado interactivo'
        ],
        technologies: ['Figma', 'UX Research', 'UI Design', 'Prototipado']
    }
];

const Portfolio = () => {
    const [selectedProject, setSelectedProject] = useState(null);

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
                        onClick={() => setSelectedProject(project)}
                        style={{ cursor: 'pointer' }}
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

            <ProjectModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </section>
    );
};

export default Portfolio;
