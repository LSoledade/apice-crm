import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Area,
  AreaChart
} from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  
  // Dados mockados para os gráficos
  const trafficData = [
    { name: '1 Jun', direto: 800, organico: 1400, pago: 1200, referral: 400 },
    { name: '8 Jun', direto: 980, organico: 1600, pago: 1100, referral: 500 },
    { name: '15 Jun', direto: 1100, organico: 1800, pago: 1300, referral: 600 },
    { name: '22 Jun', direto: 1050, organico: 2000, pago: 1500, referral: 700 },
    { name: '29 Jun', direto: 1200, organico: 2200, pago: 1700, referral: 800 },
  ];

  const conversionData = [
    { name: '1 Jun', taxa: 2.4 },
    { name: '8 Jun', taxa: 2.8 },
    { name: '15 Jun', taxa: 3.2 },
    { name: '22 Jun', taxa: 2.9 },
    { name: '29 Jun', taxa: 3.5 },
  ];

  const channelData = [
    { name: 'Busca Orgânica', value: 40, color: '#2563eb' },
    { name: 'Redes Sociais', value: 25, color: '#8b5cf6' },
    { name: 'Email', value: 15, color: '#06b6d4' },
    { name: 'Anúncios', value: 20, color: '#10b981' }
  ];

  const topPagesData = [
    { page: '/home', views: 12500, conversions: 280, rate: '2.24%', trend: 'up' },
    { page: '/produtos', views: 8700, conversions: 310, rate: '3.56%', trend: 'up' },
    { page: '/blog/marketing-digital', views: 7200, conversions: 185, rate: '2.57%', trend: 'down' },
    { page: '/contato', views: 5100, conversions: 420, rate: '8.23%', trend: 'up' },
    { page: '/sobre', views: 4300, conversions: 65, rate: '1.51%', trend: 'down' }
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#2563eb' },
    { name: 'Mobile', value: 48, color: '#8b5cf6' },
    { name: 'Tablet', value: 7, color: '#06b6d4' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics de Marketing</h1>
          <p className="text-gray-600">Análise detalhada do desempenho de marketing</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tráfego Total</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58,720</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +12.5% desde o período anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +0.4% desde o período anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio na Página</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:35</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              -0:12 desde o período anterior
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-green-500" />
              -3.1% desde o período anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
          <TabsTrigger value="conversions">Conversões</TabsTrigger>
          <TabsTrigger value="behavior">Comportamento</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5" />
                  Fontes de Tráfego
                </CardTitle>
                <CardDescription>Evolução das principais fontes de tráfego</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="organico" stackId="1" stroke="#2563eb" fill="#2563eb" name="Orgânico" />
                    <Area type="monotone" dataKey="pago" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Pago" />
                    <Area type="monotone" dataKey="direto" stackId="1" stroke="#10b981" fill="#10b981" name="Direto" />
                    <Area type="monotone" dataKey="referral" stackId="1" stroke="#06b6d4" fill="#06b6d4" name="Referência" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Distribuição por Canal</CardTitle>
                  <CardDescription>Divisão do tráfego por origem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-80 items-center justify-center">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={channelData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Top Páginas</CardTitle>
                    <CardDescription>Páginas com mais acessos</CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 font-medium">Página</th>
                          <th className="pb-2 font-medium text-right">Visualizações</th>
                          <th className="pb-2 font-medium text-right">Conversões</th>
                          <th className="pb-2 font-medium text-right">Taxa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topPagesData.map((page, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">{page.page}</td>
                            <td className="py-3 text-right">{page.views.toLocaleString()}</td>
                            <td className="py-3 text-right">{page.conversions}</td>
                            <td className="py-3 text-right flex items-center justify-end">
                              {page.rate}
                              {page.trend === 'up' ? (
                                <TrendingUp className="ml-1 h-3 w-3 text-green-500" />
                              ) : (
                                <TrendingDown className="ml-1 h-3 w-3 text-red-500" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="conversions">
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5" />
                  Taxa de Conversão
                </CardTitle>
                <CardDescription>Evolução da taxa de conversão ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <RechartsTooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                    <Line type="monotone" dataKey="taxa" stroke="#2563eb" strokeWidth={2} dot={{ strokeWidth: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Funil de Conversão</CardTitle>
                  <CardDescription>Análise do percurso do usuário</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-md">
                    <div className="bg-blue-100 rounded-t-lg p-4 text-center">
                      <div className="text-blue-800 font-medium mb-2">Visitantes</div>
                      <div className="text-2xl font-bold">58,720</div>
                    </div>
                    <div className="h-6 bg-blue-200 w-1 mx-auto"></div>
                    <div className="bg-blue-200 p-4 text-center w-[85%] mx-auto">
                      <div className="text-blue-800 font-medium mb-2">Visualizaram Produtos</div>
                      <div className="text-xl font-bold">32,450 (55.3%)</div>
                    </div>
                    <div className="h-6 bg-blue-300 w-1 mx-auto"></div>
                    <div className="bg-blue-300 p-4 text-center w-[60%] mx-auto">
                      <div className="text-blue-800 font-medium mb-2">Adicionaram ao Carrinho</div>
                      <div className="text-xl font-bold">8,120 (13.8%)</div>
                    </div>
                    <div className="h-6 bg-blue-400 w-1 mx-auto"></div>
                    <div className="bg-blue-400 p-4 text-center w-[40%] mx-auto">
                      <div className="text-blue-800 font-medium mb-2">Iniciaram Checkout</div>
                      <div className="text-xl font-bold">2,840 (4.8%)</div>
                    </div>
                    <div className="h-6 bg-blue-500 w-1 mx-auto"></div>
                    <div className="bg-blue-500 rounded-b-lg p-4 text-center w-[25%] mx-auto">
                      <div className="text-white font-medium mb-2">Compraram</div>
                      <div className="text-xl font-bold text-white">1,880 (3.2%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Páginas de Entrada</CardTitle>
                <CardDescription>Principais páginas por onde os usuários iniciam a navegação</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { page: 'Home', sessions: 28500 },
                    { page: 'Blog', sessions: 12400 },
                    { page: 'Produtos', sessions: 8600 },
                    { page: 'Sobre', sessions: 4300 },
                    { page: 'Contato', sessions: 2100 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="page" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="sessions" name="Sessões" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Páginas de Saída</CardTitle>
                <CardDescription>Últimas páginas visitadas antes de deixar o site</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { page: 'Home', sessions: 10200 },
                    { page: 'Checkout', sessions: 15600 },
                    { page: 'Produtos', sessions: 7800 },
                    { page: 'Contato', sessions: 12300 },
                    { page: 'Blog', sessions: 5400 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="page" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="sessions" name="Sessões" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle>Mapa de Calor de Cliques</CardTitle>
                <CardDescription>Concentração de cliques na página inicial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md overflow-hidden border border-gray-200 h-96 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Imagem do mapa de calor do site</p>
                  </div>
                  <img
                    src="/placeholder.svg"
                    className="w-full h-full object-cover opacity-70"
                    alt="Mapa de calor placeholder"
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Ver relatório completo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribuição por Dispositivo</CardTitle>
                <CardDescription>Tipos de dispositivos utilizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-80 items-center justify-center">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Performance por Dispositivo</CardTitle>
                <CardDescription>Métricas de desempenho por tipo de dispositivo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 font-medium">Dispositivo</th>
                        <th className="pb-2 font-medium text-right">Usuários</th>
                        <th className="pb-2 font-medium text-right">Taxa de Conversão</th>
                        <th className="pb-2 font-medium text-right">Tempo na Página</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Desktop</td>
                        <td className="py-3 text-right">26,424</td>
                        <td className="py-3 text-right">4.2%</td>
                        <td className="py-3 text-right">3:12</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Mobile</td>
                        <td className="py-3 text-right">28,186</td>
                        <td className="py-3 text-right">2.4%</td>
                        <td className="py-3 text-right">1:45</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Tablet</td>
                        <td className="py-3 text-right">4,110</td>
                        <td className="py-3 text-right">3.7%</td>
                        <td className="py-3 text-right">2:50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle>Taxa de Conversão por Dispositivo</CardTitle>
                <CardDescription>Evolução ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: '1 Jun', desktop: 3.8, mobile: 2.1, tablet: 3.2 },
                    { name: '8 Jun', desktop: 4.0, mobile: 2.0, tablet: 3.5 },
                    { name: '15 Jun', desktop: 4.2, mobile: 2.3, tablet: 3.7 },
                    { name: '22 Jun', desktop: 3.9, mobile: 2.5, tablet: 3.3 },
                    { name: '29 Jun', desktop: 4.2, mobile: 2.4, tablet: 3.7 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <RechartsTooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                    <Legend />
                    <Line type="monotone" dataKey="desktop" stroke="#2563eb" name="Desktop" />
                    <Line type="monotone" dataKey="mobile" stroke="#8b5cf6" name="Mobile" />
                    <Line type="monotone" dataKey="tablet" stroke="#06b6d4" name="Tablet" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
