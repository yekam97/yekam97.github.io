// Importa los estilos globales aquí para que se apliquen a todas las páginas.
import '../style.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PageAccentProvider } from '@/context/PageAccentContext';


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <PageAccentProvider>
        <Component {...pageProps} />
      </PageAccentProvider>
    </LanguageProvider>
  );
}
