const experienceData = [
  {
    title: 'Creat3d Diseño y Arquitectura – Cofundador y Director de Proyectos',
    description: 'Diseño de interiores, renders, mobiliario y conceptualización de espacios comerciales.',
  },
  {
    title: 'Consultor CORPOVALLE – Diseño de modelo bioeconómico para productores de plátano',
    description: 'Implementación de estrategias de sostenibilidad y economía circular.',
  },
  {
    title: 'Mentor y formador de emprendedores – Metodologías Startup y Design Thinking',
    description: 'Acompañamiento en la validación de ideas y desarrollo de modelos de negocio.',
  },
  {
    title: 'Docente y tallerista – Sennova / SENA',
    description: 'Creación de contenidos educativos en diseño, VR y creatividad aplicada.',
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
                <h3 className="xp-title" style={{ fontSize: 'var(--step-0)' }}>{job.title}</h3>
              </div>
              <p className="muted" style={{ margin: '4px 0 0 0', fontSize: 'var(--step--1)' }}>{job.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}