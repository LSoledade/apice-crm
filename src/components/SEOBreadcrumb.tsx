import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface SEOBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const SEOBreadcrumb: React.FC<SEOBreadcrumbProps> = ({ items, className = '' }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://combinat.com.br${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Visual Breadcrumb */}
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === 0 && (
                <Home className="w-4 h-4 mr-1 text-gray-500" />
              )}
              
              {item.href && !item.current ? (
                <a 
                  href={item.href}
                  className="text-gray-600 hover:text-[#E9342E] transition-colors"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span 
                  className={item.current ? 'text-[#E9342E] font-medium' : 'text-gray-600'}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {index < items.length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default SEOBreadcrumb;
