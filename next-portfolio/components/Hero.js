import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import { useRef, useEffect } from 'react'

export default function Hero(){
  const hRef = useRef(null)

  useEffect(()=>{
    if(typeof window === 'undefined') return
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = hRef.current
    if(!el) return
    function onMove(e){
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height
      el.style.transform = `translate3d(${dx*6}px, ${dy*4}px, 0) rotate(${dx*1.5}deg)`
    }
    function onLeave(){ el.style.transform = '' }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave) }
  },[])

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.content}>
        <motion.h2 ref={hRef} initial={{opacity:0, x:-12}} animate={{opacity:1, x:0}} transition={{delay:0.1}}>Diseñador Industrial</motion.h2>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="lead">Experiencia en diseño de mobiliario, proyectos de interiorismo y visualización arquitectónica.</motion.p>
      </div>
      <motion.div className={styles.media} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}>
        <div className={styles.placeholder}>[Media]</div>
      </motion.div>
    </section>
  )
}
