import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('Enviando...');
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('¡Mensaje enviado! Gracias.');
        form.reset();
      } else {
        setStatus('Error al enviar el mensaje.');
      }
    } catch (error) {
      setStatus('Error de red. Inténtalo de nuevo.');
    }
  }

  return (
    <section id="contacto" style={{ marginTop: '4rem' }} className="reveal">
      <div className="card">
        <h2>¿Tienes un proyecto en mente?</h2>
        <p className="muted" style={{ fontSize: 'var(--step-0)' }}>
          Si tienes una idea, proyecto o colaboración en mente, estaré encantado de escucharte.
          Envíame un mensaje y conversamos cómo puedo aportar a tu visión.
        </p>
        <form className="contact" action="https://formspree.io/f/xvgwylkw" method="POST" onSubmit={handleSubmit}>
          <input id="name" name="name" placeholder="Tu nombre" required />
          <input id="email" name="email" placeholder="Tu correo" type="email" required />
          <textarea id="message" name="message" rows="4" placeholder="Escribe tu mensaje" required></textarea>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="send" type="submit">Enviar mensaje</button>
          </div>
          {status && <div className="form-status tiny" style={{ marginTop: '8px' }}>{status}</div>}
        </form>
      </div>
    </section>
  );
}