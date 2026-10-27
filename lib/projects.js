export const getProjects = (language) => {
    const isEn = language === 'en';
    return [
        {
            accent: 'software',
            slug: 'padbox',
            category: isEn ? 'SOFTWARE DEVELOPMENT / MUSIC TECHNOLOGY' : 'DESARROLLO DE SOFTWARE / TECNOLOGÍA MUSICAL',
            title: isEn
                ? 'PadBox: a MIDI pad controller app for Windows'
                : 'PadBox: app para controladores MIDI de pads en Windows',
            year: '2026',
            image: '/images/padbox-escritorio.webp',
            images: ['/images/padbox-escritorio.webp', '/images/padbox-musica.webp', '/images/padbox-oficina.webp', '/images/padbox-drum-pad.webp'],
            video: {
                src: '/padbox/padbox-promo.mp4',
                poster: '/padbox/padbox-promo-portada.jpg',
                caption: isEn ? 'PadBox in 30 seconds: motion graphics with music made from the app’s own sounds' : 'PadBox en 30 segundos: motion graphics con música hecha con los sonidos de la app'
            },
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
            slug: 'diseno-industrial',
            category: isEn ? 'INDUSTRIAL DESIGN / INTERIOR DESIGN' : 'DISEÑO INDUSTRIAL / DISEÑO DE INTERIORES',
            title: isEn
                ? 'Design and development of spaces and products'
                : 'Diseño y desarrollo de espacios y productos',
            year: '2021 – 2025',
            image: '/images/industrial-remodelacion-departamento.webp',
            images: ['/images/industrial-remodelacion-departamento.webp', '/images/industrial-locales-creat3d.webp', '/images/industrial-cabaña-mazamitla.webp'],
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
            slug: 'plataformas-digitales',
            category: isEn ? 'UX/UI DESIGN AND WEB DEVELOPMENT' : 'DISEÑO UX / UI Y DESARROLLO WEB',
            title: isEn
                ? 'Design and development of digital platforms'
                : 'Diseño y desarrollo de plataformas digitales',
            year: '2022 – 2025',
            image: '/images/ux-plataforma-panel-rendimiento.jpg',
            images: ['/images/ux-plataforma-panel-rendimiento.jpg', '/images/ux-app-vendedores-ambulantes.webp', '/images/ux-dashboard-biofabricas.webp'],
            video: {
                src: '/videos/briolight.mp4',
                poster: '/videos/briolight-portada.jpg',
                caption: isEn ? 'Brio Light management portal: price list, quoting tool, quote history, order tracking and administration' : 'Portal de gestión Brio Light: lista de precios, cotizador, historial, seguimiento de pedidos y administración'
            },
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
                'Brio Light management portal: always-up-to-date price list, quoting tool with edit mode and PDF export, quote history, order tracking and an admin area with Excel inventory',
                'Web platform with automatic quoting tool, user system and real-time price list, replacing updates every 2-3 months',
                'Institutional website with its architecture and content organized across 5+ service areas',
                '6+ digital solutions (UX/UI) developed within interdisciplinary teams'
            ] : [
                'Diseño de experiencia de usuario (UX)',
                'Diseño de interfaces (UI) para aplicaciones web',
                'Desarrollo y personalización de plataformas web',
                'Diseño de paneles administrativos y sistemas multiusuario',
                'Prototipado y pruebas de experiencia de usuario',
                'Portal de gestión Brio Light: lista de precios siempre al día, cotizador con modo edición y PDF, historial de cotizaciones, seguimiento de pedidos y administración con inventario en Excel',
                'Plataforma web con cotizador automático, sistema de usuarios y lista de precios en tiempo real, en lugar de actualizaciones cada 2-3 meses',
                'Sitio web institucional con su arquitectura y contenidos organizados para más de 5 áreas de servicio',
                'Más de 6 soluciones digitales (UX/UI) desarrolladas en equipos interdisciplinarios'
            ],
            technologies: ['Figma', 'Diseño de interfaces', 'Desarrollo web', 'Prototipado digital', 'HTML y JavaScript', 'Vercel / Firestore', 'Wix']
        },
        {
            accent: 'branding',
            slug: 'identidad-visual',
            category: isEn ? 'GRAPHIC DESIGN AND BRANDING' : 'DISEÑO GRÁFICO Y BRANDING',
            title: isEn
                ? 'Development of visual identity and graphic communication'
                : 'Desarrollo de identidad visual y comunicación gráfica',
            year: '2021 – 2025',
            image: '/images/Gemini_Generated_Image_gpudthgpudthgpud.webp',
            images: ['/images/Gemini_Generated_Image_gpudthgpudthgpud.webp', '/images/grafico-identidad-visual.webp', '/images/grafico-estrategia-contenido.webp', '/images/grafico-creat3d-branding.webp'],
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
            slug: 'mentorias',
            category: isEn ? 'MENTORING, TRAINING AND WORKSHOPS' : 'MENTORÍAS, FORMACIÓN Y TALLERES',
            title: isEn
                ? 'Training in entrepreneurship, technology and creativity'
                : 'Capacitación en emprendimiento, tecnología y creatividad',
            year: '2022 – 2025',
            image: '/images/pexels-pavel-danilyuk-6340630.webp',
            images: ['/images/pexels-pavel-danilyuk-6340630.webp'],
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

export const PROJECT_SLUGS = ['padbox', 'diseno-industrial', 'plataformas-digitales', 'identidad-visual', 'mentorias'];
