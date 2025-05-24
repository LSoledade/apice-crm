import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { 
  Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, 
  ArrowRight, ChevronRight, CheckCircle, MessageSquare, Clock,
  Youtube, Globe, Shield, ArrowUp
} from 'lucide-react';

const CombinatFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-20">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-2xl p-8 md:p-10 lg:p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiPjxwYXRoIGQ9Ik0zMCAwdnY2ME02MCAwdjYwTTAuMiAwdjYwTTAgMzBoNjAiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30 -z-10"></div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-400/20 rounded-full mix-blend-overlay filter blur-3xl -z-10"></div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Fique por dentro das novidades</h2>
              <p className="text-blue-100 mb-0">
                Assine nossa newsletter e receba conteúdos exclusivos, novidades e dicas para impulsionar seu negócio digital.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  type="email" 
                  placeholder="Seu email" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white h-12 focus-visible:ring-blue-500"
                />
              </div>
              <Button className="bg-white hover:bg-slate-100 text-blue-700 hover:text-blue-800 h-12 px-5">
                Inscrever-se
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="ml-3 text-xl font-bold">Combinat</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Transformamos ideias em resultados através de soluções inovadoras e estratégias digitais personalizadas para o crescimento do seu negócio.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <Facebook className="h-4 w-4" />, label: "Facebook" },
                { icon: <Instagram className="h-4 w-4" />, label: "Instagram" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
                { icon: <Twitter className="h-4 w-4" />, label: "Twitter" },
                { icon: <Youtube className="h-4 w-4" />, label: "YouTube" }
              ].map((social, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="icon" 
                  className="w-9 h-9 rounded-full text-slate-400 hover:text-white border-slate-700 hover:border-blue-600 hover:bg-blue-900/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-5 before:bg-blue-500 before:rounded">
                Serviços
              </h3>
              <ul className="space-y-3">
                {[
                  "Consultoria Estratégica",
                  "Marketing Digital",
                  "Desenvolvimento Web",
                  "Automação de Processos",
                  "Análise de Dados"
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center group">
                      <ChevronRight className="h-4 w-4 mr-1.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-5 before:bg-indigo-500 before:rounded">
                Empresa
              </h3>
              <ul className="space-y-3">
                {[
                  "Sobre Nós",
                  "Nossa Equipe",
                  "Carreiras",
                  "Blog",
                  "Cases de Sucesso"
                ].map((item, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors flex items-center group">
                      <ChevronRight className="h-4 w-4 mr-1.5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-slate-300 hover:text-white transition-colors">
                  contato@combinat.com.br
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-slate-300 hover:text-white transition-colors">
                  (11) 9999-9999
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                </div>
                <span className="text-slate-300">
                  Rua dos Negócios, 123<br />
                  São Paulo, SP - 01234-567
                </span>
              </li>
            </ul>
            
            {/* Support availability */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center mr-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">Online</span>
              </div>
              <span className="text-xs text-slate-400">Suporte disponível 24/7</span>
            </div>
          </div>
        </div>

        {/* Trustworthy badges */}
        <div className="flex flex-wrap justify-center gap-8 my-12 py-8 border-t border-b border-slate-800">
          {[
            { icon: <Shield className="w-5 h-5 mr-2 text-green-400" />, text: "Dados 100% Seguros" },
            { icon: <Globe className="w-5 h-5 mr-2 text-blue-400" />, text: "Presença Global" },
            { icon: <CheckCircle className="w-5 h-5 mr-2 text-amber-400" />, text: "Qualidade Garantida" },
            { icon: <Clock className="w-5 h-5 mr-2 text-purple-400" />, text: "Suporte 24/7" },
            { icon: <MessageSquare className="w-5 h-5 mr-2 text-rose-400" />, text: "Atendimento Humanizado" }
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center text-slate-300">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} Combinat. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["Política de Privacidade", "Termos de Uso", "Cookies", "Acessibilidade"].map((link, idx) => (
              <a key={idx} href="#" className="text-slate-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <div className="bg-slate-800 py-4 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowUp className="w-4 h-4 mr-1.5" />
          Voltar ao topo
        </button>
      </div>
    </footer>
  );
};

export default CombinatFooter;
