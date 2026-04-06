'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.css';

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1));
        }
    };

    const handleNextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1));
        }
    };

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
                        onClick={() => {
                            setSelectedProject(project);
                            setCurrentImageIndex(0);
                        }}
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

            {/* Panel deslizable con información del proyecto */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className={styles.projectPanel}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <button 
                            className={styles.closePanel}
                            onClick={() => setSelectedProject(null)}
                        >
                            ✕ Cerrar
                        </button>

                        <div className={styles.panelContent}>
                            {/* Galería de imágenes */}
                            <div className={styles.imageGallery}>
                                <div className={styles.mainImageContainer}>
                                    <img 
                                        src={selectedProject.images[currentImageIndex]} 
                                        alt={selectedProject.title}
                                    />
                                </div>
                                {selectedProject.images.length > 1 && (
                                    <div className={styles.imageControls}>
                                        <button onClick={handlePrevImage}>←</button>
                                        <span>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                                        <button onClick={handleNextImage}>→</button>
                                    </div>
                                )}
                            </div>

                            {/* Información del proyecto */}
                            <div className={styles.projectInfo}>
                                <span className={styles.category}>{selectedProject.category}</span>
                                <h2 className={styles.title}>{selectedProject.title}</h2>
                                <p className={styles.year}>{selectedProject.year}</p>

                                <div className={styles.description}>
                                    <p>{selectedProject.description}</p>
                                </div>

                                {selectedProject.details && (
                                    <div className={styles.details}>
                                        <h3>Detalles</h3>
                                        <ul>
                                            {selectedProject.details.map((detail, idx) => (
                                                <li key={idx}>{detail}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {selectedProject.technologies && (
                                    <div className={styles.technologies}>
                                        <h3>Tecnologías</h3>
                                        <div className={styles.techTags}>
                                            {selectedProject.technologies.map((tech, idx) => (
                                                <span key={idx} className={styles.tag}>{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
