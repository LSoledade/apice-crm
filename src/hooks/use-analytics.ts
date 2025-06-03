import { useCallback, useEffect, useState } from 'react';
import analyticsService from '@/services/analyticsService';

/**
 * Hook personalizado para utilizar o Google Analytics na aplicação
 */
export const useAnalytics = () => {
  const [timingStart, setTimingStart] = useState<Record<string, number>>({});

  // Rastrear eventos de usuário
  const trackEvent = useCallback((category: string, action: string, label?: string, value?: number) => {
    analyticsService.event(category, action, label, value);
  }, []);

  // Identificar usuário
  const identifyUser = useCallback((userId: string) => {
    analyticsService.setUser(userId);
  }, []);

  // Rastrear visualização de página manualmente (caso necessário)
  const trackPageView = useCallback((path: string, title?: string) => {
    analyticsService.pageview(path, title);
  }, []);

  // Iniciar o timing para uma operação
  const startTiming = useCallback((timingId: string) => {
    setTimingStart(prev => ({
      ...prev,
      [timingId]: performance.now()
    }));
  }, []);

  // Concluir o timing e enviar para o GA
  const endTiming = useCallback((
    timingId: string, 
    category: string, 
    variable: string,
    label?: string
  ) => {
    if (timingStart[timingId]) {
      const endTime = performance.now();
      const timeElapsed = Math.round(endTime - timingStart[timingId]);
      analyticsService.timing(category, variable, timeElapsed, label);
      
      // Limpar o timing
      setTimingStart(prev => {
        const newState = { ...prev };
        delete newState[timingId];
        return newState;
      });
      
      return timeElapsed;
    }
    return 0;
  }, [timingStart]);

  // Rastreamento de produtos (eCommerce)
  const trackProductView = useCallback((product: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    brand?: string;
  }) => {
    analyticsService.viewProduct(product);
  }, []);

  const trackAddToCart = useCallback((product: {
    id: string;
    name: string;
    price?: number;
    quantity?: number;
    category?: string;
  }) => {
    analyticsService.addToCart(product);
  }, []);

  const trackPurchase = useCallback((transaction: {
    id: string;
    revenue: number;
    tax?: number;
    shipping?: number;
    items: Array<{
      id: string;
      name: string;
      price?: number;
      quantity?: number;
      category?: string;
    }>;
  }) => {
    analyticsService.purchase(transaction);
  }, []);

  // Limpar timings não concluídos ao desmontar o componente
  useEffect(() => {
    return () => {
      // Se o componente for desmontado com timings pendentes, podemos registrá-los como cancelados
      Object.keys(timingStart).forEach(timingId => {
        analyticsService.event('Timing', 'Canceled', timingId);
      });
    };
  }, [timingStart]);

  return {
    trackEvent,
    identifyUser,
    trackPageView,
    startTiming,
    endTiming,
    trackProductView,
    trackAddToCart,
    trackPurchase
  };
};
