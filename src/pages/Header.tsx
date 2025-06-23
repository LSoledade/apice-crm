
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CombinatHeader from '@/pages/sitecombinat/components/CombinatHeader';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  sidebarCollapsed?: boolean;
  isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed = false, isLandingPage = false }) => {
  const { user } = useAuth();
  // Se for uma landing page, use o header da Combinat
  if (isLandingPage) {
    return <CombinatHeader />;
  }

  // Caso contrário, use o header do CRM (dashboard interno)
  return (
    <header className={`bg-white/95 backdrop-blur-sm shadow-sm px-6 py-3 fixed top-0 right-0 left-0 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} z-20 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar leads, campanhas, clientes..."
              className="pl-10 bg-gray-50/80 border-gray-200 focus-visible:ring-crm-primary/30 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 bg-crm-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center transition-all">
              3
            </span>
          </Button>

          {/* Data e Boas-vindas */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Olá, {user?.username}</p>            <p className="text-xs text-gray-500">{new Date().toLocaleDateString('pt-BR', {weekday: 'long', day: 'numeric', month: 'long'})}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
