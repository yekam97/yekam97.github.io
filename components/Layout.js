'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import ScrollProgress from './ScrollProgress';
import Sticker from './Sticker';
import LanguageToggle from './LanguageToggle';
import MagneticButton from './MagneticButton';
import ScrollPath from './ScrollPath';
import { scrollToId } from '@/lib/scroll';
import Preloader from './Preloader';
import { usePreloaderDone, finishPreloader } from '@/lib/preloader';

// `subpage`: inner pages (trayectoria, estudios, proyectos/…) — no intro curtain,
// no scroll thread, and the nav links go back to the matching section of the home page.
export default function Layout({ children, subpage = false }) {
  const router = useRouter();
  const introDone = usePreloaderDone();
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

  // The bar slides away while you scroll down and comes back as soon as
  // you scroll up (same behavior as the reference site's floating menu).
  // It never hides near the top of the page, nor while keyboard focus is
  // inside it.
  const headerRef = useRef(null);
  const mainRef = useRef(null);
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
    const id = (e.currentTarget.getAttribute('href').split('#')[1]) || 'hero';
    if (subpage) router.push(id === 'hero' ? '/' : `/#${id}`);
    else scrollToId(id);
  };

  // The intro curtain is only for the first thing a visitor sees: if they land
  // on an inner page first, don't replay it when they go back to the home page.
  useEffect(() => {
    if (subpage) finishPreloader();
  }, [subpage]);

  // Arriving on the home page with a #section (e.g. coming back from a subpage):
  // scroll to it once the intro is out of the way and the sections have mounted.
  useEffect(() => {
    if (subpage || !introDone) return undefined;
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const timer = setTimeout(() => scrollToId(id), 450);
    return () => clearTimeout(timer);
  }, [subpage, introDone]);

  return (
    <>
      {!subpage && <Preloader />}
      <ScrollProgress />

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


      <header ref={headerRef} className={`nav-glass ${navHidden ? 'nav-hidden' : ''}`}>
        <motion.a
          href={subpage ? '/' : '#hero'}
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
          <a href={`${subpage ? '/' : ''}#portfolio`} className="nav-item" onClick={handleNavClick}>{t('proyectos')}</a>
          <a href={`${subpage ? '/' : ''}#experiencia`} className="nav-item" onClick={handleNavClick}>{t('trayectoria')}</a>
          <a href={`${subpage ? '/' : ''}#roles`} className="nav-item" onClick={handleNavClick}>{t('estudios')}</a>
          <MagneticButton href={`${subpage ? '/' : ''}#contacto`} className="btn-neon" onClick={handleNavClick} style={{ height: '36px', padding: '0 1rem', fontSize: '0.7rem' }} strength={0.4}>
            {t('contacto')}
          </MagneticButton>
          <LanguageToggle />
        </nav>
      </header>

      <main ref={mainRef} style={{ position: 'relative', zIndex: 1, overflowX: 'clip' }}>
        {children}
        {!subpage && <ScrollPath mainRef={mainRef} />}
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
