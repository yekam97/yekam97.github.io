const experienceData = [
  {
    company: 'Creat3d Diseño y Arquitectura',
    role: 'Arquitecto Diseñador y Cofundador',
    period: '2020 - 2025',
    description: 'Co-fundador y diseñador principal en Creat3d, donde lidero el desarrollo de proyectos de arquitectura interior, mobiliario y visualización 3D. Participó en la conceptualización de espacios residenciales, comerciales y turísticos, aplicando procesos de diseño centrados en la experiencia del usuario. Combino herramientas digitales, renders y realidad virtual para comunicar ideas de forma inmersiva, y gestiono la estrategia creativa, de comunicación y marketing del estudio.',
  },
  {
    company: 'Novus Creadores',
    role: 'Gestor de Proyectos e Innovación',
    period: '2024 - 2025',
    description: 'Responsable de la formulación, coordinación y seguimiento de proyectos orientados al desarrollo sostenible y la bioeconomía. Lideré la implementación de modelos productivos circulares, incluyendo biofábricas móviles y estrategias de aprovechamiento de residuos agrícolas. Además, apoyé la comunicación visual de los resultados mediante presentaciones, infografías y documentos de alto impacto, articulando los componentes técnicos y sociales de cada proyecto.',
  },
  {
    company: 'Grimorum',
    role: 'Diseñador Industrial',
    period: '2022 - 2024',
    description: 'Encargado del diseño y la producción de material gráfico y visual para proyectos digitales. Participé en el desarrollo de interfaces y experiencias UX/UI, elaboración de presentaciones corporativas, material de apoyo comercial y conceptualización de productos digitales. Combine la visión del diseño industrial con criterios estéticos y funcionales, garantizando coherencia visual y calidad en la entrega de piezas.',
  },
  {
    company: 'SENA',
    role: 'Formador y Tallerista en Contenidos 360° y Realidad Virtual',
    period: '2025',
    description: 'Facilité talleres de producción de contenido inmersivo, a incluir video 360°, edición en DaVinci Resolve y experiencias educativas con visores Oculus y aplicaciones como Panoee. Implementé metodologías activas para promover la creatividad, el trabajo colaborativo y el uso de herramientas digitales en la creación de narrativas visuales.',
  },
  {
    company: 'Universidad Pedagógica y Tecnológica de Colombia (UPTC)',
    role: 'Diseñador Industrial — Contrato de Apoyo Académico',
    period: 'Octubre - Diciembre 2024',
    description: 'Diseñé y desarrollé piezas experimentales en hilo dentro de un proyecto de investigación académica, explorando procesos artesanales aplicados al diseño contemporáneo. Mi trabajo integró materiales naturales, técnicas tradicionales y criterios de sostenibilidad, fortaleciendo el vínculo entre diseño, innovación y cultura material',
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="reveal timeline" style={{ marginTop: '4rem' }}>
      <div className="card">
        <h2>Donde las ideas tomaron forma</h2>
        <p className="tiny">Un resumen de mis roles, responsabilidades e impacto en los últimos años.</p>
        <div className="xp-list">
          {experienceData.map((job, index) => (
            <article className="xp" key={index}>
              <div className="xp-header">
                <h3 className="xp-title" style={{ fontSize: 'var(--step-0)' }}>{job.company}</h3>
                <span className="xp-period muted tiny">{job.period}</span>
              </div>
              <h4 className="xp-role" style={{ margin: '0', fontWeight: '600' }}>{job.role}</h4>
              <p className="muted" style={{ margin: '4px 0 0 0', fontSize: 'var(--step--1)' }}>{job.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}