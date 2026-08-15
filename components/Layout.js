'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import ScrollProgress from './ScrollProgress';
import Sticker from './Sticker';
import LanguageToggle from './LanguageToggle';
import MagneticButton from './MagneticButton';

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

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
        const radius = Math.random() * 1.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(255, 85, 0, ${Math.random() * 0.15})`;
        const velocity = { x: (Math.random() - 0.5) * 0.25, y: (Math.random() - 0.5) * 0.25 };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Pause the canvas loop when the tab isn't visible — saves CPU/battery
    // instead of animating an invisible background.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        animate();
      }
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 55, stiffness: 90 };
  // The glow is `position: fixed`, so it already sits in viewport
  // coordinates — it must track raw clientX/clientY only. Adding a
  // scroll-based offset on top of that (as before) made it drift away
  // from the actual cursor the deeper the page was scrolled, which read
  // as the "jumpy"/erratic tracking. Position now follows the mouse only.
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scroll depth instead drives a subtle "breathing" of the glow itself
  // (scale + intensity) so the page still feels alive while scrolling,
  // without ever detaching the glow from the cursor.
  const scrollScale = useTransform(scrollY, [0, 2400], [1, 1.35], { clamp: true });
  const scrollOpacity = useTransform(scrollY, [0, 2400], [1, 0.6], { clamp: true });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ScrollProgress />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 85, 0, 0.18) 0%, rgba(255, 85, 0, 0.04) 50%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
          zIndex: 0,
          x: smoothX,
          y: smoothY,
          scale: scrollScale,
          opacity: scrollOpacity
        }}
      />
      <Head>
        <title>Yeison Camilo Gamba | Portafolio de Diseño Industrial & UX/UI</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Portafolio profesional de Yeison Camilo Gamba, Diseñador Industrial especializado en diseño de productos, experiencia de usuario (UX/UI), renderizado 3D y gestión de proyectos de innovación." />
        <meta name="keywords" content="Diseño Industrial, UX, UI, Renderizado 3D, Innovación, Desarrollo Web, Diseño de Productos, Colombia, UPTC" />
        <meta name="author" content="Yeison Camilo Gamba" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yekam97.github.io/" />
        <meta property="og:title" content="Yeison Camilo Gamba | Portafolio de Diseño Industrial & UX/UI" />
        <meta property="og:description" content="Portafolio profesional de Yeison Camilo Gamba, Diseñador Industrial especializado en diseño de productos, experiencia de usuario (UX/UI), renderizado 3D y gestión de proyectos de innovación." />
        <meta property="og:image" content="https://yekam97.github.io/images/Gemini_Generated_Image_5jzwlz5jzwlz5jzw.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yekam97.github.io/" />
        <meta property="twitter:title" content="Yeison Camilo Gamba | Portafolio de Diseño Industrial & UX/UI" />
        <meta property="twitter:description" content="Portafolio profesional de Yeison Camilo Gamba, Diseñador Industrial especializado en diseño de productos, experiencia de usuario (UX/UI), renderizado 3D y gestión de proyectos de innovación." />
        <meta property="twitter:image" content="https://yekam97.github.io/images/Gemini_Generated_Image_5jzwlz5jzwlz5jzw.png" />
        
        <link rel="canonical" href="https://yekam97.github.io/" />
      </Head>

      <canvas id="background-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none', background: '#050505' }} />

      <header className="nav-glass">
        <motion.a
          href="#hero"
          onClick={handleNavClick}
          className="brand-logo"
          style={{ fontStyle: 'italic', fontWeight: 900, fontSize: '1.2rem', color: '#FFF', cursor: 'pointer' }}
          whileHover={{ scale: 1.08, color: '#ff5500' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          YG
        </motion.a>
        <nav style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
          <a href="#experiencia" className="nav-item" onClick={handleNavClick}>{t('trayectoria')}</a>
          <MagneticButton href="#contacto" className="btn-neon" onClick={handleNavClick} style={{ height: '36px', padding: '0 1rem', fontSize: '0.7rem' }} strength={0.4}>
            {t('contacto')}
          </MagneticButton>
          <LanguageToggle />
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
