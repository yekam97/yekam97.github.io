import dynamic from 'next/dynamic';
import Head from 'next/head';
import Hero from '../components/Hero';
import Roles from '../components/Roles';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';

const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Roles />
      <Portfolio />
      <Experience />
      <Certifications />
      <Contact />
    </Layout>
  );
}
