import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CombinatHeader from '@/combinat_site/components/CombinatHeader';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import HeaderWeather from '@/components/HeaderWeather';

interface HeaderProps {
  isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
  const { user } = useAuth();
  
  // Se for uma landing page, use o header da Combinat
  if (isLandingPage) {
    return <CombinatHeader />;
  }
  
  // Header do CRM (dashboard interno)
  return (
    <div className="w-full h-full flex items-center justify-between px-6">
      {/* Seção de pesquisa */}      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar leads, campanhas, clientes..."
            className="pl-10 bg-orange-50/50 border-orange-100 focus-visible:ring-2 focus-visible:ring-orange-500/20 focus-visible:border-orange-300 transition-all rounded-full h-10"
          />
        </div>
      </div>{/* Seção de ações - centralizada verticalmente */}
      <div className="flex items-center gap-4">
        {/* Widget de clima */}
        <HeaderWeather location="São Paulo" />
          {/* Notificações */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-orange-50 transition-colors h-10 w-10 p-0 rounded-full"
        >
          <Bell className="h-4 w-4 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
            3
          </span>
        </Button>

        {/* Separador visual */}
        <div className="h-6 w-px bg-orange-100"></div>

        {/* Perfil do usuário */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border-2 border-orange-200">
            <AvatarFallback className="bg-orange-100 text-orange-700 text-sm font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 leading-none">
              {user?.username || 'Usuário'}
            </p>
            <p className="text-xs text-gray-500 leading-none mt-1">
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long', 
                day: 'numeric', 
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;