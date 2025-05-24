import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const Equipe = () => {
  const fundadores = [
    {
      nome: "Alan Costa",
      cargo: "Co-fundador",
      bio: "Anos de experiência em desenvolvimento de sistemas complexos e arquitetura de software, especialista em criar soluções tecnológicas." ,
      especialidades: ["Desenvolvimento", "Arquitetura de Sistemas", "DevOps"],
      imagem: "/placeholder.svg",
      social: {
        linkedin: "#",
        twitter: "#",
        site: "#"
      }
    },
    {
      nome: "Leonardo Soledade",
      cargo: "Co-fundador",
      bio: "Especialista em marketing digital de alta performance, focado em resultados mensuráveis e otimização de ROI.",
      especialidades: ["Marketing Digital", "Performance", "Analytics"],
      imagem: "/placeholder.svg",
      social: {        
        site: "#"
      }
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            A Força por Trás da <span className="text-blue-600">Combinat</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Combinat é a materialização da visão de Alan Costa e Leonardo Soledade. Unimos anos de experiência em desenvolvimento de sistemas complexos e estratégias de marketing digital de alta performance para oferecer a você uma parceria sólida e focada em resultados.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {fundadores.map((pessoa, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Image */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                    {pessoa.nome.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pessoa.nome}</h3>
                  <p className="text-blue-600 font-medium mb-4">{pessoa.cargo}</p>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{pessoa.bio}</p>
                  
                  {/* Especialidades */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pessoa.especialidades.map((especialidade, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {especialidade}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <a href={pessoa.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={pessoa.social.twitter} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={pessoa.social.site} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA para conhecer os fundadores */}
        <div className="text-center mb-16">
          <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold">
            Conheça os Fundadores
          </Button>
        </div>

        {/* Company Values */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e projeto na Combinat
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Excelência</h4>
              <p className="text-gray-600">Buscamos sempre a melhor solução, sem compromissos com a qualidade.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Transparência</h4>
              <p className="text-gray-600">Comunicação clara e honesta em todas as etapas do projeto.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Resultados</h4>
              <p className="text-gray-600">Foco total em gerar valor e impacto real para nossos clientes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipe;
