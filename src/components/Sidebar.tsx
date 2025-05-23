
import React from 'react';
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
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: BarChart3,
      href: '/dashboard',
      description: 'Visão geral'
    },
    {
      title: 'Configurações',
      icon: Settings,
      href: '/configuracoes',
      description: 'Configurações',
      children: [
        { title: 'Usuários', href: '/configuracoes/usuarios', icon: Users },
        { title: 'Permissões', href: '/configuracoes/permissoes', icon: FileText }
      ]
    },
    {
      title: 'Financeiro',
      icon: CreditCard,
      href: '/financeiro',
      description: 'Gestão financeira',
      children: [
        { title: 'Pagamentos', href: '/financeiro/pagamentos', icon: CreditCard },
        { title: 'Agenda de Pagamentos', href: '/financeiro/agenda', icon: Calendar }
      ]
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
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-crm-primary to-crm-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-gradient">Ápice CRM</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <div key={item.href}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-crm-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3">{item.title}</span>
              )}
            </Link>
            
            {/* Submenu */}
            {!collapsed && item.children && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-xs transition-colors",
                      isActive(child.href)
                        ? "bg-crm-primary/10 text-crm-primary border-l-2 border-crm-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <child.icon className="h-3 w-3 flex-shrink-0" />
                    <span className="ml-2">{child.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
