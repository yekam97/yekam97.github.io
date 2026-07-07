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
        'Visual identity design for 4+ new service lines, creating 30+ core graphic materials for brand positioning.',
        'Creation of 50+ photorealistic renders and visual resources for architectural projects, increasing approval rates by 25%.',
        'Successful coordination of 10+ end-to-end design processes from conceptualization to final delivery.',
        'Implementation of 8+ visual communication strategies and storytelling to strengthen brand messaging.',
        'Participation in 3 major national innovation fairs to position and market the brand.'
      ] : [
        'Diseño de identidad visual para más de 4 nuevas líneas de servicio y creación de más de 30 piezas gráficas clave para posicionamiento.',
        'Creación de más de 50 renders fotorrealistas y recursos visuales para proyectos de arquitectura, incrementando la tasa de aprobación en un 25%.',
        'Coordinación exitosa de más de 10 procesos de diseño integral desde su fase de concepto hasta la entrega final.',
        'Implementación de más de 8 estrategias de comunicación visual y storytelling para fortalecer el mensaje de marca.',
        'Participación en 3 ferias y espacios nacionales de innovación para promocionar y posicionar la marca ante nuevos clientes.'
      ]
    },
    {
      period: isEn ? 'December 2025' : 'Diciembre 2025',
      role: isEn ? 'Industrial Designer – Inflatable Development' : 'Diseñador Industrial – Desarrollo de Inflables',
      company: 'Aeroinflables',
      responsibilities: isEn ? [
        'Support in design and development of 15+ advertising inflatables and pneumatic structures.',
        'Elaboration of 20+ conceptual proposals and structural visualizations through 3D modeling.',
        'Adaptation of 100% of designs to technical requirements, reducing manufacturing errors by 15%.',
        'Collaboration in the development of visual solutions for 8+ key promotional projects.'
      ] : [
        'Apoyo en el diseño y desarrollo de más de 15 inflables publicitarios y estructuras neumáticas.',
        'Elaboración de más de 20 propuestas conceptuales y visualizaciones estructurales mediante modelado 3D.',
        'Adaptación del 100% de los diseños a requerimientos técnicos de fabricación y montaje, reduciendo fallas de ensamblaje en un 15%.',
        'Colaboración en el desarrollo de soluciones visuales para más de 8 proyectos promocionales clave.'
      ]
    },
    {
      period: isEn ? 'October 2025 – December 2025' : 'Octubre 2025 – Diciembre 2025',
      role: isEn ? 'Web Designer and Digital Support' : 'Diseñador Web y Soporte Digital',
      company: 'Asograduados',
      responsibilities: isEn ? [
        'Design and development of the institutional website using Wix, increasing monthly traffic by 40%.',
        'Structuring of site architecture and content organization for 5+ active departments.',
        'Visual interface design aligned with the organization\'s identity, achieving 95% user satisfaction.',
        'Optimization of user experience, reducing path to access graduate services down to 3 simple clicks.'
      ] : [
        'Diseño y desarrollo del sitio web institucional utilizando Wix, incrementando el tráfico mensual en un 40%.',
        'Estructuración de la arquitectura del sitio y organización de contenidos para más de 5 áreas de servicio.',
        'Diseño de interfaz visual alineada con la identidad de la organización, logrando un 95% de satisfacción del usuario.',
        'Optimización de la experiencia de usuario, reduciendo el acceso a trámites para egresados a solo 3 clics.'
      ]
    },
    {
      period: isEn ? 'June 2025 – August 2025' : 'Junio 2025 – Agosto 2025',
      role: isEn ? 'Instructor in Innovation and Virtual Reality' : 'Instructor en Innovación y Realidad Virtual',
      company: 'SENNOVA – Tunja',
      responsibilities: isEn ? [
        'Training of 120+ professionals and instructors in creating immersive content through virtual reality.',
        'Development of 15+ practical workshops on 360° videos, virtual tours, and livestreaming.',
        'Instruction in content capture, editing, and publishing tools for 50+ active projects.',
        'Guidance in designing 10+ interactive digital experiences applied to education.'
      ] : [
        'Capacitación y formación de más de 120 alumnos y docentes en creación de contenido inmersivo mediante realidad virtual.',
        'Desarrollo de más de 15 talleres prácticos sobre videos 360°, recorridos virtuales y transmisiones en vivo.',
        'Capacitación en herramientas de captura, edición y publicación de contenidos para más de 50 proyectos.',
        'Orientación en el diseño de más de 10 experiencias digitales interactivas aplicadas al sector educativo.'
      ]
    },
    {
      period: isEn ? 'October 2024 – October 2025' : 'Octubre 2024 – Octubre 2025',
      role: isEn ? 'Innovation Project Manager' : 'Gestor de Proyectos de Innovación',
      company: 'Novus Creadores SAS',
      responsibilities: isEn ? [
        'Design and facilitation of 30+ workshops and mentorship sessions in innovation and entrepreneurship.',
        'Support for 50+ local entrepreneurs in validating and accelerating their business models.',
        'Systematic application of methodologies (Design Thinking, Lean Startup, Canvas) on 40+ active projects.',
        'Coordination of 4 interdisciplinary teams within regional business development programs.'
      ] : [
        'Diseño y facilitación de más de 30 talleres y mentorías en innovación y emprendimiento.',
        'Acompañamiento a más de 50 emprendedores locales en la validación y aceleración de modelos de negocio.',
        'Aplicación sistemática de metodologías (Design Thinking, Lean Startup y Canvas) en más de 40 ideas de negocio.',
        'Coordinación de 4 equipos interdisciplinarios en programas regionales de desarrollo empresarial.'
      ]
    },
    {
      period: isEn ? 'October 2024 – December 2024' : 'Octubre 2024 – Diciembre 2024',
      role: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      company: 'UPTC Colombia (Hybrid)',
      responsibilities: isEn ? [
        'Participation in the design and development of 3 modular grain silo prototypes.',
        'Functional and structural analysis to improve grain storage capacity and efficiency by 20%.',
        'Development of 12+ 3D CAD design models to optimize agricultural storage.',
        'Collaborative work with 3 technical and academic teams to streamline validation.'
      ] : [
        'Participación en el diseño y desarrollo de 3 prototipos de silos modulares para granos.',
        'Análisis funcional y estructural para mejorar la capacidad de almacenamiento y eficiencia en un 20%.',
        'Desarrollo de más de 12 modelos de diseño 3D CAD para optimizar el almacenamiento agrícola.',
        'Trabajo colaborativo con 3 equipos técnicos y académicos para agilizar las fases de validación.'
      ]
    },
    {
      period: isEn ? 'February 2023 – October 2024' : 'Febrero 2023 – Octubre 2024',
      role: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      company: 'Grimorum (Remote)',
      responsibilities: isEn ? [
        'Development of 50+ graphic pieces and high-impact corporate presentations for internal/external clients.',
        'Conceptual and product design with focus on innovation, creating 8+ viable market concepts.',
        '3D modeling and prototyping to validate design concepts, reducing validation cycles by 30%.',
        'Active participation in interdisciplinary teams, designing 6+ digital solutions (UX/UI).'
      ] : [
        'Desarrollo de más de 50 piezas gráficas y presentaciones corporativas de alto impacto para clientes internos y externos.',
        'Diseño conceptual y de productos con enfoque en innovación, aportando más de 8 conceptos viables al mercado.',
        'Modelado 3D y prototipado para validar conceptos de diseño, reduciendo ciclos de validación en un 30%.',
        'Participación activa en equipos interdisciplinarios en el desarrollo de más de 6 soluciones digitales (UX/UI).'
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
          <div className={styles.timelineLine} />
          {experienceData.map((exp, idx) => (
            <motion.div
              key={idx}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.periodCol}>
                <div className={styles.periodPill}>{exp.period}</div>
              </div>

              <div className={styles.nodeCol}>
                <div className={styles.dot} />
              </div>

              <div className={styles.content}>
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