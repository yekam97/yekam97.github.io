import { useState } from 'react';
import styles from './ServiceDetails.module.css';

export default function ServiceDetails({ servicio, onClose }) {
  const [showContact, setShowContact] = useState(false);

  if (!servicio) return null;

  return (
    <div className={styles.detailsWrapper}>
      <button 
        className={styles.closeBtn} 
        onClick={onClose} 
        aria-label="Cerrar detalles del servicio"
        title="Cerrar (ESC)"
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
                href="mailto:camilo.gamba@email.com" 
                className={styles.contactLink}
                title="Enviar correo electrónico"
              >
                📧 Correo
              </a>
              <a 
                href="https://wa.me/573001234567" 
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
