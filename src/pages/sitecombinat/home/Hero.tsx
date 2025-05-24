import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-indigo-100/80 via-white to-blue-50/80"></div>
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>

      <div className="container relative z-10 px-4 md:px-6 py-16 md:py-24 flex">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-block text-blue-600 font-medium px-4 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 backdrop-blur-sm">
              🚀 Tecnologia e Marketing em Sinergia
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            A melhor maneira de transformar seu
            <span className="relative">
              <span className="text-blue-600"> negócio digital</span>
            </span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg mb-10 max-w-2xl">
            Há mais de 10 anos, a Combinat combina tecnologia avançada e estratégias de marketing inteligentes para transformar negócios digitais e alcançar resultados extraordinários.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-blue-600/30 px-8 py-6 text-base w-full sm:w-auto rounded-full font-semibold transition-all duration-300"
            >
              Descubra Nossas Soluções
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent hover:bg-slate-100 text-slate-700 hover:text-blue-600 border-slate-300 rounded-full px-8 py-6 text-base w-full sm:w-auto group font-semibold"
            >
              <Play className="mr-2 w-5 h-5" />
              Ver Como Funciona
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-300/20 bg-white/10 backdrop-blur-sm animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>  );
};

export default Hero;