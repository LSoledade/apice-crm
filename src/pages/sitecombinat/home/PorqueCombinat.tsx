import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Target, Users, BarChart3, Shield, Lightbulb, Star, CheckCircle2, Award, TrendingUp } from 'lucide-react';

const PorqueCombinat = () => {
  const reasons = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Resultados Rápidos",
      description: "Vemos resultados em até 30 dias com nossa metodologia ágil e comprovada.",
      highlight: "30 dias",
      color: {
        bgLight: "bg-gradient-to-br from-amber-50 to-amber-100", 
        border: "border-amber-200/40",
        icon: "text-amber-500",
        highlightBg: "bg-amber-100",
        highlightText: "text-amber-700"
      }
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Foco em ROI",
      description: "Cada estratégia é desenvolvida pensando no retorno sobre investimento.",
      highlight: "ROI Garantido",
      color: {
        bgLight: "bg-gradient-to-br from-emerald-50 to-emerald-100", 
        border: "border-emerald-200/40",
        icon: "text-emerald-500",
        highlightBg: "bg-emerald-100",
        highlightText: "text-emerald-700"
      }
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Equipe Especializada",
      description: "Time multidisciplinar com mais de 10 anos de experiência no mercado.",
      highlight: "+10 anos",
      color: {
        bgLight: "bg-gradient-to-br from-blue-50 to-blue-100", 
        border: "border-blue-200/40",
        icon: "text-blue-500",
        highlightBg: "bg-blue-100",
        highlightText: "text-blue-700"
      }
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Dados & Analytics",
      description: "Decisões baseadas em dados reais e análises profundas do seu mercado.",
      highlight: "Data-Driven",
      color: {
        bgLight: "bg-gradient-to-br from-violet-50 to-violet-100", 
        border: "border-violet-200/40",
        icon: "text-violet-500",
        highlightBg: "bg-violet-100",
        highlightText: "text-violet-700"
      }
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Segurança Total",
      description: "Proteção completa dos seus dados com certificações internacionais.",
      highlight: "100% Seguro",
      color: {
        bgLight: "bg-gradient-to-br from-red-50 to-red-100", 
        border: "border-red-200/40",
        icon: "text-red-500",
        highlightBg: "bg-red-100",
        highlightText: "text-red-700"
      }
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Inovação Constante",
      description: "Sempre utilizamos as tecnologias mais avançadas do mercado.",
      highlight: "Cutting-edge",
      color: {
        bgLight: "bg-gradient-to-br from-orange-50 to-orange-100", 
        border: "border-orange-200/40",
        icon: "text-orange-500",
        highlightBg: "bg-orange-100",
        highlightText: "text-orange-700"
      }
    }
  ];

  const testimonials = [
    {
      name: "Empresa Alpha",
      position: "CEO, Tech Industry",
      content: "A Combinat revolucionou nossa presença digital, aumentando nosso tráfego qualificado em 150% em apenas 3 meses. Resultados impressionantes!",
      rating: 5,
      avatar: "A"
    },
    {
      name: "Beta Software",
      position: "CMO, SaaS Company",
      content: "O time da Combinat é excepcional. Implementaram soluções que não apenas melhoraram nosso fluxo de trabalho, mas também aumentaram significativamente nossas taxas de conversão.",
      rating: 5,
      avatar: "B"
    },
    {
      name: "Gamma Retail",
      position: "CTO, E-commerce",
      content: "Trabalhamos com várias agências antes, mas a Combinat foi a única que realmente entendeu nosso negócio e entregou resultados mensuráveis. Recomendo fortemente.",
      rating: 5,
      avatar: "G"
    },
  ];

  return (
    <section id="porque-combinat" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header - Modernized */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Badge variant="outline" className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700 rounded-full">
              <Star className="w-3.5 h-3.5 mr-1 text-amber-500" />
              Por que escolher a Combinat?
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Somos diferentes e isso
            <div className="relative inline-block mt-2">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg -rotate-1 blur-sm"></span>
              <span className="relative block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                faz toda diferença
              </span>
            </div>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Combinamos <span className="text-indigo-600 font-medium">experiência</span>, <span className="text-blue-600 font-medium">tecnologia</span> e <span className="text-violet-600 font-medium">criatividade</span> para entregar soluções que realmente 
            transformam negócios e geram resultados excepcionais.
          </p>
        </div>

        {/* Reasons Grid - Enhanced with modern styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className={`border-0 hover:shadow-xl group transition-all duration-300 ${reason.color.bgLight} ${reason.color.border} overflow-hidden`}>
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-5">
                  {/* Icon and Badge with enhanced styling */}
                  <div className="flex items-start justify-between">
                    <div className={`${reason.color.icon} group-hover:scale-110 transition-transform duration-300`}>
                      {reason.icon}
                    </div>
                    <Badge className={`${reason.color.highlightBg} ${reason.color.highlightText} text-xs font-semibold border-0 px-3 py-1`}>
                      {reason.highlight}
                    </Badge>
                  </div>

                  {/* Content with better typography */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabbed Content Section - New modern UI element */}
        <div className="mt-20 rounded-3xl overflow-hidden relative">
          <Tabs defaultValue="stats" className="w-full">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 pt-8 pb-6 px-8 rounded-t-3xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    Descubra o que nos diferencia
                  </h3>
                  <p className="text-indigo-100">
                    Resultados comprovados para negócios como o seu
                  </p>
                </div>
                <TabsList className="bg-white/10 backdrop-blur-sm rounded-full p-1">
                  <TabsTrigger value="stats" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-full px-6">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Números
                  </TabsTrigger>
                  <TabsTrigger value="testimonials" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-700 rounded-full px-6">
                    <Award className="w-4 h-4 mr-2" />
                    Depoimentos
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-8 lg:p-12 rounded-b-3xl">
              {/* Stats Tab */}
              <TabsContent value="stats" className="mt-0 pt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {[
                    { value: "500+", label: "Projetos Entregues", icon: <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-3" /> },
                    { value: "95%", label: "Taxa de Satisfação", icon: <Star className="w-8 h-8 text-amber-400 mb-3" /> },
                    { value: "10+", label: "Anos de Experiência", icon: <Award className="w-8 h-8 text-blue-400 mb-3" /> },
                    { value: "24/7", label: "Suporte Disponível", icon: <Users className="w-8 h-8 text-purple-400 mb-3" /> }
                  ].map((stat, index) => (
                    <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300">
                      {stat.icon}
                      <div className="text-3xl lg:text-4xl font-bold mb-2 text-white">{stat.value}</div>
                      <div className="text-blue-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Badge className="bg-white/10 text-white border-0 px-4 py-1.5 text-sm">
                    Dados atualizados até Maio de 2024
                  </Badge>
                </div>
              </TabsContent>
              
              {/* Testimonials Tab */}
              <TabsContent value="testimonials" className="mt-0 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center font-bold text-lg mr-3">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{testimonial.name}</h4>
                          <p className="text-blue-200 text-sm">{testimonial.position}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-blue-100 italic flex-1">"{testimonial.content}"</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-indigo-100/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default PorqueCombinat;
