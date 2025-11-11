import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function validate(formData) {
    const next = {};
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || name.length < 2) next.name = 'Ingresa tu nombre (mínimo 2 caracteres)';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) next.email = 'Ingresa un correo válido';
    if (!message || message.length < 10) next.message = 'Escribe un mensaje más detallado (mínimo 10 caracteres)';

    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setErrors({});
    const form = event.target;
    const data = new FormData(form);

    const clientErrors = validate(data);
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setStatus('Corrige los errores antes de enviar.');
      return;
    }

    setSubmitting(true);
    setStatus('Enviando...');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('¡Mensaje enviado! Gracias.');
        form.reset();
      } else {
        setStatus('Error al enviar el mensaje.');
      }
    } catch (err) {
      setStatus('Error de red. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contacto" className={`${styles.section} reveal`} aria-labelledby="contact-heading">
      <div className="card">
        <h2 id="contact-heading">¿Tienes un proyecto en mente?</h2>
        <p className={`${styles.description} muted`}>
          Si tienes una idea, proyecto o colaboración en mente, estaré encantado de escucharte.
          Envíame un mensaje y conversamos cómo puedo aportar a tu visión.
        </p>
        <form
          className={styles['contact-form']}
          action="https://formspree.io/f/xvgwylkw"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          aria-describedby={status ? 'form-status' : undefined}
        >
          <label htmlFor="name" className="visually-hidden">Nombre</label>
          <div className={styles.field}>
            <input id="name" name="name" className={styles.input} placeholder="Tu nombre" required aria-invalid={errors.name ? 'true' : 'false'} />
            {errors.name && <div className={`${styles['form-status']} ${styles['form-error']}`}>{errors.name}</div>}
          </div>
          <label htmlFor="email" className="visually-hidden">Correo</label>
          <div className={styles.field}>
            <input id="email" name="email" className={styles.input} placeholder="Tu correo" type="email" required aria-invalid={errors.email ? 'true' : 'false'} />
            {errors.email && <div className={`${styles['form-status']} ${styles['form-error']}`}>{errors.email}</div>}
          </div>
          <label htmlFor="message" className="visually-hidden">Mensaje</label>
          <div className={`${styles.field} ${styles['field-full']}`}>
            <textarea id="message" name="message" className={styles.textarea} rows={5} placeholder="Escribe tu mensaje" required aria-invalid={errors.message ? 'true' : 'false'}></textarea>
            {errors.message && <div className={`${styles['form-status']} ${styles['form-error']}`}>{errors.message}</div>}
          </div>
          <div className={styles.actions}>
            <button className={styles.send} type="submit" disabled={submitting} aria-disabled={submitting}>{submitting ? 'Enviando...' : 'Enviar mensaje'}</button>
            {status && <div id="form-status" className={`${styles['form-status']}`}>{status}</div>}
          </div>
        </form>
      </div>
    </section>
  );
}