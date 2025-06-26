import React from 'react';
import SEOHeader from '@/components/SEOHeader';
import SmoothScroll from '@/components/SmoothScroll';
import CombinatHeader from './components/CombinatHeader';
import CombinatFooter from './components/CombinatFooter';
import Hero from './home/Hero';
import PorqueCombinat from './home/PorqueCombinat';
import Solucoes from './home/Solucoes';
import Negocios from './home/Negocios';
import Equipe from './home/Equipe';

const CombinatSite = () => {  
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://combinat.com.br/#organization",
        "name": "Combinat",
        "description": "Soluções completas em gestão empresarial e marketing digital para transformar seu negócio",
        "url": "https://combinat.com.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://combinat.com.br/combinat_primário.svg",
          "width": 300,
          "height": 100
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-85-99999-9999",
          "contactType": "sales",
          "availableLanguage": ["Portuguese"],
          "areaServed": "BR"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Fortaleza",
          "addressRegion": "CE",
          "addressCountry": "BR"
        },
        "sameAs": [
          "https://www.linkedin.com/company/combinat",
          "https://www.instagram.com/combinat.oficial"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://combinat.com.br/#website",
        "url": "https://combinat.com.br",
        "name": "Combinat - Soluções em Gestão Empresarial",
        "description": "Transforme seu negócio com nossas soluções completas: gestão de leads, campanhas de marketing digital, automação de vendas e controle empresarial.",
        "publisher": {
          "@id": "https://combinat.com.br/#organization"
        },
        "inLanguage": "pt-BR"
      },
      {
        "@type": "Service",
        "name": "Gestão de Leads",
        "description": "Sistema completo para captura, qualificação e conversão de leads",
        "provider": {
          "@id": "https://combinat.com.br/#organization"
        }
      },
      {
        "@type": "Service",
        "name": "Marketing Digital",
        "description": "Campanhas automatizadas e estratégias de marketing digital para aumentar suas vendas",
        "provider": {
          "@id": "https://combinat.com.br/#organization"
        }
      },
      {
        "@type": "Service",
        "name": "Automação de Vendas",
        "description": "Automação completa do processo de vendas para aumentar produtividade e resultados",
        "provider": {
          "@id": "https://combinat.com.br/#organization"
        }
      }
    ]
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white overflow-hidden">
        <SEOHeader
          title="Combinat - Soluções em Gestão Empresarial e Marketing Digital"
          description="Transforme seu negócio com nossas soluções completas: gestão de leads, campanhas de marketing digital, automação de vendas e controle empresarial. Aumente sua produtividade e resultados."
          keywords="gestão empresarial, marketing digital, leads, vendas, automação, CRM, campanhas, conversão, produtividade, resultados, Fortaleza, Brasil"
          url="/"
          type="website"
          image="/combinat_primário.svg"
          structuredData={homeStructuredData}
        />
        <CombinatHeader />
      <main><div className="relative"> {/* Hero com posicionamento relativo para elementos decorativos */}
          <Hero />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-[#E9342E]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-10 w-60 h-60 bg-[#FF9334]/20 rounded-full blur-3xl -z-10"></div>
        </div>

        <div className="bg-white relative">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#E9342E]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          <PorqueCombinat />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FF9334]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Solucoes />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#E9342E]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Negocios />
        </div>
          <div className="bg-white relative">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#E9342E]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>          <div className="absolute bottom-40 left-20 w-72 h-72 bg-[#FF9334]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Equipe />        </div>
      </main>
      <CombinatFooter />
    </div>
    </SmoothScroll>
  );
};

export default CombinatSite;
