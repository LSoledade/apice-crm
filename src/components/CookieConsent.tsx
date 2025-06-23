import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, Settings, X, Check, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useCookieConsent, type CookiePreferences } from '@/hooks/use-cookie-consent';

const CookieConsent = () => {
  const { hasConsent, preferences: savedPreferences, saveConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(savedPreferences);

  useEffect(() => {
    // Se não tem consentimento, mostra o banner após 1 segundo
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  useEffect(() => {
    // Atualiza as preferências locais quando as salvas mudam
    setPreferences(savedPreferences);
  }, [savedPreferences]);
  const saveCookiePreferences = (prefs: CookiePreferences) => {
    saveConsent(prefs);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const acceptSelected = () => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    saveCookiePreferences(onlyEssential);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Não permite desabilitar cookies essenciais
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;
  return (
    <>
      {/* Cookie Banner - Mobile First Design */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <Card className="border-[#E9342E]/20 bg-white/80 backdrop-blur-sm">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Icon - Hidden on very small screens, visible on sm+ */}
                <div className="hidden sm:flex w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#E9342E]/10 items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 md:w-6 md:h-6 text-[#E9342E]" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title with responsive text sizes */}
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#303030] mb-2 md:mb-3 leading-tight">
                    <span className="sm:hidden">🍪 </span>
                    <span className="hidden sm:inline">🍪 </span>
                    Usamos cookies para melhorar sua experiência
                  </h3>
                  
                  {/* Description with better mobile typography */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">
                    Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para análise, 
                    personalização e publicidade.{' '}
                    <span className="hidden sm:inline">Você pode escolher quais cookies aceitar.</span>
                    <br className="sm:hidden" />
                    <a 
                      href="/policies#cookies" 
                      className="text-[#E9342E] hover:underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saiba mais
                    </a>
                  </p>
                  
                  {/* Mobile-first button layout */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <Button 
                      onClick={acceptAll}
                      className="bg-[#E9342E] hover:bg-[#E9342E]/90 text-white font-medium text-sm sm:text-sm order-1"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Aceitar Todos
                    </Button>
                    
                    <div className="flex gap-2 order-2">
                      <Button 
                        onClick={() => setShowPreferences(true)}
                        variant="outline"
                        className="border-[#E9342E]/40 text-[#E9342E] hover:bg-[#E9342E]/5 font-medium flex-1 sm:flex-none text-sm"
                        size="sm"
                      >
                        <Settings className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Personalizar</span>
                        <span className="sm:hidden">Config</span>
                      </Button>
                      
                      <Button 
                        onClick={rejectAll}
                        variant="ghost"
                        className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-medium flex-1 sm:flex-none text-sm"
                        size="sm"
                      >
                        <span className="hidden sm:inline">Apenas Essenciais</span>
                        <span className="sm:hidden">Essenciais</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Close button - positioned better for mobile */}
                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0 self-start sm:self-center -mt-1 sm:mt-0"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>      {/* Preferences Dialog - Mobile Optimized */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto mx-auto my-4 sm:my-8">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-[#303030] flex items-center">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-[#E9342E]" />
              Preferências de Cookies
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 leading-relaxed">
              Personalize suas preferências de cookies. Cookies essenciais são necessários para o funcionamento básico do site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6 py-4">
            {/* Cookies Essenciais */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-[#303030] truncate">Cookies Essenciais</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Necessários para o funcionamento básico</p>
                  </div>
                </div>
                <Switch checked={true} disabled className="flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500 pl-8 sm:pl-11 leading-relaxed">
                Incluem cookies de sessão, autenticação e preferências básicas do site.
              </p>
            </div>

            {/* Cookies de Analytics */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-[#303030] truncate">Cookies de Análise</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference('analytics')}
                  className="flex-shrink-0"
                />
              </div>
              <p className="text-xs text-gray-500 pl-8 sm:pl-11 leading-relaxed">
                Google Analytics para análise de tráfego e comportamento dos usuários.
              </p>
            </div>

            {/* Cookies Funcionais */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-[#303030] truncate">Cookies Funcionais</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Melhoram a funcionalidade do site</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.functional}
                  onCheckedChange={() => togglePreference('functional')}
                  className="flex-shrink-0"
                />
              </div>
              <p className="text-xs text-gray-500 pl-8 sm:pl-11 leading-relaxed">
                Lembrança de preferências, configurações de idioma e funcionalidades personalizadas.
              </p>
            </div>

            {/* Cookies de Marketing */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#E9342E]/10 flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-3 h-3 sm:w-4 sm:h-4 text-[#E9342E]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-[#303030] truncate">Cookies de Marketing</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Para publicidade personalizada</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference('marketing')}
                  className="flex-shrink-0"
                />
              </div>
              <p className="text-xs text-gray-500 pl-8 sm:pl-11 leading-relaxed">
                Facebook Pixel, Google Ads e outras ferramentas para anúncios direcionados.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-3 pt-4 border-t">
            <Button 
              onClick={acceptSelected}
              className="bg-[#E9342E] hover:bg-[#E9342E]/90 text-white font-medium flex-1 text-sm sm:text-sm order-1"
            >
              Salvar Preferências
            </Button>
            <Button 
              onClick={acceptAll}
              variant="outline"
              className="border-[#E9342E]/40 text-[#E9342E] hover:bg-[#E9342E]/5 font-medium text-sm sm:text-sm order-2 sm:order-2"
            >
              Aceitar Todos
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
