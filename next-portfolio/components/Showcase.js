import { motion } from 'framer-motion'
import styles from './Showcase.module.css'

const panels = [
  { title: 'Diseño que cuenta historias', img: 'https://images.unsplash.com/photo-1496611659533-7f4c9f3a4c35?auto=format&fit=crop&w=2000&q=60' },
  { title: 'Mobiliario y espacios con sentido', img: 'https://images.unsplash.com/photo-1505691723518-36a7f1ab4c6b?auto=format&fit=crop&w=2000&q=60' }
]

export default function Showcase(){
  return (
    <section className={styles.showcase}>
      {panels.map((p, i)=> (
        <motion.article key={i} className={`${styles.panel} ${i===0? 'pattern-linen' : ''}`} initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.8}} style={{backgroundImage:`url(${p.img})`}}>
          <div className={styles.overlay} />
          {i===0 && <div className={styles.texture} />}
          <div className={styles.inner}>
            <motion.h2 initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>{p.title}</motion.h2>
          </div>
        </motion.article>
      ))}
    </section>
  )
}
