"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Mail,
  Globe,
  Youtube,
  MessageCircle,
  ShoppingBag, // For Blog
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// --- UX Writing & Content ---
// Centralized content for easier updates and clarity.
const content = {
  profile: {
    image: "/combinat_gradiente.svg",
    name: "Combinat",
    bio: "Transformamos ideias em <span class='bg-gradient-to-r from-combinat-primary to-combinat-secondary bg-clip-text text-transparent'>soluções digitais</span>.",
    badge: "Links Oficiais",
  },
  mainLinks: [
    {
      id: "1",
      title: "Fale com um especialista",
      url: "https://wa.me/5511999999999",
      icon: MessageCircle,
      description: "Vamos resolver seu desafio.",
    },
    {
      id: "2",
      title: "Visite nosso site",
      url: "https://combinat.com.br",
      icon: Globe,
      description: "Conheça nossa abordagem e metodologia.",
    },
    {
      id: "3",
      title: "Cases de sucesso",
      url: "https://combinat.com.br/portfolio",
      icon: Youtube,
      description: "Problemas que já resolvemos.",
    },
    {
      id: "4",
      title: "Nosso CRM inteligente",
      url: "https://combinat.com.br/crm",
      icon: ShoppingBag,
      description: "Uma solução para otimizar seus processos.",
    },
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/combinat.digital", icon: Instagram },
    { platform: "LinkedIn", url: "https://linkedin.com/company/combinat", icon: Linkedin },
    { platform: "WhatsApp", url: "https://wa.me/5511999999999", icon: MessageCircle },
    { platform: "Email", url: "mailto:contato@combinat.com.br", icon: Mail },
  ],
  cta: {
    title: "Tem um desafio para nós?",
    description: "Nossa equipe está pronta para entender seu cenário e propor uma solução eficaz para o seu problema.",
    buttonText: "Discutir meu Projeto",
  },
  footer: {
    text: "Soluções digitais que transformam negócios",
  },
};



// --- Main Component ---
const LinkInBio: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 py-8 px-4 flex flex-col items-center">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-1/4 right-0 w-1/2 h-1/2 bg-combinat-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 left-0 w-1/2 h-1/2 bg-combinat-secondary/5 rounded-full blur-3xl" />
      </div>

      <main className="w-full max-w-md mx-auto">
        {/* Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <img
            src={content.profile.image}
            alt={content.profile.name}
            className="w-48 h-48 mx-auto mb-2 object-contain"
          />
          <p
            className="text-slate-600"
            dangerouslySetInnerHTML={{ __html: content.profile.bio }}
          />
        </motion.section>

        {/* Main Links */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="space-y-4 mb-10"
        >
          {content.mainLinks.map((link) => (
            <motion.div
              key={link.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full text-left bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-combinat-primary/50"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-combinat-primary to-combinat-secondary flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300">
                      <link.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-combinat-neutral group-hover:text-combinat-primary transition-colors">
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="text-sm text-slate-500 mt-0.5">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10"
        >
          <div className="bg-gradient-to-br from-combinat-primary to-combinat-secondary rounded-2xl p-6 text-center text-white shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">{content.cta.title}</h3>
            <p className="text-white/90 mb-4 text-sm">{content.cta.description}</p>
            <Button
              asChild
              className="bg-white text-combinat-primary hover:bg-white/90 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                {content.cta.buttonText}
              </a>
            </Button>
          </div>
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center gap-5 flex-wrap">
            {content.socialLinks.map((social) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visite nosso ${social.platform}`}
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-500 hover:text-combinat-primary transition-colors"
              >
                <social.icon className="w-7 h-7" />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-10 pt-6 border-t border-slate-200"
        >
          <img
            src="/combinat_gradiente.svg"
            alt="Combinat Logo"
            className="h-5 w-auto mx-auto mb-2"
          />
          <p className="text-xs text-slate-400">{content.footer.text}</p>
        </motion.footer>
      </main>
    </div>
  );
};

export default LinkInBio;
