'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import MagneticButton from './MagneticButton';
import styles from './Contact.module.css';
import ContactModal from './ContactModal';

const socialLinks = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/yeison-camilo-gamba-gonzalez-10776268/' },
  // Tracking params (utm_*, fbclid) stripped — this was copied
  // straight from a shared link and dragged a long tracking string
  // along with it (audit finding, section 7). Account left as-is
  // (creat3di); worth double-checking this is the account you want
  // linked here rather than a company one.
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/creat3di/' },
  { label: 'BEHANCE', href: 'https://www.behance.net/yeisongamba97' },
  { label: 'DRIBBBLE', href: 'https://dribbble.com/camilog97' }
];

const socialContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

// No opacity in this animation on purpose (audit finding, section 6):
// fading in FROM 0 meant that for the ~0.4s of this transition — or
// indefinitely, if the reveal script were ever slow/blocked — these
// links sat there looking dim/gray, easy to read as "disabled"
// rather than "still appearing". The links are fully opaque from the
// very first frame; only a small y-offset settles into place, so the
// worst case if the animation never ran at all is just links sitting
// 10px off from their final spot, never links that look broken.
const socialItem = {
  hidden: { y: 10 },
  visible: { y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;
  const titleText = t('construyamos');

  return (
    <section id="contacto" className={styles.ctaSection}>
      <motion.div
        className={styles.ctaContent}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* A clip-path wipe reveal — the text itself is always fully
            rendered (never split into characters that could get stuck
            mid-fade and read as missing letters), only a mask
            animates over it. */}
        <motion.div
          className={styles.ctaTitleWrap}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.ctaTitle}>{titleText}</h2>
        </motion.div>

        <MagneticButton
          onClick={() => setIsModalOpen(true)}
          className={styles.blackBtn}
          strength={0.3}
        >
          {language === 'es' ? 'PONTE EN CONTACTO' : 'GET IN TOUCH'}
        </MagneticButton>
      </motion.div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={styles.bottomBar}>
        <motion.div
          className="container"
          style={{ display: 'flex', justifyContent: 'center', fontSize: '0.65rem' }}
          variants={socialContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialItem}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
