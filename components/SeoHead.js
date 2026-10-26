import Head from 'next/head';

// Page <head>: title, description, social cards, canonical and (home only)
// the Person structured data. Rendered by each page — NOT inside Layout,
// which only mounts in the browser — so it is part of the exported HTML
// that search engines and link previews actually read.

const SITE = 'https://yekam97.github.io';
const DEFAULT_IMAGE = `${SITE}/images/Gemini_Generated_Image_5jzwlz5jzwlz5jzw.png`;
export const DEFAULT_TITLE = 'Yeison Camilo Gamba | Portafolio de Diseño Industrial & UX/UI';
export const DEFAULT_DESCRIPTION =
  'Portafolio profesional de Yeison Camilo Gamba, Diseñador Industrial especializado en diseño de productos, experiencia de usuario (UX/UI), renderizado 3D y gestión de proyectos de innovación.';

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yeison Camilo Gamba Gonzalez',
  alternateName: 'Camilo Gamba',
  jobTitle: 'Diseñador Industrial & Líder de Diseño',
  url: `${SITE}/`,
  image: DEFAULT_IMAGE,
  email: 'mailto:yeisongamba97@gmail.com',
  worksFor: { '@type': 'Organization', name: 'Imporelec' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Pedagógica y Tecnológica de Colombia' },
  sameAs: [
    'https://www.linkedin.com/in/yeison-camilo-gamba-gonzalez-10776268/',
    'https://www.instagram.com/creat3di/',
    'https://www.behance.net/yeisongamba97',
    'https://dribbble.com/camilog97'
  ]
};

export default function SeoHead({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = '/', image = DEFAULT_IMAGE, home = false }) {
  const url = `${SITE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content="Diseño Industrial, UX, UI, Renderizado 3D, Innovación, Desarrollo Web, Diseño de Productos, Colombia, UPTC" />
      <meta name="author" content="Yeison Camilo Gamba" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      {home && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      )}
    </Head>
  );
}
