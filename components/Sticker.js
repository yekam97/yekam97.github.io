export default function Sticker() {
  const number = '573175244453'
  const text = encodeURIComponent('Hola Yeison, estoy interesado en contactarte como profesional del diseño. ¿Podemos conversar sobre una oportunidad?')
  const url = `https://wa.me/${number}?text=${text}`
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', right: 18, bottom: 18, width: 64, height: 64, borderRadius: 4, display: 'grid', placeItems: 'center', background: '#111', border: '1px solid rgba(255,255,255,0.1)', zIndex: 1400, transition: 'all 0.3s ease' }}>
      <img src="/images/camilo-portrait.jpg" alt="Camilo" style={{ width: 56, height: 56, borderRadius: 2, objectFit: 'cover', filter: 'grayscale(100%) brightness(0.9)', transition: 'filter 0.3s ease' }}
        onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%) brightness(1)'}
        onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%) brightness(0.9)'} />
    </a>
  )
}
