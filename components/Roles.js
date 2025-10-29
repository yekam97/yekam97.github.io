import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rolesData = {
  industrial: {
    title: 'Diseñador Industrial / de Interiores',
    projects: [
      'Remodelación de departamento pequeño — Integración de cocina y comedor, aprovechando la luz natural.',
      'Diseño de cabaña en Mazamitla — Espacio temático para Airbnb con experiencia inmersiva.',
      'Locales comerciales Creat3d — Fachadas modernas y diseño de mobiliario a medida.',
    ],
  },
  ux: {
    title: 'Diseñador UX/UI',
    projects: [
      'App para vendedores ambulantes — Prototipo para conectar microemprendedores con clientes locales.',
      'Interfaz web de portafolio Creat3d — Diseño centrado en experiencia de usuario y jerarquía visual.',
      'Dashboard de control de biofábricas móviles — Visualización de datos en tiempo real para productores rurales.',
    ],
  },
  formador: {
    title: 'Formador',
    projects: [
      'Taller de creación de contenidos en realidad virtual – Sennova (2025)',
      'Curso de renderizado y modelado 3D para jóvenes',
      'Capacitaciones en innovación y emprendimiento para asociaciones rurales',
    ],
  },
  gestor: {
    title: 'Gestor de proyectos',
    projects: [
      'Modelo Bioeconómico para CORPOVALLE — Diseño de sistemas circulares de producción de plátano.',
      'Consultorías de innovación y desarrollo territorial — Fortalecimiento de capacidades productivas.',
      'Planeación estratégica y ejecución de proyectos creativos — Desde la idea hasta la validación de mercado.',
    ],
  },
  grafico: {
    title: 'Diseñador gráfico / Gestor de contenidos',
    projects: [
      'Creat3d Branding — Línea gráfica, color y estilo de comunicación visual.',
      'Estrategia de contenido para redes sociales Creat3d — Carruseles, reels y publicaciones semanales.',
      'Identidad visual para CelComp y marca de sublimación — Manual de marca, productos y catálogos digitales.',
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
                <ul className="projects-list" style={{ paddingLeft: '1rem', listStyleType: 'disc' }}>
                  {currentRoleData.projects.map((project, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{project}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}