import { useEffect, useRef } from 'react'
import styles from './CursorTrail.module.css'

// Simple cursor trail made of a few gradient circles that follow pointer
export default function CursorTrail(){
  const containerRef = useRef(null)
  const points = 6

  useEffect(()=>{
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = containerRef.current
    if(!container) return

    const dots = []
    for(let i=0;i<points;i++){
      const el = document.createElement('div')
      el.className = styles.dot
      el.style.opacity = String((1 - i*(1/points))*0.9)
      container.appendChild(el)
      dots.push(el)
    }

    let mouseX = -100, mouseY = -100
    window.addEventListener('mousemove', onMove)

    function onMove(e){
      mouseX = e.clientX
      mouseY = e.clientY
    }

    let raf = null
    const positions = dots.map(()=>({x:mouseX,y:mouseY}))

    function animate(){
      positions[0].x += (mouseX - positions[0].x)*0.25
      positions[0].y += (mouseY - positions[0].y)*0.25
      for(let i=1;i<positions.length;i++){
        positions[i].x += (positions[i-1].x - positions[i].x)*0.18
        positions[i].y += (positions[i-1].y - positions[i].y)*0.18
      }
      for(let i=0;i<dots.length;i++){
        const d = dots[i]
        d.style.transform = `translate3d(${positions[i].x - 10}px, ${positions[i].y - 10}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return ()=>{
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      dots.forEach(d=>d.remove())
    }
  },[])

  return <div ref={containerRef} className={styles.container} aria-hidden="true" />
}
