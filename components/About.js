export default function About() {
  return (
    <section id="about" className="reveal">
      <div className="about-section">
        <div className="about-left">
          <div className="about-image-placeholder"></div>
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
        </div>
        <div className="about-right">
          <div className="card">
            <h3>Formación Académica</h3>
            <ul className="academic-list">
              <li>Diseñador Industrial</li>
              <li>Diseño UX/UI</li>
              <li>Modelado y Renderizado 3D</li>
              <li>Innovación y emprendimiento</li>
              <li>Gestión de proyectos (Metodologías Ágiles)</li>
              <li>Formación pedagógica</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}