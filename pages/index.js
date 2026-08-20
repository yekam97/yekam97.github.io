import dynamic from 'next/dynamic';
import Head from 'next/head';
import Hero from '../components/Hero';
import CategoryMarquee from '../components/CategoryMarquee';
import Stats from '../components/Stats';
import Skills from '../components/Skills';
import Roles from '../components/Roles';
import Portfolio from '../components/Portfolio';
import ProductMotif from '../components/ProductMotif';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <CategoryMarquee />
      <Stats />
      <Skills />
      <ProductMotif figureNumber="01" />
      <Portfolio />
      <ProductMotif figureNumber="05" />
      <Experience />
      <div className="education-grid container section-padding">
        <Roles />
        <Certifications />
      </div>
      <Contact />
    </Layout>
  );
}
