import { useState, useEffect, useRef } from 'react';
import styles from './Experience.module.css';

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
    description: 'Diseñé y desarrolló piezas experimentales en hilo dentro de un proyecto de investigación académica, explorando procesos artesanales aplicados al diseño contemporáneo. Mi trabajo integró materiales naturales, técnicas tradicionales y criterios de sostenibilidad, fortaleciendo el vínculo entre diseño, innovación y cultura material',
  },
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const itemWidth = slider.children[0].offsetWidth + parseFloat(getComputedStyle(slider.children[0]).marginRight); // Assuming consistent gap
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    };

    slider.addEventListener('scroll', handleScroll);
    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Delegated click handler on dots container for debugging and robustness
  useEffect(() => {
    const container = dotsRef.current;
    if (!container) return;

    const onClick = (e) => {
      // Log target for debugging
      console.log('[xp-dots] click event target:', e.target);
      // Find the closest dot element with data-index
      const dot = e.target.closest('[data-index]');
      if (!dot) return;
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      console.log('[xp-dots] detected index:', idx);
      // call existing scroll helper
      scrollToItem(idx);
    };

    container.addEventListener('click', onClick);
    return () => container.removeEventListener('click', onClick);
  }, [sliderRef.current]);

  const scrollToItem = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    // Use the target child's offsetLeft for more robust scrolling
    const target = slider.children[index];
    if (!target) return;
    const left = target.offsetLeft;
    slider.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <section id="experiencia" className="reveal timeline">
      <div className="card">
        <h2 className="reveal">Donde las ideas tomaron forma</h2>
        <p className="tiny reveal">Un resumen de mis roles, responsabilidades e impacto en los últimos años.</p>
        <div className={styles['xp-slider-container']}>
          <div className={styles['timeline-line']}></div>
          <div className={styles['xp-slider']} ref={sliderRef}>
            {experienceData.map((job, index) => (
              <article className={styles['xp-item']} key={index}>
                <div className={styles['xp-header']}>
                  <h3 className={styles['xp-title']}>{job.company}</h3>
                  <span className={styles['xp-period']}>{job.period}</span>
                </div>
                <h4 className={styles['xp-role']}>{job.role}</h4>
                <p className={styles['xp-description']}>{job.description}</p>
              </article>
            ))}
          </div>
          <div className={styles['xp-dots-container']} ref={dotsRef}>
            {experienceData.map((_, index) => (
              <div
                key={index}
                data-index={index}
                className={`${styles['timeline-dot']} ${index === activeIndex ? styles['active'] : ''}`}
                onClick={() => scrollToItem(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}