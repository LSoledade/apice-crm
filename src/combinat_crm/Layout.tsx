
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
  const isMensagensPage = location.pathname.includes('/mensagens');  return (
    <div className="min-h-screen crm-background">      {/* Layout com Grid Template Areas para alinhamento perfeito */}
      <div 
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{
          display: 'grid',
          gridTemplateColumns: sidebarCollapsed ? '4rem 1fr' : '16rem 1fr',
          gridTemplateRows: 'auto 1fr',
          gridTemplateAreas: `
            "sidebar header"
            "sidebar main"
          `
        }}
      >
          {/* Sidebar */}
        <aside style={{ gridArea: 'sidebar' }} className="h-screen sticky top-0">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
        </aside>        {/* Header */}
        <header 
          style={{ gridArea: 'header' }} 
          className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 h-16 sticky top-0 z-10"
        >
          <Header />
        </header>
          {/* Main Content */}
        <main 
          style={{ gridArea: 'main' }}
          className={isMensagensPage 
            ? "px-6 py-6 h-[calc(100vh-4rem)]" 
            : "px-6 py-6"
          }
        >
          <div className={`crm-main-container gmail-corner-effect rounded-2xl ${
            isMensagensPage 
              ? "h-full" 
              : "min-h-[calc(100vh-8rem)]"
          }`}>
            <div className={isMensagensPage ? "h-full" : "min-h-full"}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
