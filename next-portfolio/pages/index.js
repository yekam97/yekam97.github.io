import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Showcase from '../components/Showcase'
import WorkGrid from '../components/WorkGrid'
import Roles from '../components/Roles'
import Contact from '../components/Contact'
import Sticker from '../components/Sticker'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <div>
      <Head>
        <title>Yeison Camilo Gamba — Portafolio</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <Header />
      <main>
        <motion.section initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <Hero />
        </motion.section>

        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6}}>
          <Showcase />
        </motion.section>

        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6}}>
          <WorkGrid />
        </motion.section>

        <motion.section initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6}}>
          <Roles />
        </motion.section>
        <Contact />
        <Sticker />
      </main>
    </div>
  )
}
