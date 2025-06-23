"use client";

import React, { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Globe, 
  Youtube, 
  Music,
  MessageCircle,
  ShoppingBag
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LinkInBioProps {
  profileImage?: string;
  name?: string;
  bio?: string;
  links?: LinkItem[];
  socialLinks?: SocialLink[];
}

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const SocialLinkBox = ({ url, icon: Icon }: SocialLink) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent) => {
    const box = (e.target as HTMLElement).getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as const,
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as const,
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as const,
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as const,
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-16 w-16 place-content-center text-slate-600 bg-white border-2 border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <Icon className="text-xl" />
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-gradient-to-r from-[#E9342E] to-[#FF9334] text-white rounded-xl"
      >
        <Icon className="text-xl" />
      </div>
    </a>
  );
};

const LinkInBio = ({
  profileImage = "/combinat_gradiente.svg",
  name = "Combinat",
  bio = "Transformamos ideias em <span class='bg-gradient-to-r from-[#E9342E] to-[#FF9334] bg-clip-text text-transparent'>soluções digitais</span>",  links = [
    {
      id: "1",
      title: "Descubra Nossas Soluções",
      url: "https://combinat.com.br/solucoes",
      icon: Globe,
      description: "Desenvolvimento web e marketing digital integrados"
    },
    {
      id: "2", 
      title: "CRM Inteligente",
      url: "https://combinat.com.br/crm",
      icon: ShoppingBag,
      description: "Gerencie clientes e vendas com automação"
    },
    {
      id: "3",
      title: "Cases de Sucesso",
      url: "https://combinat.com.br/portfolio",
      icon: Youtube,
      description: "Conheça projetos que transformaram negócios"
    },
    {
      id: "4",
      title: "Blog & Insights",
      url: "https://combinat.com.br/blog",
      icon: Music,
      description: "Tendências e dicas de transformação digital"
    }
  ],
  socialLinks = [
    { platform: "Instagram", url: "https://instagram.com/combinat.digital", icon: Instagram },
    { platform: "LinkedIn", url: "https://linkedin.com/company/combinat", icon: Linkedin },
    { platform: "WhatsApp", url: "https://wa.me/5511999999999", icon: MessageCircle },
    { platform: "Email", url: "mailto:contato@combinat.com.br", icon: Mail },
    { platform: "GitHub", url: "https://github.com/combinat", icon: Github }
  ]
}: LinkInBioProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-[#E9342E]/5 to-[#FF9334]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-r from-[#FF9334]/3 to-[#E9342E]/3 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-md mx-auto relative z-10">
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-[#E9342E]/10 to-[#FF9334]/10 border border-[#E9342E]/20 rounded-full"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-[#E9342E] to-[#FF9334] rounded-full animate-pulse" />
            <span className="combinat-text text-xs font-medium text-[#E9342E] uppercase tracking-wide">
              Links Oficiais
            </span>
          </motion.div>

          <div className="relative mb-6">
            <Avatar className="w-28 h-28 mx-auto ring-4 ring-gradient-to-r from-[#E9342E] to-[#FF9334] shadow-xl">
              <AvatarImage src={profileImage} alt={name} className="object-contain p-2" />
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-[#E9342E] to-[#FF9334] text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#E9342E] to-[#FF9334] rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-[#FF9334] to-[#E9342E] rounded-full opacity-30 animate-pulse animation-delay-500" />
          </div>
            <h1 className="combinat-title-md text-[#303030] mb-3 normal-case">{name}</h1>
          <p 
            className="combinat-text text-slate-600 text-base leading-relaxed whitespace-pre-line max-w-xs mx-auto"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </motion.div>{/* Main Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Button
                asChild
                variant="outline"
                className="w-full h-auto p-6 justify-start text-left bg-white hover:bg-gradient-to-r hover:from-[#E9342E]/5 hover:to-[#FF9334]/5 border-2 border-slate-200 hover:border-[#E9342E]/30 transition-all duration-300 group shadow-lg hover:shadow-xl rounded-2xl"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center w-full">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#E9342E] to-[#FF9334] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="combinat-text font-semibold text-[#303030] group-hover:text-[#E9342E] transition-colors text-base">
                        {link.title}
                      </div>
                      {link.description && (
                        <div className="combinat-text text-sm text-slate-500 mt-1">
                          {link.description}
                        </div>
                      )}
                    </div>
                    <motion.div
                      animate={{ x: hoveredLink === link.id ? 6 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 group-hover:text-[#E9342E] text-xl"
                    >
                      →
                    </motion.div>
                  </div>
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Projetos", value: "500+", icon: "🚀" },
            { label: "Clientes", value: "200+", icon: "🤝" },
            { label: "Anos", value: "5+", icon: "⭐" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="combinat-text font-bold text-[#303030] text-lg">{stat.value}</div>
              <div className="combinat-text text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>{/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="combinat-subtitle-sm text-[#303030] mb-6">
            Conecte-se conosco
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <SocialLinkBox {...social} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] rounded-2xl p-6 text-white shadow-xl">            <h3 className="combinat-subtitle-sm text-white mb-3">
              Transforme seu negócio hoje
            </h3>
            <p className="combinat-text text-white/90 mb-4 text-sm">
              Agende uma conversa gratuita e descubra como nossa expertise pode acelerar seus resultados.
            </p>
            <Button 
              asChild
              className="bg-white text-[#E9342E] hover:bg-white/90 font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                Conversar no WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8 pt-6 border-t border-slate-200"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <img 
              src="/combinat_gradiente.svg" 
              alt="Combinat" 
              className="h-5 w-auto"
            />
          </div>
          <p className="combinat-text text-xs text-slate-400 mt-1">
            Soluções digitais que transformam negócios
          </p>
        </motion.div>
      </div>
    </div>
  );
};

function Component() {
  return <LinkInBio />;
}

export default Component;
