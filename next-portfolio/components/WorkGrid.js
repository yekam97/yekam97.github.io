import styles from './WorkGrid.module.css'
import ProjectCard from './ProjectCard'
import { useState } from 'react'

const sample = [
  { img: 'https://images.unsplash.com/photo-1505691723518-36a7f1ab4c6b?auto=format&fit=crop&w=1600&q=60', title: 'Vivienda Campestre', desc: 'Proyecto completo', size: 'large' },
  { img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=60', title: 'Mobiliario a medida', desc: 'Piezas únicas', size: 'tall' },
  { img: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=60', title: 'Gastro Bar', desc: 'Diseño interior', size: 'small' },
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=60', title: 'Taller V-Ray', desc: 'Visualización', size: 'small' },
  { img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=60', title: 'Curso UX', desc: 'Educación', size: 'wide' }
]

export default function WorkGrid(){
  // We'll reuse ProjectCard markup but render inside a masonry-like CSS grid
  return (
    <section id="work" className={styles.work}>
      <h2>Trabajo seleccionado</h2>
      <div className={styles.grid}>
        {sample.map((p, i)=>{
          const id = `work-${i}`
          return (
            <div key={id} className={`${styles.tile} ${styles[p.size]}`}>
              <ProjectCard id={id} project={p} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
