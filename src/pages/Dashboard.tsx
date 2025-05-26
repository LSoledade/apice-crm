import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import WeatherWidget from '@/components/WeatherWidget';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  DollarSign,
  Calendar,
  Activity,
  Plus
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Dados mockados para os gráficos
  const salesData = [
    { name: 'Jan', vendas: 4000, leads: 2400 },
    { name: 'Fev', vendas: 3000, leads: 1398 },
    { name: 'Mar', vendas: 2000, leads: 9800 },
    { name: 'Abr', vendas: 2780, leads: 3908 },
    { name: 'Mai', vendas: 1890, leads: 4800 },
    { name: 'Jun', vendas: 2390, leads: 3800 },
  ];

  const leadSourceData = [
    { name: 'Google Ads', value: 400, color: '#2563eb' },
    { name: 'Facebook', value: 300, color: '#8b5cf6' },
    { name: 'Orgânico', value: 300, color: '#06b6d4' },
    { name: 'Email', value: 200, color: '#10b981' }
  ];

  const recentLeads = [
    { name: 'João Silva', email: 'joao@email.com', source: 'Google Ads', status: 'Novo', value: 'R$ 5.000' },
    { name: 'Maria Santos', email: 'maria@email.com', source: 'Facebook', status: 'Qualificado', value: 'R$ 3.200' },
    { name: 'Pedro Costa', email: 'pedro@email.com', source: 'Orgânico', status: 'Proposta', value: 'R$ 8.500' },
    { name: 'Ana Lima', email: 'ana@email.com', source: 'Email', status: 'Novo', value: 'R$ 2.100' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Qualificado': return 'bg-yellow-100 text-yellow-800';
      case 'Proposta': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu negócio</p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Novo Lead
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +20.1% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +2.5% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 54.320</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              -4.3% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +3 novas esta semana
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Vendas vs Leads
            </CardTitle>
            <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#2563eb" />
                <Bar dataKey="leads" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weather Widget */}
        <WeatherWidget 
          location="São Paulo" 
          showForecast={true}
          className="lg:col-span-1"
        />
      </div>

      {/* Lead Sources Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Fontes de Leads</CardTitle>
            <CardDescription>Distribuição por canal de origem</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Chart placeholder - you can add more charts here */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Semanal</CardTitle>
            <CardDescription>Tendência dos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Gráfico em desenvolvimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Leads Recentes</CardTitle>
            <CardDescription>Últimos leads capturados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-crm-primary rounded-full flex items-center justify-center text-white font-medium">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-xs text-gray-500">via {lead.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <p className="text-sm font-medium mt-1">{lead.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Metas do Mês</CardTitle>
            <CardDescription>Progresso atual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Leads</span>
                <span>850/1000</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Receita</span>
                <span>R$ 54k/80k</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Conversão</span>
                <span>24.5%/30%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>

            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Ver Agenda
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
