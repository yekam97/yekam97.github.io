'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import styles from './Contact.module.css';
import ContactModal from './ContactModal';

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = (key) => translations[language]?.[key] || translations['es']?.[key] || key;

  return (
    <section id="contacto" className={styles.ctaSection}>
      <motion.div
        className={styles.ctaContent}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.ctaTitle}>{t('construyamos')}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.blackBtn}
        >
          {language === 'es' ? 'INICIAR UN PROYECTO' : 'START A PROJECT'}
        </button>
      </motion.div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={styles.bottomBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', fontSize: '0.65rem' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            <a href="https://www.linkedin.com/in/yeison-camilo-gamba-gonzalez-10776268/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            <a href="https://www.instagram.com/creat3di/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnaKLxk9GhyICBoxK1TLF1LDblaqv3XNfI1xuma9TojDAK4hAQsN2FHjO4sS8_aem_D3YRuq-M3BAyAZHd4qjejw" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://www.behance.net/yeisongamba97" target="_blank" rel="noopener noreferrer">BEHANCE</a>
            <a href="https://dribbble.com/camilog97" target="_blank" rel="noopener noreferrer">DRIBBBLE</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;