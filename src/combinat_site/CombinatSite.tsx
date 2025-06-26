import React from 'react';
import CombinatHeader from './components/CombinatHeader';
import CombinatFooter from './components/CombinatFooter';
import Hero from './home/Hero';
import PorqueCombinat from './home/PorqueCombinat';
import Solucoes from './home/Solucoes';
import Negocios from './home/Negocios';
import Equipe from './home/Equipe';

const CombinatSite = () => {  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <CombinatHeader />
      <main><div className="relative"> {/* Hero com posicionamento relativo para elementos decorativos */}
          <Hero />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-[#E9342E]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-10 w-60 h-60 bg-[#FF9334]/20 rounded-full blur-3xl -z-10"></div>
        </div>

        <div className="bg-white relative">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#E9342E]/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          <PorqueCombinat />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FF9334]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Solucoes />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#E9342E]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Negocios />
        </div>
          <div className="bg-white relative">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#E9342E]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>          <div className="absolute bottom-40 left-20 w-72 h-72 bg-[#FF9334]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Equipe />        </div>
      </main>
      <CombinatFooter />
    </div>
  );
};

export default CombinatSite;
