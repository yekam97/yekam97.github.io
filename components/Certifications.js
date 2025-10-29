const certifications = [
  'Certificación en Diseño UX/UI – Google',
  'Curso de Modelado 3D y Render avanzado – SketchUp & Lumion',
  'Taller de Emprendimiento e Innovación – MinCiencias / Sennova',
  'Certificado en Metodologías ágiles – Scrum Fundamentals',
  'Curso de Producción de contenidos 360° y Realidad Virtual',
];

export default function Certifications() {
  return (
    <section id="certificaciones" className="card reveal" style={{ marginTop: '4rem' }}>
      <h2>Certificaciones y aprendizaje continuo</h2>
      <div className="chips">
        {certifications.map((cert, index) => (
          <div className="chip" key={index}>{cert}</div>
        ))}
      </div>
    </section>
  );
}