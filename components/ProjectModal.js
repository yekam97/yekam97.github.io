'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!project || !mounted) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'auto' }}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
          />
          <motion.div
            className={styles.modalContainer}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{ pointerEvents: 'auto', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxHeight: '90vh', overflow: 'auto' }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>

            <div className={styles.modalContent}>
              <div className={styles.imageSection}>
                <div className={styles.mainImage}>
                  <img src={project.images[currentImageIndex]} alt={project.title} />
                </div>
                
                {project.images.length > 1 && (
                  <>
                    <button className={`${styles.navButton} ${styles.prevButton}`} onClick={handlePrevImage}>
                      ←
                    </button>
                    <button className={`${styles.navButton} ${styles.nextButton}`} onClick={handleNextImage}>
                      →
                    </button>
                    <div className={styles.imageCounter}>
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                    <div className={styles.thumbnailStrip}>
                      {project.images.map((img, idx) => (
                        <button
                          key={idx}
                          className={`${styles.thumbnail} ${idx === currentImageIndex ? styles.activeThumbnail : ''}`}
                          onClick={() => setCurrentImageIndex(idx)}
                        >
                          <img src={img} alt={`Thumbnail ${idx + 1}`} />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className={styles.infoSection}>
                <span className={styles.category}>{project.category}</span>
                <h2 className={styles.title}>{project.title}</h2>
                <span className={styles.year}>{project.year}</span>

                <div className={styles.description}>
                  {project.description && <p>{project.description}</p>}
                </div>

                {project.details && (
                  <div className={styles.details}>
                    <h3>Detalles</h3>
                    <ul>
                      {project.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies && (
                  <div className={styles.technologies}>
                    <h3>Tecnologías / Herramientas</h3>
                    <div className={styles.techTags}>
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className={styles.tag}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById('modal-root'));
}
