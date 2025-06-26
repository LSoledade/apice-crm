import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import DisplayCards from '@/components/ui/display-cards';
import { Zap, Target, Users, BarChart3, Shield, Lightbulb } from 'lucide-react';

const PorqueCombinat = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    
    const cardWidth = 304; // w-72 (288px) + gap (16px)
    const totalOriginalWidth = cardWidth * 6; // 6 cards originais
    scrollContainer.scrollLeft = totalOriginalWidth;

    let isScrolling = false;
    
    const handleScroll = () => {
      if (isScrolling) return;
      
      const { scrollLeft } = scrollContainer;
      
      if (scrollLeft >= totalOriginalWidth * 2) {
        isScrolling = true;
        scrollContainer.scrollLeft = scrollLeft - totalOriginalWidth;
        setTimeout(() => { isScrolling = false; }, 50);
      } else if (scrollLeft <= 0) {
        isScrolling = true;
        scrollContainer.scrollLeft = totalOriginalWidth;
        setTimeout(() => { isScrolling = false; }, 50);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const featuresData = [
    {
      title: "Sinergia Estratégica",
      description: "Combinamos para criar resultados",
      icon: <Zap className="w-6 h-6" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Excelência Técnica",
      description: "Alta qualidade em tudo que fazemos",
      icon: <Target className="w-6 h-6" />,
      iconClassName: "text-[#FF9334]"
    },
    {
      title: "Foco no Cliente",
      description: "Comprometidos com o seu sucesso",
      icon: <Users className="w-6 h-6" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Resultados Reais",
      description: "Crescimento real e duradouro",
      icon: <BarChart3 className="w-6 h-6" />,
      iconClassName: "text-[#FF9334]"
    },
    {
      title: "Parceria Transparente",
      description: "Relacionamentos baseados na confiança",
      icon: <Shield className="w-6 h-6" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Inovação Contínua",
      description: "Sempre à frente das tendências",
      icon: <Lightbulb className="w-6 h-6" />,
      iconClassName: "text-[#FF9334]"
    }
  ];
  return (
    <section id="porque-combinat" className="py-8 md:py-12 relative bg-gradient-to-br from-slate-100/60 via-slate-50 to-slate-100/40" aria-labelledby="porque-combinat-title">
      {/* Background pattern for glass effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,52,46,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,147,52,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <Badge variant="outline" className="combinat-text px-3 py-1.5 md:px-5 md:py-2 bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 border-[#E9342E]/20 text-[#E9342E] rounded-full shadow-sm mb-4 md:mb-6 text-sm">
            Por que escolher a Combinat?
          </Badge>
          
          <h2 id="porque-combinat-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
            A <span className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent">combinação</span> que faltava
          </h2>
          
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Não somos apenas mais uma empresa de tecnologia. Somos o elo que une desenvolvimento robusto com marketing inteligente.
          </p>
        </div>

        {/* Features Section */}
        <div className="w-full">
          {/* Mobile: Layout horizontal com scroll infinito */}
          <div className="block md:hidden">
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide"
              style={{ scrollBehavior: 'auto' }}
            >
              {/* Cards duplicados para scroll infinito */}
              {[...featuresData, ...featuresData, ...featuresData].map((feature, index) => (
                <div key={`${feature.title}-${index}`} className="flex-shrink-0 w-72">
                  {/* Liquid Glass Card Simplificado */}
                  <div className="liquid-glass rounded-2xl p-6 group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 p-3 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 ${feature.iconClassName} transition-all duration-300 group-hover:bg-white/40 group-hover:scale-105 shadow-sm`}>
                        {feature.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2 leading-tight drop-shadow-sm">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-800 leading-relaxed drop-shadow-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop: Layout em grid */}
          <div className="hidden md:flex justify-center">
            <DisplayCards cards={featuresData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PorqueCombinat;
