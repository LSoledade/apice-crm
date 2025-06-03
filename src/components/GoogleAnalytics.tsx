import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analyticsService from '@/services/analyticsService';

/**
 * Componente para rastreamento de Analytics
 * Deve ser usado dentro do BrowserRouter
 */
const GoogleAnalytics = () => {
  const location = useLocation();
  const initialized = useRef(false);
  const previousPage = useRef<string | null>(null);
  
  // Função para detectar o tipo de dispositivo
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  };

  // Coletar informações do navegador e dispositivo
  const getBrowserInfo = () => {
    const browser = {
      language: navigator.language,
      userAgent: navigator.userAgent,
      deviceType: getDeviceType(),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      hasTouch: 'ontouchstart' in window,
      isOnline: navigator.onLine
    };
    return browser;
  };

  // Inicializa o Analytics uma vez
  useEffect(() => {
    if (!initialized.current) {
      analyticsService.initialize();
      initialized.current = true;
      
      // Enviar evento único de primeira visita se for nova sessão
      if (sessionStorage.getItem('ga_session_started') !== 'true') {
        sessionStorage.setItem('ga_session_started', 'true');
        
        // Enviar informações do navegador e dispositivo
        const browserInfo = getBrowserInfo();
        analyticsService.event('Session', 'Start', 'New Visit');
        analyticsService.event('Device', 'Info', JSON.stringify(browserInfo));
        
        // Enviar métricas de performance se disponíveis
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;
          const domReadyTime = timing.domComplete - timing.domLoading;
          
          if (loadTime > 0) {
            analyticsService.timing('Page Load', 'Total', loadTime, location.pathname);
          }
          
          if (domReadyTime > 0) {
            analyticsService.timing('Page Load', 'DOM Ready', domReadyTime, location.pathname);
          }
        }
      }
    }
  }, [getBrowserInfo, location.pathname]);

  // Rastreia mudanças de página
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    
    if (initialized.current && (previousPage.current !== currentPath)) {
      // Rastreamento da visualização de página
      analyticsService.pageview(currentPath, document.title);
      
      // Registrar o tempo de permanência na página anterior
      if (previousPage.current) {
        const timeOnPreviousPage = Math.round(performance.now());
        analyticsService.event('Navigation', 'Page Exit', previousPage.current);
        analyticsService.timing('User Engagement', 'Time on Page', timeOnPreviousPage, previousPage.current);
      }
      
      // Atualizar a página atual
      previousPage.current = currentPath;
    }
  }, [location]);

  // Monitorar eventos de visibilidade da página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        analyticsService.event('Visibility', 'Page Visible', location.pathname);
      } else {
        analyticsService.event('Visibility', 'Page Hidden', location.pathname);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location]);

  // Rastrear eventos de erro não capturados
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      analyticsService.event(
        'Error', 
        'Uncaught Exception', 
        `${event.message} - ${event.filename}:${event.lineno}:${event.colno}`
      );
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null; // Componente não renderiza nada visualmente
};

export default GoogleAnalytics;
