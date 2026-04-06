'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ContactModal.module.css';

const ContactModal = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, SUBMITTING, SUCCESS, ERROR
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && mounted) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, mounted]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xvgwylkw', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('SUCCESS');
                form.reset();
                setTimeout(() => {
                    onClose();
                    setStatus('IDLE');
                }, 4000);
            } else {
                setStatus('ERROR');
            }
        } catch (error) {
            setStatus('ERROR');
        }
    };

    if (!mounted) return null;

    const modalContent = (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ pointerEvents: 'auto' }}
                    />
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>✕</button>

                        {status === 'SUCCESS' ? (
                            <div className={styles.successView}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}
                                >
                                    ✓
                                </motion.div>
                                <h2 className="newsreader">¡Gracias!</h2>
                                <p className={styles.subtitle}>Tu propuesta ha sido enviada con éxito. Me pondré en contacto contigo pronto.</p>
                            </div>
                        ) : (
                            <>
                                <div className={styles.modalHeader}>
                                    <span className="label-md">Contacto</span>
                                    <h2 className="newsreader">Iniciar un Proyecto</h2>
                                    <p className={styles.subtitle}>Cuéntame sobre tu visión y construyamos algo con precisión.</p>
                                </div>

                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Nombre completo</label>
                                        <input type="text" name="nombre" className={styles.input} required placeholder="Camilo..." />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Correo electrónico</label>
                                        <input type="email" name="email" className={styles.input} required placeholder="ejemplo@correo.com" />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Tipo de proyecto</label>
                                        <select name="tipo_proyecto" className={styles.select}>
                                            <option>Diseño Industrial</option>
                                            <option>Estrategia de Innovación</option>
                                            <option>Desarrollo Digital / UX</option>
                                            <option>Otro</option>
                                        </select>
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Mensaje / Brief</label>
                                        <textarea name="mensaje" className={styles.textarea} required placeholder="Describe tu proyecto..." row="4" />
                                    </div>

                                    {status === 'ERROR' && (
                                        <p style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>Hubo un error al enviar. Por favor intentalo de nuevo.</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn-neon"
                                        disabled={status === 'SUBMITTING'}
                                        style={{ width: '100%', marginTop: 'var(--spacing-4)', opacity: status === 'SUBMITTING' ? 0.7 : 1 }}
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

    return createPortal(modalContent, document.getElementById('modal-root'));
};

export default ContactModal;
