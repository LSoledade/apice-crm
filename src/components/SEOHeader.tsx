import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeaderProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  published?: string;
  modified?: string;
  article?: boolean;
  noindex?: boolean;
  canonical?: string;
  structuredData?: object;
}

const SEOHeader: React.FC<SEOHeaderProps> = ({
  title = "Combinat - Soluções em Gestão Empresarial e Marketing Digital",
  description = "Transforme seu negócio com nossas soluções completas: gestão de leads, campanhas de marketing digital, automação de vendas e controle empresarial. Aumente sua produtividade e resultados.",
  keywords = "gestão empresarial, marketing digital, leads, vendas, automação, CRM, campanhas, conversão, produtividade, resultados",
  image = "/combinat_primário.svg",
  url = "https://combinat.com.br",
  type = "website",
  author = "Combinat",
  published,
  modified,
  article = false,
  noindex = false,
  canonical,
  structuredData
}) => {
  const fullTitle = title.includes('Combinat') ? title : `${title} | Combinat`;
  const fullUrl = url.startsWith('http') ? url : `https://combinat.com.br${url}`;
  const fullImage = image.startsWith('http') ? image : `https://combinat.com.br${image}`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Combinat",
    "description": description,
    "url": "https://combinat.com.br",
    "logo": "https://combinat.com.br/combinat_primário.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-85-99999-9999",
      "contactType": "sales",
      "availableLanguage": ["Portuguese"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/combinat",
      "https://www.instagram.com/combinat.oficial"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fortaleza",
      "addressRegion": "CE",
      "addressCountry": "BR"
    }
  };

  return (
    <Helmet>
      {/* Título e Meta Tags Básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Combinat" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@combinat" />
      
      {/* Article específicos */}
      {article && published && (
        <meta property="article:published_time" content={published} />
      )}
      {article && modified && (
        <meta property="article:modified_time" content={modified} />
      )}
      {article && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      {/* Performance e SEO técnico */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#E9342E" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* DNS Prefetch para recursos externos */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default SEOHeader;
