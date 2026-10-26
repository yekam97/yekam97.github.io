'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import ScrollProgress from './ScrollProgress';
import Sticker from './Sticker';
import LanguageToggle from './LanguageToggle';
import MagneticButton from './MagneticButton';
import ScrollMascot from './ScrollMascot';
import Preloader from './Preloader';

export default function Layout({ children }) {
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

  // The bar slides away while you scroll down and comes back as soon as
  // you scroll up (same behavior as the reference site's floating menu).
  // It never hides near the top of the page, nor while keyboard focus is
  // inside it.
  const headerRef = useRef(null);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let hidden = false;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (Math.abs(dy) < 8) return; // ignore tiny jitters
      lastY = y;

      const focusInside = headerRef.current?.contains(document.activeElement);
      const next = y > 160 && dy > 0 && !focusInside;
      if (next !== hidden) {
        hidden = next;
        setNavHidden(next);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop - 90, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <ScrollMascot />

      {/* Quiet paper-grain texture — replaces the old neon cursor glow /
          particle canvas with something that fits a warm, editorial page
          instead of a dark SaaS template. */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.035,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
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

        {/* Structured data — helps recruiters/search engines resolve this
            page to a Person profile instead of a generic website. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Yeison Camilo Gamba Gonzalez',
              alternateName: 'Camilo Gamba',
              jobTitle: 'Diseñador Industrial & Líder de Diseño',
              url: 'https://yekam97.github.io/',
              image: 'https://yekam97.github.io/images/Gemini_Generated_Image_5jzwlz5jzwlz5jzw.png',
              email: 'mailto:yeisongamba97@gmail.com',
              worksFor: {
                '@type': 'Organization',
                name: 'Imporelec'
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Universidad Pedagógica y Tecnológica de Colombia'
              },
              sameAs: [
                'https://www.linkedin.com/in/yeison-camilo-gamba-gonzalez-10776268/',
                'https://www.instagram.com/creat3di/',
                'https://www.behance.net/yeisongamba97',
                'https://dribbble.com/camilog97'
              ]
            })
          }}
        />
      </Head>

      <header ref={headerRef} className={`nav-glass ${navHidden ? 'nav-hidden' : ''}`}>
        <motion.a
          href="#hero"
          onClick={handleNavClick}
          className="brand-logo"
          style={{ fontFamily: 'var(--ff-display)', fontStyle: 'italic', fontWeight: 600, fontSize: '1.3rem', color: 'var(--ink)', cursor: 'pointer' }}
          whileHover={{ scale: 1.06, color: 'var(--primary)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          YG
        </motion.a>
        <nav style={{ display: 'flex', gap: 'var(--spacing-8)', alignItems: 'center' }}>
          <a href="#portfolio" className="nav-item" onClick={handleNavClick}>{t('proyectos')}</a>
          <a href="#experiencia" className="nav-item" onClick={handleNavClick}>{t('trayectoria')}</a>
          <a href="#roles" className="nav-item" onClick={handleNavClick}>{t('estudios')}</a>
          <MagneticButton href="#contacto" className="btn-neon" onClick={handleNavClick} style={{ height: '36px', padding: '0 1rem', fontSize: '0.7rem' }} strength={0.4}>
            {t('contacto')}
          </MagneticButton>
          <LanguageToggle />
        </nav>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      <Sticker />

      <style jsx>{`
        .nav-item {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: var(--transition);
        }
        .nav-item:hover { color: var(--primary); }

        @media (max-width: 768px) {
          nav > a.nav-item {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
