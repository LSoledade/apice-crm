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
  Lock
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
        ? current.filter(item => item !== href)
        : [...current, href]
    );
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      description: 'Visão geral'
    },
    {
      title: 'Marketing',
      icon: TrendingUp,
      href: '/marketing',
      description: 'Marketing digital',
      children: [
        { title: 'Analytics', href: '/marketing/analytics', icon: BarChart3 },
        { title: 'Agenda', href: '/marketing/agenda', icon: Calendar },
        { title: 'Leads', href: '/marketing/leads', icon: Target },
        { title: 'Campanhas', href: '/marketing/campanhas', icon: TrendingUp }
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
          >
            <CollapsibleTrigger asChild>
              <div
                onClick={() => !collapsed && toggleMenu(item.href)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer mb-1",
                  active
                    ? "bg-crm-primary/10 text-crm-primary"
                    : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-100"
                )}
              >
                <div className="flex items-center">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center">
                          <item.icon className={cn("h-5 w-5 transition-colors duration-200", active && "text-crm-primary")} />
                        </div>
                      </TooltipTrigger>
                      {collapsed && <TooltipContent side="right" sideOffset={5}>{item.title}</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                  
                  <span className={cn(
                    "ml-3 text-sm transition-all duration-200 ease-in-out",
                    collapsed ? "w-0 opacity-0" : "opacity-100"
                  )}>{item.title}</span>
                </div>
                
                {!collapsed && (
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "transform rotate-90"
                  )} />
                )}
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="ml-1 space-y-0.5">
              {item.children.map((child: MenuItem) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "flex items-center pl-7 pr-3 py-2 rounded-md text-sm transition-colors",
                    isActive(child.href)
                      ? "bg-crm-primary/10 text-crm-primary font-medium"
                      : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/40"
                  )}
                >
                  <child.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="ml-2">{child.title}</span>
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
          "flex items-center px-3 py-2 rounded-md text-sm transition-colors mb-1",
          active
            ? "bg-crm-primary/10 text-crm-primary font-medium"
            : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/40"
        )}
      >
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <item.icon className={cn("h-5 w-5 transition-colors duration-200", active && "text-crm-primary")} />
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
  ];

  return (
    <div className={cn(
      "bg-gray-900 fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 ease-in-out border-r border-gray-800/40 z-30 overflow-x-hidden",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-hidden">
          <div className={cn(
            "w-8 h-8 bg-gradient-to-r from-crm-primary to-crm-secondary rounded-lg flex-shrink-0 flex items-center justify-center transition-all",
            collapsed ? "mx-auto" : ""
          )}>
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <span className="font-bold text-gray-100 whitespace-nowrap">Ápice CRM</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1 text-gray-400 hover:text-white hover:bg-transparent transition-transform duration-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full bg-gray-800/50 border-0 rounded-md py-2 pl-8 pr-3 text-sm text-gray-300 placeholder-gray-500 focus:ring-1 focus:ring-crm-primary/50 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-gray-800/40">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-800/40 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback className="bg-crm-primary/20 text-crm-primary">AC</AvatarFallback>
              </Avatar>
              
              <div className={cn(
                "ml-2 flex-1 min-w-0 overflow-hidden transition-all duration-300 ease-in-out",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                <p className="text-sm font-medium text-gray-200 truncate">Admin CRM</p>
                <p className="text-xs text-gray-500 truncate">admin@apice.com</p>
              </div>
            </div>
          </CollapsibleTrigger>
          
          {!collapsed && (
            <CollapsibleContent className="mt-1 py-1 px-0.5 space-y-0.5 bg-gray-900/80 rounded-md">
              {userMenuItems.map(item => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-800/40 hover:text-gray-100"
                >
                  <item.icon className="h-4 w-4 mr-2" />
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
