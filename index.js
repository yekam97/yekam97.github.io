import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Roles from '../components/Roles';
import Showcase from '../components/Showcase';
import Sticker from '../components/Sticker';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Showcase />
      <Roles />
    </Layout>
  );
}

function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Este efecto se ejecuta solo en el cliente, después del primer renderizado.
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 20; // Ajuste para el header pegajoso
      const top = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

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
          <nav className="primary" aria-label="Navegación principal">
            {/* Para enlaces a otras páginas, usarías: <Link href="/about"><a>Acerca de</a></Link> */}
            <a href="#inicio" onClick={handleNavClick}>Inicio</a>
            <a href="#roles" onClick={handleNavClick}>Enfoques</a>
            <a href="#contacto" onClick={handleNavClick}>Contacto</a>
          </nav>
          <button id="theme-toggle" aria-label="Cambiar tema" title="Alternar tema" className="theme-toggle" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        <main>{children}</main>

        <Sticker />

        <footer>Diseñado por Yeison Camilo Gamba González • © 2025</footer>
      </div>
    </>
  );
}