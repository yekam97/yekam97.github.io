'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Portfolio.module.css';

const getProjects = (language) => {
    const isEn = language === 'en';
    return [
        {
            accent: 'industrial',
            category: isEn ? 'INDUSTRIAL DESIGN / INTERIOR DESIGN' : 'DISEÑO INDUSTRIAL / DISEÑO DE INTERIORES',
            title: isEn
                ? 'Design and development of spaces and products'
                : 'Diseño y desarrollo de espacios y productos',
            year: '2021 – 2025',
            image: '/images/industrial-remodelacion-departamento.png',
            images: ['/images/industrial-remodelacion-departamento.png'],
            description: isEn
                ? 'Development of industrial design and interior design projects focused on functionality, aesthetics and space optimization. Creation of customized solutions for commercial, residential spaces and furniture, integrating 3D modeling, visualization and conceptual development.'
                : 'Desarrollo de proyectos de diseño industrial y diseño interior enfocados en funcionalidad, estética y optimización de espacios. Creación de soluciones personalizadas para espacios comerciales, residenciales y mobiliario, integrando modelado 3D, visualización y desarrollo conceptual.',
            details: isEn ? [
                'Furniture design and functional elements',
                'Interior space remodeling and distribution',
                'Design concept development for commercial spaces',
                'Project modeling and visualization for clients',
                'Prototyping and product development'
            ] : [
                'Diseño de mobiliario y elementos funcionales',
                'Remodelación y distribución de espacios interiores',
                'Desarrollo de conceptos de diseño para espacios comerciales',
                'Modelado y visualización de proyectos para clientes',
                'Prototipado y desarrollo de productos'
            ],
            technologies: ['Diseño 3D', 'Renderizado', 'CAD', 'Modelado paramétrico']
        },
        {
            accent: 'uxui',
            category: isEn ? 'UX/UI DESIGN AND WEB DEVELOPMENT' : 'DISEÑO UX / UI Y DESARROLLO WEB',
            title: isEn
                ? 'Design and development of digital platforms'
                : 'Diseño y desarrollo de plataformas digitales',
            year: '2022 – 2025',
            image: '/images/Gemini_Generated_Image_3vovcz3vovcz3vov.png',
            images: ['/images/Gemini_Generated_Image_3vovcz3vovcz3vov.png'],
            description: isEn
                ? 'Interface design and development of web applications focused on user experience, functionality and accessibility. Participation in conceptualization, visual design, information architecture and development of digital platforms for companies and technology projects.'
                : 'Diseño de interfaces y desarrollo de aplicaciones web enfocadas en experiencia de usuario, funcionalidad y accesibilidad. Participación en la conceptualización, diseño visual, arquitectura de información y desarrollo de plataformas digitales para empresas y proyectos tecnológicos.',
            details: isEn ? [
                'User experience (UX) design',
                'Interface (UI) design for web applications',
                'Development and customization of web platforms',
                'Design of admin panels and multi-user systems',
                'Prototyping and user experience testing'
            ] : [
                'Diseño de experiencia de usuario (UX)',
                'Diseño de interfaces (UI) para aplicaciones web',
                'Desarrollo y personalización de plataformas web',
                'Diseño de paneles administrativos y sistemas multiusuario',
                'Prototipado y pruebas de experiencia de usuario'
            ],
            technologies: ['Figma', 'Diseño de interfaces', 'Desarrollo web', 'Prototipado digital']
        },
        {
            accent: 'branding',
            category: isEn ? 'GRAPHIC DESIGN AND BRANDING' : 'DISEÑO GRÁFICO Y BRANDING',
            title: isEn
                ? 'Development of visual identity and graphic communication'
                : 'Desarrollo de identidad visual y comunicación gráfica',
            year: '2021 – 2025',
            image: '/images/Gemini_Generated_Image_gpudthgpudthgpud.png',
            images: ['/images/Gemini_Generated_Image_gpudthgpudthgpud.png'],
            description: isEn
                ? 'Creation of visual identities and graphic pieces for companies, startups and institutional projects. Development of brand guidelines, logo design and production of graphic material for digital and print media.'
                : 'Creación de identidades visuales y piezas gráficas para empresas, emprendimientos y proyectos institucionales. Desarrollo de manuales de marca, diseño de logotipos y producción de material gráfico para medios digitales e impresos.',
            details: isEn ? [
                'Logo design and visual identity',
                'Creation of brand guidelines',
                'Design of graphic pieces for social media',
                'Design of advertising and institutional material',
                'Adaptation of visual identity to different formats'
            ] : [
                'Diseño de logotipos e identidad visual',
                'Creación de manuales de marca',
                'Diseño de piezas gráficas para redes sociales',
                'Diseño de material publicitario e institucional',
                'Adaptación de identidad visual a diferentes formatos'
            ],
            technologies: ['Illustrator', 'Photoshop', 'Diseño editorial', 'Branding']
        },
        {
            accent: 'mentoring',
            category: isEn ? 'MENTORING, TRAINING AND WORKSHOPS' : 'MENTORÍAS, FORMACIÓN Y TALLERES',
            title: isEn
                ? 'Training in entrepreneurship, technology and creativity'
                : 'Capacitación en emprendimiento, tecnología y creatividad',
            year: '2022 – 2025',
            image: '/images/pexels-pavel-danilyuk-6340630.png',
            images: ['/images/pexels-pavel-danilyuk-6340630.png'],
            description: isEn
                ? 'Design and development of workshops and mentoring processes oriented to entrepreneurship, innovation and digital tools. Training in project creation methodologies, digital content, immersive technologies and business idea development.'
                : 'Diseño y desarrollo de talleres y procesos de mentoría orientados a emprendimiento, innovación y herramientas digitales. Formación en metodologías de creación de proyectos, contenido digital, tecnologías inmersivas y desarrollo de ideas de negocio.',
            details: isEn ? [
                'Mentoring for entrepreneurs and business model development',
                'Workshops on digital content creation and technology',
                'Training in innovation and design methodologies',
                'Training in design tools, 360° video and virtual reality',
                'Support for projects in early stages'
            ] : [
                'Mentorías para emprendedores y desarrollo de modelos de negocio',
                'Talleres de creación de contenido digital y tecnología',
                'Capacitación en metodologías de innovación y diseño',
                'Formación en herramientas de diseño, video 360° y realidad virtual',
                'Acompañamiento a proyectos en etapas tempranas'
            ],
            technologies: ['Metodologías de innovación', 'Herramientas de diseño digital', 'Producción audiovisual', 'Realidad virtual y contenido inmersivo']
        }
    ];
};

// First sentence of the (untouched) description — used as the 1-2 line
// context under the headline, without introducing new copy.
const firstSentence = (text) => {
    const idx = text.indexOf('. ');
    return idx === -1 ? text : text.slice(0, idx + 1);
};

const ArrowIcon = ({ direction }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'prev' ? <path d="M15 5 L8 12 L15 19" /> : <path d="M9 5 L16 12 L9 19" />}
    </svg>
);

const slideVariants = {
    enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40 })
};

const Slide = ({ project, onOpen, language }) => (
    <div className={`container ${styles.storyGrid}`}>
        <div className={`image-reveal ${styles.storyImage}`}>
            <img src={project.image} alt={project.title} />
        </div>

        <div className={styles.storyContent}>
            <span className={styles.storyCategory} style={{ color: `var(--accent-${project.accent})` }}>
                <span className={styles.dot} style={{ background: `var(--accent-${project.accent})` }} />
                {project.category}
            </span>

            <h3 className={styles.storyTitle}>{project.title}</h3>

            <p className={styles.storyContext}>{firstSentence(project.description)}</p>

            <div className={styles.storyFooter}>
                <span className={styles.storyYear}>{project.year}</span>
                <button
                    className={styles.storyCta}
                    style={{ color: `var(--accent-${project.accent})` }}
                    onClick={() => onOpen(project)}
                >
                    {language === 'es' ? 'Ver caso de estudio' : 'View case study'} →
                </button>
            </div>
        </div>
    </div>
);

const Portfolio = () => {
    const { language } = useLanguage();
    const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
    const projects = getProjects(language);

    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const activeProject = projects[active];

    const goTo = (idx) => {
        setDirection(idx > active ? 1 : -1);
        setActive(idx);
    };
    const goNext = () => goTo((active + 1) % projects.length);
    const goPrev = () => goTo((active - 1 + projects.length) % projects.length);

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
        <section id="portfolio">
            <div className="container" style={{ marginBottom: 'var(--spacing-12)' }}>
                <h2 className="newsreader" style={{ fontSize: '3.5rem' }}>{t('proyectos')}</h2>
                <p className="description" style={{ marginTop: '0.5rem' }}>{t('descripcion_proyectos')}</p>
            </div>

            <div
                className={styles.carouselBand}
                style={{ backgroundColor: `var(--accent-${activeProject.accent}-tint)` }}
            >
                <div className={styles.carouselViewport}>
                    <button
                        className={`${styles.navArrow} ${styles.navArrowPrev}`}
                        onClick={goPrev}
                        aria-label={language === 'es' ? 'Proyecto anterior' : 'Previous project'}
                    >
                        <ArrowIcon direction="prev" />
                    </button>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={active}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Slide
                                project={activeProject}
                                language={language}
                                onOpen={(p) => {
                                    setSelectedProject(p);
                                    setCurrentImageIndex(0);
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <button
                        className={`${styles.navArrow} ${styles.navArrowNext}`}
                        onClick={goNext}
                        aria-label={language === 'es' ? 'Siguiente proyecto' : 'Next project'}
                    >
                        <ArrowIcon direction="next" />
                    </button>
                </div>

                <div className={styles.dotRow}>
                    {projects.map((project, idx) => (
                        <button
                            key={idx}
                            className={`${styles.dot2} ${idx === active ? styles.dotActive : ''}`}
                            style={idx === active ? { background: `var(--accent-${project.accent})` } : undefined}
                            onClick={() => goTo(idx)}
                            aria-label={project.title}
                        />
                    ))}
                </div>
            </div>

            {/* Panel deslizable con información del proyecto */}
            <AnimatePresence>
                {selectedProject && (
                    <div className={styles.panelOverlay} onClick={() => setSelectedProject(null)}>
                        <motion.div
                            className={styles.projectPanel}
                            initial={{ y: 50, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closePanel}
                                onClick={() => setSelectedProject(null)}
                            >
                                ✕ {t('cerrar')}
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
                                    <span className={styles.category} style={{ color: `var(--accent-${selectedProject.accent})` }}>{selectedProject.category}</span>
                                    <h2 className={styles.title}>{selectedProject.title}</h2>
                                    <p className={styles.year}>{selectedProject.year}</p>

                                    <div className={styles.description}>
                                        <p>{selectedProject.description}</p>
                                    </div>

                                    {selectedProject.details && (
                                        <div className={styles.details}>
                                            <h3>{t('detalles')}</h3>
                                            <ul>
                                                {selectedProject.details.map((detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedProject.technologies && (
                                        <div className={styles.technologies}>
                                            <h3>{t('tecnologias')}</h3>
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
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
