import styles from './Header.module.css'
import { useRef, useEffect } from 'react'

export default function Header(){
  const logoRef = useRef(null)
  useEffect(()=>{
    if(typeof window === 'undefined') return
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = logoRef.current
    function onMove(e){
      if(!el) return
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
      el.style.transform = `translateX(${dx*6}px)`
    }
    window.addEventListener('mousemove', onMove)
    return ()=> window.removeEventListener('mousemove', onMove)
  },[])

  return (
    <header className={styles.header}>
      <div className={styles.brand}><div ref={logoRef} className={styles.logo}>YG</div>
        <div>
          <h1>Yeison Camilo Gamba</h1>
          <p className="tiny">Diseñador Industrial — Visualización</p>
        </div>
      </div>
      <nav className={styles.nav}>
        <a href="#inicio">Inicio</a>
        <a href="#roles">Enfoques</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  )
}
