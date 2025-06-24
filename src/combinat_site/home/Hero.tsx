import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden">
      {/* Geometric Hero Background - Only shapes */}
      <div className="absolute inset-0">
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
            {/* Geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: -150, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: 12 }}
              transition={{ duration: 2.4, delay: 0.3, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[600px] h-[140px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -150, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -15 }}
              transition={{ duration: 2.4, delay: 0.5, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[500px] h-[120px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -150, rotate: 7 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ duration: 2.4, delay: 0.4, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[300px] h-[80px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -150, rotate: 5 }}
              animate={{ opacity: 1, y: 0, rotate: 20 }}
              transition={{ duration: 2.4, delay: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[200px] h-[60px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -150, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: -25 }}
              transition={{ duration: 2.4, delay: 0.7, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[150px] h-[40px]"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/[0.15] to-transparent backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
              </motion.div>
            </motion.div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
      </div>
      
      {/* Main content with proper grid layout */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
            <div className="col-span-1 lg:col-span-7 space-y-8">              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]"
              >
                <div className="h-2 w-2 bg-[#E9342E] rounded-full" />                <span className="combinat-text text-sm text-white/60 tracking-wide">
                  Consultoria de Soluções Digitais
                </span>
              </motion.div>              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >                <h1 className="combinat-title-xl leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 normal-case">
                    A melhor maneira de transformar seu
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E9342E] to-[#FF9334] normal-case">
                    negócio digital
                  </span>
                </h1>
              </motion.div>
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <p className="combinat-text-light text-white/80 text-lg md:text-xl max-w-2xl">
                  A Combinat une tecnologia avançada e estratégias de marketing inteligentes para transformar negócios digitais e alcançar resultados extraordinários.
                </p>
              </motion.div>
                {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg"
              >                <Button 
                  size="lg" 
                  className="combinat-cta bg-gradient-to-r from-[#E9342E] to-[#FF9334] hover:from-[#E9342E]/90 hover:to-[#FF9334]/90 text-white border-0 shadow-lg hover:shadow-[#E9342E]/30 px-8 py-6 text-base rounded-full transition-all duration-300"
                >
                  Vamos Combinar Nossas Forças
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="combinat-text bg-white/10 hover:bg-white/20 text-white hover:text-white border-white/20 hover:border-white/30 rounded-full px-8 py-6 text-base group backdrop-blur-sm"
                >
                  
                  Conheça Nossa Equipe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
            
            {/* Right side - empty space for geometric shapes */}
            <div className="hidden lg:block col-span-5"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>);
};

export default Hero;