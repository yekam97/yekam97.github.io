'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Certifications.module.css';

const certifications = [
  {
    name_es: 'CERTIFICACIÓN DISEÑO UX/UI',
    name_en: 'UX/UI DESIGN CERTIFICATION',
    issuer: 'GOOGLE CAREER CERTIFICATES',
    date: '2024',
    url: 'https://coursera.org/share/f2a7baa8b7079d330169a8c490fb749b',
    id: 'Credential ID: GX-9921'
  },
  {
    name_es: 'INGLÉS B2',
    name_en: 'ENGLISH B2',
    issuer: 'EF SET certificate',
    date: '2024',
    url: 'https://cert.efset.org/es/exPUj4',
    id: 'B2 Upper Intermediate'
  },
  {
    name_es: 'DISEÑO GRÁFICO',
    name_en: 'GRAPHIC DESIGN',
    issuer: 'LINKEDIN LEARNING',
    date: '2021',
    url: 'https://www.linkedin.com/learning/certificates/ce1e321bbee3b0af651a8321602d50b335ef11b980a9b6c4c0ce77621cfb069f?trk=backfilled_certificate',
    id: '40 h · 13 cursos'
  },
  {
    name_es: 'DOCENCIA UNIVERSITARIA',
    name_en: 'UNIVERSITY TEACHING',
    issuer: 'POLITÉCNICO DE SURAMÉRICA',
    date: '2025',
    url: 'https://api-certificate.polisura.edu.co/certificate.php?data=LVYBQBxdGAReWCxrbXR2cFwNT14LbnZZEw5aAg4UGg9wZmdqIHNbCBIKR2h0WxEXSFAJBFJoITMsMywkBQ0XHENidghAFkMFWl0HBQ==',
    id: '120 h · Diplomado'
  },
  {
    name_es: 'PEDAGOGÍA PARA PROFESIONALES NO LICENCIADOS',
    name_en: 'PEDAGOGY FOR NON-LICENSED PROFESSIONALS',
    issuer: 'POLITÉCNICO INTERCONTINENTAL',
    date: '2025',
    url: 'https://api-certificate.polinterco.edu.co/certificate.php?data=LVYBQBxdGAReWCxrPX92e1RZFA4LZ3EISw5aBw5IGlZ7MD1qdSFeXhVQFDl0CkESSFAJBFJoITMsMywkBQ0XHENidghAFkMFWV0FAA==',
    id: '120 h · Diplomado'
  },
  {
    name_es: 'CERTIFICADO METODOLOGÍAS ÁGILES',
    name_en: 'AGILE METHODOLOGIES CERTIFICATE',
    issuer: 'SCRUM FUNDAMENTALS',
    date: '2024',
    id: 'Credential ID: SF-7712'
  }
];

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// A small wax-seal-like mark that draws itself (ring, then check) the
// first time it scrolls into view — plus a cursor-tracked spotlight on
// the card itself, echoing the Skills cards' "premium object" feel.
const CertCard = ({ cert, language }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.certCard}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--spot-x': spotX, '--spot-y': spotY }}
    >
      <div className={styles.header}>
        <span className={styles.issuer}>{cert.issuer}</span>
        <span className={styles.date}>{cert.date}</span>
      </div>

      {cert.url ? (
        <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
          <h3 className={styles.name}>{language === 'es' ? cert.name_es : cert.name_en} <span style={{ fontSize: '0.8rem', verticalAlign: 'middle' }}>↗</span></h3>
        </a>
      ) : (
        <h3 className={styles.name}>{language === 'es' ? cert.name_es : cert.name_en}</h3>
      )}

      <div className={styles.credentialRow}>
        <p className={styles.credential}>{cert.id}</p>
        <svg viewBox="0 0 40 40" className={styles.seal} aria-hidden="true">
          <motion.circle
            cx="20" cy="20" r="16.5"
            fill="none" stroke="currentColor" strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M12 20.5 L17 25.5 L28.5 13.5"
            fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="certificaciones">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="label-md">{language === 'es' ? 'Reconocimientos' : 'Recognition'}</span>
        <h2 className="newsreader" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-12)' }}>
          {language === 'es' ? 'Hitos de Aprendizaje' : 'Learning Milestones'}
        </h2>

        <motion.div
          className={`${styles.certsGrid} ${!isExpanded ? styles.collapsed : ''}`}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certifications.map((cert, idx) => (
            <CertCard key={idx} cert={cert} language={language} />
          ))}
        </motion.div>

        <div className={styles.toggleContainer}>
          <button
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? (language === 'es' ? 'VER MENOS ▴' : 'VIEW LESS ▴')
              : (language === 'es' ? 'VER CERTIFICACIONES ▾' : 'VIEW CERTIFICATIONS ▾')
            }
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications;
