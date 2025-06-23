import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { 
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover 
} from '@/components/blocks/animated-slideshow';
import { 
  ArrowRight, 
  CodeSquare, 
  Monitor, 
  Database, 
  TabletSmartphone
} from 'lucide-react';

const Solucoes = () => {
  const [hoveredSlide, setHoveredSlide] = React.useState<number | null>(null);
    // Soluções para o HoverSlider
  const SOLUCOES_SLIDES = [    {
      id: "slide-1",
      title: "Sistemas Sob Medida",
      description: "Sistemas e softwares sob medida focados em performance, escalabilidade e seus objetivos de negócio",
      hoverDescription: "Criamos sistemas e softwares sob medida, da arquitetura à implementação, focados em performance, escalabilidade e nos seus objetivos de negócio.",
      services: ["APIs e microserviços", "Sistemas de gestão", "Arquitetura escalável"],
      imageUrl: "/crm-mockup.png",
    },
    {
      id: "slide-2", 
      title: "Marketing Digital",
      description: "Estratégias digitais completas para conectar sua marca ao público certo e gerar crescimento mensurável",
      hoverDescription: "Planejamos e executamos estratégias digitais completas, do SEO ao tráfego pago, para conectar sua marca ao público certo e gerar crescimento mensurável.",
      services: ["SEO técnico", "Tráfego pago", "Análise de performance"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "slide-3",
      title: "UX/UI Design", 
      description: "Interfaces e experiências intuitivas que encantam usuários e otimizam a jornada do cliente",
      hoverDescription: "Desenhamos interfaces e experiências intuitivas que encantam usuários e otimizam a jornada do cliente, garantindo que a tecnologia seja fácil e eficaz de usar.",
      services: ["Design de interfaces", "Experiência do usuário", "Prototipação"],
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "slide-4",
      title: "Automação",
      description: "Processos automatizados inteligentes que otimizam operações e eliminam tarefas repetitivas",
      hoverDescription: "Desenvolvemos soluções de automação inteligente que otimizam seus processos operacionais, eliminam tarefas repetitivas e liberam sua equipe para focar no que realmente importa.",
      services: ["Automação de processos", "Integração de sistemas", "Workflows inteligentes"],
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "slide-5",
      title: "Inteligência Artificial",
      description: "Soluções de IA personalizadas para impulsionar decisões estratégicas e potencializar resultados",
      hoverDescription: "Implementamos soluções de inteligência artificial personalizadas que transformam dados em insights estratégicos, automatizam decisões complexas e potencializam seus resultados de negócio.",
      services: ["Análise preditiva", "Chatbots inteligentes", "Automação com IA"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "slide-6",
      title: "Consultoria Digital",
      description: "Parceria estratégica para diagnosticar desafios e traçar um roteiro digital claro para o seu sucesso",
      hoverDescription: "Atuamos como seu parceiro estratégico para diagnosticar desafios e traçar um roteiro digital claro, alinhando tecnologia e marketing para o seu sucesso.",
      services: ["Diagnóstico digital", "Roadmap estratégico", "Alinhamento tech+marketing"],
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];// Tecnologias complementares
  const tecnologiasComplementares = [
    { 
      icon: <Monitor className="w-6 h-6" />, 
      name: "Tecnologia com Propósito", 
      desc: "Usamos a tecnologia para criar conexões e melhorar negócios" 
    },
    { 
      icon: <Database className="w-6 h-6" />, 
      name: "Escalabilidade Garantida", 
      desc: "Soluções que crescem junto com seu negócio" 
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
    <section id="solucoes" className="py-24 bg-slate-50">
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
        </div>        {/* Solutions Grid - HoverSlider */}
        <HoverSlider className="min-h-[60vh] place-content-center p-6 md:px-12 mb-20">
          <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
            <div className="flex flex-col space-y-2 md:space-y-3 max-w-md">
              {SOLUCOES_SLIDES.map((slide, index) => (
                <div 
                  key={slide.title}
                  onMouseEnter={() => setHoveredSlide(index)}
                  onMouseLeave={() => setHoveredSlide(null)}
                  className="transition-all duration-300"
                >
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tighter combinat-text-neutral"
                    text={slide.title}
                  />
                  {/* Descrição que aparece no hover */}                  <div 
                    className={`mt-1 text-sm md:text-base text-slate-600 leading-relaxed transition-all duration-300 overflow-hidden ${
                      hoveredSlide === index 
                        ? 'max-h-20 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {slide.hoverDescription}
                  </div>
                </div>
              ))}
            </div>
            <HoverSliderImageWrap className="max-w-md">
              {SOLUCOES_SLIDES.map((slide, index) => (
                <div key={slide.id}>
                  <HoverSliderImage
                    index={index}
                    imageUrl={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="size-full max-h-96 object-cover rounded-2xl"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
          </div>
        </HoverSlider>{/* Seção de tecnologias complementares com glow effect */}
        <div className="mb-20">          <div className="text-center mb-12">            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Tudo que seu <span className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent">negócio precisa</span>
            </h3>
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
                {tecnologiasComplementares.map((tech, index) => (                  <div 
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
        </div>        {/* CTA Section com Glow Effect */}
        {/* <div className="relative rounded-3xl border-[0.75px] border-border p-3">
          <GlowingEffect
            spread={80}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.2}
            borderWidth={3}
          />          {/* Background overlay pattern 
          <div className="absolute inset-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiPjxwYXRoIGQ9Ik0zMCAwdjYwTTYwIDMwSDBNMzAgNjAuMWwtMzAtMzBNMzAgLjFsMzAgMzAiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 rounded-3xl"></div>
            <div className="relative bg-gradient-to-br from-[#E9342E] via-[#E9342E]/90 to-[#FF9334] rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#FF9334]/30 rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#E9342E]/30 rounded-full mix-blend-overlay filter blur-3xl"></div>              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-sm">
              Seu negócio merece <span className="text-orange-200">crescer</span> no digital
            </h3>
            <p className="text-lg md:text-xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Não importa o tamanho da sua empresa - todo negócio tem potencial para se destacar digitalmente. 
              Vamos conversar sobre como a tecnologia pode <strong className="text-white">impulsionar seus resultados</strong>.
            </p>            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-[#E9342E] border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Quero acelerar meu negócio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#E9342E] px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300">
                Ver nossos cases
              </Button>
            </div>
              <div className="mt-8 flex items-center justify-center space-x-8 text-orange-100 text-sm">
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-300 mr-2"></span>
                <span>Soluções escaláveis e robustas</span>
              </div>
              <div className="hidden sm:flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-orange-300 mr-2"></span>
                <span>Suporte técnico especializado</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>    </section>  );
};

export default Solucoes;
