'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Portfolio.module.css';

const getProjects = (language) => {
    const isEn = language === 'en';
    return [
        {
            accent: 'software',
            category: isEn ? 'SOFTWARE DEVELOPMENT / MUSIC TECHNOLOGY' : 'DESARROLLO DE SOFTWARE / TECNOLOGÍA MUSICAL',
            title: isEn
                ? 'PadBox: a MIDI pad controller app for Windows'
                : 'PadBox: app para controladores MIDI de pads en Windows',
            year: '2026',
            image: '/images/padbox-escritorio.jpg',
            images: ['/images/padbox-escritorio.jpg', '/images/padbox-musica.png', '/images/padbox-oficina.png', '/images/padbox-drum-pad.png'],
            captions: isEn
                ? ['PadBox on the desktop: Office mode with Windows shortcuts on 16 pads', 'Music mode: instruments, rhythms and loops', 'Office mode: shortcuts for Windows, OBS, Photoshop and the browser', 'Drum-pad mode with original synthesized sounds']
                : ['PadBox en el escritorio: modo Oficina con atajos de Windows en 16 pads', 'Modo Música: instrumentos, ritmos y bucles', 'Modo Oficina: atajos de Windows, OBS, Photoshop y navegador', 'Modo drum pad con sonidos originales sintetizados'],
            highlights: isEn ? [
                { value: '2', label: 'modes on one pad' },
                { value: '12', label: 'music presets' },
                { value: '3', label: 'controller profiles' }
            ] : [
                { value: '2', label: 'modos en un solo pad' },
                { value: '12', label: 'presets musicales' },
                { value: '3', label: 'perfiles de controlador' }
            ],
            description: isEn
                ? 'Free, open-source desktop app that turns any MIDI pad controller into a musical instrument and a shortcut panel for Windows. I designed and developed it end to end: from the interaction model and visual design to the MIDI integration, a custom audio engine and RGB lighting control for the M-VAVE SMC-PAD Pocket.'
                : 'App de escritorio gratuita y de código abierto que convierte cualquier controlador MIDI de pads en un instrumento musical y en un panel de atajos para Windows. La diseñé y desarrollé de principio a fin: desde el modelo de interacción y el diseño visual hasta la integración MIDI, un motor de audio propio y el control de las luces RGB del M-VAVE SMC-PAD Pocket.',
            details: isEn ? [
                'Two modes on one pad: Music (rhythms, instruments, loops) and Office (Windows, OBS, Photoshop and browser shortcuts)',
                'Twelve unique music presets, each with its own looped rhythm, instrument, key and drum kit',
                'Drum-pad style mode with original synthesized sounds and loops that start in sync',
                'Drag-and-drop custom sounds (mp3, wav) onto any pad',
                'Profiles for M-VAVE, Akai and Novation controllers, plus auto-learning of any MIDI controller',
                'Pad colors on the device matched to each preset and grouped by function'
            ] : [
                'Dos modos en un solo pad: Música (ritmos, instrumentos, bucles) y Oficina (atajos de Windows, OBS, Photoshop y navegador)',
                'Doce presets musicales únicos, cada uno con su propio ritmo en bucle, instrumento, tonalidad y batería',
                'Modo estilo drum pad con sonidos originales sintetizados y bucles que entran sincronizados',
                'Sonidos propios (mp3, wav) arrastrándolos sobre cualquier pad',
                'Perfiles para controladores M-VAVE, Akai y Novation, y aprendizaje automático de cualquier controlador MIDI',
                'Colores de los pads en el aparato según el preset y agrupados por función'
            ],
            technologies: ['C# / .NET', 'Windows Forms', 'MIDI y SysEx', isEn ? 'Audio synthesis' : 'Síntesis de audio', 'UX/UI'],
            links: [
                { label: isEn ? 'Download PadBox' : 'Descargar PadBox', href: 'https://yekam97.github.io/padbox/', primary: true },
                { label: isEn ? 'Source code on GitHub' : 'Código en GitHub', href: 'https://github.com/yekam97/PadBox' }
            ]
        },
        {
            accent: 'industrial',
            category: isEn ? 'INDUSTRIAL DESIGN / INTERIOR DESIGN' : 'DISEÑO INDUSTRIAL / DISEÑO DE INTERIORES',
            title: isEn
                ? 'Design and development of spaces and products'
                : 'Diseño y desarrollo de espacios y productos',
            year: '2021 – 2025',
            image: '/images/industrial-remodelacion-departamento.png',
            images: ['/images/industrial-remodelacion-departamento.png', '/images/industrial-locales-creat3d.png', '/images/industrial-cabaña-mazamitla.png'],
            captions: isEn
                ? ['Apartment remodeling: Bosques de Ponderosa', 'Psicosensum psychology clinic, Tunja – Boyacá: reception design', 'MOARQ single-family house, Moniquirá – Boyacá: technical package']
                : ['Remodelación de apartamento: Bosques de Ponderosa', 'Clínica psicológica Psicosensum, Tunja – Boyacá: diseño de la recepción', 'Vivienda unifamiliar MOARQ, Moniquirá – Boyacá: parte técnica'],
            highlights: isEn ? [
                { value: '50+', label: 'photorealistic renders' },
                { value: '+25%', label: 'project approval rate' },
                { value: '12+', label: '3D CAD models' }
            ] : [
                { value: '50+', label: 'renders fotorrealistas' },
                { value: '+25%', label: 'tasa de aprobación de proyectos' },
                { value: '12+', label: 'modelos 3D CAD' }
            ],
            description: isEn
                ? 'Development of industrial design and interior design projects focused on functionality, aesthetics and space optimization. Creation of customized solutions for commercial, residential spaces and furniture, integrating 3D modeling, visualization and conceptual development.'
                : 'Desarrollo de proyectos de diseño industrial y diseño interior enfocados en funcionalidad, estética y optimización de espacios. Creación de soluciones personalizadas para espacios comerciales, residenciales y mobiliario, integrando modelado 3D, visualización y desarrollo conceptual.',
            details: isEn ? [
                'Furniture design and functional elements',
                'Interior space remodeling and distribution',
                'Design concept development for commercial spaces',
                'Project modeling and visualization for clients',
                'Prototyping and product development',
                'Photorealistic renders and visual resources for architectural projects',
                'Modular grain silo prototypes, with structural analysis and 3D CAD models',
                'Advertising inflatables and pneumatic structures adapted to manufacturing requirements'
            ] : [
                'Diseño de mobiliario y elementos funcionales',
                'Remodelación y distribución de espacios interiores',
                'Desarrollo de conceptos de diseño para espacios comerciales',
                'Modelado y visualización de proyectos para clientes',
                'Prototipado y desarrollo de productos',
                'Renders fotorrealistas y recursos visuales para proyectos de arquitectura',
                'Prototipos de silos modulares para granos, con análisis estructural y modelos 3D CAD',
                'Inflables publicitarios y estructuras neumáticas adaptados a requerimientos de fabricación'
            ],
            technologies: ['Diseño 3D', 'Renderizado', 'CAD', 'Modelado paramétrico', isEn ? 'Prototyping' : 'Prototipado']
        },
        {
            accent: 'uxui',
            category: isEn ? 'UX/UI DESIGN AND WEB DEVELOPMENT' : 'DISEÑO UX / UI Y DESARROLLO WEB',
            title: isEn
                ? 'Design and development of digital platforms'
                : 'Diseño y desarrollo de plataformas digitales',
            year: '2022 – 2025',
            image: '/images/ux-plataforma-panel-rendimiento.jpg',
            images: ['/images/ux-plataforma-panel-rendimiento.jpg', '/images/ux-app-vendedores-ambulantes.png', '/images/ux-dashboard-biofabricas.png'],
            captions: isEn
                ? ['Performance overview panel: products, quotes and sales at a glance', 'Mobile app concept: splash screen, catalog and navigation menu', 'Online store concept (CodeStyle): product page and cart']
                : ['Panel de resumen de rendimiento: productos, cotizaciones y ventas de un vistazo', 'Concepto de app móvil: pantalla de inicio, catálogo y menú de navegación', 'Concepto de tienda en línea (CodeStyle): ficha de producto y carrito'],
            highlights: isEn ? [
                { value: '1,600+', label: 'references in a real-time quoting tool' },
                { value: '−50%', label: 'quoting and dispatch errors' },
                { value: '3', label: 'clicks to reach graduate services' }
            ] : [
                { value: '1.600+', label: 'referencias en un cotizador en tiempo real' },
                { value: '−50%', label: 'errores de cotización y despacho' },
                { value: '3', label: 'clics para llegar a los trámites de egresados' }
            ],
            description: isEn
                ? 'Interface design and development of web applications focused on user experience, functionality and accessibility. Participation in conceptualization, visual design, information architecture and development of digital platforms for companies and technology projects.'
                : 'Diseño de interfaces y desarrollo de aplicaciones web enfocadas en experiencia de usuario, funcionalidad y accesibilidad. Participación en la conceptualización, diseño visual, arquitectura de información y desarrollo de plataformas digitales para empresas y proyectos tecnológicos.',
            details: isEn ? [
                'User experience (UX) design',
                'Interface (UI) design for web applications',
                'Development and customization of web platforms',
                'Design of admin panels and multi-user systems',
                'Prototyping and user experience testing',
                'Web platform with automatic quoting tool, user system and real-time price list, replacing updates every 2-3 months',
                'Institutional website with its architecture and content organized across 5+ service areas',
                '6+ digital solutions (UX/UI) developed within interdisciplinary teams'
            ] : [
                'Diseño de experiencia de usuario (UX)',
                'Diseño de interfaces (UI) para aplicaciones web',
                'Desarrollo y personalización de plataformas web',
                'Diseño de paneles administrativos y sistemas multiusuario',
                'Prototipado y pruebas de experiencia de usuario',
                'Plataforma web con cotizador automático, sistema de usuarios y lista de precios en tiempo real, en lugar de actualizaciones cada 2-3 meses',
                'Sitio web institucional con su arquitectura y contenidos organizados para más de 5 áreas de servicio',
                'Más de 6 soluciones digitales (UX/UI) desarrolladas en equipos interdisciplinarios'
            ],
            technologies: ['Figma', 'Diseño de interfaces', 'Desarrollo web', 'Prototipado digital', 'HTML y JavaScript', 'Vercel / Firestore', 'Wix']
        },
        {
            accent: 'branding',
            category: isEn ? 'GRAPHIC DESIGN AND BRANDING' : 'DISEÑO GRÁFICO Y BRANDING',
            title: isEn
                ? 'Development of visual identity and graphic communication'
                : 'Desarrollo de identidad visual y comunicación gráfica',
            year: '2021 – 2025',
            image: '/images/Gemini_Generated_Image_gpudthgpudthgpud.png',
            images: ['/images/Gemini_Generated_Image_gpudthgpudthgpud.png', '/images/grafico-identidad-visual.png', '/images/grafico-estrategia-contenido.png', '/images/grafico-creat3d-branding.png'],
            captions: isEn
                ? ['Mascokits: packaging and brand application', 'Mascokits: logotype', 'Brand exploration: hexagonal mark and line variations', 'Creat3D Design and Architecture: portfolio']
                : ['Mascokits: empaque y aplicación de marca', 'Mascokits: logotipo', 'Exploración de marca: isotipo hexagonal y variaciones de línea', 'Creat3D Diseño y Arquitectura: portafolio'],
            highlights: isEn ? [
                { value: '4+', label: 'new service lines with their own identity' },
                { value: '30+', label: 'key graphic pieces' },
                { value: '8+', label: 'visual communication strategies' }
            ] : [
                { value: '4+', label: 'nuevas líneas de servicio con identidad propia' },
                { value: '30+', label: 'piezas gráficas clave' },
                { value: '8+', label: 'estrategias de comunicación visual' }
            ],
            description: isEn
                ? 'Creation of visual identities and graphic pieces for companies, startups and institutional projects. Development of brand guidelines, logo design and production of graphic material for digital and print media.'
                : 'Creación de identidades visuales y piezas gráficas para empresas, emprendimientos y proyectos institucionales. Desarrollo de manuales de marca, diseño de logotipos y producción de material gráfico para medios digitales e impresos.',
            details: isEn ? [
                'Logo design and visual identity',
                'Creation of brand guidelines',
                'Design of graphic pieces for social media',
                'Design of advertising and institutional material',
                'Adaptation of visual identity to different formats',
                'Visual storytelling to strengthen brand messaging',
                'Packaging structure and graphics, lowering material costs and speeding up assembly',
                'Corporate presentations and brand material for internal and external clients'
            ] : [
                'Diseño de logotipos e identidad visual',
                'Creación de manuales de marca',
                'Diseño de piezas gráficas para redes sociales',
                'Diseño de material publicitario e institucional',
                'Adaptación de identidad visual a diferentes formatos',
                'Storytelling visual para fortalecer el mensaje de marca',
                'Diseño de la estructura y gráfica de empaques, disminuyendo costos de material y agilizando el ensamble',
                'Presentaciones corporativas y material de marca para clientes internos y externos'
            ],
            technologies: ['Illustrator', 'Photoshop', 'Diseño editorial', 'Branding', isEn ? 'Packaging design' : 'Diseño de empaques']
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
            highlights: isEn ? [
                { value: '30+', label: 'workshops and mentoring sessions' },
                { value: '50+', label: 'entrepreneurs supported' },
                { value: '120+', label: 'people trained in VR and immersive content' }
            ] : [
                { value: '30+', label: 'talleres y mentorías' },
                { value: '50+', label: 'emprendedores acompañados' },
                { value: '120+', label: 'personas capacitadas en RV y contenido inmersivo' }
            ],
            description: isEn
                ? 'Design and development of workshops and mentoring processes oriented to entrepreneurship, innovation and digital tools. Training in project creation methodologies, digital content, immersive technologies and business idea development.'
                : 'Diseño y desarrollo de talleres y procesos de mentoría orientados a emprendimiento, innovación y herramientas digitales. Formación en metodologías de creación de proyectos, contenido digital, tecnologías inmersivas y desarrollo de ideas de negocio.',
            details: isEn ? [
                'Mentoring for entrepreneurs and business model development',
                'Workshops on digital content creation and technology',
                'Training in innovation and design methodologies',
                'Training in design tools, 360° video and virtual reality',
                'Support for projects in early stages',
                'Design Thinking, Lean Startup and Canvas applied to 40+ business ideas',
                '15+ practical workshops on 360° video, virtual tours and livestreaming',
                'Coordination of interdisciplinary teams within regional business development programs'
            ] : [
                'Mentorías para emprendedores y desarrollo de modelos de negocio',
                'Talleres de creación de contenido digital y tecnología',
                'Capacitación en metodologías de innovación y diseño',
                'Formación en herramientas de diseño, video 360° y realidad virtual',
                'Acompañamiento a proyectos en etapas tempranas',
                'Design Thinking, Lean Startup y Canvas aplicados a más de 40 ideas de negocio',
                'Más de 15 talleres prácticos sobre video 360°, recorridos virtuales y transmisiones en vivo',
                'Coordinación de equipos interdisciplinarios en programas regionales de desarrollo empresarial'
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

            {project.highlights && (
                <ul className={styles.storyStats}>
                    {project.highlights.map((h) => (
                        <li key={h.label}>
                            <strong style={{ color: `var(--accent-${project.accent})` }}>{h.value}</strong>
                            <span>{h.label}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.storyFooter}>
                <span className={styles.storyYear}>{project.year}</span>
                <button
                    className={styles.storyCta}
                    style={{ color: `var(--accent-${project.accent})` }}
                    onClick={() => onOpen(project)}
                >
                    {language === 'es' ? 'Ver más información' : 'More information'} →
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

    // Preload every project image up front (audit finding 1.2): the
    // carousel's <img> only started fetching its src the moment a
    // slide mounted, so navigating to a project whose image hadn't
    // been requested yet raced the 0.45s slide transition — the first
    // visit showed a blank rectangle, and only a second visit (now
    // served from cache) painted correctly. There are only a handful
    // of images, so preloading all of them (not just the adjacent ones)
    // is simpler and just as cheap.
    useEffect(() => {
        projects.forEach((p) => {
            const img = new Image();
            img.src = p.image;
        });
        // projects is re-derived every render (language toggle), but
        // the image URLs themselves never change with language — only
        // need this once on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    {/* How many projects there are isn't obvious before you start
                        clicking through the dots (audit finding, section 4) — a
                        plain "1 / 4" makes that immediately clear. */}
                    <span className={styles.slideCounter} aria-hidden="true">{active + 1} / {projects.length}</span>
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
                                    {selectedProject.captions?.[currentImageIndex] && (
                                        <p className={styles.caption}>{selectedProject.captions[currentImageIndex]}</p>
                                    )}
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

                                    {selectedProject.highlights && (
                                        <div className={styles.results}>
                                            <h3>{language === 'es' ? 'Resultados' : 'Results'}</h3>
                                            <ul className={styles.resultsGrid}>
                                                {selectedProject.highlights.map((h) => (
                                                    <li key={h.label}>
                                                        <strong style={{ color: `var(--accent-${selectedProject.accent})` }}>{h.value}</strong>
                                                        <span>{h.label}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedProject.links && (
                                        <div className={styles.links}>
                                            {selectedProject.links.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`${styles.linkBtn} ${link.primary ? styles.linkBtnPrimary : ''}`}
                                                    style={link.primary ? { background: `var(--accent-${selectedProject.accent})` } : undefined}
                                                >
                                                    {link.label} →
                                                </a>
                                            ))}
                                        </div>
                                    )}

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
