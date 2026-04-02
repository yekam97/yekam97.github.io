import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactModal.module.css';

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here the user can integrate Formspree or any other service
        alert('¡Mensaje enviado con éxito! (Simulación de envío)');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>✕</button>

                        <div className={styles.modalHeader}>
                            <span className="label-md">Contacto</span>
                            <h2 className="newsreader">Iniciar un Proyecto</h2>
                            <p className={styles.subtitle}>Cuéntame sobre tu visión y construyamos algo con precisión.</p>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Nombre completo</label>
                                <input type="text" className={styles.input} required placeholder="Camilo..." />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Correo electrónico</label>
                                <input type="email" className={styles.input} required placeholder="ejemplo@correo.com" />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Tipo de proyecto</label>
                                <select className={styles.select}>
                                    <option>Diseño Industrial</option>
                                    <option>Estrategia de Innovación</option>
                                    <option>Desarrollo Digital / UX</option>
                                    <option>Otro</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Mensaje / Brief</label>
                                <textarea className={styles.textarea} required placeholder="Describe tu proyecto..." row="4" />
                            </div>

                            <button type="submit" className="btn-neon" style={{ width: '100%', marginTop: 'var(--spacing-4)' }}>
                                ENVIAR PROPUESTA
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
