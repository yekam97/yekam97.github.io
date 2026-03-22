import { useState, useEffect } from 'react';
import styles from './ServiceDetails.module.css';

export default function ServiceDetails({ servicio, onClose }) {
  const [showContact, setShowContact] = useState(false);

  // ESC key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!servicio) return null;

  return (
    <div className={styles.detailsWrapper} role="dialog" aria-modal="true" aria-label={`Detalles de ${servicio.nombre}`}>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Cerrar detalles del servicio"
        title="Cerrar (ESC)"
        autoFocus
      >
        ✕
      </button>
      <div className={styles.content}>
        <h2 className={styles.title}>{servicio.nombre}</h2>
        <p className={styles.descripcion}>{servicio.descripcionAmpliada || servicio.descripcion}</p>
        <div className={styles.precioBox}>
          <span className={styles.precioLabel}>Precio:</span>
          <div className={styles.precio}>{servicio.precio}</div>
        </div>
        <button
          className={styles.payBtn}
          onClick={() => setShowContact(!showContact)}
        >
          ✉️ {showContact ? 'Ocultar contacto' : 'Solicitar información'}
        </button>
        {showContact && (
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Contáctame</h3>
            <p className={styles.contactDesc}>Escríbeme para más información y detalles del proyecto</p>
            <div className={styles.contactLinks}>
              <a
                href="mailto:yekam97@gmail.com"
                className={styles.contactLink}
                title="Enviar correo electrónico"
              >
                📧 Correo
              </a>
              <a
                href="https://wa.me/573204444444?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20"
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir WhatsApp"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
