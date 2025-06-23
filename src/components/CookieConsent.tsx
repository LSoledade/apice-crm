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
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Card className="border-[#E9342E]/20 bg-white/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9342E]/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-[#E9342E]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="combinat-subtitle-sm text-[#303030] mb-3">
                    🍪 Usamos cookies para melhorar sua experiência
                  </h3>
                  <p className="combinat-text text-gray-600 text-sm leading-relaxed mb-4">
                    Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para análise, 
                    personalização e publicidade. Você pode escolher quais cookies aceitar.
                    <a 
                      href="/policies#cookies" 
                      className="text-[#E9342E] hover:underline ml-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saiba mais
                    </a>
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={acceptAll}
                      className="bg-[#E9342E] hover:bg-[#E9342E]/90 text-white combinat-text font-medium"
                      size="sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Aceitar Todos
                    </Button>
                    
                    <Button 
                      onClick={() => setShowPreferences(true)}
                      variant="outline"
                      className="border-[#E9342E]/40 text-[#E9342E] hover:bg-[#E9342E]/5 combinat-text font-medium"
                      size="sm"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Personalizar
                    </Button>
                    
                    <Button 
                      onClick={rejectAll}
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 combinat-text font-medium"
                      size="sm"
                    >
                      Apenas Essenciais
                    </Button>
                  </div>
                </div>
                
                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="combinat-subtitle-lg text-[#303030] flex items-center">
              <Settings className="w-5 h-5 mr-3 text-[#E9342E]" />
              Preferências de Cookies
            </DialogTitle>
            <DialogDescription className="combinat-text text-gray-600">
              Personalize suas preferências de cookies. Cookies essenciais são necessários para o funcionamento básico do site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Cookies Essenciais */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="combinat-subtitle-sm text-[#303030]">Cookies Essenciais</h4>
                    <p className="combinat-text text-sm text-gray-600">Necessários para o funcionamento básico</p>
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>
              <p className="combinat-text text-xs text-gray-500 pl-11">
                Incluem cookies de sessão, autenticação e preferências básicas do site.
              </p>
            </div>

            {/* Cookies de Analytics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="combinat-subtitle-sm text-[#303030]">Cookies de Análise</h4>
                    <p className="combinat-text text-sm text-gray-600">Nos ajudam a entender como você usa o site</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference('analytics')}
                />
              </div>
              <p className="combinat-text text-xs text-gray-500 pl-11">
                Google Analytics para análise de tráfego e comportamento dos usuários.
              </p>
            </div>

            {/* Cookies Funcionais */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="combinat-subtitle-sm text-[#303030]">Cookies Funcionais</h4>
                    <p className="combinat-text text-sm text-gray-600">Melhoram a funcionalidade do site</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.functional}
                  onCheckedChange={() => togglePreference('functional')}
                />
              </div>
              <p className="combinat-text text-xs text-gray-500 pl-11">
                Lembrança de preferências, configurações de idioma e funcionalidades personalizadas.
              </p>
            </div>

            {/* Cookies de Marketing */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E9342E]/10 flex items-center justify-center">
                    <Cookie className="w-4 h-4 text-[#E9342E]" />
                  </div>
                  <div>
                    <h4 className="combinat-subtitle-sm text-[#303030]">Cookies de Marketing</h4>
                    <p className="combinat-text text-sm text-gray-600">Para publicidade personalizada</p>
                  </div>
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference('marketing')}
                />
              </div>
              <p className="combinat-text text-xs text-gray-500 pl-11">
                Facebook Pixel, Google Ads e outras ferramentas para anúncios direcionados.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={acceptSelected}
              className="bg-[#E9342E] hover:bg-[#E9342E]/90 text-white combinat-text font-medium flex-1"
            >
              Salvar Preferências
            </Button>
            <Button 
              onClick={acceptAll}
              variant="outline"
              className="border-[#E9342E]/40 text-[#E9342E] hover:bg-[#E9342E]/5 combinat-text font-medium"
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
