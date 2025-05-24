import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, Calendar, ArrowUpRight, CheckCircle, MessageCircle, Sparkles, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 -z-10"></div>
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwMCAwIEwgMCAwIDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-30 -z-10"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full mix-blend-overlay filter blur-3xl -z-10 animate-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="text-center text-white">
          {/* Top Badge */}
          <Badge variant="outline" className="inline-flex mb-6 px-4 py-1.5 bg-white/10 backdrop-blur border-white/20 text-white">
            <Sparkles className="w-4 h-4 mr-1.5 text-amber-300" />
            Comece sua transformação digital
          </Badge>
          
          {/* Main CTA */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              Pronto para alavancar seus 
              <span className="relative inline-block mx-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg transform rotate-1 blur-sm"></span>
                <span className="relative text-gradient-to-r from-blue-200 to-purple-200">resultados digitais</span>
              </span>
              hoje mesmo?
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Vamos conversar sobre seus desafios e como a abordagem integrada da Combinat pode
              impulsionar seu crescimento de forma sustentável.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-6">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-indigo-700 border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-white/20 group">
                <Calendar className="mr-2.5 w-5 h-5 group-hover:scale-110 transition-transform" />
                Agende uma Demonstração
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/80 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm group">
                <MessageCircle className="mr-2.5 w-5 h-5 group-hover:scale-110 transition-transform" />
                Iniciar Conversa
              </Button>
            </div>
            
            <div className="text-sm text-indigo-200 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-300" />
              Sem compromisso, cancele quando quiser
            </div>
          </div>

          {/* Features Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { 
                icon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
                value: "500+", 
                label: "Projetos Entregues",
                color: "from-emerald-400/20 to-emerald-500/20" 
              },
              { 
                icon: <Star className="w-8 h-8 text-amber-400" />,
                value: "98%", 
                label: "Taxa de Satisfação",
                color: "from-amber-400/20 to-amber-500/20" 
              },
              { 
                icon: <ArrowUpRight className="w-8 h-8 text-rose-400" />,
                value: "245%", 
                label: "ROI Médio",
                color: "from-rose-400/20 to-rose-500/20" 
              },
              { 
                icon: <Phone className="w-8 h-8 text-blue-400" />,
                value: "24/7", 
                label: "Suporte Dedicado",
                color: "from-blue-400/20 to-blue-500/20" 
              }
            ].map((stat, index) => (
              <Card key={index} className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border-0 hover:scale-105 transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2 text-white">{stat.value}</div>
                  <div className="text-indigo-200">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Guarantee & Testimonial */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Guarantee */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 text-left border border-white/10 shadow-xl hover:shadow-white/5 transition-shadow">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-500 text-white mr-4 flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Garantia de Resultados</h3>
                  <p className="text-indigo-200 leading-relaxed">
                    Estamos tão confiantes em nossa metodologia que oferecemos garantia de resultados. 
                    Se não atingirmos as metas estabelecidas em 90 dias, devolvemos seu investimento.
                  </p>
                  <div className="mt-4 flex items-center text-amber-300 text-sm font-medium">
                    Saiba mais sobre nossa garantia
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Contact Options */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 text-left border border-white/10 shadow-xl hover:shadow-white/5 transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-white">Fale Conosco</h3>
              <p className="text-indigo-200 mb-6">
                Escolha o meio de contato que preferir. Nossa equipe está pronta para atendê-lo.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="text-white font-medium">contato@combinat.com.br</div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-green-300" />
                  </div>
                  <div className="text-white font-medium">+55 (11) 9999-9999</div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <MessageCircle className="w-5 h-5 text-purple-300" />
                  </div>
                  <div className="text-white font-medium">Chat online (24/7)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
