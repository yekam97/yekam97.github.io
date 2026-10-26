import dynamic from 'next/dynamic';
import SeoHead from '../../components/SeoHead';
import ProyectoPage from '../../components/ProyectoPage';
import { getProjects, PROJECT_SLUGS } from '../../lib/projects';

const Layout = dynamic(() => import('../../components/Layout'), { ssr: false });

export function getStaticPaths() {
  return { paths: PROJECT_SLUGS.map((slug) => ({ params: { slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const p = getProjects('es').find((x) => x.slug === params.slug);
  return {
    props: {
      slug: params.slug,
      seo: {
        title: `${p.title} | Yeison Camilo Gamba`,
        description: p.description.slice(0, 200),
        image: `https://yekam97.github.io${p.image}`
      }
    }
  };
}

export default function Proyecto({ slug, seo }) {
  return (
    <>
      <SeoHead title={seo.title} description={seo.description} image={seo.image} path={`/proyectos/${slug}/`} />
      <Layout subpage>
        <ProyectoPage slug={slug} />
      </Layout>
    </>
  );
}
