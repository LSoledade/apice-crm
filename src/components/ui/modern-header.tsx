"use client";

import { Button } from "@/components/ui/button";
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
import { Menu, MoveRight, X } from "lucide-react";
import { useState, useEffect } from "react";

function ModernHeader() {
    // Estado para controlar se o header deve ter fundo ou ser transparente
    const [isScrolled, setIsScrolled] = useState(false);

    // Detectar scroll para alterar aparência do header
    useEffect(() => {        const handleScroll = () => {
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
        {
            title: "Home",
            href: "/",
            description: "",
        },
        {
            title: "Por que Combinat?",
            description: "Conheça nossos diferenciais e metodologias.",
            items: [
                {
                    title: "Nossa História",
                    href: "/historia",
                },
                {
                    title: "Metodologia",
                    href: "/metodologia",
                },
                {
                    title: "Resultados",
                    href: "/resultados",
                },
                {
                    title: "Depoimentos",
                    href: "/depoimentos",
                },
            ],
        },
        {
            title: "Soluções",
            description: "Tecnologia e marketing para transformar seu negócio.",
            items: [
                {
                    title: "Marketing Digital",
                    href: "/marketing-digital",
                },
                {
                    title: "Desenvolvimento Web",
                    href: "/desenvolvimento",
                },
                {
                    title: "CRM & Automação",
                    href: "/crm-automacao",
                },
                {
                    title: "Consultoria",
                    href: "/consultoria",
                },
            ],
        },
        {
            title: "Equipe",
            href: "/equipe",
            description: "",
        },
    ];

    const [isOpen, setOpen] = useState(false);
      return (        <header className={`w-full z-50 fixed top-0 left-0 transition-all duration-500 ease-out ${
            isScrolled 
                ? 'bg-background/90 backdrop-blur-md border-b border-border/30 shadow-lg' 
                : 'bg-transparent border-b border-transparent'
        }`}>
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4 md:px-6 justify-between lg:justify-normal">
                {/* Desktop Navigation */}
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (                                        <>
                                            <NavigationMenuLink href={item.href}>
                                                <Button 
                                                    variant="ghost" 
                                                    className={`bg-transparent hover:bg-transparent text-sm font-medium transition-colors duration-300 ${
                                                        isScrolled 
                                                            ? 'text-foreground hover:text-blue-600' 
                                                            : 'text-white hover:text-blue-200'
                                                    }`}
                                                >
                                                    {item.title}
                                                </Button>
                                            </NavigationMenuLink>
                                        </>
                                    ) : (                                        <>
                                            <NavigationMenuTrigger className={`font-medium text-sm bg-transparent hover:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent transition-colors duration-300 ${
                                                isScrolled 
                                                    ? 'text-foreground hover:text-blue-600' 
                                                    : 'text-white hover:text-blue-200'
                                            }`}>
                                                {item.title}
                                            </NavigationMenuTrigger>                                            <NavigationMenuContent className={`!w-[450px] p-4 transition-all duration-300 ${
    isScrolled
        ? item.title === 'Por que Combinat?' 
            ? 'bg-blue-50 dark:bg-blue-900/50' 
            : item.title === 'Soluções' 
                ? 'bg-green-50 dark:bg-green-900/50' 
                : 'bg-background/95 backdrop-blur-sm'
        : 'bg-black/90 backdrop-blur-sm border border-white/20'
}`}>
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">                                                    <div className="flex flex-col h-full justify-between">
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
                                                                ? 'bg-blue-600 hover:bg-blue-700'
                                                                : item.title === 'Soluções'
                                                                    ? 'bg-green-600 hover:bg-green-700'
                                                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                                        } text-white`}> 
                                                            Agendar Conversa
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-col text-sm h-full justify-end">                                                        {item.items?.map((subItem) => (
                                                            <NavigationMenuLink
                                                                href={subItem.href}
                                                                key={subItem.title}
                                                                className={`flex flex-row justify-between items-center py-2 px-4 rounded transition-colors ${
                                                                    isScrolled 
                                                                        ? 'hover:bg-muted text-foreground hover:text-blue-600' 
                                                                        : 'hover:bg-white/10 text-white hover:text-blue-200'
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
                    </NavigationMenu>
                </div>                {/* Logo */}
                <div className="flex lg:justify-center justify-start">
                    <div className="flex items-center space-x-2 relative z-50">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className={`font-bold text-xl transition-all duration-300 ${
                            isScrolled 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' 
                                : 'text-white'
                        }`}>
                            Combinat
                        </span>
                    </div>
                </div>                {/* Desktop Actions */}
                <div className="hidden md:grid grid-cols-[auto_auto_1px_auto_auto] justify-end w-full gap-4 items-center">                    <Button 
                        variant="ghost" 
                        className={`bg-transparent hover:bg-transparent font-medium transition-colors duration-300 ${
                            isScrolled 
                                ? 'text-foreground hover:text-blue-600' 
                                : 'text-white hover:text-blue-200'
                        }`}
                    >
                        Contato
                    </Button>
                    <Button 
                        variant="ghost" 
                        className={`bg-transparent hover:bg-transparent font-medium transition-colors duration-300 ${
                            isScrolled 
                                ? 'text-foreground hover:text-blue-600' 
                                : 'text-white hover:text-blue-200'
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
                    >
                        Entrar
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105">
                        Começar Agora
                    </Button>
                </div>
                
                {/* Mobile Actions - shown only on mobile */}
                <div className="flex md:hidden justify-end w-full gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105">
                        Começar Agora
                    </Button>
                </div>{/* Mobile Menu Button */}
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button 
                        variant="ghost" 
                        onClick={() => setOpen(!isOpen)} 
                        className={`relative z-50 transition-colors duration-300 ${
                            isScrolled 
                                ? 'text-foreground hover:text-blue-600' 
                                : 'text-white hover:text-blue-200'
                        }`}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>                      {/* Mobile Menu */}
                    {isOpen && (
                        <div className={`absolute top-20 left-0 border-t flex flex-col w-full shadow-lg py-4 px-4 gap-6 z-40 transition-all duration-300 ${
                            isScrolled 
                                ? 'bg-background/95 backdrop-blur-sm border-border/40' 
                                : 'bg-black/90 backdrop-blur-sm border-white/20'
                        }`}>
                            <Accordion type="single" collapsible className="w-full">
                                {navigationItems.map((item, index) => (
                                    <div key={item.title}>
                                        {item.href ? (                                            <a
                                                href={item.href}
                                                className={`flex justify-between items-center py-3 text-lg font-medium transition-colors ${
                                                    isScrolled 
                                                        ? 'text-foreground hover:text-blue-600' 
                                                        : 'text-white hover:text-blue-200'
                                                }`}
                                                onClick={() => setOpen(false)}
                                            >
                                                <span>{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </a>
                                        ) : (
                                            <AccordionItem value={`item-${index}`} className="border-none">
                                                <AccordionTrigger className={`text-lg font-medium hover:no-underline py-3 transition-colors ${
                                                    isScrolled 
                                                        ? 'text-foreground hover:text-blue-600' 
                                                        : 'text-white hover:text-blue-200'
                                                }`}>
                                                    {item.title}
                                                </AccordionTrigger>
                                                <AccordionContent className="pb-2">
                                                    <div className="flex flex-col gap-2 pl-4">
                                                        {item.items?.map((subItem) => (
                                                            <a
                                                                key={subItem.title}
                                                                href={subItem.href}
                                                                className={`flex justify-between items-center py-2 transition-colors ${
                                                                    isScrolled 
                                                                        ? 'text-muted-foreground hover:text-foreground' 
                                                                        : 'text-white/70 hover:text-white'
                                                                }`}
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                <span>{subItem.title}</span>
                                                                <MoveRight className="w-4 h-4 stroke-1" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}
                                    </div>
                                ))}
                            </Accordion>
                              {/* Mobile Actions */}
                            <div className={`flex flex-col gap-4 pt-4 border-t ${
                                isScrolled ? 'border-border' : 'border-white/20'
                            }`}>
                                <Button variant="outline" className={`w-full ${
                                    isScrolled 
                                        ? 'border-border text-foreground bg-transparent hover:bg-accent' 
                                        : 'border-white/30 text-white bg-transparent hover:bg-white/10'
                                }`}>
                                    Contato
                                </Button>
                                <Button variant="outline" className={`w-full ${
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
                                }`}>
                                    Entrar
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    Começar Agora
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { ModernHeader };
