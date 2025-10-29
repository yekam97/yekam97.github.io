export default function About() {
  return (
    <>
      <section id="about" className="hero-card reveal" style={{ marginTop: '2rem' }}>
        <h2 className="hero-title">Camilo Gamba</h2>
        <p className="lead" style={{ fontWeight: 600 }}>
          Diseñador Industrial y Gestor de Proyectos
        </p>
        <p className="muted">
          Soy un diseñador industrial con enfoque en arquitectura, innovación y estrategia. Combino la creatividad del diseño con el pensamiento empresarial para transformar ideas en proyectos sostenibles y funcionales.
        </p>
        <p className="muted">
          <strong>Enfoque personal:</strong> Busco conectar la estética con la utilidad, integrando la experiencia del usuario, la sostenibilidad y la narrativa visual en cada proyecto que desarrollo.
        </p>
      </section>

      <aside id="estudios" className="card reveal" style={{ marginTop: '1rem' }}>
        <h3>Formación Académica</h3>
        <div className="chips">
          <div className="chip">Diseñador Industrial</div>
          <div className="chip">Diseño UX/UI</div>
          <div className="chip">Modelado y Renderizado 3D</div>
          <div className="chip">Innovación y emprendimiento</div>
          <div className="chip">Gestión de proyectos (Metodologías Ágiles)</div>
          <div className="chip">Formación pedagógica</div>
        </div>
      </aside>
    </>
  );
}