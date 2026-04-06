'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.css';

const projects = [
    {
        category: 'DISEÑO INDUSTRIAL / DISEÑO DE INTERIORES',
        title: 'Diseño y desarrollo de espacios y productos',
        year: '2021 – 2025',
        image: '/images/industrial-remodelacion-departamento.png',
        images: ['/images/industrial-remodelacion-departamento.png'],
        description: 'Desarrollo de proyectos de diseño industrial y diseño interior enfocados en funcionalidad, estética y optimización de espacios. Creación de soluciones personalizadas para espacios comerciales, residenciales y mobiliario, integrando modelado 3D, visualización y desarrollo conceptual.',
        details: [
            'Diseño de mobiliario y elementos funcionales',
            'Remodelación y distribución de espacios interiores',
            'Desarrollo de conceptos de diseño para espacios comerciales',
            'Modelado y visualización de proyectos para clientes',
            'Prototipado y desarrollo de productos'
        ],
        technologies: ['Diseño 3D', 'Renderizado', 'CAD', 'Modelado paramétrico']
    },
    {
        category: 'DISEÑO UX / UI Y DESARROLLO WEB',
        title: 'Diseño y desarrollo de plataformas digitales',
        year: '2022 – 2025',
        image: '/images/ux-dashboard-biofabricas.png',
        images: ['/images/ux-dashboard-biofabricas.png'],
        description: 'Diseño de interfaces y desarrollo de aplicaciones web enfocadas en experiencia de usuario, funcionalidad y accesibilidad. Participación en la conceptualización, diseño visual, arquitectura de información y desarrollo de plataformas digitales para empresas y proyectos tecnológicos.',
        details: [
            'Diseño de experiencia de usuario (UX)',
            'Diseño de interfaces (UI) para aplicaciones web',
            'Desarrollo y personalización de plataformas web',
            'Diseño de paneles administrativos y sistemas multiusuario',
            'Prototipado y pruebas de experiencia de usuario'
        ],
        technologies: ['Figma', 'Diseño de interfaces', 'Desarrollo web', 'Prototipado digital']
    },
    {
        category: 'DISEÑO GRÁFICO Y BRANDING',
        title: 'Desarrollo de identidad visual y comunicación gráfica',
        year: '2021 – 2025',
        image: '/images/industrial-locales-creat3d.png',
        images: ['/images/industrial-locales-creat3d.png'],
        description: 'Creación de identidades visuales y piezas gráficas para empresas, emprendimientos y proyectos institucionales. Desarrollo de manuales de marca, diseño de logotipos y producción de material gráfico para medios digitales e impresos.',
        details: [
            'Diseño de logotipos e identidad visual',
            'Creación de manuales de marca',
            'Diseño de piezas gráficas para redes sociales',
            'Diseño de material publicitario e institucional',
            'Adaptación de identidad visual a diferentes formatos'
        ],
        technologies: ['Illustrator', 'Photoshop', 'Diseño editorial', 'Branding']
    },
    {
        category: 'MENTORÍAS, FORMACIÓN Y TALLERES',
        title: 'Capacitación en emprendimiento, tecnología y creatividad',
        year: '2022 – 2025',
        image: '/images/industrial-cabaña-mazamitla.png',
        images: ['/images/industrial-cabaña-mazamitla.png'],
        description: 'Diseño y desarrollo de talleres y procesos de mentoría orientados a emprendimiento, innovación y herramientas digitales. Formación en metodologías de creación de proyectos, contenido digital, tecnologías inmersivas y desarrollo de ideas de negocio.',
        details: [
            'Mentorías para emprendedores y desarrollo de modelos de negocio',
            'Talleres de creación de contenido digital y tecnología',
            'Capacitación en metodologías de innovación y diseño',
            'Formación en herramientas de diseño, video 360° y realidad virtual',
            'Acompañamiento a proyectos en etapas tempranas'
        ],
        technologies: ['Metodologías de innovación', 'Herramientas de diseño digital', 'Producción audiovisual', 'Realidad virtual y contenido inmersivo']
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
