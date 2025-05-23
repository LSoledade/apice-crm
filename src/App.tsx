
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/pages/Layout";
import ProtectedRoute from "@/pages/ProtectedRoute";
import NotFound from "./pages/NotFound";

// Importação dos componentes de Marketing
import Marketing from "@/pages/marketing/Marketing";
import Analytics from "@/pages/marketing/Analytics";
import Agenda from "@/pages/marketing/Agenda";
import Leads from "@/pages/marketing/Leads";
import Campanhas from "@/pages/marketing/Campanhas";

// Importação dos componentes do Financeiro
import Financeiro from "@/pages/financeiro/Financeiro";
import Faturamento from "@/pages/financeiro/Faturamento";
import Pagamentos from "@/pages/financeiro/Pagamentos";
import AgendaFinanceira from "@/pages/financeiro/AgendaFinanceira";

// Importação dos componentes de Configurações
import Configuracoes from "@/pages/configuracoes/Configuracoes";
import ConfiguracoesGeral from "@/pages/configuracoes/Geral";
import Usuarios from "@/pages/configuracoes/Usuarios";
import Dominios from "@/pages/configuracoes/Dominios";
import Integracoes from "@/pages/configuracoes/Integracoes";
import Permissoes from "@/pages/configuracoes/Permissoes";
import Seguranca from "@/pages/configuracoes/Seguranca";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <Layout>
                  <Configuracoes />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/geral" element={
              <ProtectedRoute>
                <Layout>
                  <ConfiguracoesGeral />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/usuarios" element={
              <ProtectedRoute>
                <Layout>
                  <Usuarios />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/permissoes" element={
              <ProtectedRoute>
                <Layout>
                  <Permissoes />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/dominios" element={
              <ProtectedRoute>
                <Layout>
                  <Dominios />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/integracoes" element={
              <ProtectedRoute>
                <Layout>
                  <Integracoes />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/seguranca" element={
              <ProtectedRoute>
                <Layout>
                  <Seguranca />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro" element={
              <ProtectedRoute>
                <Layout>
                  <Financeiro />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro/faturamento" element={
              <ProtectedRoute>
                <Layout>
                  <Faturamento />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro/pagamentos" element={
              <ProtectedRoute>
                <Layout>
                  <Pagamentos />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro/agenda" element={
              <ProtectedRoute>
                <Layout>
                  <AgendaFinanceira />
                </Layout>
              </ProtectedRoute>
            } />
              <Route path="/marketing" element={
              <ProtectedRoute>
                <Layout>
                  <Marketing />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/analytics" element={
              <ProtectedRoute>
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/agenda" element={
              <ProtectedRoute>
                <Layout>
                  <Agenda />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/leads" element={
              <ProtectedRoute>
                <Layout>
                  <Leads />
                </Layout>
              </ProtectedRoute>
            } />
              <Route path="/marketing/campanhas" element={
              <ProtectedRoute>
                <Layout>
                  <Campanhas />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
