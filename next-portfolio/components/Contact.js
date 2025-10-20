import { useState } from 'react'

export default function Contact(){
  const [status, setStatus] = useState('')
  async function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    setStatus('Enviando...')
    try{
      const res = await fetch('https://formspree.io/f/xvgwylkw', { method:'POST', body: fd, headers:{'Accept':'application/json'} })
      if(res.ok){ setStatus('Mensaje enviado. Gracias.') ; form.reset(); }
      else { const t = await res.text(); setStatus('Error: ' + (res.statusText || t)) }
    }catch(err){ setStatus('Error de red') }
  }

  return (
    <section id="contacto" style={{marginTop:24}}>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tu nombre" required />
        <input name="email" type="email" placeholder="Tu correo" required />
        <textarea name="message" rows={4} placeholder="Escribe tu mensaje" required />
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Enviar</button>
          <a className="cta" href="https://wa.me/573175244453" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <div className="tiny" style={{marginTop:8}}>{status}</div>
      </form>
    </section>
  )
}
