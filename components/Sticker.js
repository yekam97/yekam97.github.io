export default function Sticker() {
  const number = '573175244453'
  const text = encodeURIComponent('Hola Yeison, estoy interesado en contactarte como profesional del diseño. ¿Podemos conversar sobre una oportunidad?')
  const url = `https://wa.me/${number}?text=${text}`
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1400, transition: 'transform 0.3s ease' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <img src="/avatar-sticker.png" alt="WhatsApp" style={{ width: 70, height: 70, display: 'block' }} />
    </a>
  )
}
