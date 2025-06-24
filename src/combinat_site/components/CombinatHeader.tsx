/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, MoveRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const CombinatHeader = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para alterar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 30; // Muda após 30px de scroll
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // Adicionar event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificar posição inicial
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const navigationItems = [
    // {
    //   title: "Home",
    //   href: "#home",
    //   description: "",
    // },
    {
      title: "Por que Combinat?",
      // description: "Conheça nossos diferenciais e metodologias.",
      // items: [
      //   {
      //     title: "Nossa História",
      //     href: "#historia",
      //   },
      //   {
      //     title: "Metodologia",
      //     href: "#metodologia",
      //   },
      //   {
      //     title: "Resultados",
      //     href: "#resultados",
      //   },
      //   {
      //     title: "Depoimentos",
      //     href: "#depoimentos",
      //   },
      // ],
    },
    {
      title: "Soluções",
      // description: "Tecnologia e marketing para transformar seu negócio.",
      // items: [
      //   {
      //     title: "Marketing Digital",
      //     href: "#marketing-digital",
      //   },
      //   {
      //     title: "Desenvolvimento Web",
      //     href: "#desenvolvimento",
      //   },
      //   {
      //     title: "CRM & Automação",
      //     href: "#crm-automacao",
      //   },
      //   {
      //     title: "Consultoria",
      //     href: "#consultoria",
      //   },
      // ],
    },
    {
      title: "Equipe",
      href: "#equipe",
      description: "",
    },
  ];  return (
    <header className={`w-full z-50 fixed top-0 left-0 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-md border-b border-border/30 shadow-lg' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4 md:px-6 justify-between lg:justify-normal">
        {/* Desktop Navigation */}        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          {/* <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink href={item.href}>
                        <Button 
                          variant="ghost" 
                          className={`bg-transparent hover:bg-transparent text-sm font-medium transition-colors duration-300 ${
                            isScrolled 
                              ? 'text-foreground hover:text-[#E9342E]' 
                              : 'text-white hover:text-[#FF9334]'
                          }`}
                        >
                          {item.title}
                        </Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className={`font-medium text-sm bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent transition-colors duration-300 ${
                        isScrolled 
                          ? 'text-foreground hover:text-[#E9342E]' 
                          : 'text-white hover:text-[#FF9334]'
                      }`}>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className={`!w-[450px] p-4 transition-all duration-300 ${
                        isScrolled
                          ? item.title === 'Por que Combinat?' 
                            ? 'bg-red-50 dark:bg-red-900/50' 
                            : item.title === 'Soluções' 
                              ? 'bg-orange-50 dark:bg-orange-900/50' 
                              : 'bg-background/95 backdrop-blur-sm'
                          : 'bg-black/90 backdrop-blur-sm border border-white/20'
                      }`}>
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className={`text-base font-semibold ${
                                isScrolled ? 'text-foreground' : 'text-white'
                              }`}>{item.title}</p>
                              <p className={`text-sm ${
                                isScrolled ? 'text-muted-foreground' : 'text-white/70'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className={`mt-6 transition-colors duration-300 ${
                              item.title === 'Por que Combinat?'
                                ? 'bg-[#E9342E] hover:bg-[#E9342E]/90'
                                : item.title === 'Soluções'
                                  ? 'bg-[#FF9334] hover:bg-[#FF9334]/90'
                                  : 'bg-gradient-to-r from-[#E9342E] to-[#FF9334] hover:from-[#E9342E]/90 hover:to-[#FF9334]/90'
                            } text-white`}> 
                              Agendar Conversa
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className={`flex flex-row justify-between items-center py-2 px-4 rounded transition-colors ${
                                  isScrolled 
                                    ? 'hover:bg-muted text-foreground hover:text-[#E9342E]' 
                                    : 'hover:bg-white/10 text-white hover:text-[#FF9334]'
                                }`}
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className={`w-4 h-4 ${
                                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                                }`} />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu> */}
          <div className="flex justify-start items-start gap-4">
            <a href="#porque-combinat">
              <Button 
                variant="ghost"
                className={`bg-transparent hover:bg-transparent text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-foreground hover:text-[#E9342E]' 
                    : 'text-white hover:text-[#FF9334]'
                }`}
              >
                Por que a Combinat?
              </Button>
            </a>

            <a href="#solucoes">
              <Button 
                variant="ghost"
                className={`bg-transparent hover:bg-transparent text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-foreground hover:text-[#E9342E]' 
                    : 'text-white hover:text-[#FF9334]'
                }`}
              >
                Soluções
              </Button>
            </a>

            <a href="#equipe">
              <Button 
                variant="ghost"
                className={`bg-transparent hover:bg-transparent text-sm font-medium transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-foreground hover:text-[#E9342E]' 
                    : 'text-white hover:text-[#FF9334]'
                }`}
              >
                Equipe
              </Button>
            </a>
          </div>
        </div>        {/* Logo */}
        <div className="flex lg:justify-center justify-start">
          <div className="flex items-center relative z-50">
            <a href="/" className="relative w-auto h-8">
              {/* Logo padrão (claro) */}
              <img 
                src="/combinat_primário_claro.svg" 
                alt="Combinat" 
                className={`h-8 w-auto transition-opacity duration-500 ${
                  isScrolled ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Logo com gradiente (aparece no scroll) */}
              <img 
                src="/combinat_gradiente.svg"
                alt="Combinat" 
                className={`absolute top-0 left-0 h-8 w-auto transition-opacity duration-500 ${
                  isScrolled ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </a>
          </div>
        </div>        {/* Desktop Actions */}
        <div className="hidden md:flex justify-end w-full gap-4 items-center">
           <a
            href="https://wa.me/5511999999999" // Substitua pelo seu número com DDI
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
              isScrolled 
                ? 'border-[#34D399]/30 bg-[#34D399] text-white hover:bg-[#10B981] hover:border-[#10B981]/50 hover:shadow-lg hover:shadow-[#34D399]/30' 
                : 'border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/40'
            }`}
          >
            <FaWhatsapp className={`text-lg transition-all duration-300 group-hover:scale-110 ${
              isScrolled ? 'text-white' : 'text-[#25D366]'
            }`} />
            <span className="font-medium">Contato</span>
          </a>
          {/* <Button 
            variant="ghost" 
            className={`bg-transparent hover:bg-transparent font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'text-foreground hover:text-[#E9342E]' 
                : 'text-white hover:text-[#FF9334]'
            }`}
          >
            Contato
          </Button> */}
          {/* <Button 
            variant="ghost" 
            className={`bg-transparent hover:bg-transparent font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'text-foreground hover:text-[#E9342E]' 
                : 'text-white hover:text-[#FF9334]'
            }`}
          >
            Portal do Cliente
          </Button>
          <div className={`h-5 transition-colors duration-300 ${
            isScrolled ? 'bg-border' : 'bg-white/30'
          }`}></div>
          <Button 
            variant="outline" 
            className={`transition-all duration-300 ${
              isScrolled 
                ? 'border-border text-foreground hover:bg-accent bg-transparent' 
                : 'border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent'
            }`}
            asChild
          >
            <Link to="/login">Entrar</Link>
          </Button>
          <Button className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] hover:from-[#E9342E]/90 hover:to-[#FF9334]/90 transition-all duration-300 hover:scale-105" asChild>
            <Link to="/crm">Começar Agora</Link>
          </Button> */}
        </div>
        
        {/* Mobile Actions - shown only on mobile */}
        {/* <div className="flex md:hidden justify-end w-full gap-4">
          <Button className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] hover:from-[#E9342E]/90 hover:to-[#FF9334]/90 transition-all duration-300 hover:scale-105" asChild>
            <Link to="/crm">Começar Agora</Link>
          </Button>
        </div> */}

        {/* Mobile Menu Button */}
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(!isOpen)} 
            className={`relative z-50 transition-colors duration-300 ${
              isScrolled 
                ? 'text-foreground hover:text-[#E9342E]' 
                : 'text-white hover:text-[#FF9334]'
            }`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Mobile Menu */}
          {isOpen && (
            <div className={`absolute top-20 left-0 border-t flex flex-col w-full shadow-lg py-4 px-4 gap-6 z-40 transition-all duration-300 ${
              isScrolled 
                ? 'bg-background/95 backdrop-blur-sm border-border/40' 
                : 'bg-black/90 backdrop-blur-sm border-white/20'
            }`}>
              <div className="w-full flex flex-col">
                <a
                  href="#porque-combinat"
                  className={`py-3 text-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-foreground hover:text-[#E9342E]'
                      : 'text-white hover:text-[#FF9334]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Por que a Combinat?
                </a>
                <a
                  href="#solucoes"
                  className={`py-3 text-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-foreground hover:text-[#E9342E]'
                      : 'text-white hover:text-[#FF9334]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Soluções
                </a>
                <a
                  href="#equipe"
                  className={`py-3 text-lg font-medium transition-colors ${
                    isScrolled
                      ? 'text-foreground hover:text-[#E9342E]'
                      : 'text-white hover:text-[#FF9334]'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Equipe
                </a>
              </div>                {/* Mobile Actions */}
              <div className={`flex flex-col gap-4 pt-4 border-t ${
                isScrolled ? 'border-border' : 'border-white/20'
              }`}>
                 <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full border font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'border-[#34D399]/30 bg-[#34D399] text-white hover:bg-[#10B981] hover:border-[#10B981]/50'
                      : 'border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/40'
                  }`}
                >
                  <FaWhatsapp className={`text-lg transition-all duration-300 group-hover:scale-110 ${
                    isScrolled ? 'text-white' : 'text-[#25D366]'
                  }`} />
                  Fale Conosco
                </a>
                {/* <Button variant="outline" className={`w-full ${
                  isScrolled 
                    ? 'border-border text-foreground bg-transparent hover:bg-accent' 
                    : 'border-white/30 text-white bg-transparent hover:bg-white/10'
                }`}>
                  Portal do Cliente
                </Button>
                <Button variant="outline" className={`w-full ${
                  isScrolled 
                    ? 'border-border text-foreground bg-transparent hover:bg-accent' 
                    : 'border-white/30 text-white bg-transparent hover:bg-white/10'
                }`} asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#E9342E] to-[#FF9334] hover:from-[#E9342E]/90 hover:to-[#FF9334]/90" asChild>
                  <Link to="/crm">Começar Agora</Link>
                </Button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CombinatHeader;
