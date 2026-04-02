import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import About from '../components/About';
import Roles from '../components/Roles';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Sticker from '../components/Sticker';
import ScrollProgress from '../components/ScrollProgress';

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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id) {
              setActiveSection(entry.target.id);
            }
            if (entry.target.classList.contains('reveal')) {
              entry.target.classList.add('visible');
            }
          }
        });
      },
      { threshold: 0.5 } // Adjust this value as needed
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      elementsToReveal.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100; // Number of particles

    // Particle class
    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Subtle opacity drift
        const op = parseFloat(this.color.split(',')[3]);
        const newOp = Math.max(0.02, Math.min(0.2, op + (Math.random() - 0.5) * 0.01));
        this.color = `rgba(255, 255, 255, ${newOp})`;

        // Wrap around edges instead of bouncing for a "limitless" feel
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1.5 + 0.5; // Smaller particles
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`; // Subtle white/gray
        const velocity = {
          x: (Math.random() - 0.5) * 0.5, // Slower movement
          y: (Math.random() - 0.5) * 0.5,
        };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      particles.forEach((particle) => {
        particle.update();
      });
    };

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // Re-initialize particles on resize
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

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
      <ScrollProgress />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Camilo Gamba — Diseñador Industrial y Gestor de Proyectos</title>
        <meta name="description" content="Portafolio de Camilo Gamba, diseñador industrial con enfoque en arquitectura, innovación y estrategia." />
        <meta property="og:title" content="Camilo Gamba — Diseñador Industrial y Gestor de Proyectos" />
        <meta property="og:description" content="Portafolio de Camilo Gamba, diseñador industrial con enfoque en arquitectura, innovación y estrategia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yekam97.github.io" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Camilo Gamba — Diseñador Industrial" />
        <meta name="twitter:description" content="Portafolio de Camilo Gamba, diseñador industrial con enfoque en arquitectura, innovación y estrategia." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;800;900&family=Bebas+Neue&family=Roboto+Slab:wght@400;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <canvas id="background-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />

      <div className="wrap">
        <header className="site-header visible">
          <div className="brand">
            <Link href="/" legacyBehavior>
              <a style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <div className="logo-mark">YG</div>
                <div>
                  <h1>Camilo Gamba</h1>
                  <p className="tiny">Diseñador Industrial & Gestor de Proyectos</p>
                </div>
              </a>
            </Link>
          </div>
          <button id="mobile-nav-toggle" className="nav-toggle" onClick={toggleNav} aria-label="Toggle navigation">
            <span className="hamburger"></span>
          </button>
          <nav className={`primary ${isNavOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
            <a href="#about" onClick={handleNavClick}>Sobre mí</a>
            <a href="#roles" onClick={handleNavClick}>Portafolio</a>
            <a href="#experiencia" onClick={handleNavClick}>Experiencia</a>
            <a href="#certificaciones" onClick={handleNavClick}>Logros</a>
            <a href="#contacto" className="cta" onClick={handleNavClick}>Contacto</a>
          </nav>

        </header>
        <main>{children}</main>
        <Sticker />
        <footer>Diseñado por Yeison Camilo Gamba González • © 2025</footer>
      </div>
    </>
  );
}