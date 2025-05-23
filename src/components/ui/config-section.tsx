import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConfigSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  footerActions?: ReactNode;
  noBodyPadding?: boolean;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({
  title,
  description,
  children,
  className,
  headerActions,
  footerActions,
  noBodyPadding = false
}) => {
  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn(noBodyPadding ? "p-0" : "")}>
        {children}
      </CardContent>
      {footerActions && (
        <div className="px-6 py-4 bg-muted/10 border-t flex items-center justify-end space-x-2">
          {footerActions}
        </div>
      )}
    </Card>
  );
};

export default ConfigSection;
