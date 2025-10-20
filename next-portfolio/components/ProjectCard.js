import { motion } from 'framer-motion'
import styles from './ProjectCard.module.css'

export default function ProjectCard({project, id, onView}){
  return (
    <motion.div className={styles.card} initial={{opacity:0, scale:0.98}} whileInView={{opacity:1, scale:1}} viewport={{once:true}} transition={{duration:0.5}} layoutId={`card-${id}`}>
      <div className={styles.thumb}>
        <motion.img src={project.img} alt={project.title} layoutId={`img-${id}`} />
        <div className={styles.overlay}><button onClick={()=>onView && onView(id)}>Ver</button></div>
      </div>
      <motion.strong layoutId={`title-${id}`}>{project.title}</motion.strong>
      <p className="tiny">{project.desc}</p>
    </motion.div>
  )
}
