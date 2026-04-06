'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import ScrollProgress from './ScrollProgress';
import Sticker from './Sticker';

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x; this.y = y; this.radius = radius; this.color = color; this.velocity = velocity;
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
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(156, 255, 147, ${Math.random() * 0.1})`;
        const velocity = { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollProgress />
      <Head>
        <title>Yeison Camilo Gamba | Diseñador</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <canvas id="background-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none', background: '#000000' }} />

      <header className="nav-glass">
        <div className="brand-logo" style={{ fontStyle: 'italic', fontWeight: 900, fontSize: '1.2rem', color: '#FFF' }}>YG</div>
        <nav style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
          <a href="#portfolio" className="nav-item" onClick={handleNavClick}>Portafolio</a>
          <a href="#experiencia" className="nav-item" onClick={handleNavClick}>Trayectoria</a>
          <a href="#contacto" className="btn-neon" onClick={handleNavClick} style={{ height: '36px', padding: '0 1rem', fontSize: '0.7rem' }}>Contacto</a>
        </nav>
      </header>

      <main style={{ paddingTop: 'var(--spacing-16)' }}>
        {children}
      </main>

      <Sticker />

      <style jsx>{`
        .nav-item {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: var(--transition);
        }
        .nav-item:hover { color: var(--primary); }
      `}</style>
    </>
  );
}
