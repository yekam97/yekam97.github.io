import { motion } from 'framer-motion'
import styles from './Modal.module.css'

export default function Modal({open, onClose, project}){
  if(!open || !project) return null;
  const id = project.id || 'unknown'
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <motion.div className={styles.frame} initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.36}} onClick={(e)=>e.stopPropagation()} layoutId={`card-${id}`}>
        <button className={styles.close} onClick={onClose}></button>
        <motion.img src={project.img} alt={project.title} layoutId={`img-${id}`} />
        <div className={styles.body}>
          <motion.h3 layoutId={`title-${id}`}>{project.title}</motion.h3>
          <p className="tiny">{project.desc}</p>
        </div>
      </motion.div>
    </div>
  )
}
