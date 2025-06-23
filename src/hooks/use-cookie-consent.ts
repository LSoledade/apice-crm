import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface CookieConsent {
  preferences: CookiePreferences;
  timestamp: string;
  version: string;
}

const STORAGE_KEY = 'combinat-cookie-consent';
const CONSENT_VERSION = '1.0';

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const consent: CookieConsent = JSON.parse(stored);
        setHasConsent(true);
        setPreferences(consent.preferences);
        
        // Aplicar configurações de cookies baseado nas preferências
        applyCookieSettings(consent.preferences);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        // Se houver erro, resetar
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const saveConsent = (newPreferences: CookiePreferences) => {
    const consent: CookieConsent = {
      preferences: newPreferences,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setHasConsent(true);
    setPreferences(newPreferences);
    applyCookieSettings(newPreferences);
  };

  const revokeConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasConsent(false);
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(essentialOnly);
    applyCookieSettings(essentialOnly);
  };

  const applyCookieSettings = (prefs: CookiePreferences) => {
    // Google Analytics
    if (prefs.analytics) {
      // Ativar GA4
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else {
      // Desativar GA4
      window.gtag?.('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    // Marketing cookies
    if (prefs.marketing) {
      // Ativar Facebook Pixel, Google Ads, etc.
      window.gtag?.('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    } else {
      // Desativar marketing cookies
      window.gtag?.('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }

    // Functional cookies
    if (prefs.functional) {
      // Ativar cookies funcionais (preferências, idioma, etc.)
      console.log('Functional cookies enabled');
    } else {
      // Limpar cookies funcionais não essenciais
      console.log('Functional cookies disabled');
    }
  };

  return {
    hasConsent,
    preferences,
    saveConsent,
    revokeConsent,
  };
};

// Declaração de tipos para window.gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}
