"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Zap, Target, Users, BarChart3, Shield, Lightbulb } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconClassName?: string;
}

const Feature = ({
  title,
  description,
  icon,
  iconClassName = "text-blue-500"
}: FeatureProps) => {
  return (
    <div className="liquid-glass rounded-2xl p-6 group cursor-pointer transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        <div className={cn("flex-shrink-0 p-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 shadow-sm transition-all duration-300 group-hover:bg-white/25 group-hover:scale-105", iconClassName)}>
          <div className="w-6 h-6">
            {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-900 mb-2 leading-tight drop-shadow-sm">
            {title}
          </h3>
          <p className="text-sm text-slate-800 leading-relaxed drop-shadow-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface DisplayCardsProps {
  cards?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    iconClassName?: string;
  }[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultFeatures = [
    {
      title: "Metodologia Ágil",
      description: "Processos otimizados e eficientes para desenvolvimento contínuo",
      icon: <Zap className="w-8 h-8" />,
      iconClassName: "text-amber-500"
    },
    {
      title: "Foco em Qualidade",
      description: "Soluções robustas e escaláveis com padrões de excelência",
      icon: <Target className="w-8 h-8" />,
      iconClassName: "text-emerald-500"
    },
    {
      title: "Equipe Experiente",
      description: "Profissionais especializados com expertise comprovada",
      icon: <Users className="w-8 h-8" />,
      iconClassName: "text-blue-500"
    },
    {
      title: "Dados & Analytics",
      description: "Decisões baseadas em dados reais e análises profundas",
      icon: <BarChart3 className="w-8 h-8" />,
      iconClassName: "text-violet-500"
    },
    {
      title: "Segurança Total",
      description: "Proteção completa dos dados com certificações internacionais",
      icon: <Shield className="w-8 h-8" />,
      iconClassName: "text-red-500"
    },
    {
      title: "Inovação Constante",
      description: "Tecnologias avançadas e soluções cutting-edge",
      icon: <Lightbulb className="w-8 h-8" />,
      iconClassName: "text-orange-500"
    }
  ];

  const features = cards || defaultFeatures;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-w-6xl mx-auto">
      {features.map((feature) => (
        <Feature 
          key={feature.title} 
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          iconClassName={feature.iconClassName}
        />
      ))}
    </div>
  );
}