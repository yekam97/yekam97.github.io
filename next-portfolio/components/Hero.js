// components/Hero.js

import dynamic from 'next/dynamic';

// Hacemos una importación dinámica para evitar problemas de renderizado en el servidor (SSR)
// ya que Three.js necesita el objeto 'window' del navegador.
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.hero3DCanvas}>
        <Scene3D />
      </div>
      <div className={styles.heroText}>
        <h1>Yekam</h1>
        <h2>Creative Developer</h2>
      </div>
    </section>
  );
};

export default Hero;
