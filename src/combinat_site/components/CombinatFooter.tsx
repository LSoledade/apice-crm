import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, 
  ArrowRight, ArrowUp
} from 'lucide-react';

const CombinatFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (    <footer className="bg-[#303030] text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-16">        <div className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] rounded-2xl p-10 md:p-12 text-white text-center">
          <h2 className="combinat-title-md text-white mb-4">Insights que transformam</h2>
          <p className="combinat-text text-white/90 mb-6 max-w-lg mx-auto">
            Assine nossa newsletter e receba insights sobre tendências globais de tecnologia e marketing que impactam diretamente seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Seu email" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 flex-1"
            />
            <Button className="bg-white hover:bg-white/90 text-[#E9342E] font-semibold">
              Inscrever-se
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo Oficial */}
            <div className="flex items-center">
              <img 
                src="/combinat_primário_claro.svg" 
                alt="Combinat" 
                className="h-8 w-auto"
              />
            </div>
            
            <p className="combinat-text text-white/80 leading-relaxed max-w-md">
              Transformamos ideias em resultados através de soluções digitais inovadoras e estratégias personalizadas.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "https://facebook.com/combinat.digital" },
                { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "https://instagram.com/combinat.digital" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "https://linkedin.com/company/combinat" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#E9342E] text-white hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="combinat-subtitle-sm text-white">Navegação</h3>
            <ul className="space-y-3">
              {[
                { name: "Por que a Combinat?", href: "#porque-combinat" },
                { name: "Soluções", href: "#solucoes" },
                { name: "Equipe", href: "#equipe" },
                { name: "CRM & Automação", href: "/crm" }
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="combinat-text text-white/70 hover:text-[#FF9334] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="combinat-subtitle-sm text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#E9342E]/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-[#E9342E]" />
                </div>
                <a 
                  href="mailto:contato@combinat.com.br" 
                  className="combinat-text text-white/80 hover:text-[#E9342E] transition-colors"
                >
                  contato@combinat.com.br
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF9334]/20 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#FF9334]" />
                </div>
                <a 
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="combinat-text text-white/80 hover:text-[#FF9334] transition-colors"
                >
                  (11) 9999-9999
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="combinat-text text-white/80">
                  São Paulo, SP
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Layout with Accordions */}
        <div className="md:hidden space-y-4">
          {/* Company Info - Always visible on mobile */}
          <div className="space-y-6 pb-6 border-b border-white/20">
            {/* Logo Oficial */}
            <div className="flex items-center">
              <img 
                src="/combinat_primário_claro.svg" 
                alt="Combinat" 
                className="h-8 w-auto"
              />
            </div>
            
            <p className="combinat-text text-white/80 leading-relaxed">
              Transformamos ideias em resultados através de soluções digitais inovadoras e estratégias personalizadas.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "https://facebook.com/combinat.digital" },
                { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "https://instagram.com/combinat.digital" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "https://linkedin.com/company/combinat" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#E9342E] text-white hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <Accordion type="multiple" className="w-full">
            {/* Services Accordion */}
            <AccordionItem value="services" className="border-white/20">
              <AccordionTrigger className="combinat-subtitle-sm text-white hover:text-[#FF9334] hover:no-underline">
                Navegação
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pb-2">
                  {[
                    { name: "Por que a Combinat?", href: "#porque-combinat" },
                    { name: "Soluções", href: "#solucoes" },
                    { name: "Equipe", href: "#equipe" },
                    { name: "CRM & Automação", href: "/crm" }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <a href={item.href} className="combinat-text text-white/70 hover:text-[#FF9334] transition-colors block py-1">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Contact Accordion */}
            <AccordionItem value="contact" className="border-white/20">
              <AccordionTrigger className="combinat-subtitle-sm text-white hover:text-[#FF9334] hover:no-underline">
                Contato
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pb-2">
                  <li className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E9342E]/20 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-[#E9342E]" />
                    </div>
                    <a 
                      href="mailto:contato@combinat.com.br" 
                      className="combinat-text text-white/80 hover:text-[#E9342E] transition-colors"
                    >
                      contato@combinat.com.br
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF9334]/20 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-[#FF9334]" />
                    </div>
                    <a 
                      href="https://wa.me/5511999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="combinat-text text-white/80 hover:text-[#FF9334] transition-colors"
                    >
                      (11) 9999-9999
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span className="combinat-text text-white/80">
                      São Paulo, SP
                    </span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bottom Footer */}        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-white/20 space-y-4 md:space-y-0">
          <p className="combinat-text text-white/60 text-sm">
            © {currentYear} Combinat. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            {[
              { label: "Privacidade", href: "/policies#privacidade" },
              { label: "Termos", href: "/policies#termos" },
              { label: "Cookies", href: "/policies#cookies" }
            ].map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="combinat-text text-white/60 hover:text-[#E9342E] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <div className="bg-black/30 py-4 text-center border-t border-white/10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center combinat-text text-sm text-white/60 hover:text-[#E9342E] transition-colors"
        >
          <ArrowUp className="w-4 h-4 mr-2" />
          Voltar ao topo
        </button>
      </div>
    </footer>
  );
};

export default CombinatFooter;
