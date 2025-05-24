import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Code, 
  TrendingUp, 
  Users, 
  CodeSquare, 
  LineChart, 
  Layers, 
  Monitor, 
  MessageSquareShare, 
  Database, 
  TabletSmartphone,
  CloudCog,
  Bot
} from 'lucide-react';

const Solucoes = () => {
  // Soluções principais com visual melhorado
  const solucoes = [
    {
      icon: <CodeSquare className="w-12 h-12" />,
      titulo: "Desenvolvimento de Software Sob Medida",
      descricao: "Criamos sistemas, plataformas e APIs robustas e escaláveis, perfeitamente alinhadas às suas necessidades de negócio.",
      link: "#desenvolvimento",
      destaque: "Enterprise Grade",
      recursos: ["Web Apps", "Mobile Apps", "APIs", "Integrações"],
      cor: "blue"
    },
    {
      icon: <LineChart className="w-12 h-12" />,
      titulo: "Estratégias de Marketing Digital de Performance",
      descricao: "Planejamos e executamos campanhas de marketing digital focadas em resultados mensuráveis, otimizando seu ROI e expandindo seu alcance.",
      link: "#marketing",
      destaque: "ROI Garantido",
      recursos: ["SEO", "Mídia Paga", "Email", "Social Media"],
      cor: "green"
    },
    {
      icon: <Layers className="w-12 h-12" />,
      titulo: "Consultoria de Transformação Digital Integrada",
      descricao: "Guiamos sua empresa na jornada digital, do diagnóstico à implementação, garantindo que tecnologia e marketing trabalhem juntos para seus objetivos.",
      link: "#consultoria",
      destaque: "Estratégico",
      recursos: ["Diagnóstico", "Roadmap", "Implementação", "Treinamento"],
      cor: "purple"
    }
  ];

  // Soluções complementares para a seção expandida
  const solucoesTecnologicas = [
    { 
      icon: <Monitor className="w-6 h-6" />, 
      name: "Design de UX/UI", 
      desc: "Interfaces intuitivas e atraentes" 
    },
    { 
      icon: <Database className="w-6 h-6" />, 
      name: "Cloud Computing", 
      desc: "Infraestrutura escalável" 
    },
    { 
      icon: <Bot className="w-6 h-6" />, 
      name: "Inteligência Artificial", 
      desc: "Soluções com ML e IA" 
    },
    { 
      icon: <TabletSmartphone className="w-6 h-6" />, 
      name: "Aplicativos Móveis", 
      desc: "Android e iOS nativos" 
    },
  ];

  // Mapeamento de cores atualizado com gradientes e efeitos visuais
  const getColorClasses = (cor: string) => {
    const cores = {
      blue: {
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        iconBg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200/40",
        button: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
        shadow: "shadow-blue-500/20"
      },
      green: {
        bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
        iconBg: "bg-emerald-100",
        text: "text-emerald-600",
        border: "border-emerald-200/40",
        button: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600",
        shadow: "shadow-emerald-500/20"
      },
      purple: {
        bg: "bg-gradient-to-br from-violet-50 to-violet-100",
        iconBg: "bg-violet-100",
        text: "text-violet-600",
        border: "border-violet-200/40",
        button: "bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600",
        shadow: "shadow-violet-500/20"
      }
    };
    return cores[cor as keyof typeof cores];
  };
  return (
    <section id="solucoes" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">        
        {/* Header com design moderno */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700">
            Nossas Soluções
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Tecnologias que <span className="relative inline-block">
              <span className="absolute -inset-1 bg-blue-100 -skew-y-2 -z-10 rounded-lg"></span>
              <span className="relative text-blue-600">impulsionam</span>
            </span> seu negócio
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Combinamos expertise técnica e visão estratégica para desenvolver soluções digitais 
            que transformam desafios em oportunidades de crescimento.
          </p>
        </div>

        {/* Solutions Grid - Design Aprimorado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {solucoes.map((solucao, index) => {
            const cores = getColorClasses(solucao.cor);
            return (
              <Card key={index} className={`border-0 ${cores.border} shadow-lg hover:shadow-xl hover:shadow-${cores.shadow} transition-all duration-300 group bg-white overflow-hidden`}>
                <div className={`h-2 ${cores.button} w-full`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <div className={`w-16 h-16 ${cores.iconBg} rounded-2xl flex items-center justify-center ${cores.text} group-hover:scale-105 transition-transform duration-300`}>
                      {solucao.icon}
                    </div>
                    <Badge variant="outline" className={`${cores.bg} ${cores.text} border-0`}>
                      {solucao.destaque}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800 mt-4">{solucao.titulo}</CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    {solucao.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {solucao.recursos.map((recurso, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        {recurso}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className={`w-full ${cores.button} text-white shadow-sm hover:shadow-lg ${cores.shadow} transition-all duration-300`}>
                    Saiba Mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Seção de tecnologias complementares */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
              Tecnologias de Ponta
            </h3>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Nossa expertise abrange as mais recentes tecnologias e metodologias do mercado
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {solucoesTecnologicas.map((tech, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 text-blue-600">
                  {tech.icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">{tech.name}</h4>
                <p className="text-sm text-slate-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Design aprimorado */}
        <div className="relative">
          {/* Background overlay pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0zMCAwdjYwTTYwIDMwSDBNMzAgNjAuMWwtMzAtMzBNMzAgLjFsMzAgMzAiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 rounded-3xl -z-10"></div>
          
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white overflow-hidden relative z-0 shadow-xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/30 rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-400/30 rounded-full mix-blend-overlay filter blur-3xl"></div>
            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 drop-shadow-sm">
              Precisa de uma solução personalizada?
            </h3>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Cada negócio é único. Vamos conversar sobre suas necessidades específicas e criar uma 
              estratégia sob medida para acelerar seus resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-600 border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Agendar Consultoria Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                Ver Cases de Sucesso
              </Button>
            </div>
            
            <div className="mt-10 text-sm text-blue-100 flex items-center justify-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              Primeira análise gratuita para novos clientes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solucoes;
