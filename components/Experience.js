import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Experience.module.css';

const getExperienceData = (language) => {
  const isEn = language === 'en';
  return [
    {
      period: isEn ? 'March 2024 – March 2025' : 'Marzo 2024 – Marzo 2025',
      role: isEn ? 'Industrial Designer / Design Project Leader' : 'Diseñador Industrial / Líder de Proyectos de Diseño',
      company: 'Creat3D SAS',
      responsibilities: isEn ? [
        'Visual identity design for new service lines and graphic material.',
        'Creation of photorealistic renders and visual resources for architectural projects.',
        'Coordination of design processes from conceptualization to final delivery.',
        'Implementation of visual communication strategies and storytelling.',
        'Participation in innovation fairs and spaces to position the brand.'
      ] : [
        'Diseño de identidad visual para nuevas líneas de servicio y material gráfico.',
        'Creación de renders fotorrealistas y recursos visuales para proyectos arquitectónicos.',
        'Coordinación de procesos de diseño desde la conceptualización hasta la entrega final.',
        'Implementación de estrategias de comunicación visual y storytelling.',
        'Participación en ferias y espacios de innovación para posicionar la marca.'
      ]
    },
    {
      period: isEn ? 'December 2025' : 'Diciembre 2025',
      role: isEn ? 'Industrial Designer – Inflatable Development' : 'Diseñador Industrial – Desarrollo de Inflables',
      company: 'Aeroinflables',
      responsibilities: isEn ? [
        'Support in design and development of advertising inflatables and pneumatic structures.',
        'Elaboration of conceptual proposals and visualization through 3D modeling.',
        'Adaptation of designs to technical requirements for manufacturing and assembly.',
        'Collaboration in the development of visual solutions for promotional projects.'
      ] : [
        'Apoyo en el diseño y desarrollo de inflables publicitarios y estructuras neumáticas.',
        'Elaboración de propuestas conceptuales y visualización mediante modelado 3D.',
        'Adaptación de diseños a requerimientos técnicos de fabricación y montaje.',
        'Colaboración en el desarrollo de soluciones visuales para proyectos promocionales.'
      ]
    },
    {
      period: isEn ? 'October 2025 – December 2025' : 'Octubre 2025 – Diciembre 2025',
      role: isEn ? 'Web Designer and Digital Support' : 'Diseñador Web y Soporte Digital',
      company: 'Asograduados',
      responsibilities: isEn ? [
        'Design and development of institutional website using Wix.',
        'Structuring of site architecture and content organization.',
        'Visual interface design aligned with the organization\'s identity.',
        'Optimization of user experience for accessing services for graduates.'
      ] : [
        'Diseño y desarrollo del sitio web institucional utilizando Wix.',
        'Estructuración de la arquitectura del sitio y organización de contenidos.',
        'Diseño de interfaz visual alineada con la identidad de la organización.',
        'Optimización de la experiencia de usuario para el acceso a servicios para egresados.'
      ]
    },
    {
      period: isEn ? 'June 2025 – August 2025' : 'Junio 2025 – Agosto 2025',
      role: isEn ? 'Instructor in Innovation and Virtual Reality' : 'Instructor en Innovación y Realidad Virtual',
      company: 'SENNOVA – Tunja',
      responsibilities: isEn ? [
        'Training in creating immersive content through virtual reality.',
        'Development of workshops on 360° videos, virtual tours and livestreaming.',
        'Training in content capture, editing and publishing tools.',
        'Guidance in designing digital experiences applied to education.'
      ] : [
        'Formación en creación de contenido inmersivo mediante realidad virtual.',
        'Desarrollo de talleres sobre videos 360°, recorridos virtuales y livestreaming.',
        'Capacitación en herramientas de captura, edición y publicación de contenidos.',
        'Orientación en el diseño de experiencias digitales aplicadas a educación.'
      ]
    },
    {
      period: isEn ? 'October 2024 – October 2025' : 'Octubre 2024 – Octubre 2025',
      role: isEn ? 'Innovation Project Manager' : 'Gestor de Proyectos de Innovación',
      company: 'Novus Creadores SAS',
      responsibilities: isEn ? [
        'Design and facilitation of workshops and mentorships in innovation and entrepreneurship.',
        'Support for entrepreneurs in business model validation.',
        'Application of methodologies such as Design Thinking, Lean Startup and Canvas.',
        'Coordination of teams and activities within business development programs.'
      ] : [
        'Diseño y facilitación de talleres y mentorías en innovación y emprendimiento.',
        'Acompañamiento a emprendedores en validación de modelos de negocio.',
        'Aplicación de metodologías como Design Thinking, Lean Startup y Canvas.',
        'Coordinación de equipos y actividades dentro de programas de desarrollo empresarial.'
      ]
    },
    {
      period: isEn ? 'October 2024 – December 2024' : 'Octubre 2024 – Diciembre 2024',
      role: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      company: 'UPTC Colombia (Hybrid)',
      responsibilities: isEn ? [
        'Participation in the design and development of modular grain silos.',
        'Functional and structural analysis to improve capacity and efficiency.',
        'Development of design models to optimize agricultural storage.',
        'Collaborative work with technical and academic teams.'
      ] : [
        'Participación en el diseño y desarrollo de silos modulares para granos.',
        'Análisis funcional y estructural para mejorar capacidad y eficiencia.',
        'Desarrollo de modelos de diseño para optimizar el almacenamiento agrícola.',
        'Trabajo colaborativo con equipos técnicos y académicos.'
      ]
    },
    {
      period: isEn ? 'February 2023 – October 2024' : 'Febrero 2023 – Octubre 2024',
      role: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      company: 'Grimorum (Remote)',
      responsibilities: isEn ? [
        'Development of graphic pieces and internal/external corporate presentations.',
        'Conceptual and product design with focus on innovation.',
        '3D modeling and prototyping to validate design concepts.',
        'Participation in interdisciplinary teams for UX solutions.'
      ] : [
        'Desarrollo de piezas gráficas y presentaciones corporativas internas/externas.',
        'Diseño conceptual y de productos con enfoque en innovación.',
        'Modelado 3D y prototipado para validar conceptos de diseño.',
        'Participación en equipos interdisciplinarios para soluciones de UX.'
      ]
    }
  ];
};

const Experience = () => {
  const { language } = useLanguage();
  const experienceData = getExperienceData(language);

  return (
    <section id="experiencia" className="container section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="label-md">{language === 'es' ? 'Cronología' : 'Timeline'}</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)', textAlign: 'center' }}>
          {language === 'es' ? 'Trayectoria Profesional' : 'Professional Trajectory'}
        </h2>

        <div className={styles.timelineContainer}>
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.periodCol}>
                <div className={styles.periodPill}>{exp.period}</div>
              </div>

              <div className={styles.content}>
                <div className={styles.dot} />
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
                <ul className={styles.respList}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className={styles.respItem}>{resp}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;