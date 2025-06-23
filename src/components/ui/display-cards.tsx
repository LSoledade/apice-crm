"use client";

import { cn } from "@/lib/utils";
import { Zap, Target, Users, BarChart3, Shield, Lightbulb } from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  iconClassName?: string;
}

const Feature = ({
  title,
  description,
  icon,
  index,
  iconClassName = "text-blue-500"
}: FeatureProps) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-8 relative group/feature border-neutral-200",
        (index === 0 || index === 3) && "lg:border-l border-neutral-200",
        index < 3 && "lg:border-b border-neutral-200"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-8">
        <div className={cn("w-8 h-8", iconClassName)}>
          {icon}
        </div>
      </div>
      <div className="text-lg font-bold mb-3 relative z-10 px-8">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-200 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-900">
          {title}
        </span>
      </div>
      <p className="text-sm text-slate-600 max-w-xs relative z-10 px-8 leading-relaxed">
        {description}
      </p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-100">
      {features.map((feature, index) => (
        <Feature 
          key={feature.title} 
          {...feature} 
          index={index}
        />
      ))}
    </div>
  );
}