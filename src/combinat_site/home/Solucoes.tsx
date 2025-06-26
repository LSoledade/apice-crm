import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  CodeSquare, 
  Palette,
  Settings,
  TrendingUp,
  Brain,
  Users
} from 'lucide-react';

const Solucoes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Soluções para o InteractiveSelector
  const SOLUCOES_SLIDES = [
    {
      id: "slide-1",
      title: "Sistemas Sob Medida",
      description: "Sistemas e softwares personalizados",
      hoverDescription: "Criamos sistemas e softwares sob medida, da arquitetura à implementação, focados em performance, escalabilidade e nos seus objetivos de negócio.",
      services: ["APIs e microserviços", "Sistemas de gestão", "Arquitetura escalável"],
      imageUrl: "/crm-mockup.png",
      icon: <CodeSquare size={24} className="text-white" />
    },
    {
      id: "slide-2", 
      title: "Marketing Digital",
      description: "Estratégias digitais completas",
      hoverDescription: "Planejamos e executamos estratégias digitais completas, do SEO ao tráfego pago, para conectar sua marca ao público certo e gerar crescimento mensurável.",
      services: ["SEO técnico", "Tráfego pago", "Análise de performance"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <TrendingUp size={24} className="text-white" />
    },
    {
      id: "slide-3",
      title: "UX/UI Design", 
      description: "Interfaces intuitivas e encantadoras",
      hoverDescription: "Desenhamos interfaces e experiências intuitivas que encantam usuários e otimizam a jornada do cliente, garantindo que a tecnologia seja fácil e eficaz de usar.",
      services: ["Design de interfaces", "Experiência do usuário", "Prototipação"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Palette size={24} className="text-white" />
    },
    {
      id: "slide-4",
      title: "Automação",
      description: "Processos inteligentes e otimizados",
      hoverDescription: "Desenvolvemos soluções de automação inteligente que otimizam seus processos operacionais, eliminam tarefas repetitivas e liberam sua equipe para focar no que realmente importa.",
      services: ["Automação de processos", "Integração de sistemas", "Workflows inteligentes"],
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Settings size={24} className="text-white" />
    },
    {
      id: "slide-5",
      title: "Inteligência Artificial",
      description: "IA personalizada para decisões estratégicas",
      hoverDescription: "Implementamos soluções de inteligência artificial personalizadas que transformam dados em insights estratégicos, automatizam decisões complexas e potencializam seus resultados de negócio.",
      services: ["Análise preditiva", "Chatbots inteligentes", "Automação com IA"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Brain size={24} className="text-white" />
    },
    {
      id: "slide-6",
      title: "Consultoria Digital",
      description: "Parceria estratégica para o sucesso",
      hoverDescription: "Atuamos como seu parceiro estratégico para diagnosticar desafios e traçar um roteiro digital claro, alinhando tecnologia e marketing para o seu sucesso.",
      services: ["Diagnóstico digital", "Roadmap estratégico", "Alinhamento tech+marketing"],
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Users size={24} className="text-white" />
    },
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    SOLUCOES_SLIDES.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="solucoes" className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="combinat-text mb-8 px-6 py-2 bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 border-[#E9342E]/20 text-[#E9342E] font-medium">
            Soluções Integradas para PMEs
          </Badge>            <h2 className="combinat-title-lg combinat-text-neutral mb-8 leading-tight normal-case">
            Conheça nossas <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 -skew-y-2 -z-10 rounded-xl"></span>
              <span className="relative combinat-gradient-text">soluções</span>
            </span>
          </h2>          <p className="combinat-text text-lg md:text-xl text-slate-600 max-w-4xl mx-auto">
            Cada projeto é uma combinação estratégica entre <strong className="combinat-text-neutral">desenvolvimento sólido</strong> e <strong className="combinat-text-neutral">marketing baseado em resultados</strong>.
          </p>
        </div>        {/* Interactive Solutions Selector */}
        <div className="mb-20">
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Desktop/Tablet Layout */}
            <div className={`${isMobile ? 'hidden' : 'block'} w-full`}>
              {/* Solutions Container - Horizontal Accordion */}
              <div className="options flex w-full max-w-[900px] min-w-[600px] h-[400px] mx-auto items-stretch overflow-hidden relative">
                {SOLUCOES_SLIDES.map((option, index) => (
                  <div
                    key={index}
                    className={`
                      option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
                      ${activeIndex === index ? 'active' : ''}
                    `}
                    style={{
                      backgroundImage: `url('${option.imageUrl}')`,
                      backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                      backgroundPosition: 'center',
                      backfaceVisibility: 'hidden',
                      opacity: animatedOptions.includes(index) ? 1 : 0,
                      transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                      minWidth: '60px',
                      minHeight: '100px',
                      margin: 0,
                      borderRadius: '12px',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: activeIndex === index ? '#E9342E' : '#e2e8f0',
                      cursor: 'pointer',
                      backgroundColor: '#f8fafc',
                      boxShadow: activeIndex === index 
                        ? '0 20px 60px rgba(233,52,46,0.25)' 
                        : '0 10px 30px rgba(0,0,0,0.15)',
                      flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                      zIndex: activeIndex === index ? 10 : 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      position: 'relative',
                      overflow: 'hidden',
                      willChange: 'flex-grow, box-shadow, background-size, background-position'
                    }}
                    onClick={() => handleOptionClick(index)}
                  >
                    {/* Shadow overlay */}
                    <div 
                      className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                      style={{
                        bottom: activeIndex === index ? '0' : '-40px',
                        height: '120px',
                        background: activeIndex === index 
                          ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' 
                          : 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)'
                      }}
                    ></div>
                    
                    {/* Label with icon and info */}
                    <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                      <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#E9342E] to-[#FF9334] shadow-lg border-2 border-white/20 flex-shrink-0 flex-grow-0 transition-all duration-200">
                        {option.icon}
                      </div>
                      <div className="info text-white whitespace-pre relative">
                        <div 
                          className="main font-bold text-lg transition-all duration-700 ease-in-out"
                          style={{
                            opacity: activeIndex === index ? 1 : 0,
                            transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                          }}
                        >
                          {option.title}
                        </div>
                        <div 
                          className="sub text-base text-gray-200 transition-all duration-700 ease-in-out"
                          style={{
                            opacity: activeIndex === index ? 1 : 0,
                            transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                          }}
                        >
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className={`${isMobile ? 'block' : 'hidden'} w-full max-w-sm mx-auto`}>
              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mb-6">
                {SOLUCOES_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-gradient-to-r from-[#E9342E] to-[#FF9334] scale-125' 
                        : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Mobile Cards Stack */}
              <div className="space-y-4">
                {SOLUCOES_SLIDES.map((option, index) => (
                  <div
                    key={index}
                    className={`
                      relative rounded-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
                      ${activeIndex === index 
                        ? 'h-64 border-2 border-[#E9342E] shadow-2xl shadow-[#E9342E]/20' 
                        : 'h-20 border border-slate-200 shadow-md'
                      }
                    `}
                    style={{
                      backgroundImage: `url('${option.imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: animatedOptions.includes(index) ? 1 : 0,
                      transform: animatedOptions.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${index * 150}ms`
                    }}
                    onClick={() => handleOptionClick(index)}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E9342E] to-[#FF9334] flex items-center justify-center shadow-lg flex-shrink-0">
                          {React.cloneElement(option.icon, { size: 20 })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg leading-tight">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-200 truncate">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Expanded content */}
                      <div className={`
                        transition-all duration-300 overflow-hidden
                        ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                      `}>
                        <p className="text-sm text-gray-100 leading-relaxed mb-3 mt-2">
                          {option.hoverDescription}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {option.services.slice(0, 3).map((service, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-md text-white"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active solution details - Only for Desktop */}
            <div className={`${isMobile ? 'hidden' : 'block'} mt-8 text-center max-w-3xl`}>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                {SOLUCOES_SLIDES[activeIndex].hoverDescription}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SOLUCOES_SLIDES[activeIndex].services.map((service, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 border-[#E9342E]/20 text-[#E9342E]"
                  >
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom animations */}
        <style>{`
          @keyframes slideFadeIn {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeInTop {
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeInFromTop 0.8s ease-in-out forwards;
          }
          
          .delay-300 {
            animation-delay: 0.3s;
          }
          
          .delay-600 {
            animation-delay: 0.6s;
          }

          /* Touch-friendly mobile buttons */
          @media (max-width: 767px) {
            .mobile-card {
              min-height: 60px;
              touch-action: manipulation;
            }
            
            .mobile-card.active {
              min-height: 240px;
            }
            
            .nav-dot {
              min-width: 44px;
              min-height: 44px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          /* Desktop responsiveness */
          @media (min-width: 768px) and (max-width: 1024px) {
            .options {
              max-width: 700px;
              min-width: 500px;
              height: 350px;
            }
          }
          
          @media (min-width: 1024px) {
            .options {
              max-width: 900px;
              min-width: 600px;
              height: 400px;
            }
          }
        `}</style>
      </div>    </section>  );
};

export default Solucoes;
