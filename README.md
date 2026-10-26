# Yeison Camilo Gamba — Portafolio

Portafolio profesional de **Yeison Camilo Gamba Gonzalez**, Diseñador Industrial y Líder de Diseño, especializado en diseño de producto, UX/UI, identidad visual y desarrollo de plataformas digitales.

🔗 **Sitio en vivo:** [yekam97.github.io](https://yekam97.github.io/)

## Stack

- [Next.js 14](https://nextjs.org/) (Pages Router)
- [React 18](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/) — animaciones y micro-interacciones
- CSS Modules + variables CSS globales (`style.css`)
- Formularios vía [Formspree](https://formspree.io/)

## Estructura

```
components/     Componentes de UI (Hero, Portfolio, Experience, Contact, Stage, MascotaRig, ...)
context/        LanguageContext — sistema de idioma ES/EN
lib/            Datos compartidos (experience, projects, education) y utilidades
pages/          Rutas: / , /trayectoria , /estudios , /proyectos/<slug>
public/         Assets estáticos (imágenes, diplomas, favicon, /padbox)
assets/mascota/ Ilustraciones vectoriales de la mascota (ver su README)
docs/           Notas y bitácoras de desarrollo (histórico, no forma parte del sitio)
```

La página principal muestra solo resúmenes cortos; el detalle vive en subpáginas
(`/trayectoria`, `/estudios`, `/proyectos/<slug>`), enlazadas con botones.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build y despliegue

El sitio se exporta como HTML estático (`output: 'export'` en `next.config.js`) y se publica en
GitHub Pages con un workflow de GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.

```bash
npm run build      # genera la carpeta out/
npx serve out      # (opcional) previsualizar el resultado
```

**Configuración única en GitHub:** Settings -> Pages -> *Build and deployment* -> **Source: GitHub Actions**.
Sin eso, Pages sigue sirviendo el repositorio con Jekyll (mostrando solo este README).

## Idiomas

El sitio es bilingüe (ES/EN) mediante `context/LanguageContext.js` y `lib/translations.js`. Los textos largos (experiencia, proyectos, certificaciones) se manejan directamente en cada componente con un patrón `isEn ? '...' : '...'`.
