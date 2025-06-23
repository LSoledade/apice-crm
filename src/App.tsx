import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Layout from "@/pages/Layout";
import ProtectedRoute from "@/pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import analyticsService from "./services/analyticsService";

// Importação dos componentes de Marketing
import Marketing from "@/pages/marketing/Marketing";
import Analytics from "@/pages/marketing/Analytics";
import Agenda from "@/pages/marketing/Agenda";
import Leads from "@/pages/marketing/Leads";
import Campanhas from "@/pages/marketing/Campanhas";
import Mensagens from "@/pages/marketing/Mensagens";

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

// Importação do site da Combinat
import CombinatSite from "@/pages/sitecombinat/CombinatSite";
import LinkNaBio from "@/pages/sitecombinat/LinkNaBio";
import Policies from "@/pages/sitecombinat/Policies";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { AnalyticsProvider } from "./contexts/AnalyticsContext";

// Opcional: pegar a flag de desabilitar analytics de variáveis de ambiente
const DISABLE_ANALYTICS = import.meta.env.VITE_DISABLE_ANALYTICS === 'true';
const ANALYTICS_ID = 'G-TH5T461VFJ';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AnalyticsProvider
        measurementId={ANALYTICS_ID}
        disabled={DISABLE_ANALYTICS}>
        <AuthProvider>          <BrowserRouter>
            {/* Componente de rastreamento do Google Analytics */}
            <GoogleAnalytics />            {/* Cookie Consent Banner */}
            <CookieConsent />
            <Routes>{/* Site da Combinat como página principal */}
              <Route path="/" element={<CombinatSite />} />
              <Route path="/link" element={<LinkNaBio />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/login" element={<Login />} />
              
              {/* Landing page do CRM movida para /crm */}
              <Route path="/crm" element={<Landing />} />
              
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
              } />            <Route path="/marketing/campanhas" element={
                <ProtectedRoute>
                  <Layout>
                    <Campanhas />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/marketing/mensagens" element={
                <ProtectedRoute>
                  <Layout>
                    <Mensagens />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </AnalyticsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
