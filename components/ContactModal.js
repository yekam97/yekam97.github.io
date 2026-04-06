'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './ContactModal.module.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('IDLE');
    const [formData, setFormData] = useState({ nombre: '', email: '', tipo_proyecto: 'Diseño Industrial', mensaje: '' });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        try {
            const response = await fetch('https://formspree.io/f/xvgwylkw', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                setStatus('SUCCESS');
                setFormData({ nombre: '', email: '', tipo_proyecto: 'Diseño Industrial', mensaje: '' });
                setTimeout(() => {
                    onClose();
                    setStatus('IDLE');
                }, 3000);
            } else {
                setStatus('ERROR');
            }
        } catch (error) {
            setStatus('ERROR');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <button 
                            type="button"
                            className={styles.closeBtn} 
                            onClick={onClose}
                            aria-label="Cerrar modal"
                        >
                            ✕
                        </button>

                        {status === 'SUCCESS' ? (
                            <div className={styles.successView}>
                                <div className={styles.successIcon}>✓</div>
                                <h2>¡Gracias!</h2>
                                <p>Tu propuesta ha sido enviada con éxito. Me pondré en contacto contigo pronto.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.modalHeader}>
                                    <span className={styles.label}>Contacto</span>
                                    <h2>Iniciar un Proyecto</h2>
                                    <p>Cuéntame sobre tu visión y construyamos algo con precisión.</p>
                                </div>

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Nombre completo</label>
                                        <input 
                                            type="text" 
                                            name="nombre" 
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            className={styles.input} 
                                            required 
                                            placeholder="Camilo..." 
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Correo electrónico</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={styles.input} 
                                            required 
                                            placeholder="ejemplo@correo.com" 
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Tipo de proyecto</label>
                                        <select 
                                            name="tipo_proyecto" 
                                            value={formData.tipo_proyecto}
                                            onChange={handleInputChange}
                                            className={styles.select}
                                        >
                                            <option>Diseño Industrial</option>
                                            <option>Estrategia de Innovación</option>
                                            <option>Desarrollo Digital / UX</option>
                                            <option>Otro</option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.inputLabel}>Mensaje / Brief</label>
                                        <textarea 
                                            name="mensaje" 
                                            value={formData.mensaje}
                                            onChange={handleInputChange}
                                            className={styles.textarea} 
                                            required 
                                            placeholder="Describe tu proyecto..." 
                                        />
                                    </div>

                                    {status === 'ERROR' && (
                                        <div className={styles.error}>Hubo un error al enviar. Por favor intentalo de nuevo.</div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'SUBMITTING'}
                                        className={styles.submitBtn}
                                    >
                                        {status === 'SUBMITTING' ? 'ENVIANDO...' : 'ENVIAR PROPUESTA'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
