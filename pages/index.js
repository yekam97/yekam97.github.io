import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Roles from '../components/Roles';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Sticker from '../components/Sticker';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <About />
      <Roles />
      <Experience />
      <Certifications />
      <Contact />
    </Layout>
  );
}

function Layout({ children }) {
  const [theme, setTheme] = useState('light');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Lógica para la animación "reveal on scroll"
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 }); // El elemento se revela cuando el 10% es visible

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    return () => elementsToReveal.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    // Lógica para el tema
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Lógica para el "Lienzo del Diseñador"
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Aquí iría la lógica de dibujo, por ahora lo dejamos configurado.
    // Puedes añadir la lógica de dibujo en el IntersectionObserver si lo deseas.
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsNavOpen(false);
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
        <title>Camilo Gamba — Diseñador Industrial y Gestor de Proyectos</title>
        <meta name="description" content="Portafolio de Camilo Gamba, diseñador industrial con enfoque en arquitectura, innovación y estrategia." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <canvas id="background-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />

      <div className="wrap">
        <header className="site-header visible">
          <div className="brand">
            <div className="logo-mark">YG</div>
            <div>
              <h1>Camilo Gamba</h1>
              <p className="tiny">Diseñador Industrial & Gestor de Proyectos</p>
            </div>
          </div>
          <button className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
            <span className="hamburger"></span>
          </button>
          <nav className={`primary ${isNavOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
            <a href="#about" onClick={handleNavClick}>Sobre mí</a>
            <a href="#roles" onClick={handleNavClick}>Portafolio</a>
            <a href="#experiencia" onClick={handleNavClick}>Experiencia</a>
            <a href="#certificaciones" onClick={handleNavClick}>Certificaciones</a>
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