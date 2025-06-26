import React from 'react';
import { Badge } from '@/components/ui/badge';
import DisplayCards from '@/components/ui/display-cards';
import { Zap, Target, Users, BarChart3, Shield, Lightbulb } from 'lucide-react';

const PorqueCombinat = () => {  const featuresData = [
    {
      title: "Sinergia Estratégica",
      description: "Acreditamos no poder da combinação para criar resultados exponenciais",
      icon: <Zap className="w-8 h-8" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Excelência Técnica",
      description: "Primamos pela mais alta qualidade em tudo que fazemos",
      icon: <Target className="w-8 h-8" />,
      iconClassName: "text-[#FF9334]"
    },
    {
      title: "Foco no Cliente",
      description: "Somos comprometidos com o seu sucesso e com valor tangível",
      icon: <Users className="w-8 h-8" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Resultados Mensuráveis",
      description: "Entregamos crescimento real e impacto duradouro para PMEs",
      icon: <BarChart3 className="w-8 h-8" />,
      iconClassName: "text-[#FF9334]"
    },
    {
      title: "Parceria Transparente",
      description: "Construímos relacionamentos de longo prazo baseados na confiança",
      icon: <Shield className="w-8 h-8" />,
      iconClassName: "text-[#E9342E]"
    },
    {
      title: "Inovação Contínua",
      description: "Buscamos soluções de vanguarda para antecipar necessidades do mercado",
      icon: <Lightbulb className="w-8 h-8" />,
      iconClassName: "text-[#FF9334]"
    }
  ];
  return (
    <section id="porque-combinat" className="py-12 pb-20 relative" aria-labelledby="porque-combinat-title">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="combinat-text px-5 py-2 bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 border-[#E9342E]/20 text-[#E9342E] rounded-full shadow-sm mb-6">
            Por que escolher a Combinat?
          </Badge>
            <h2 id="porque-combinat-title" className="combinat-title-lg combinat-text-neutral mb-6 leading-tight normal-case">
            A <span className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent">combinação</span> que faltava
          </h2>
          
          <p className="combinat-text text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Não somos apenas mais uma empresa de tecnologia ou agência de marketing. Somos o elo que une desenvolvimento de software robusto com estratégias de marketing inteligentes.
          </p>
        </div>

        {/* Features Section */}
        <div className="flex justify-center">
          <DisplayCards cards={featuresData} />
        </div>
      </div>
    </section>
  );
};

export default PorqueCombinat;
