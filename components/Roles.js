import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rolesData = {
  industrial: {
    title: 'Diseñador Industrial / de Interiores',
    skills: ['Modelado 3D', 'Renderizado', 'Diseño de Mobiliario', 'Arquitectura de Interiores'],
    projects: [
      {
        title: 'Remodelación de departamento',
        description: 'Integración de cocina y comedor, aprovechando la luz natural.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Diseño de cabaña en Mazamitla',
        description: 'Espacio temático para Airbnb con experiencia inmersiva.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Locales comerciales Creat3d',
        description: 'Fachadas modernas y diseño de mobiliario a medida.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
    ],
  },
  ux: {
    title: 'Diseñador UX/UI',
    skills: ['Figma', 'Encuestas', 'Pruebas de Usabilidad', 'Arquitectura de Información'],
    projects: [
      {
        title: 'App para vendedores ambulantes',
        description: 'Prototipo para conectar microemprendedores con clientes locales.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Interfaz web de portafolio Creat3d',
        description: 'Diseño centrado en experiencia de usuario y jerarquía visual.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Dashboard de control de biofábricas móviles',
        description: 'Visualización de datos en tiempo real para productores rurales.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
    ],
  },
  formador: {
    title: 'Formador',
    skills: ['Creación de Contenidos', 'Realidad Virtual', 'Modelado 3D', 'Innovación'],
    projects: [
      {
        title: 'Taller de creación de contenidos en realidad virtual',
        description: 'Taller para Sennova (2025).',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Curso de renderizado y modelado 3D para jóvenes',
        description: 'Curso práctico para el desarrollo de habilidades técnicas.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Capacitaciones en innovación y emprendimiento',
        description: 'Formación para asociaciones rurales.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
    ],
  },
  gestor: {
    title: 'Gestor de proyectos',
    skills: ['Metodologías Ágiles', 'Scrum', 'Planeación Estratégica', 'Validación de Mercado'],
    projects: [
      {
        title: 'Modelo Bioeconómico para CORPOVALLE',
        description: 'Diseño de sistemas circulares de producción de plátano.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Consultorías de innovación y desarrollo territorial',
        description: 'Fortalecimiento de capacidades productivas.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Planeación estratégica y ejecución de proyectos creativos',
        description: 'Desde la idea hasta la validación de mercado.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
    ],
  },
  grafico: {
    title: 'Diseñador gráfico / Gestor de contenidos',
    skills: ['Branding', 'Estrategia de Contenido', 'Identidad Visual', 'Marketing Digital'],
    projects: [
      {
        title: 'Creat3d Branding',
        description: 'Línea gráfica, color y estilo de comunicación visual.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Estrategia de contenido para redes sociales Creat3d',
        description: 'Carruseles, reels y publicaciones semanales.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
      {
        title: 'Identidad visual para CelComp y marca de sublimación',
        description: 'Manual de marca, productos y catálogos digitales.',
        image: 'https://via.placeholder.com/300x200',
        link: '#'
      },
    ],
  },
};

const roleKeys = Object.keys(rolesData);

export default function Roles() {
  const [activeRole, setActiveRole] = useState(roleKeys[0]);

  const currentRoleData = rolesData[activeRole];

  return (
    <section id="roles" className="reveal" style={{ marginTop: '20px' }}>
      <div className="card">
        <h2>Mis facetas como diseñador</h2>
        <p className="tiny">Cada botón/rol muestra 3 proyectos destacados según el enfoque.</p>

        <div className="roles-tabs">
          <nav className="roles-nav" role="tablist" aria-label="Enfoques profesionales">
            {roleKeys.map(key => (
              <button
                key={key}
                className={`role-tab ${activeRole === key ? 'active' : ''}`}
                onClick={() => setActiveRole(key)}
                role="tab"
                aria-selected={activeRole === key}
              >
                <span className="label">{rolesData[key].title.split(' / ')[0]}</span>
              </button>
            ))}
          </nav>

          <div className="roles-panels">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole} // ¡Clave! Esto le dice a AnimatePresence que el componente cambió
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="role-panel"
              >
                <h3>{currentRoleData.title}</h3>
                <div className="skills-list">
                  {currentRoleData.skills.map((skill, index) => (
                    <span key={index} className="skill-pill">{skill}</span>
                  ))}
                </div>
                <div className="projects-grid">
                  {currentRoleData.projects.map((project, index) => (
                    <a href={project.link} key={index} className="project-card-small tilt">
                      <img src={project.image} alt={project.title} />
                      <div className="project-meta">
                        <h4>{project.title}</h4>
                        <p className="tiny muted">{project.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}