import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Globe } from 'lucide-react';

const Equipe = () => {
  // Adicionar estilos CSS customizados para o efeito liquid glass
  const liquidGlassStyles = `
    @keyframes liquidFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(-5px) rotate(-1deg); }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .liquid-glass-card {
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }
    
    .liquid-glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
      transition: left 0.5s;
    }
    
    .liquid-glass-card:hover::before {
      left: 100%;
    }
    
    .liquid-glass-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%);
      pointer-events: none;
      border-radius: inherit;
    }
    
    .glass-orb {
      animation: liquidFloat 6s ease-in-out infinite;
    }
  `;

  const fundadores = [
    {
      nome: "Alan Costa",
      cargo: "Co-fundador",
      bio: "Como pilar da excelência técnica, Alan usa seus 15 anos de experiência como desenvolvedor para garantir uma base tecnológica sólida, segura e de alta performance para o seu negócio.",
      especialidades: ["Desenvolvimento Fullstack", "Arquitetura de Software"],
      imagem: "/alan.jpg",
      social: {
        linkedin: "#",
        site: "#"
      }
    },
    {
      nome: "Leonardo Soledade",
      cargo: "Co-fundador",
      bio: "Como pilar do crescimento, Leonardo é especialista em marketing de performance e desenvolvimento front-end, criando estratégias focadas em resultados para conectar sua marca ao mercado.",
      especialidades: ["Desenvolvimento Frontend", "Marketing Digital"],
      imagem: "/leonardo.png", 
      social: {        
        linkedin: "#",
        site: "#"
      }
    }
  ];

  return (
    <section id="equipe" className="py-12" style={{ backgroundColor: '#303030' }}>
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: liquidGlassStyles }} />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16"> 
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            A força por trás da
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-tight">
            <span className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent">
              Combinat
            </span>
          </h2>
        </div>{/* CTA para conhecer os fundadores */}
        <div className="md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto text-center">
          <Button size="lg" className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] text-white hover:from-[#d12c27] hover:to-[#e8832f] px-8 py-4 text-lg font-semibold border-0 transition-all duration-300 rounded-full">
            CONHEÇA OS FUNDADORES
          </Button>
        </div>        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {fundadores.map((pessoa, index) => (
            <div 
              key={index} 
              className="liquid-glass-card group relative overflow-hidden rounded-3xl p-8 text-center border border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Liquid Glass Overlay Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/8 via-transparent to-transparent rounded-3xl"></div>
                <div className="glass-orb absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-orange-400/15 via-transparent to-transparent rounded-full blur-xl"></div>
                <div className="glass-orb absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 bg-gradient-to-tl from-red-400/12 via-transparent to-transparent rounded-full blur-xl" style={{ animationDelay: '2s' }}></div>
              </div>

              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#E9342E]/15 via-[#FF9334]/15 to-[#E9342E]/15 animate-pulse"></div>
              </div>

              {/* Profile Image with Border */}
              <div className="relative mb-8 z-10">
                <div className="w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-r from-[#E9342E] to-[#FF9334] group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all duration-500">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <img
                      src={pessoa.imagem}
                      alt={pessoa.nome}
                      className="w-full h-full object-cover rounded-full border-4 border-gray-700 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Glass overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Name and Role */}
              <h3 className="relative z-10 text-2xl font-bold text-white mb-2 group-hover:text-shadow-lg transition-all duration-300">
                {pessoa.nome}
              </h3>
              <p className="relative z-10 text-[#FF9334] font-medium mb-6 uppercase tracking-wide text-sm group-hover:text-shadow transition-all duration-300">
                {pessoa.cargo}
              </p>

              {/* Bio */}
              <p className="relative z-10 text-gray-300 mb-6 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
                {pessoa.bio}
              </p>

              {/* Especialidades */}
              <div className="relative z-10 flex flex-wrap gap-2 justify-center mb-6">
                {pessoa.especialidades.map((especialidade, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm text-[#FF9334] rounded-full text-xs font-medium border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                  >
                    {especialidade}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="relative z-10 flex space-x-4 justify-center">
                {pessoa.social.linkedin && (
                  <a 
                    href={pessoa.social.linkedin} 
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-[#FF9334] hover:border-white/30 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {pessoa.social.site && (
                  <a 
                    href={pessoa.social.site} 
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:text-[#FF9334] hover:border-white/30 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>        
      </div>
    </section>
  );
};

export default Equipe;
