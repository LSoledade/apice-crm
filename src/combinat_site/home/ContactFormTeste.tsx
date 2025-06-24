'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CombinatContactForm from '@/components/forms/combinat-contact-form';

function ContactFormTeste() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
        
        {/* Floating elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-medium text-orange-600">Fale com um especialista</span>
              </motion.div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  Quer saber como nossos produtos e serviços ajudam você a superar seus desafios?
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Escreva pra gente.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Por que conversar conosco?</h3>
              
              <div className="space-y-3">
                <motion.div
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Entendemos seu negócio</div>
                    <div className="text-sm text-gray-600">Focamos em soluções práticas para pequenas e médias empresas</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Sem compromisso</div>
                    <div className="text-sm text-gray-600">Conversa inicial gratuita para entender suas necessidades</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-800">Suporte dedicado</div>
                    <div className="text-sm text-gray-600">Equipe especializada em implementação e treinamento</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <CombinatContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>  );
}

export default ContactFormTeste;
