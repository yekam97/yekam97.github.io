import { motion } from 'framer-motion';
import styles from './Experience.module.css';

const experienceData = [
  {
    period: 'Marzo 2024 – Marzo 2025',
    role: 'Diseñador Industrial / Líder de Proyectos de Diseño',
    company: 'Creat3D SAS',
    responsibilities: [
      'Diseño de identidad visual para nuevas líneas de servicio y material gráfico.',
      'Creación de renders fotorrealistas y recursos visuales para proyectos arquitectónicos.',
      'Coordinación de procesos de diseño desde la conceptualización hasta la entrega final.',
      'Implementación de estrategias de comunicación visual y storytelling.',
      'Participación en ferias y espacios de innovación para posicionar la marca.'
    ]
  },
  {
    period: 'Diciembre 2025',
    role: 'Diseñador Industrial – Desarrollo de Inflables',
    company: 'Aeroinflables',
    responsibilities: [
      'Apoyo en el diseño y desarrollo de inflables publicitarios y estructuras neumáticas.',
      'Elaboración de propuestas conceptuales y visualización mediante modelado 3D.',
      'Adaptación de diseños a requerimientos técnicos de fabricación y montaje.',
      'Colaboración en el desarrollo de soluciones visuales para proyectos promocionales.'
    ]
  },
  {
    period: 'Octubre 2025 – Diciembre 2025',
    role: 'Diseñador Web y Soporte Digital',
    company: 'Asograduados',
    responsibilities: [
      'Diseño y desarrollo del sitio web institucional utilizando Wix.',
      'Estructuración de la arquitectura del sitio y organización de contenidos.',
      'Diseño de interfaz visual alineada con la identidad de la organización.',
      'Optimización de la experiencia de usuario para el acceso a servicios para egresados.'
    ]
  },
  {
    period: 'Junio 2025 – Agosto 2025',
    role: 'Instructor en Innovación y Realidad Virtual',
    company: 'SENNOVA – Tunja',
    responsibilities: [
      'Formación en creación de contenido inmersivo mediante realidad virtual.',
      'Desarrollo de talleres sobre videos 360°, recorridos virtuales y livestreaming.',
      'Capacitación en herramientas de captura, edición y publicación de contenidos.',
      'Orientación en el diseño de experiencias digitales aplicadas a educación.'
    ]
  },
  {
    period: 'Octubre 2024 – Octubre 2025',
    role: 'Gestor de Proyectos de Innovación',
    company: 'Novus Creadores SAS',
    responsibilities: [
      'Diseño y facilitación de talleres y mentorías en innovación y emprendimiento.',
      'Acompañamiento a emprendedores en validación de modelos de negocio.',
      'Aplicación de metodologías como Design Thinking, Lean Startup y Canvas.',
      'Coordinación de equipos y actividades dentro de programas de desarrollo empresarial.'
    ]
  },
  {
    period: 'Octubre 2024 – Diciembre 2024',
    role: 'Diseñador Industrial',
    company: 'UPTC Colombia (Híbrida)',
    responsibilities: [
      'Participación en el diseño y desarrollo de silos modulares para granos.',
      'Análisis funcional y estructural para mejorar capacidad y eficiencia.',
      'Desarrollo de modelos de diseño para optimizar el almacenamiento agrícola.',
      'Trabajo colaborativo con equipos técnicos y académicos.'
    ]
  },
  {
    period: 'Febrero 2023 – Octubre 2024',
    role: 'Diseñador Industrial',
    company: 'Grimorum (Remota)',
    responsibilities: [
      'Desarrollo de piezas gráficas y presentaciones corporativas internas/externas.',
      'Diseño conceptual y de productos con enfoque en innovación.',
      'Modelado 3D y prototipado para validar conceptos de diseño.',
      'Participación en equipos interdisciplinarios para soluciones de UX.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experiencia" className="container section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="label-md">Cronología</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)', textAlign: 'center' }}>Trayectoria Profesional</h2>

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