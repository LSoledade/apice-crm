import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import analyticsService from '@/services/analyticsService';

interface AnalyticsButtonProps extends ButtonProps {
  category?: string;
  action?: string;
  label?: string;
  value?: number;
}

/**
 * Botão com rastreamento automático do Google Analytics
 */
const AnalyticsButton = React.forwardRef<HTMLButtonElement, AnalyticsButtonProps>(
  ({ children, onClick, category = 'UI', action = 'click', label, value, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Rastrear o evento de clique
      analyticsService.event(category, action, label || props.id || 'button', value);
      
      // Chamar o manipulador original de onClick, se existir
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnalyticsButton.displayName = 'AnalyticsButton';

export { AnalyticsButton };
