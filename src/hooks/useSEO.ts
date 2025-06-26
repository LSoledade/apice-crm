import { useEffect } from 'react';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

export const useSEO = (seoData: SEOData) => {
  useEffect(() => {
    // Atualizar título da página
    if (seoData.title) {
      document.title = seoData.title.includes('Combinat') 
        ? seoData.title 
        : `${seoData.title} | Combinat`;
    }

    // Atualizar meta description
    if (seoData.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', seoData.description);
    }

    // Atualizar meta keywords
    if (seoData.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seoData.keywords);
    }

    // Atualizar Open Graph
    if (seoData.title) {
      updateMetaProperty('og:title', seoData.title);
    }
    if (seoData.description) {
      updateMetaProperty('og:description', seoData.description);
    }
    if (seoData.image) {
      updateMetaProperty('og:image', seoData.image.startsWith('http') ? seoData.image : `https://combinat.com.br${seoData.image}`);
    }
    if (seoData.url) {
      updateMetaProperty('og:url', seoData.url.startsWith('http') ? seoData.url : `https://combinat.com.br${seoData.url}`);
    }
    if (seoData.type) {
      updateMetaProperty('og:type', seoData.type);
    }

    // Atualizar Twitter Cards
    if (seoData.title) {
      updateMetaName('twitter:title', seoData.title);
    }
    if (seoData.description) {
      updateMetaName('twitter:description', seoData.description);
    }
    if (seoData.image) {
      updateMetaName('twitter:image', seoData.image.startsWith('http') ? seoData.image : `https://combinat.com.br${seoData.image}`);
    }

    // Atualizar canonical
    if (seoData.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seoData.canonical);
    }

    // Robots meta
    if (seoData.noindex) {
      updateMetaName('robots', 'noindex, nofollow');
    } else {
      updateMetaName('robots', 'index, follow');
    }

    // Structured Data
    if (seoData.structuredData) {
      // Remove existing structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => {
        if (script.textContent?.includes('@context')) {
          script.remove();
        }
      });

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seoData.structuredData);
      document.head.appendChild(script);
    }
  }, [seoData]);

  const updateMetaProperty = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  const updateMetaName = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
};

export default useSEO;
