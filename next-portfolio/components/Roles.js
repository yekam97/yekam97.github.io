import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import Modal from './Modal'
import styles from './Roles.module.css'

const rolesData = [
  {
    key: 'formador',
    title: 'Formador',
    summary: 'Docente y mentor con experiencia en formación práctica de herramientas de diseño y visualización 3D.',
    projects: [
      { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60', title: 'Taller V-Ray Pro', desc: 'Programa intensivo de visualización fotorrealista.' },
      { img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=60', title: 'Curso UX Básico', desc: 'Curso práctico de fundamentos UX.' },
      { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60', title: 'Mentoría 1:1', desc: 'Acompañamiento en portfolio y desarrollo profesional.' }
    ]
  },
  {
    key: 'interior',
    title: 'Interior / Mobiliario',
    summary: 'Proyectos residenciales y comerciales, mobiliario a medida y visualización.',
    projects: [
      { img: 'https://images.unsplash.com/photo-1505691723518-36a7f1ab4c6b?auto=format&fit=crop&w=800&q=60', title: 'Vivienda Campestre', desc: 'Proyecto completo: planos y renders.' },
      { img: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=800&q=60', title: 'Gastro Bar', desc: 'Diseño interior con enfoque experiencia cliente.' },
      { img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60', title: 'Mobiliario a medida', desc: 'Piezas para producción local.' }
    ]
  }
]

export default function Roles(){
  const [active, setActive] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function openProject(p){ setSelected(p); setModalOpen(true); }
  function closeModal(){ setModalOpen(false); setSelected(null); }

  return (
    <section id="roles" className={styles.roles}>
      <div className={styles.tabs} role="tablist">
        {rolesData.map((r,i)=> (
          <button key={r.key} className={i===active?styles.active:''} onClick={()=>setActive(i)}>{r.title}</button>
        ))}
      </div>

      <motion.div className={styles.panels} layout>
        {rolesData.map((r,i)=> (
          <motion.article key={r.key} initial={{opacity:0}} animate={{opacity:i===active?1:0, x:i===active?0:20}} transition={{duration:0.45}} style={{display:i===active?'block':'none'}}>
            <h3>{r.title}</h3>
            <p className="tiny">{r.summary}</p>
            <div className={styles.grid}>
              {r.projects.map((p,idx)=>{
                const pid = `proj-${r.key}-${idx}`
                return <ProjectCard key={pid} id={pid} project={p} onView={(id)=>openProject({...p, id})} />
              })}
            </div>
          </motion.article>
        ))}
      </motion.div>

      <Modal open={modalOpen} onClose={closeModal} project={selected} />
    </section>
  )
}
