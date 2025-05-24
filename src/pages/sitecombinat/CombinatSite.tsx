import React from 'react';
import CombinatHeader from './components/CombinatHeader';
import CombinatFooter from './components/CombinatFooter';
import Hero from './home/Hero';
import PorqueCombinat from './home/PorqueCombinat';
import Solucoes from './home/Solucoes';
import Equipe from './home/Equipe';
import Blog from './home/Blog';
import CTA from './home/CTA';

const CombinatSite = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <CombinatHeader />
      <main className="pt-16">
        <div className="relative"> {/* Hero com posicionamento relativo para elementos decorativos */}
          <Hero />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-10 w-60 h-60 bg-blue-300/20 rounded-full blur-3xl -z-10"></div>
        </div>

        <div className="bg-white relative">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          <PorqueCombinat />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Solucoes />
        </div>
        
        <div className="bg-white relative">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10"></div>
          <Equipe />
        </div>
        
        <div className="bg-slate-50 relative">
          <div className="absolute top-1/3 right-20 w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
          <Blog />
        </div>
        
        <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-700 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')] opacity-30 -z-10"></div>
          <CTA />
        </div>
      </main>
      <CombinatFooter />
    </div>
  );
};

export default CombinatSite;
