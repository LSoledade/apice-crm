import React from 'react';
import { ModernHeader } from '@/components/ui/modern-header';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;
