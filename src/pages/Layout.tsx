
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header sidebarCollapsed={sidebarCollapsed} />        <main className={isMensagensPage 
          ? "pt-16 p-5 h-screen overflow-hidden" 
          : "pt-16 p-5 h-screen overflow-auto"
        }>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[calc(100vh-7rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
