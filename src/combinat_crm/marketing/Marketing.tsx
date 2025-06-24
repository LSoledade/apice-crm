import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Plus,
  Users,
  Mail,
  MessageSquare,
  Globe
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Marketing = () => {
  // Dados mockados para os gráficos
  const marketingData = [
    { name: 'Jan', acessos: 4000, conversoes: 1200, investimento: 2000 },
    { name: 'Fev', acessos: 3500, conversoes: 1000, investimento: 1800 },
    { name: 'Mar', acessos: 5000, conversoes: 1500, investimento: 2200 },
    { name: 'Abr', acessos: 4200, conversoes: 1300, investimento: 2100 },
    { name: 'Mai', acessos: 4800, conversoes: 1600, investimento: 2400 },
    { name: 'Jun', acessos: 5500, conversoes: 1800, investimento: 2700 },
  ];

  const leadSourceData = [
    { name: 'Google Ads', value: 400, color: '#2563eb' },
    { name: 'Facebook', value: 300, color: '#8b5cf6' },
    { name: 'Orgânico', value: 300, color: '#06b6d4' },
    { name: 'Email', value: 200, color: '#10b981' }
  ];

  const campaignData = [
    { name: 'Campanha de Verão', status: 'Ativa', leads: 245, conversao: '12%', investimento: 'R$ 2.500', roi: '+32%' },
    { name: 'Black Friday', status: 'Planejada', leads: 0, conversao: '0%', investimento: 'R$ 5.000', roi: 'N/A' },
    { name: 'Lançamento Produto X', status: 'Ativa', leads: 187, conversao: '8%', investimento: 'R$ 1.800', roi: '+15%' },
    { name: 'Webinar Mensal', status: 'Finalizada', leads: 120, conversao: '22%', investimento: 'R$ 800', roi: '+45%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800';
      case 'Planejada': return 'bg-blue-100 text-blue-800';
      case 'Finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoiColor = (roi: string) => {
    if (roi.startsWith('+')) return 'text-green-600';
    if (roi.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-600">Visão geral das suas estratégias de marketing</p>
        </div>
        <Button className="bg-crm-primary hover:bg-crm-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
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
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +3 novas esta semana
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              -2.3% desde o mês passado
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Marketing Performance Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Performance de Marketing
                </CardTitle>
                <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={marketingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="acessos" stroke="#2563eb" name="Acessos" />
                    <Line type="monotone" dataKey="conversoes" stroke="#10b981" name="Conversões" />
                    <Line type="monotone" dataKey="investimento" stroke="#8b5cf6" name="Investimento (R$)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

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
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Campanhas de Marketing</CardTitle>
              <CardDescription>Visão geral de todas as campanhas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-medium">Nome</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Leads</th>
                      <th className="pb-3 font-medium">Conversão</th>
                      <th className="pb-3 font-medium">Investimento</th>
                      <th className="pb-3 font-medium">ROI</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignData.map((campaign, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{campaign.name}</td>
                        <td className="py-4">
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="py-4">{campaign.leads}</td>
                        <td className="py-4">{campaign.conversao}</td>
                        <td className="py-4">{campaign.investimento}</td>
                        <td className={`py-4 ${getRoiColor(campaign.roi)}`}>{campaign.roi}</td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            Detalhes
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-blue-600" />
                    Website
                  </CardTitle>
                  <Badge>Alto impacto</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visitantes</span>
                    <span className="font-medium">12,543</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leads</span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversão</span>
                    <span className="font-medium text-green-600">9.9%</span>
                  </div>
                  <Progress value={75} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-indigo-600" />
                    Email
                  </CardTitle>
                  <Badge className="bg-amber-100 text-amber-800">Médio impacto</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enviados</span>
                    <span className="font-medium">25,432</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Abertos</span>
                    <span className="font-medium">8,541</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de abertura</span>
                    <span className="font-medium text-green-600">33.6%</span>
                  </div>
                  <Progress value={55} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-purple-600" />
                    Redes Sociais
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">Alto impacto</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seguidores</span>
                    <span className="font-medium">45,210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engajamento</span>
                    <span className="font-medium">12.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leads</span>
                    <span className="font-medium text-green-600">780</span>
                  </div>
                  <Progress value={83} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                    Mensagens
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">Nova</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">WhatsApp</span>
                    <span className="font-medium">32 conversas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instagram</span>
                    <span className="font-medium">18 conversas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Não lidas</span>
                    <span className="font-medium text-amber-600">5</span>
                  </div>
                  <Button variant="default" size="sm" className="w-full mt-2" asChild>
                    <a href="/marketing/mensagens">Acessar Mensagens</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Calendar */}
      <Card className="border-0 shadow-lg mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Próximos Eventos de Marketing
          </CardTitle>
          <CardDescription>Agenda dos próximos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center mr-4 font-semibold">
                15
                <span className="text-xs block -mb-1">Jun</span>
              </div>
              <div>
                <h4 className="font-medium">Webinar: Estratégias de SEO</h4>
                <p className="text-sm text-gray-600">14:00 - 15:30 • Virtual</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Detalhes
              </Button>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-lg flex items-center justify-center mr-4 font-semibold">
                22
                <span className="text-xs block -mb-1">Jun</span>
              </div>
              <div>
                <h4 className="font-medium">Lançamento da Campanha de Inverno</h4>
                <p className="text-sm text-gray-600">09:00 • Todas as plataformas</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Detalhes
              </Button>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 text-green-800 rounded-lg flex items-center justify-center mr-4 font-semibold">
                28
                <span className="text-xs block -mb-1">Jun</span>
              </div>
              <div>
                <h4 className="font-medium">Workshop de Conteúdo para Redes Sociais</h4>
                <p className="text-sm text-gray-600">13:00 - 17:00 • Presencial e Virtual</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                Detalhes
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-crm-primary">
              Ver agenda completa
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Marketing;
