export const translations = {
  es: {
    // Header
    portfolio: 'PORTAFOLIO',
    trayectoria: 'TRAYECTORIA',
    contacto: 'CONTACTO',

    // Hero
    diseñador: 'DISEÑADOR INDUSTRIAL & GESTOR DE PROYECTOS',
    ideas: 'ideas',
    tomaron: 'tomaron forma',
    descripcion_hero: 'Donde la innovación industrial se convierte en realidad.',
    ver_archivo: 'VER ARCHIVO →',

    // Proyectos
    proyectos: 'Proyectos',
    descripcion_proyectos: 'Una curaduría de proyectos que definen la innovación industrial.',

    // Trayectoria
    trayectoria_titulo: 'Trayectoria',
    experiencia: 'Experiencia',
    estudios: 'Estudios',
    certificaciones: 'Certificaciones',

    // Contact
    construyamos: 'Construyamos precisión.',
    contactar: 'CONTACTAR',

    // Experiencia items
    exp_creat3d: 'Diseñador Industrial / Líder de Proyectos de Diseño',
    exp_aeroinflables: 'Diseñador Industrial – Desarrollo de Inflables',
    exp_freelance: 'Diseñador Industrial Freelance',

    // Roles/Education
    pregrado: 'PREGRADO',
    diseñador_industrial: 'Diseñador Industrial',
    especializacion: 'ESPECIALIZACIÓN',
    alta_gerencia: 'Alta Gerencia en Mercadotecnia',
    maestria: 'MAESTRÍA',
    proyectos_sostenibles: 'Proyectos de Desarrollo Sostenible',
    ver_diploma: 'Ver Diploma ↗',

    // Certifications
    certificacion_ux: 'CERTIFICACIÓN DISEÑO UX/UI',
    ingles: 'INGLÉS B2',
    diseño_grafico: 'DISEÑO GRÁFICO',

    // Modals/Panels
    cerrar: 'Cerrar',
    detalles: 'Detalles',
    tecnologias: 'Tecnologías / Herramientas',
  },
  en: {
    // Header
    portfolio: 'PORTFOLIO',
    trayectoria: 'TRAJECTORY',
    contacto: 'CONTACT',

    // Hero
    diseñador: 'INDUSTRIAL DESIGNER & PROJECT MANAGER',
    ideas: 'ideas',
    tomaron: 'came to life',
    descripcion_hero: 'Where industrial innovation becomes reality.',
    ver_archivo: 'VIEW ARCHIVE →',

    // Proyectos
    proyectos: 'Projects',
    descripcion_proyectos: 'A curation of projects that define industrial innovation.',

    // Trayectoria
    trayectoria_titulo: 'Trajectory',
    experiencia: 'Experience',
    estudios: 'Education',
    certificaciones: 'Certifications',

    // Contact
    construyamos: 'Let\'s build precision.',
    contactar: 'CONTACT',

    // Experiencia items
    exp_creat3d: 'Industrial Designer / Design Project Leader',
    exp_aeroinflables: 'Industrial Designer – Inflatable Development',
    exp_freelance: 'Freelance Industrial Designer',

    // Roles/Education
    pregrado: 'UNDERGRADUATE',
    diseñador_industrial: 'Industrial Designer',
    especializacion: 'SPECIALIZATION',
    alta_gerencia: 'Marketing Management Specialization',
    maestria: 'MASTER\'S',
    proyectos_sostenibles: 'Sustainable Development Projects',
    ver_diploma: 'View Diploma ↗',

    // Certifications
    certificacion_ux: 'UX/UI DESIGN CERTIFICATION',
    ingles: 'ENGLISH B2',
    diseño_grafico: 'GRAPHIC DESIGN',

    // Modals/Panels
    cerrar: 'Close',
    detalles: 'Details',
    tecnologias: 'Technologies / Tools',
  }
};

export function t(key, language = 'es') {
  return translations[language]?.[key] || translations['es']?.[key] || key;
}
