import dynamic from 'next/dynamic';
import SeoHead from '../components/SeoHead';
import TrayectoriaPage from '../components/TrayectoriaPage';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function Trayectoria() {
  return (
    <>
      <SeoHead
        title="Trayectoria profesional | Yeison Camilo Gamba"
        description="Trayectoria profesional de Yeison Camilo Gamba: diseño industrial, UX/UI, desarrollo de plataformas, innovación y formación, con logros y resultados por cada rol."
        path="/trayectoria/"
      />
      <Layout subpage>
        <TrayectoriaPage />
      </Layout>
    </>
  );
}
