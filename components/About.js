import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={`${styles['about-section']} reveal`}>
      <div className={styles['about-grid']}>
        <div className={styles['about-profile']}>
          <div className={styles['profile-header']}>
            <div className={`${styles['profile-image']} reveal`}>
              <div className={styles['image-overlay']}></div>
            </div>
            <div className={styles['profile-info']}>
              <h2 className={`${styles['profile-name']} reveal`}>Camilo Gamba</h2>
              <p className={`${styles['profile-title']} reveal`}>
                Diseñador Industrial y Gestor de Proyectos
              </p>
            </div>
          </div>
          
          <div className={styles['profile-bio']}>
            <p className={`${styles['bio-text']} reveal`}>
              Soy un diseñador industrial con enfoque en arquitectura, innovación y estrategia. Combino la creatividad del diseño con el pensamiento empresarial para transformar ideas en proyectos sostenibles y funcionales.
            </p>
            <p className={`${styles['bio-focus']} reveal`}>
              <strong>Enfoque personal:</strong> Busco conectar la estética con la utilidad, integrando la experiencia del usuario, la sostenibilidad y la narrativa visual en cada proyecto que desarrollo.
            </p>
          </div>
        </div>

        <div className={`${styles['about-education']} reveal`}>
          <div className={styles['education-card']}>
            <h3 className={styles['card-title']}>Formación Académica</h3>
            <div className={styles['skills-grid']}>
              {[
                {
                  title: 'Diseñador Industrial',
                  icon: '🎓',
                  category: 'Principal'
                },
                {
                  title: 'Diseño UX/UI',
                  icon: '💻',
                  category: 'Especialización'
                }
              ].map((skill, index) => (
                <div key={index} className={styles['skill-card']}>
                  <span className={styles['skill-icon']}>{skill.icon}</span>
                  <div className={styles['skill-info']}>
                    <h4>{skill.title}</h4>
                    <span className={styles['skill-category']}>{skill.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}