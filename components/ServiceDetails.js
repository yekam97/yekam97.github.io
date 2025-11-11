import { useState, useEffect, useRef } from 'react';
import styles from './ServiceDetails.module.css';

export default function ServiceDetails({ servicio, onClose }) {
  const [showPayment, setShowPayment] = useState(false);
  const paypalRef = useRef(null);

  useEffect(() => {
    if (showPayment && paypalRef.current) {
      if (window.paypal) {
        window.paypal.Buttons({
          style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: getPayPalAmount(servicio.precio) },
                description: servicio.nombre,
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert('¡Pago realizado con éxito! Gracias, ' + details.payer.name.given_name);
            });
          },
        }).render(paypalRef.current);
      }
    }
  }, [showPayment, servicio]);

  function getPayPalAmount(precio) {
    // Extrae el valor numérico del string de precio
    const match = precio.match(/\$(\d+[.,]?\d*)/);
    if (match) return match[1].replace('.', '').replace(',', '.');
    return '10.00'; // fallback
  }

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
          onClick={() => setShowPayment(true)}
        >
          💳 Solicitar y Pagar
        </button>
        {showPayment && (
          <div className={styles.paymentSection}>
            <div className={styles.contacto}>
              <h3 className={styles.contactTitle}>¿Tienes dudas?</h3>
              <p className={styles.contactDesc}>Contáctame antes de proceder con el pago</p>
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
            <div className={styles.pasarela}>
              <h3>Métodos de Pago:</h3>
              <div ref={paypalRef} style={{ minHeight: 60 }}></div>
              <a 
                href="https://www.nequi.com.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.payOption}
              >
                💰 Nequi
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
