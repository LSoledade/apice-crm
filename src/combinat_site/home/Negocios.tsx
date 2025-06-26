import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Typewriter } from '@/components/ui/typewriter';
import { 
  Monitor, 
  Database, 
  TabletSmartphone,
  CodeSquare
} from 'lucide-react';

const Negocios = () => {
  // Tecnologias complementares
  const tecnologiasComplementares = [
    { 
      icon: <Monitor className="w-6 h-6" />, 
      name: "Tecnologia com Propósito", 
      desc: "Criamos conexões e melhoramos negócios" 
    },
    { 
      icon: <Database className="w-6 h-6" />, 
      name: "Escalabilidade Garantida", 
      desc: "Soluções que crescem junto com você" 
    },
    { 
      icon: <TabletSmartphone className="w-6 h-6" />, 
      name: "Resultados Mensuráveis", 
      desc: "Crescimento real e impacto duradouro" 
    },
    { 
      icon: <CodeSquare className="w-6 h-6" />, 
      name: "Suporte Estratégico", 
      desc: "Parceria contínua para seu sucesso" 
    }
  ];

  return (
    <section className="py-12 bg-slate-50" aria-labelledby="negocios-title">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Seção de tecnologias complementares com glow effect */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 id="negocios-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="block sm:inline">Tudo que seu</span>{" "}
              <span className="block sm:inline">
                <Typewriter
                  text={["negócio precisa", "sucesso exige", "avanço requer", "projeto merece"]}
                  className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent"
                  speed={70}
                  deleteSpeed={45}
                  waitTime={2000}
                  loop={true}
                  aria-label="Texto dinâmico destacando necessidades do negócio"
                />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Soluções <span className="text-[#E9342E] font-semibold">completas</span> e <span className="text-[#FF9334] font-semibold">integradas</span> que unem desenvolvimento e marketing para entregar <span className="combinat-gradient-text font-semibold">resultados exponenciais</span>
            </p>
          </div>

          <div className="relative rounded-3xl border-[0.75px] border-border p-3">
            <GlowingEffect
              spread={60}
              glow={true}
              disabled={false}
              proximity={80}
              inactiveZone={0.1}
              borderWidth={2}
            />
            <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {tecnologiasComplementares.map((tech, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E9342E]/10 to-[#FF9334]/20 flex items-center justify-center text-[#E9342E] group-hover:shadow-lg group-hover:shadow-[#E9342E]/20 transition-all duration-300">
                        {tech.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#E9342E] transition-colors">
                      {tech.name}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {tech.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Negocios;
