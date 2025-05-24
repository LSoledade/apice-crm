import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

const Blog = () => {  const artigos = [
    {
      titulo: "5 Sinais de que sua PME Precisa Integrar TI e Marketing (Urgente!)",
      resumo: "Descubra os indicadores cruciais de que sua empresa está perdendo oportunidades por não integrar tecnologia e marketing.",
      categoria: "Marketing Digital",
      autor: "Leonardo Soledade",
      data: "20 Mai 2024",
      tempoLeitura: "8 min",
      imagem: "/placeholder.svg"
    },
    {
      titulo: "Como escolher a arquitetura certa para seu sistema de vendas",
      resumo: "Guia prático para definir a melhor estrutura tecnológica que vai sustentar o crescimento do seu negócio.",
      categoria: "Desenvolvimento",
      autor: "Alan Costa",
      data: "18 Mai 2024",
      tempoLeitura: "12 min",
      imagem: "/placeholder.svg"
    },
    {
      titulo: "ROI em transformação digital: como medir o que realmente importa",
      resumo: "Métricas e KPIs essenciais para avaliar o sucesso da integração entre tecnologia e marketing na sua empresa.",
      categoria: "Analytics",
      autor: "Equipe Combinat",
      data: "15 Mai 2024",
      tempoLeitura: "10 min",
      imagem: "/placeholder.svg"
    }
  ];
  const getCategoryColor = (categoria: string) => {
    const cores = {
      "Marketing Digital": "bg-blue-100 text-blue-700",
      "Desenvolvimento": "bg-green-100 text-green-700",
      "Analytics": "bg-purple-100 text-purple-700"
    };
    return cores[categoria as keyof typeof cores] || "bg-gray-100 text-gray-700";
  };

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Mantenha-se à Frente com Nossos <span className="text-blue-600">Insights</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compartilhamos conhecimento e estratégias que realmente funcionam no mundo digital.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artigos.map((artigo, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white overflow-hidden">
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">📄</div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <Badge className={`mb-3 ${getCategoryColor(artigo.categoria)}`}>
                    {artigo.categoria}
                  </Badge>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {artigo.titulo}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {artigo.resumo}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{artigo.autor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{artigo.data}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{artigo.tempoLeitura}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Ler Artigo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Receba insights exclusivos
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Assine nossa newsletter e receba semanalmente dicas, estratégias e cases de sucesso diretamente no seu email.
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-semibold">
              Assinar
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-4">
            ✨ +2.500 profissionais já recebem nossos insights
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
