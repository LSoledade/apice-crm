import React, { createContext, useCallback, useContext, useMemo } from 'react';
import analyticsService from '@/services/analyticsService';
import { useAnalytics } from '@/hooks/use-analytics';

// Interface para o contexto
interface AnalyticsContextType {
  trackEvent: (category: string, action: string, label?: string, value?: number) => void;
  trackPageView: (path: string, title?: string) => void;
  startTiming: (timingId: string) => void;
  endTiming: (timingId: string, category: string, variable: string, label?: string) => void | number;
  trackProductView: (product: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    brand?: string;
  }) => void;
}

// Criar o contexto
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Props do provider
interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId?: string;
  disabled?: boolean;
}

/**
 * Provider para o Google Analytics
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  measurementId,
  disabled = false,
}) => {
  // Inicializar o serviço com o ID personalizado, se fornecido
  useCallback(() => {
    if (measurementId && !disabled) {
      analyticsService.initialize();
    }
  }, [measurementId, disabled]);

  // Obter métodos do hook de analytics
  const {
    trackEvent,
    trackPageView,
    startTiming,
    endTiming,
    trackProductView
  } = useAnalytics();

  // Envolver métodos para respeitar a flag "disabled"
  const wrappedTrackEvent = useCallback(
    (category: string, action: string, label?: string, value?: number) => {
      if (!disabled) trackEvent(category, action, label, value);
    },
    [disabled, trackEvent]
  );

  const wrappedTrackPageView = useCallback(
    (path: string, title?: string) => {
      if (!disabled) trackPageView(path, title);
    },
    [disabled, trackPageView]
  );

  const wrappedStartTiming = useCallback(
    (timingId: string) => {
      if (!disabled) startTiming(timingId);
    },
    [disabled, startTiming]
  );

  const wrappedEndTiming = useCallback(
    (timingId: string, category: string, variable: string, label?: string) => {
      if (!disabled) return endTiming(timingId, category, variable, label);
      return 0;
    },
    [disabled, endTiming]
  );

  const wrappedTrackProductView = useCallback(
    (product: {
      id: string;
      name: string;
      category?: string;
      price?: number;
      brand?: string;
    }) => {
      if (!disabled) trackProductView(product);
    },
    [disabled, trackProductView]
  );

  // Valor do contexto
  const value = useMemo(
    () => ({
      trackEvent: wrappedTrackEvent,
      trackPageView: wrappedTrackPageView,
      startTiming: wrappedStartTiming,
      endTiming: wrappedEndTiming,
      trackProductView: wrappedTrackProductView,
    }),
    [
      wrappedTrackEvent,
      wrappedTrackPageView,
      wrappedStartTiming,
      wrappedEndTiming,
      wrappedTrackProductView,
    ]
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

/**
 * Hook para usar o contexto do Analytics
 */
export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within a AnalyticsProvider');
  }
  
  return context;
};
