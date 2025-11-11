import Head from 'next/head';
import styles from '../components/Services.module.css';
import ServiciosNav from '../components/ServiciosNav';
import ServiceDetails from '../components/ServiceDetails';
import { useState, useEffect } from 'react';

const servicios = [
  {
    nombre: 'Render Arquitectónico',
    descripcion: 'Imágenes fotorrealistas para proyectos de arquitectura, interiores y productos. Incluye modelado 3D y postproducción básica.',
    descripcionAmpliada: 'Incluye modelado 3D desde planos o bocetos, texturizado, iluminación profesional, postproducción en Photoshop y entrega en alta resolución. Ideal para presentaciones, ventas y portafolios.',
    precio: '$350.000 COP por imagen',
    imagen: '/images/servicio-render.jpg',
  },
  {
    nombre: 'Manual de Marca',
    descripcion: 'Creación de identidad visual, logotipo, paleta de colores, tipografía y aplicaciones. Entrega en PDF editable.',
    descripcionAmpliada: 'Incluye desarrollo de logotipo, paleta cromática, tipografía, aplicaciones de marca, mockups y manual PDF editable. Ideal para empresas, emprendimientos y proyectos personales.',
    precio: '$600.000 COP por manual',
    imagen: '/images/servicio-manual-marca.jpg',
  },
  {
    nombre: 'Manejo de Redes Sociales',
    descripcion: 'Gestión de Instagram, Facebook y LinkedIn. Incluye estrategia, diseño de contenido y publicaciones mensuales.',
    descripcionAmpliada: 'Incluye estrategia de contenido, diseño gráfico, redacción, programación de publicaciones y análisis mensual. Ideal para negocios que buscan crecer en redes.',
    precio: '$400.000 COP mensual',
    imagen: '/images/servicio-redes.jpg',
  },
  {
    nombre: 'Diseño de Presentaciones',
    descripcion: 'Presentaciones corporativas, comerciales o académicas. Diseño profesional y adaptable a tu marca.',
    descripcionAmpliada: 'Incluye diseño personalizado, animaciones, iconografía, adaptación a tu identidad visual y entrega en PowerPoint o PDF. Ideal para ventas, conferencias y clases.',
    precio: '$180.000 COP por presentación',
    imagen: '/images/servicio-presentaciones.jpg',
  },
  {
    nombre: 'Consultoría Creativa',
    descripcion: 'Sesión personalizada para diagnóstico, estrategia y recomendaciones en diseño, comunicación o innovación.',
    descripcionAmpliada: 'Incluye análisis de tu proyecto, recomendaciones prácticas, guía de recursos y seguimiento por correo. Ideal para emprendedores y equipos creativos.',
    precio: '$120.000 COP por sesión',
    imagen: '/images/servicio-consultoria.jpg',
  },
];

export default function Servicios() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById('background-canvas-servicios');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }
      }
    }
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `rgba(108, 99, 255, ${Math.random() * 0.3 + 0.1})`;
        const velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
      });
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Servicios Profesionales | Camilo Gamba</title>
        <meta name="description" content="Servicios creativos: Diseño, branding, desarrollo web, contenido y más." />
      </Head>
      <canvas id="background-canvas-servicios" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />
      <div className={styles.layoutWrap}>
        <ServiciosNav />
        <div className={styles.mainGrid}>
          <section className={styles.leftCol}>
            <div>
              <h1 className={styles.title}>Servicios</h1>
              <p className={styles.subtitle}>Soluciones creativas y estratégicas para transformar tu idea en realidad. Selecciona un servicio para conocer más detalles, precios y opciones de pago.</p>
            </div>
            <div className={styles.listGrid}>
              {servicios.map((servicio, idx) => (
                <div
                  key={idx}
                  className={selected === idx ? `${styles.card} ${styles.selected}` : styles.card}
                  onClick={() => setSelected(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(idx);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selected === idx}
                  aria-expanded={selected === idx}
                >
                  <h2 className={styles.nombre}>{servicio.nombre}</h2>
                  <p className={styles.descripcion}>{servicio.descripcion}</p>
                  <div className={styles.precio}>{servicio.precio}</div>
                </div>
              ))}
            </div>
          </section>
          <aside className={styles.rightCol}>
            {!selected ? (
              <img src="/images/servicio-default.jpg" alt="Servicios profesionales - Diseño, branding y más" className={styles.imagenDefault} />
            ) : (
              <ServiceDetails servicio={servicios[selected]} onClose={() => setSelected(null)} />
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
