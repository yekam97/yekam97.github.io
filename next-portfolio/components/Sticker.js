export default function Sticker(){
  const number = '573175244453'
  const text = encodeURIComponent('Hola Yeison, estoy interesado en contactarte como profesional del diseño. ¿Podemos conversar sobre una oportunidad?')
  const url = `https://wa.me/${number}?text=${text}`
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{position:'fixed', right:18, bottom:18, width:64, height:64, borderRadius:999, display:'grid', placeItems:'center', background:'#fff', boxShadow:'0 10px 30px rgba(2,6,12,0.12)', zIndex:1400}}> 
      <img src="/avatar-sticker.png" alt="Avatar" style={{width:56, height:56, borderRadius:999}} />
    </a>
  )
}
