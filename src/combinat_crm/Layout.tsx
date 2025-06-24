import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Verifica se estamos na página de mensagens
  const isMensagensPage = location.pathname.includes('/mensagens');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container principal com CSS Grid otimizado */}
      <div 
        className="h-screen grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateColumns: sidebarCollapsed ? '4rem 1fr' : '16rem 1fr',
          gridTemplateRows: 'auto 1fr',
          gridTemplateAreas: `
            "sidebar header"
            "sidebar main"
          `
        }}
      >
        {/* Sidebar - ocupa toda a altura */}
        <aside 
          style={{ gridArea: 'sidebar' }} 
          className="bg-white border-r border-gray-200 shadow-sm overflow-hidden"
        >
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
        </aside>

        {/* Header - alinhado com o conteúdo principal */}
        <header 
          style={{ gridArea: 'header' }} 
          className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-10 h-16 flex items-center"
        >
          <Header />
        </header>

        {/* Main Content - área principal */}
        <main 
          style={{ gridArea: 'main' }}
          className={`
            bg-gray-50 
            ${isMensagensPage 
              ? "p-0 overflow-hidden" 
              : "p-6 overflow-auto"
            }
          `}
        >
          {isMensagensPage ? (
            // Para página de mensagens - sem padding, ocupando tudo
            <div className="h-full w-full">
              {children}
            </div>
          ) : (
            // Para outras páginas - com container e efeitos visuais
            <div className="max-w-full">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)] p-6">
                {children}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;