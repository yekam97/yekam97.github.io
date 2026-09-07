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
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/creat3di/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnaKLxk9GhyICBoxK1TLF1LDblaqv3XNfI1xuma9TojDAK4hAQsN2FHjO4sS8_aem_D3YRuq-M3BAyAZHd4qjejw' },
  { label: 'BEHANCE', href: 'https://www.behance.net/yeisongamba97' },
  { label: 'DRIBBBLE', href: 'https://dribbble.com/camilog97' }
];

const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } }
};

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const socialContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const socialItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
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
        <motion.h2
          className={styles.ctaTitle}
          variants={titleContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          aria-label={titleText}
        >
          {titleText.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
              aria-hidden="true"
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </motion.h2>

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
