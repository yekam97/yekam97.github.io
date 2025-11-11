import styles from './Certifications.module.css';

const certifications = [
  'Certificación en Diseño UX/UI – Google',
  'Curso de Modelado 3D y Render avanzado – SketchUp & Lumion',
  'Taller de Emprendimiento e Innovación – MinCiencias / Sennova',
  'Certificado en Metodologías ágiles – Scrum Fundamentals',
  'Curso de Producción de contenidos 360° y Realidad Virtual',
];

export default function Certifications() {
  return (
    <section id="certificaciones" className={`${styles.section} card`} aria-labelledby="certs-heading">
      <h2 id="certs-heading" className={styles.title}>Certificaciones y aprendizaje continuo</h2>
      <div className={styles.chips} role="list">
        {certifications.map((cert, index) => (
          <div
            role="listitem"
            tabIndex={0}
            aria-label={`Certificación ${index + 1}: ${cert}`}
            className={styles.chip}
            key={index}
          >
            <span className={styles['chip-icon']} aria-hidden>🏅</span>
            <span>{cert}</span>
          </div>
        ))}
      </div>
    </section>
  );
}