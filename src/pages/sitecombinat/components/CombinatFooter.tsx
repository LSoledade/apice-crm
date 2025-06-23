import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, 
  ArrowRight, ArrowUp
} from 'lucide-react';

const CombinatFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#303030] text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">        <div className="bg-gradient-to-r from-[#E9342E] to-[#FF9334] rounded-2xl p-8 text-white text-center">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
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
                { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "#" },
                { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "#" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn", href: "#" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
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
            <h3 className="combinat-subtitle-sm text-white">Soluções</h3>
            <ul className="space-y-3">
              {[
                "Marketing Digital",
                "Desenvolvimento Web",
                "CRM & Automação",
                "Consultoria"
              ].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="combinat-text text-white/70 hover:text-[#FF9334] transition-colors">
                    {item}
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
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="combinat-text text-white/80">
                  São Paulo, SP
                </span>
              </li>
            </ul>
          </div>
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
