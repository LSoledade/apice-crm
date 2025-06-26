import React, { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  offset?: number;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, offset = 80 }) => {
  useEffect(() => {
    // Implementar scroll suave para links âncora
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link && link.hash) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Atualizar URL sem jump
          if (link.hash !== window.location.hash) {
            history.pushState(null, '', link.hash);
          }
          
          // Focus para acessibilidade
          const focusableElement = targetElement.querySelector('h1, h2, h3, h4, h5, h6, [tabindex]') as HTMLElement;
          if (focusableElement) {
            focusableElement.focus({ preventScroll: true });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [offset]);

  // Aplicar scroll suave via CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
