import dynamic from 'next/dynamic';
import SeoHead from '../components/SeoHead';
import EstudiosPage from '../components/EstudiosPage';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function Estudios() {
  return (
    <>
      <SeoHead
        title="Estudios y certificaciones | Yeison Camilo Gamba"
        description="Formación académica de Yeison Camilo Gamba: diseñador industrial, especialización en alta gerencia en mercadotecnia, maestría en proyectos de desarrollo sostenible y certificaciones."
        path="/estudios/"
      />
      <Layout subpage>
        <EstudiosPage />
      </Layout>
    </>
  );
}
