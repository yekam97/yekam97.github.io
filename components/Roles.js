import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Roles.module.css';

const getRolesData = (language) => {
  const isEn = language === 'en';
  return [
    {
      category: isEn ? 'UNDERGRADUATE' : 'PREGRADO',
      title: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      description: isEn
        ? 'Pedagogical and Technological University of Colombia. Professional oriented towards product development, innovation and functional solutions that integrate creativity, technology and sustainability. Strategic approach and prototyping.'
        : 'Universidad Pedagógica y Tecnológica de Colombia. Profesional orientado al desarrollo de productos, innovación y soluciones funcionales que integran creatividad, tecnología y sostenibilidad. Enfoque estratégico y prototipado.',
      pdfUrl: '/DIPLOMA PREGRADO.pdf'
    },
    {
      category: isEn ? 'SPECIALIZATION' : 'ESPECIALIZACIÓN',
      title: isEn ? 'Marketing Management Specialization' : 'Alta Gerencia en Mercadotecnia',
      description: isEn
        ? 'Pedagogical and Technological University of Colombia. Training in market strategy design, positioning and business models. Strategic marketing management and entrepreneurship strengthening.'
        : 'Universidad Pedagógica y Tecnológica de Colombia. Formación en diseño de estrategias de mercado, posicionamiento y modelos de negocio. Gestión estratégica del marketing y fortalecimiento de emprendimientos.',
      pdfUrl: '/DIPLOMA DE GRADO ESPECIALIZACIÓN.pdf'
    },
    {
      category: isEn ? 'MASTER\'S' : 'MAESTRÍA',
      title: isEn ? 'Sustainable Development Projects' : 'Proyectos de Desarrollo Sostenible',
      description: isEn
        ? 'Master\'s with focus on formulation, management and evaluation of territorial projects and social innovation. Integration of economic, environmental and social impact for sustainable solutions.'
        : 'Magíster con enfoque en la formulación, gestión y evaluación de proyectos territoriales e innovación social. Integración de impacto económico, ambiental y social para soluciones sostenibles.',
      pdfUrl: '/DIPLOMA DE MAESTRIA.pdf'
    }
  ];
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const Roles = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
  const rolesData = getRolesData(language);

  return (
    <div id="roles">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="label-md">{t('estudios')}</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>
          {language === 'es' ? 'Mis Estudios' : 'My Education'}
        </h2>

        <motion.div 
          className={styles.facetsGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {rolesData.map((role, idx) => (
            <motion.div
              key={idx}
              className={styles.facetCard}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={styles.facetLabel}>{role.category}</span>
              <h3 className={styles.facetTitle}>{role.title}</h3>
              <p className={styles.facetDescription}>{role.description}</p>
              {role.pdfUrl && (
                <a href={role.pdfUrl} target="_blank" rel="noopener noreferrer" className={styles.pdfLink}>
                  {t('ver_diploma')}
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Roles;