import { useCallback, useEffect, useRef } from 'react';
import { useAnalytics } from './use-analytics';

/**
 * Hook para rastrear conversões em formulários
 * @param formId - Identificador do formulário
 * @param category - Categoria do evento (padrão: 'Form')
 */
export const useFormTracking = (formId: string, category: string = 'Form') => {
  const { trackEvent, startTiming, endTiming } = useAnalytics();
  const formTimingId = useRef<string>(`form_${formId}_${Date.now()}`);
  const formStarted = useRef<boolean>(false);
  
  // Iniciar o timing quando o formulário começa a ser preenchido
  const handleFormStart = () => {
    if (!formStarted.current) {
      startTiming(formTimingId.current);
      trackEvent(category, 'Form Start', formId);
      formStarted.current = true;
    }
  };
  
  // Rastrear submissão do formulário
  const handleSubmit = (isSuccess: boolean = true) => {
    if (formStarted.current) {
      // Calcular quanto tempo o usuário levou para preencher o formulário
      const timeSpent = endTiming(formTimingId.current, category, 'Completion Time', formId);
      
      // Enviar evento de conversão
      trackEvent(
        category, 
        isSuccess ? 'Form Submit Success' : 'Form Submit Failure',
        formId,
        timeSpent
      );
      
      // Reiniciar o tracking
      formTimingId.current = `form_${formId}_${Date.now()}`;
      formStarted.current = false;
      
      return timeSpent;
    }
    return 0;
  };
  
  // Rastrear abandono do formulário
  const handleAbandonment = useCallback((fieldsFilled: number) => {
    if (formStarted.current) {
      const timeSpent = endTiming(formTimingId.current, category, 'Abandonment Time', formId);
      
      trackEvent(
        category, 
        'Form Abandoned', 
        formId,
        fieldsFilled
      );
      
      // Adicionar detalhes do abandono
      trackEvent(
        category, 
        'Form Abandonment Details', 
        `${formId} - Fields: ${fieldsFilled}, Time: ${timeSpent}ms`
      );
      
      // Reiniciar o tracking
      formTimingId.current = `form_${formId}_${Date.now()}`;
      formStarted.current = false;
      
      return { timeSpent, fieldsFilled };
    }
    return { timeSpent: 0, fieldsFilled };
  }, [category, endTiming, formId, trackEvent]);

  // Limpar ao desmontar para evitar memory leaks
  useEffect(() => {
    return () => {
      if (formStarted.current) {
        handleAbandonment(0);
      }
    };
  }, [handleAbandonment]);

  return {
    handleFormStart,
    handleSubmit,
    handleAbandonment,
  };
};
