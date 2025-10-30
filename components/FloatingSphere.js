import { motion } from 'framer-motion';
import styles from './FloatingSphere.module.css';

const sectionStyles = {
  hero: { top: '20%', left: '5%', background: 'radial-gradient(circle at 10px 10px, #a2d2ff, #6c63ff)', name: 'Inicio' },
  about: { top: '50%', left: '80%', background: 'radial-gradient(circle at 10px 10px, #ffafcc, #ff7849)', name: 'Sobre mí' },
  roles: { top: '30%', left: '10%', background: 'radial-gradient(circle at 10px 10px, #f9c74f, #f94144)', name: 'Portafolio' },
  experiencia: { top: '70%', left: '90%', background: 'radial-gradient(circle at 10px 10px, #90be6d, #43aa8b)', name: 'Experiencia' },
  certificaciones: { top: '40%', left: '50%', background: 'radial-gradient(circle at 10px 10px, #f9c74f, #f94144)', name: 'Certificaciones' },
  contacto: { top: '80%', left: '20%', background: 'radial-gradient(circle at 10px 10px, #a2d2ff, #6c63ff)', name: 'Contacto' },
};

const FloatingSphere = ({ activeSection }) => {
  const style = sectionStyles[activeSection] || sectionStyles.hero;

  return (
    <motion.div
      className={styles.sphere}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        top: style.top, 
        left: style.left, 
        background: style.background 
      }}
      transition={{ duration: 1.2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
    >
      <div className={styles.tooltip}>{style.name}</div>
    </motion.div>
  );
};

export default FloatingSphere;
