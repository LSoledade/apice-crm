import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Users, 
  Shield, 
  Globe, 
  Puzzle, 
  ArrowRight, 
  Sliders,
  Bell,
  FileText,
  Database,
  Lock
} from 'lucide-react';

const Configuracoes = () => {
  const configSections = [
    {
      title: 'Configurações Gerais',
      description: 'Configurações básicas do sistema, como nome da empresa, localização e preferências',
      icon: <Settings className="h-6 w-6" />,
      link: '/configuracoes/geral',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Usuários',
      description: 'Gerencie usuários do sistema, adicione novos usuários e edite permissões',
      icon: <Users className="h-6 w-6" />,
      link: '/configuracoes/usuarios',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Permissões',
      description: 'Configure perfis de acesso e permissões para os usuários do sistema',
      icon: <Shield className="h-6 w-6" />,
      link: '/configuracoes/permissoes',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Domínios',
      description: 'Gerencie os domínios associados ao seu CRM e verificações de DNS',
      icon: <Globe className="h-6 w-6" />,
      link: '/configuracoes/dominios',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Integrações',
      description: 'Configure integrações com serviços externos como email, pagamentos e analytics',
      icon: <Puzzle className="h-6 w-6" />,
      link: '/configuracoes/integracoes',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Aparência',
      description: 'Personalize a aparência do CRM, temas, cores e layout',
      icon: <Sliders className="h-6 w-6" />,
      link: '/configuracoes/aparencia',
      color: 'bg-red-50 text-red-600',
      comingSoon: true,
    },
    {
      title: 'Notificações',
      description: 'Configure alertas e notificações do sistema para os usuários',
      icon: <Bell className="h-6 w-6" />,
      link: '/configuracoes/notificacoes',
      color: 'bg-cyan-50 text-cyan-600',
      comingSoon: true,
    },
    {
      title: 'Modelos de Documentos',
      description: 'Gerencie modelos de documentos para propostas, contratos e faturas',
      icon: <FileText className="h-6 w-6" />,
      link: '/configuracoes/documentos',
      color: 'bg-emerald-50 text-emerald-600',
      comingSoon: true,
    },
    {
      title: 'Campos personalizados',
      description: 'Configure campos personalizados para leads, clientes e oportunidades',
      icon: <Database className="h-6 w-6" />,
      link: '/configuracoes/campos',
      color: 'bg-pink-50 text-pink-600',
      comingSoon: true,
    },
    {
      title: 'Segurança',
      description: 'Configure políticas de senha, autenticação em dois fatores e logs de acesso',
      icon: <Lock className="h-6 w-6" />,
      link: '/configuracoes/seguranca',
      color: 'bg-orange-50 text-orange-600',
      comingSoon: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Personalize seu CRM de acordo com as necessidades do seu negócio.</p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {configSections.map((section, index) => (
          <Link 
            to={section.comingSoon ? '#' : section.link} 
            key={index} 
            className={`block transition-all hover:shadow-md ${section.comingSoon ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-md ${section.color} mb-2`}>
                    {section.icon}
                  </div>
                  {section.comingSoon && (
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">
                      Em breve
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-end pt-2">
                <span className="text-sm flex items-center text-primary font-medium">
                  {section.comingSoon ? 'Disponível em breve' : 'Configurar'}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Configuracoes;
