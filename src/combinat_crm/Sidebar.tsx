import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  Settings,
  Calendar,
  FileText,
  CreditCard,
  Target,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Globe,
  Lock,
  MessageSquare
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
  description?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const toggleMenu = (href: string) => {
    setOpenMenus(current => 
      current.includes(href)
        ? [] // Se já está aberto, fecha completamente
        : [href] // Se não está aberto, abre apenas este e fecha todos os outros
    );
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      description: 'Visão geral'
    },    {
      title: 'Marketing',
      icon: TrendingUp,
      href: '/marketing',
      description: 'Marketing digital',
      children: [
        { title: 'Analytics', href: '/marketing/analytics', icon: BarChart3 },
        { title: 'Agenda', href: '/marketing/agenda', icon: Calendar },
        { title: 'Leads', href: '/marketing/leads', icon: Target },
        { title: 'Campanhas', href: '/marketing/campanhas', icon: TrendingUp },
        { title: 'Mensagens', href: '/marketing/mensagens', icon: MessageSquare }
      ]
    },
    {
      title: 'Financeiro',
      icon: CreditCard,
      href: '/financeiro',
      description: 'Gestão financeira',
      children: [
        { title: 'Faturamento', href: '/financeiro/faturamento', icon: CreditCard },
        { title: 'Pagamentos', href: '/financeiro/pagamentos', icon: CreditCard },
        { title: 'Agenda de Pagamentos', href: '/financeiro/agenda', icon: Calendar }
      ]
    },
    {      title: 'Configurações',
      icon: Settings,
      href: '/configuracoes',
      description: 'Configurações',
      children: [
        { title: 'Geral', href: '/configuracoes/geral', icon: Settings },
        { title: 'Domínios', href: '/configuracoes/dominios', icon: Globe },
        { title: 'Integrações', href: '/configuracoes/integracoes', icon: FileText },
        { title: 'Usuários', href: '/configuracoes/usuarios', icon: Users },
        { title: 'Permissões', href: '/configuracoes/permissoes', icon: FileText },
        { title: 'Segurança', href: '/configuracoes/seguranca', icon: Lock }
      ]
    }
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const renderMenuItem = (item: MenuItem) => {
    const active = isActive(item.href);
    const isOpen = openMenus.includes(item.href);
      if (item.children) {
      return (
        <div key={item.href}>
          <Collapsible 
            open={collapsed ? false : isOpen} 
            className="w-full"
          >            <Link
              to={item.href}
              onClick={() => toggleMenu(item.href)}
              className={cn(
                "flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-1 combinat-text",
                active
                  ? "bg-[#E9342E]/10 text-[#E9342E] shadow-sm border border-[#E9342E]/20"
                  : "text-gray-600 hover:text-[#E9342E] hover:bg-gray-50"
              )}
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center">
                      <item.icon className={cn("h-5 w-5 transition-colors duration-200", active && "text-[#E9342E]")} />
                    </div>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right" sideOffset={5}>{item.title}</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
              
              <span className={cn(
                "ml-3 flex-1 text-left transition-all duration-200 ease-in-out",
                collapsed ? "w-0 opacity-0" : "opacity-100"
              )}>{item.title}</span>
              
              {!collapsed && (
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform ml-auto",
                  isOpen && "transform rotate-90"
                )} />
              )}
            </Link>
            
            <CollapsibleContent className="ml-1 space-y-1">
              {item.children.map((child: MenuItem) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-center pl-8 pr-3 py-2 rounded-lg text-sm transition-all duration-200 combinat-text",
                    isActive(child.href)
                      ? "bg-[#FF9334]/10 text-[#FF9334] font-medium border-l-2 border-[#FF9334]"
                      : "text-gray-500 hover:text-[#FF9334] hover:bg-gray-50"
                  )}
                >
                  <child.icon className="h-4 w-4 flex-shrink-0 mr-2" />
                  <span>{child.title}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }
    
    return (
      <Link
        key={item.href}
        to={item.href}
        className={cn(
          "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-1 combinat-text",
          active
            ? "bg-[#E9342E]/10 text-[#E9342E] shadow-sm border border-[#E9342E]/20"
            : "text-gray-600 hover:text-[#E9342E] hover:bg-gray-50"
        )}
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <item.icon className={cn("h-5 w-5 transition-colors duration-200", active && "text-[#E9342E]")} />
              </div>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right" sideOffset={5}>{item.title}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
        
        <span className={cn(
          "ml-3 transition-all duration-200 ease-in-out",
          collapsed ? "w-0 opacity-0" : "opacity-100"
        )}>{item.title}</span>
      </Link>
    );
  };

  const userMenuItems = [
    { title: 'Ver perfil', icon: User, href: '/perfil' },
    { title: 'Configurações da conta', icon: Settings, href: '/configuracoes-conta' },
    { title: 'Analytics', icon: BarChart3, href: '/analytics-usuario' },  
    { title: 'Sair', icon: LogOut, href: '/logout' }
  ];  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-full overflow-x-hidden shadow-lg transition-all duration-300 ease-in-out",
      "grid grid-rows-[auto_auto_1fr_auto]", // CSS Grid: header, search, nav, user
    )}>
      {/* Header */}
      <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 border-b border-gray-100">
        <div className="flex items-center overflow-hidden min-w-0">
          <div className="relative flex items-center justify-center">
            {/* Logo expandido - aparece quando a sidebar está expandida */}
            <img 
              src="/combinat_primário.svg" 
              alt="Combinat" 
              className={cn(
                "h-6 w-auto transition-all duration-300 ease-in-out",
                collapsed ? "opacity-0 scale-95 w-0" : "opacity-100 scale-100"
              )}
            />
            
            {/* Logo reduzido - aparece quando a sidebar está colapsada */}
            <img 
              src="/combinat_reduzido.svg" 
              alt="Combinat" 
              className={cn(
                "h-6 w-6 transition-all duration-300 ease-in-out flex-shrink-0",
                collapsed ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
              )}
            />
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 text-gray-500 hover:text-[#E9342E] hover:bg-gray-50 transition-all duration-200 rounded-lg flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            className={cn(
              "w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#E9342E]/20 focus:border-[#E9342E] focus:outline-none transition-all duration-200",
              collapsed && "opacity-0 pointer-events-none"
            )}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>      {/* Navigation */}
      <nav className="px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden scroll-container min-h-0 flex-1">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-gray-100 mt-auto">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center p-3 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-100">
              <Avatar className="h-9 w-9 border-2 border-[#E9342E]/20 flex-shrink-0">
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback className="bg-[#E9342E]/10 text-[#E9342E] combinat-cta text-sm">AC</AvatarFallback>
              </Avatar>
              
              <div className={cn(
                "ml-3 flex-1 min-w-0 overflow-hidden transition-all duration-300 ease-in-out",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                <p className="combinat-text text-sm font-medium text-gray-800 truncate">Admin CRM</p>
                <p className="combinat-text text-xs text-gray-500 truncate">admin@apice.com</p>
              </div>
            </div>
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-2 py-2 px-1 space-y-1 bg-gray-50/50 rounded-lg border border-gray-100">
              {userMenuItems.map(item => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-[#E9342E] transition-all duration-200 combinat-text"
                >
                  <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  {item.title}
                </Link>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    </div>
  );
};

export default Sidebar;
