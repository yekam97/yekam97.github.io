import Head from 'next/head';
import Hero from '../components/Hero';
import Roles from '../components/Roles';
import Showcase from '../components/Showcase';
import Sticker from '../components/Sticker';

export default function HomePage() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Yeison Camilo Gamba González — Portafolio</title>
        <meta name="description" content="Portafolio y CV de Yeison Camilo Gamba González — Diseñador Industrial / Diseño Interior / Visualización Arquitectónica (Creat3d)" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="wrap">
        <header className="site-header">
          <div className="brand">
            <div className="logo-mark">YG</div>
            <div>
              <h1>Yeison Camilo Gamba González</h1>
              <p className="tiny">Diseñador Industrial — Diseño Interior & Visualización Arquitectónica</p>
            </div>
          </div>
          {/* La navegación del index.html original puede ser reemplazada por componentes Link de Next.js si se crean más páginas */}
          <nav className="primary" aria-label="Navegación principal">
            <a href="#inicio">Inicio</a>
            <a href="#roles">Enfoques</a>
            <a href="#contacto">Contacto</a>
          </nav>
          {/* El theme-toggle del script.js necesitaría ser reimplementado en React para funcionar aquí */}
          <button id="theme-toggle" aria-label="Cambiar tema" title="Alternar tema" className="theme-toggle" type="button">🌗</button>
        </header>

        <main>
          <Hero />
          <Showcase />
          <Roles />
        </main>

        <Sticker />

        <footer>Diseñado por Yeison Camilo Gamba González • © 2025</footer>
      </div>
    </>
  );
}