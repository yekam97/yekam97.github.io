import '../styles/globals.css'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import CursorTrail from '../components/CursorTrail'
import SideNav from '../components/SideNav'

export default function App({ Component, pageProps, router }){
  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
        <SideNav />
        <CursorTrail />
      </AnimatePresence>
    </LayoutGroup>
  )
}
