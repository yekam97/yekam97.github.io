export const getRolesData = (language) => {
  const isEn = language === 'en';
  return [
    {
      category: isEn ? 'UNDERGRADUATE' : 'PREGRADO',
      title: isEn ? 'Industrial Designer' : 'Diseñador Industrial',
      description: isEn
        ? 'Pedagogical and Technological University of Colombia. Professional oriented towards product development, innovation and functional solutions that integrate creativity, technology and sustainability. Strategic approach and prototyping.'
        : 'Universidad Pedagógica y Tecnológica de Colombia. Profesional orientado al desarrollo de productos, innovación y soluciones funcionales que integran creatividad, tecnología y sostenibilidad. Enfoque estratégico y prototipado.',
      pdfUrl: '/DIPLOMA PREGRADO.pdf'
    },
    {
      category: isEn ? 'SPECIALIZATION' : 'ESPECIALIZACIÓN',
      title: isEn ? 'Marketing Management Specialization' : 'Alta Gerencia en Mercadotecnia',
      description: isEn
        ? 'Pedagogical and Technological University of Colombia. Training in market strategy design, positioning and business models. Strategic marketing management and entrepreneurship strengthening.'
        : 'Universidad Pedagógica y Tecnológica de Colombia. Formación en diseño de estrategias de mercado, posicionamiento y modelos de negocio. Gestión estratégica del marketing y fortalecimiento de emprendimientos.',
      pdfUrl: '/DIPLOMA DE GRADO ESPECIALIZACIÓN.pdf'
    },
    {
      category: isEn ? 'MASTER\'S' : 'MAESTRÍA',
      title: isEn ? 'Sustainable Development Projects' : 'Proyectos de Desarrollo Sostenible',
      description: isEn
        ? 'Master\'s with focus on formulation, management and evaluation of territorial projects and social innovation. Integration of economic, environmental and social impact for sustainable solutions.'
        : 'Magíster con enfoque en la formulación, gestión y evaluación de proyectos territoriales e innovación social. Integración de impacto económico, ambiental y social para soluciones sostenibles.',
      pdfUrl: '/DIPLOMA DE MAESTRIA.pdf'
    }
  ];
};


export const certifications = [
  {
    name_es: 'CERTIFICACIÓN DISEÑO UX/UI',
    name_en: 'UX/UI DESIGN CERTIFICATION',
    issuer: 'GOOGLE CAREER CERTIFICATES',
    date: '2024',
    url: 'https://coursera.org/share/f2a7baa8b7079d330169a8c490fb749b',
    id: 'Credential ID: GX-9921'
  },
  {
    name_es: 'INGLÉS B2',
    name_en: 'ENGLISH B2',
    issuer: 'EF SET certificate',
    date: '2024',
    url: 'https://cert.efset.org/es/exPUj4',
    id: 'B2 Upper Intermediate'
  },
  {
    name_es: 'DISEÑO GRÁFICO',
    name_en: 'GRAPHIC DESIGN',
    issuer: 'LINKEDIN LEARNING',
    date: '2021',
    url: 'https://www.linkedin.com/learning/certificates/ce1e321bbee3b0af651a8321602d50b335ef11b980a9b6c4c0ce77621cfb069f?trk=backfilled_certificate',
    id: '40 h · 13 cursos'
  },
  {
    name_es: 'DOCENCIA UNIVERSITARIA',
    name_en: 'UNIVERSITY TEACHING',
    issuer: 'POLITÉCNICO DE SURAMÉRICA',
    date: '2025',
    url: 'https://api-certificate.polisura.edu.co/certificate.php?data=LVYBQBxdGAReWCxrbXR2cFwNT14LbnZZEw5aAg4UGg9wZmdqIHNbCBIKR2h0WxEXSFAJBFJoITMsMywkBQ0XHENidghAFkMFWl0HBQ==',
    id: '120 h · Diplomado'
  },
  {
    name_es: 'PEDAGOGÍA PARA PROFESIONALES NO LICENCIADOS',
    name_en: 'PEDAGOGY FOR NON-LICENSED PROFESSIONALS',
    issuer: 'POLITÉCNICO INTERCONTINENTAL',
    date: '2025',
    url: 'https://api-certificate.polinterco.edu.co/certificate.php?data=LVYBQBxdGAReWCxrPX92e1RZFA4LZ3EISw5aBw5IGlZ7MD1qdSFeXhVQFDl0CkESSFAJBFJoITMsMywkBQ0XHENidghAFkMFWV0FAA==',
    id: '120 h · Diplomado'
  },
  {
    name_es: 'CERTIFICADO METODOLOGÍAS ÁGILES',
    name_en: 'AGILE METHODOLOGIES CERTIFICATE',
    issuer: 'SCRUM FUNDAMENTALS',
    date: '2024',
    id: 'Credential ID: SF-7712'
  }
];

