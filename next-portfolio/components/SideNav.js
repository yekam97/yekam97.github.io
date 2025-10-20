import { useEffect, useState, useRef } from 'react'
import { useScroll, useTransform, useSpring, motion } from 'framer-motion'
import styles from './SideNav.module.css'

const sections = [ {id:'inicio', label:'Inicio'}, {id:'work', label:'Trabajo'}, {id:'roles', label:'Enfoques'}, {id:'contacto', label:'Contacto'} ]

export default function SideNav(){
  const { scrollYProgress } = useScroll()
  const [active, setActive] = useState('inicio')
  const [hover, setHover] = useState(null)
  const containerRef = useRef(null)

  useEffect(()=>{
    function onScroll(){
      const mid = window.innerHeight/2 + window.scrollY
      let current = active
      for(const s of sections){
        const el = document.getElementById(s.id)
        if(!el) continue
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if(mid >= top && mid < bottom){ current = s.id; break }
      }
      if(current !== active) setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[active])

  const y = useTransform(scrollYProgress, [0, 1], [0, 1])
  const smooth = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <nav ref={containerRef} className={styles.side} aria-label="Secciones">
      <ul>
        {sections.map(s=> (
          <li key={s.id} className={s.id===active?styles.active:''} onMouseEnter={()=>setHover(s.id)} onMouseLeave={()=>setHover(null)}>
            <a href={`#${s.id}`}>{s.label}</a>
            {hover === s.id && (
              <div className={styles.preview}>
                <img src={ s.id === 'inicio' ? '/placeholder-hero.jpg' : s.id === 'work' ? 'https://images.unsplash.com/photo-1505691723518-36a7f1ab4c6b?auto=format&fit=crop&w=800&q=60' : s.id === 'roles' ? 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60' : '/placeholder-contact.jpg' } alt="preview" />
              </div>
            )}
          </li>
        ))}
      </ul>
      <motion.div className={styles.progress} style={{scaleY:smooth}} aria-hidden />
    </nav>
  )
}
