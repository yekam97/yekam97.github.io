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
components/     Componentes de UI (Hero, Portfolio, Experience, Contact, etc.)
context/        LanguageContext — sistema de idioma ES/EN
lib/            Diccionario de traducciones
pages/          Rutas de Next.js (Pages Router)
public/         Assets estáticos, imágenes, diplomas, favicon
docs/           Notas y bitácoras de desarrollo (histórico, no forma parte del sitio)
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Idiomas

El sitio es bilingüe (ES/EN) mediante `context/LanguageContext.js` y `lib/translations.js`. Los textos largos (experiencia, proyectos, certificaciones) se manejan directamente en cada componente con un patrón `isEn ? '...' : '...'`.
