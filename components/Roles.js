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
        image: '/images/industrial-remodelacion-departamento.png',
        link: '#'
      },
      {
        title: 'Diseño de cabaña en Mazamitla',
        description: 'Espacio temático para Airbnb con experiencia inmersiva.',
        image: '/images/industrial-cabaña-mazamitla.png',
        link: '#'
      },
      {
        title: 'Locales comerciales Creat3d',
        image: '/images/industrial-locales-creat3d.png',
        link: '#'
      },
    ],
  },
  ux: {
    title: 'Diseñador UX/UI',
    skills: ['Figma', 'Encuestas', 'Pruebas de Usabilidad', 'Arquitectura de Información'],
    projects: [
      {
        image: '/images/ux-app-vendedores-ambulantes.png',
        link: '#'
      },
      {
        title: 'Interfaz web de portafolio Creat3d',
        image: '/images/ux-interfaz-web-portafolio.png',
        link: '#'
      },
      {
        title: 'Dashboard de control de biofábricas móviles',
        image: '/images/ux-dashboard-biofabricas.png',
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
        image: '/images/formador-taller-vr.png',
        link: '#'
      },
      {
        title: 'Curso de renderizado y modelado 3D para jóvenes',
        image: '/images/formador-curso-3d.png',
        link: '#'
      },
      {
        title: 'Capacitaciones en innovación y emprendimiento',
        description: 'Formación para asociaciones rurales.',
        image: '/images/formador-capacitaciones-innovacion.png',
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
        image: '/images/gestor-modelo-bioeconomico.png',
        link: '#'
      },
      {
        title: 'Consultorías de innovación y desarrollo territorial',
        image: '/images/gestor-consultorias-innovacion.png',
        link: '#'
      },
      {
        title: 'Planeación estratégica y ejecución de proyectos creativos',
        image: '/images/gestor-planeacion-estrategica.png',
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
        image: '/images/grafico-creat3d-branding.png',
        link: '#'
      },
      {
        title: 'Estrategia de contenido para redes sociales Creat3d',
        description: 'Carruseles, reels y publicaciones semanales.',
        image: '/images/grafico-estrategia-contenido.png',
        link: '#'
      },
      {
        title: 'Identidad visual para CelComp y marca de sublimación',
        description: 'Manual de marca, productos y catálogos digitales.',
        image: '/images/grafico-identidad-visual.png',
        link: '#'
      },
    ],
  },
};
const roleKeys = Object.keys(rolesData);
export default function Roles() {
  const [activeRole, setActiveRole] = useState(roleKeys[0]);
  const [isChanging, setIsChanging] = useState(false);
  const currentRoleData = rolesData[activeRole];
  const handleRoleChange = (newRole) => {
    setIsChanging(true);
    setActiveRole(newRole);
    setTimeout(() => setIsChanging(false), 300);
  };
  return (
    <section id="roles" className="roles-section" style={{ background: 'transparent' }}>
      <div className="roles-content">
        <h2 className="section-title" style={{ fontSize: 'var(--step-4)', color: 'var(--color-secondary)', textAlign: 'center' }}>
          Mis facetas como diseñador
        </h2>
        <p className="section-description" style={{ fontSize: 'var(--step-1)', color: 'var(--color-secondary)', textAlign: 'center' }}>
          Cada botón/rol muestra 3 proyectos destacados según el enfoque.
        </p>
        <nav className="roles-nav reveal" role="tablist" aria-label="Enfoques profesionales">
          {roleKeys.map(key => (
            <button
              key={key}
              className={`role-tab ${activeRole === key ? 'active' : ''} ${isChanging ? 'changing' : ''}`}
              onClick={() => handleRoleChange(key)}
              role="tab"
              aria-selected={activeRole === key}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
            >
              <span className="label">{rolesData[key].title.split(' / ')[0]}</span>
              {activeRole === key && <span className="active-indicator" />}
            </button>
          ))}
        </nav>
        <div className="roles-panels reveal">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
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
                  <div key={index} className="project-card-small tilt">
                    <div className="project-image-wrapper">
                      <img 
                        src={project.image} 
                        alt={project.title || 'Proyecto'} 
                        loading="lazy"
                      />
                    </div>
                    <div className="project-meta">
                      <h4>{project.title}</h4>
                      {project.description && (
                        <p className="tiny muted">{project.description}</p>
                      )}
                      <div className="project-actions">
                        <a href={project.link} className="project-button primary">
                          Ver proyecto
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}