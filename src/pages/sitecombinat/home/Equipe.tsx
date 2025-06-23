import React from 'react';
import { Button } from '@/components/ui/button';
import { Linkedin, Globe } from 'lucide-react';

const Equipe = () => {  const fundadores = [
    {
      nome: "Alan Costa",
      cargo: "Co-fundador",
      bio: "Como pilar da excelência técnica, Alan usa seus 15 anos de experiência como desenvolvedor para garantir uma base tecnológica sólida, segura e de alta performance para o seu negócio.",
      especialidades: ["Desenvolvimento Fullstack ", "Arquitetura de Software", "Sistemas Corporativos"],
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
      especialidades: ["Desenvolvimento Frontend", "Marketing Digital", "Otimização de ROI"],
      imagem: "/leonardo.png", 
      social: {        
        linkedin: "#",
        site: "#"
      }
    }
  ];  return (
    <section id="sobre" className="py-24" style={{ backgroundColor: '#303030' }}>
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
        </div>        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {fundadores.map((pessoa, index) => (
            <div key={index} className="bg-gray-700 rounded-3xl p-8 text-center border border-gray-600 hover:border-gray-500 transition-all duration-300">
              {/* Profile Image with Border */}
              <div className="relative mb-8">
                <div className="w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-r from-[#E9342E] to-[#FF9334]">
                  <img
                    src={pessoa.imagem}
                    alt={pessoa.nome}
                    className="w-full h-full object-cover rounded-full border-4 border-gray-700"
                  />
                </div>
              </div>

              {/* Name and Role */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {pessoa.nome}
              </h3>
              <p className="text-[#FF9334] font-medium mb-6 uppercase tracking-wide text-sm">
                {pessoa.cargo}
              </p>

              {/* Bio */}
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {pessoa.bio}
              </p>

              {/* Especialidades */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {pessoa.especialidades.map((especialidade, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-700 text-[#FF9334] rounded-full text-xs font-medium border border-gray-600">
                    {especialidade}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 justify-center">
                {pessoa.social.linkedin && (
                  <a href={pessoa.social.linkedin} className="text-gray-400 hover:text-[#FF9334] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {pessoa.social.site && (
                  <a href={pessoa.social.site} className="text-gray-400 hover:text-[#FF9334] transition-colors" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>        {/* CTA para conhecer os fundadores */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] text-white hover:from-[#d12c27] hover:to-[#e8832f] px-8 py-4 text-lg font-semibold border-0 transition-all duration-300 rounded-full">
            CONHEÇA OS FUNDADORES
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Equipe;
