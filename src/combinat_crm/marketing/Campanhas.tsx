import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Megaphone,
  Target,
  Users,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share2,
  Eye,
  Pause,
  Play,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, BarChart, Bar } from 'recharts';

// Interface para os dados de campanha
interface Campaign {
  id: string;
  name: string;
  status: 'ativa' | 'pausada' | 'planejada' | 'finalizada';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  roi: string;
  channels: string[];
  tags: string[];
  description?: string;
}

// Cores para os status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'ativa':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pausada':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'planejada':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'finalizada':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Converter status para texto em português
const getStatusText = (status: string) => {
  switch (status) {
    case 'ativa': return 'Ativa';
    case 'pausada': return 'Pausada';
    case 'planejada': return 'Planejada';
    case 'finalizada': return 'Finalizada';
    default: return 'Desconhecido';
  }
};

// Componente principal
const Campanhas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Dados mockados para as campanhas
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Campanha de Verão 2025',
      status: 'ativa',
      startDate: '2025-05-15',
      endDate: '2025-08-31',
      budget: 15000,
      spent: 5200,
      leads: 245,
      conversions: 32,
      roi: '+32%',
      channels: ['facebook', 'instagram', 'google'],
      tags: ['verão', 'promoção', 'sazonal'],
      description: 'Campanha promocional para produtos de verão com foco em redes sociais e busca paga.'
    },
    {
      id: '2',
      name: 'Black Friday 2025',
      status: 'planejada',
      startDate: '2025-11-15',
      endDate: '2025-11-30',
      budget: 25000,
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 'N/A',
      channels: ['facebook', 'email', 'google', 'instagram'],
      tags: ['black friday', 'promoção', 'vendas'],
      description: 'Campanha especial para Black Friday com anúncios em todos os canais digitais e promoções exclusivas.'
    },
    {
      id: '3',
      name: 'Lançamento Produto X',
      status: 'ativa',
      startDate: '2025-05-01',
      endDate: '2025-06-30',
      budget: 18000,
      spent: 7500,
      leads: 187,
      conversions: 15,
      roi: '+15%',
      channels: ['facebook', 'linkedin', 'google'],
      tags: ['lançamento', 'produto novo'],
      description: 'Campanha de lançamento para o Produto X, focando em audiências qualificadas e conversão.'
    },
    {
      id: '4',
      name: 'Webinar Mensal - Maio/2025',
      status: 'finalizada',
      startDate: '2025-05-01',
      endDate: '2025-05-15',
      budget: 3000,
      spent: 3000,
      leads: 120,
      conversions: 28,
      roi: '+45%',
      channels: ['email', 'linkedin'],
      tags: ['webinar', 'educação', 'leads'],
      description: 'Webinar mensal sobre tendências do setor, focado em captação de leads qualificados.'
    },
    {
      id: '5',
      name: 'Remarketing - Clientes Inativos',
      status: 'pausada',
      startDate: '2025-04-15',
      endDate: '2025-07-15',
      budget: 10000,
      spent: 2700,
      leads: 63,
      conversions: 8,
      roi: '+5%',
      channels: ['facebook', 'google', 'email'],
      tags: ['remarketing', 'reativação', 'clientes'],
      description: 'Campanha de remarketing focada na reativação de clientes inativos há mais de 90 dias.'
    },
    {
      id: '6',
      name: 'Campanha de Outono 2025',
      status: 'planejada',
      startDate: '2025-08-15',
      endDate: '2025-10-31',
      budget: 12000,
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 'N/A',
      channels: ['instagram', 'facebook', 'google'],
      tags: ['outono', 'sazonal', 'coleção nova'],
      description: 'Campanha para a coleção de outono, com foco em redes sociais e anúncios display.'
    },
    {
      id: '7',
      name: 'Promoção de Aniversário',
      status: 'ativa',
      startDate: '2025-05-10',
      endDate: '2025-06-10',
      budget: 8000,
      spent: 3200,
      leads: 110,
      conversions: 22,
      roi: '+28%',
      channels: ['email', 'sms', 'facebook'],
      tags: ['aniversário', 'promoção', 'fidelização'],
      description: 'Promoção especial de aniversário da empresa para clientes fiéis.'
    }
  ]);

  // Filtrar campanhas com base na busca e filtro de status
  const filteredCampaigns = campaigns.filter(campaign => {
    const searchMatch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       campaign.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       campaign.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const statusMatch = statusFilter === 'all' || campaign.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  // Dados para os gráficos
  const performanceData = [
    { name: 'Jan', leads: 120, conversions: 24 },
    { name: 'Fev', leads: 150, conversions: 30 },
    { name: 'Mar', leads: 200, conversions: 45 },
    { name: 'Abr', leads: 180, conversions: 40 },
    { name: 'Mai', leads: 250, conversions: 55 },
  ];

  const channelPerformanceData = [
    { channel: 'Google Ads', leads: 450, conversions: 90, investimento: 5000 },
    { channel: 'Facebook', leads: 320, conversions: 48, investimento: 3500 },
    { channel: 'Instagram', leads: 280, conversions: 42, investimento: 3200 },
    { channel: 'LinkedIn', leads: 150, conversions: 30, investimento: 2500 },
    { channel: 'Email', leads: 180, conversions: 54, investimento: 1200 },
  ];

  const statusData = [
    { name: 'Ativas', value: campaigns.filter(c => c.status === 'ativa').length, color: '#10b981' },
    { name: 'Pausadas', value: campaigns.filter(c => c.status === 'pausada').length, color: '#f59e0b' },
    { name: 'Planejadas', value: campaigns.filter(c => c.status === 'planejada').length, color: '#3b82f6' },
    { name: 'Finalizadas', value: campaigns.filter(c => c.status === 'finalizada').length, color: '#6b7280' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campanhas</h1>
          <p className="text-gray-600">Gerencie suas campanhas de marketing</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-crm-primary hover:bg-crm-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nova Campanha
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Campanha</DialogTitle>
                <DialogDescription>
                  Configure os detalhes da sua nova campanha de marketing.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome da Campanha</Label>
                  <Input id="name" placeholder="Ex: Campanha de Verão 2025" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Data de Início</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">Data de Término</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Orçamento</Label>
                    <Input id="budget" placeholder="R$ 0,00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="planejada">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planejada">Planejada</SelectItem>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="pausada">Pausada</SelectItem>
                        <SelectItem value="finalizada">Finalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="channels">Canais</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Plus className="h-3 w-3 mr-1" /> Facebook
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Plus className="h-3 w-3 mr-1" /> Instagram
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Plus className="h-3 w-3 mr-1" /> Google Ads
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Plus className="h-3 w-3 mr-1" /> LinkedIn
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                      <Plus className="h-3 w-3 mr-1" /> Email
                    </Badge>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Detalhes sobre os objetivos e estratégias da campanha" 
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Separe as tags por vírgula (ex: verão, promoção)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Criar Campanha</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs para análise e listagem */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Lista de Campanhas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Buscar campanhas..." 
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <Select 
                defaultValue="all" 
                onValueChange={setStatusFilter}
                value={statusFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ativa">Ativas</SelectItem>
                  <SelectItem value="pausada">Pausadas</SelectItem>
                  <SelectItem value="planejada">Planejadas</SelectItem>
                  <SelectItem value="finalizada">Finalizadas</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <div className="flex gap-1">
                <Button 
                  variant={viewMode === 'card' ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode('card')}
                >
                  <i className="grid h-4 w-4 grid-cols-2 gap-1">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </i>
                </Button>
                <Button 
                  variant={viewMode === 'list' ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <i className="flex h-4 w-4 flex-col justify-between">
                    <div className="h-0.5 w-full bg-current rounded-sm"></div>
                    <div className="h-0.5 w-full bg-current rounded-sm"></div>
                    <div className="h-0.5 w-full bg-current rounded-sm"></div>
                  </i>
                </Button>
              </div>
            </div>
          </div>

          {/* Campaigns Display */}
          {viewMode === 'card' ? (
            // Card view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card 
                  key={campaign.id} 
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={getStatusColor(campaign.status)}>
                        {getStatusText(campaign.status)}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {campaign.status === 'ativa' ? (
                            <DropdownMenuItem>
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </DropdownMenuItem>
                          ) : campaign.status === 'pausada' ? (
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="line-clamp-2 mt-2">{campaign.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {new Date(campaign.startDate).toLocaleDateString('pt-BR')} até {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Orçamento</span>
                          <span>
                            {campaign.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / 
                            {campaign.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Leads</div>
                          <div className="font-medium">{campaign.leads}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Conversões</div>
                          <div className="font-medium">{campaign.conversions}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">ROI</div>
                          <div className="font-medium">{campaign.roi}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {campaign.channels.map((channel, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // List view
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-4 text-left">Nome</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Período</th>
                        <th className="py-3 px-4 text-left">Orçamento</th>
                        <th className="py-3 px-4 text-left">Leads</th>
                        <th className="py-3 px-4 text-left">ROI</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCampaigns.map((campaign) => (
                        <tr 
                          key={campaign.id} 
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          <td className="py-3 px-4">{campaign.name}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={getStatusColor(campaign.status)}>
                              {getStatusText(campaign.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              {campaign.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / 
                              {campaign.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1.5 mt-1" />
                          </td>
                          <td className="py-3 px-4">{campaign.leads}</td>
                          <td className="py-3 px-4">{campaign.roi}</td>
                          <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedCampaign(campaign)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {campaign.status === 'ativa' ? (
                                  <DropdownMenuItem>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Pausar
                                  </DropdownMenuItem>
                                ) : campaign.status === 'pausada' ? (
                                  <DropdownMenuItem>
                                    <Play className="h-4 w-4 mr-2" />
                                    Ativar
                                  </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t">
                <div className="text-sm text-gray-500">
                  Mostrando {filteredCampaigns.length} de {campaigns.length} campanhas
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
                  <Megaphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{campaigns.filter(c => c.status === 'ativa').length}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +2 desde o mês passado
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Totais</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.leads, 0).toLocaleString()}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +15.3% desde o mês passado
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">13.2%</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +1.8% desde o mês passado
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.spent, 0)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                    -5.2% desde o mês passado
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Performance de Campanhas
                  </CardTitle>
                  <CardDescription>Leads e conversões nos últimos 5 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                      <Bar dataKey="conversions" fill="#10b981" name="Conversões" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Campaign Status */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Status das Campanhas</CardTitle>
                  <CardDescription>Distribuição por status atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-80 items-center justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Channel Performance Table */}
              <Card className="border-0 shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle>Performance por Canal</CardTitle>
                  <CardDescription>Comparativo dos principais canais de marketing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 font-medium text-left">Canal</th>
                          <th className="pb-3 font-medium text-center">Leads</th>
                          <th className="pb-3 font-medium text-center">Conversões</th>
                          <th className="pb-3 font-medium text-center">Taxa de Conversão</th>
                          <th className="pb-3 font-medium text-center">Custo por Lead</th>
                          <th className="pb-3 font-medium text-center">Investimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {channelPerformanceData.map((channel, index) => {
                          const conversionRate = ((channel.conversions / channel.leads) * 100).toFixed(1);
                          const costPerLead = (channel.investimento / channel.leads).toFixed(2);
                          
                          return (
                            <tr key={index} className="border-b">
                              <td className="py-4">{channel.channel}</td>
                              <td className="py-4 text-center">{channel.leads}</td>
                              <td className="py-4 text-center">{channel.conversions}</td>
                              <td className="py-4 text-center">{conversionRate}%</td>
                              <td className="py-4 text-center">
                                {Number(costPerLead).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </td>
                              <td className="py-4 text-center">
                                {channel.investimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Campaign Details Dialog */}
      <Dialog 
        open={selectedCampaign !== null} 
        onOpenChange={(open) => !open && setSelectedCampaign(null)}
      >
        <DialogContent className="sm:max-w-[650px]">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(selectedCampaign.status)}>
                    {getStatusText(selectedCampaign.status)}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <DialogTitle className="mt-2">{selectedCampaign.name}</DialogTitle>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {new Date(selectedCampaign.startDate).toLocaleDateString('pt-BR')} até {new Date(selectedCampaign.endDate).toLocaleDateString('pt-BR')}
                </div>
              </DialogHeader>
              
              <div className="py-4">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="budget">Orçamento</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Descrição:</h4>
                        <p className="text-sm text-gray-600">{selectedCampaign.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Canais:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCampaign.channels.map((channel, index) => (
                            <Badge key={index} variant="secondary" className="text-xs capitalize">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedCampaign.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Leads</div>
                          <div className="text-2xl">{selectedCampaign.leads}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Conversões</div>
                          <div className="text-2xl">{selectedCampaign.conversions}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Taxa de Conversão</div>
                          <div className="text-2xl">
                            {selectedCampaign.leads > 0 
                              ? ((selectedCampaign.conversions / selectedCampaign.leads) * 100).toFixed(1) + '%' 
                              : '0%'}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">ROI</div>
                          <div className="text-2xl">{selectedCampaign.roi}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="pt-4">
                    <div className="text-center text-sm text-gray-500 py-8">
                      Gráficos detalhados de performance em desenvolvimento.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="budget" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Orçamento utilizado</span>
                          <span>
                            {selectedCampaign.spent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} / 
                            {selectedCampaign.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                        </div>
                        <Progress 
                          value={(selectedCampaign.spent / selectedCampaign.budget) * 100} 
                          className="h-2" 
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.round((selectedCampaign.spent / selectedCampaign.budget) * 100)}% utilizado
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Custo por Lead</div>
                          <div className="text-lg">
                            {selectedCampaign.leads > 0 
                              ? (selectedCampaign.spent / selectedCampaign.leads).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                              : 'N/A'}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Custo por Conversão</div>
                          <div className="text-lg">
                            {selectedCampaign.conversions > 0 
                              ? (selectedCampaign.spent / selectedCampaign.conversions).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                              : 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="text-sm font-medium mb-2">Distribuição de Orçamento por Canal</div>
                        <div className="text-center text-sm text-gray-500 py-4">
                          Detalhamento de gastos por canal em desenvolvimento.
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.status === 'ativa' ? (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pause className="h-4 w-4" />
                      Pausar
                    </Button>
                  ) : selectedCampaign.status === 'pausada' ? (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Play className="h-4 w-4" />
                      Ativar
                    </Button>
                  ) : null}
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Clock className="h-4 w-4" />
                    Histórico
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Configurações
                  </Button>
                  
                  <Button size="sm" className="gap-1 ml-auto">
                    Analisar Performance
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campanhas;
