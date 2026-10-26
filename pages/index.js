import dynamic from 'next/dynamic';
import SeoHead from '../components/SeoHead';
import Hero from '../components/Hero';
import ToolsRail from '../components/ToolsRail';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import EducationSummary from '../components/EducationSummary';
import Contact from '../components/Contact';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <SeoHead home />
      <Layout>
        <Hero />
        <ToolsRail />
        <Skills />
        <Portfolio />
        <Experience />
        <EducationSummary />
        <Contact />
      </Layout>
    </>
  );
}
