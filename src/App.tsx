
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
            } />
            
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Configurações</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/usuarios" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/configuracoes/permissoes" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Gestão de Permissões</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Financeiro</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro/pagamentos" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Gestão de Pagamentos</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/financeiro/agenda" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Agenda de Pagamentos</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Marketing</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/analytics" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Analytics</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/agenda" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Agenda de Marketing</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/leads" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Gestão de Leads</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/marketing/campanhas" element={
              <ProtectedRoute>
                <Layout>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Rastreamento de Campanhas</h1>
                    <p className="text-gray-600 mt-2">Módulo em desenvolvimento</p>
                  </div>
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
