
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
    <div className="min-h-screen crm-background flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
        <div className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header sidebarCollapsed={sidebarCollapsed} />        <main className={isMensagensPage 
          ? "pt-20 px-6 pb-6 h-screen overflow-hidden" 
          : "pt-20 px-6 pb-6 h-screen overflow-auto"
        }>
          <div className="crm-main-container gmail-corner-effect rounded-2xl min-h-[calc(100vh-8rem)] overflow-hidden">
            <div className="h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
