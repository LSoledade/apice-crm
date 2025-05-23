
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, BarChart3, Target, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Gestão de Leads',
      description: 'Controle completo do funil de vendas com acompanhamento em tempo real'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics Avançado',
      description: 'Relatórios detalhados e métricas que importam para o seu negócio'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Automação de Marketing',
      description: 'Campanhas automatizadas e gestão inteligente de tráfego'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Gestão de Equipe',
      description: 'Controle de usuários e permissões com total segurança'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Segurança Total',
      description: 'Proteção avançada dos dados com criptografia de ponta'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Gestão Financeira',
      description: 'Controle completo de pagamentos e agenda financeira'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-crm-primary to-crm-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gradient">Ápice CRM</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-crm-primary transition-colors">Recursos</a>
            <a href="#pricing" className="text-gray-600 hover:text-crm-primary transition-colors">Preços</a>
            <a href="#contact" className="text-gray-600 hover:text-crm-primary transition-colors">Contato</a>
          </nav>

          <Link to="/login">
            <Button className="bg-crm-primary hover:bg-crm-primary/90">
              Acessar Sistema
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4 animate-pulse-glow">
            ✨ CRM Completo para Sua Empresa
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
            Controle Total do Seu
            <span className="text-gradient block mt-2">Negócio Digital</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Sistema completo de CRM com foco em gestão de leads, campanhas de marketing digital, 
            controle financeiro e muito mais. Tudo em uma plataforma inteligente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/login">
              <Button size="lg" className="bg-crm-primary hover:bg-crm-primary/90 text-lg px-8 py-3">
                Começar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos que Fazem a <span className="text-gradient">Diferença</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvido especificamente para empresas que precisam de controle total sobre vendas e marketing digital
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-scale cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-crm-primary to-crm-secondary rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-crm-primary to-crm-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para Revolucionar Seu Negócio?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram seus resultados com o Ápice CRM
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Começar Gratuitamente
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-crm-primary">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-crm-primary to-crm-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold">Ápice CRM</span>
              </div>
              <p className="text-gray-400">
                A solução completa para gestão empresarial e marketing digital.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fale Conosco</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ápice CRM. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
