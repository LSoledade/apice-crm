import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useFinanceFilters } from '@/hooks/use-finance-filters';
import { FinanceFilters } from '@/components/finance/finance-filters';
import {
  Search,
  Plus,
  Filter,
  SlidersHorizontal,
  Download,
  FileText,
  MoreHorizontal,
  Edit,
  Trash2,
  Calendar,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  AlarmClock,
  FileBarChart,
  Send,
  ArrowRight,
  Share2
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Interface para os dados de faturamento
interface Fatura {
  id: string;
  cliente: {
    nome: string;
    email: string;
    avatar?: string;
  };
  valor: number;
  dataEmissao: string;
  dataVencimento: string;
  status: 'pago' | 'pendente' | 'atrasado' | 'cancelado';
  metodo: string;
  recorrente: boolean;
  items?: {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }[];
}

const Faturamento = () => {
  const [faturaAtual, setFaturaAtual] = useState<Fatura | null>(null);
  const [viewMode, setViewMode] = useState<'lista' | 'detalhes' | 'cards'>('lista');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [faturaSelecionada, setFaturaSelecionada] = useState<Fatura | null>(null);
  const [showDetalhes, setShowDetalhes] = useState(false);
  // Dados mockados de faturas
  const faturasData: Fatura[] = [
    { 
      id: 'FAT-2023-001', 
      cliente: { 
        nome: 'Tech Solutions Ltda.', 
        email: 'contato@techsolutions.com',
        avatar: 'TS'
      }, 
      valor: 4800.00, 
      dataEmissao: '2023-05-15', 
      dataVencimento: '2023-06-15', 
      status: 'pago',
      metodo: 'Transferência Bancária',
      recorrente: true,
      items: [
        { descricao: 'Consultoria em Marketing Digital', quantidade: 1, valorUnitario: 3200.00 },
        { descricao: 'Otimização de SEO', quantidade: 1, valorUnitario: 1600.00 }
      ]
    },
    { 
      id: 'FAT-2023-002', 
      cliente: { 
        nome: 'Comércio Digital S.A.', 
        email: 'financeiro@comerciodigital.com',
        avatar: 'CD'
      }, 
      valor: 7200.00, 
      dataEmissao: '2023-05-22', 
      dataVencimento: '2023-06-22', 
      status: 'pendente',
      metodo: 'Boleto Bancário',
      recorrente: false,
      items: [
        { descricao: 'Implementação de E-commerce', quantidade: 1, valorUnitario: 5200.00 },
        { descricao: 'Integração de API de Pagamentos', quantidade: 1, valorUnitario: 2000.00 }
      ]
    },
    { 
      id: 'FAT-2023-003', 
      cliente: { 
        nome: 'Marketing Global', 
        email: 'contabilidade@marketingglobal.com',
        avatar: 'MG'
      }, 
      valor: 3500.00, 
      dataEmissao: '2023-05-25', 
      dataVencimento: '2023-06-25', 
      status: 'atrasado',
      metodo: 'Cartão de Crédito',
      recorrente: true,
      items: [
        { descricao: 'Gestão de Mídias Sociais', quantidade: 1, valorUnitario: 2500.00 },
        { descricao: 'Relatórios de Performance', quantidade: 1, valorUnitario: 1000.00 }
      ]
    },
    { 
      id: 'FAT-2023-004', 
      cliente: { 
        nome: 'Consultoria JKL', 
        email: 'pagamentos@jkl.com',
        avatar: 'JKL'
      }, 
      valor: 9600.00, 
      dataEmissao: '2023-06-01', 
      dataVencimento: '2023-07-01', 
      status: 'pendente',
      metodo: 'PIX',
      recorrente: false,
      items: [
        { descricao: 'Consultoria Estratégica', quantidade: 1, valorUnitario: 8000.00 },
        { descricao: 'Workshop de Vendas', quantidade: 1, valorUnitario: 1600.00 }
      ]
    },
    { 
      id: 'FAT-2023-005', 
      cliente: { 
        nome: 'Indústrias XYZ', 
        email: 'financeiro@xyz.ind.br',
        avatar: 'XYZ'
      }, 
      valor: 12500.00, 
      dataEmissao: '2023-06-05', 
      dataVencimento: '2023-07-05', 
      status: 'pendente',
      metodo: 'Transferência Bancária',
      recorrente: true,
      items: [
        { descricao: 'Sistema de Automação Industrial', quantidade: 1, valorUnitario: 8500.00 },
        { descricao: 'Suporte Técnico (3 meses)', quantidade: 1, valorUnitario: 4000.00 }
      ]
    },
    { 
      id: 'FAT-2023-006', 
      cliente: { 
        nome: 'Rede de Farmácias ABC', 
        email: 'compras@farmaciasabc.com',
        avatar: 'ABC'
      }, 
      valor: 5800.00, 
      dataEmissao: '2023-06-08', 
      dataVencimento: '2023-07-08', 
      status: 'pago',
      metodo: 'PIX',
      recorrente: false,
      items: [
        { descricao: 'Sistema de Gestão de Estoque', quantidade: 1, valorUnitario: 4200.00 },
        { descricao: 'Treinamento de Equipe', quantidade: 1, valorUnitario: 1600.00 }
      ]
    },
  ];

  // Dados para os gráficos
  const faturamentoMensalData = [
    { name: 'Jan', valor: 38000 },
    { name: 'Fev', valor: 42000 },
    { name: 'Mar', valor: 37500 },
    { name: 'Abr', valor: 45000 },
    { name: 'Mai', valor: 43200 },
    { name: 'Jun', valor: 48000 },
  ];

  const statusDistribuicaoData = [
    { status: 'Pago', valor: 26400 },
    { status: 'Pendente', valor: 29300 },
    { status: 'Atrasado', valor: 3500 },
  ];
  
  // Extrair métodos de pagamento para usar nos filtros
  const metodosPagamento = Array.from(new Set(faturasData.map(f => f.metodo)));
  
  // Usar o hook de filtros financeiros
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    filteredData: faturasFiltradas,
    totalResults
  } = useFinanceFilters(faturasData);

  // Soma total do valor das faturas filtradas
  const totalFaturas = faturasFiltradas.reduce((sum, fatura) => sum + fatura.valor, 0);

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-amber-100 text-amber-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      case 'cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pago': return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />;
      case 'pendente': return <AlarmClock className="h-4 w-4 mr-1 text-amber-600" />;
      case 'atrasado': return <XCircle className="h-4 w-4 mr-1 text-red-600" />;
      case 'cancelado': return <XCircle className="h-4 w-4 mr-1 text-gray-600" />;
      default: return null;
    }
  };

  const formatarData = (dataString: string) => {
    try {
      return format(parseISO(dataString), "dd/MM/yyyy", { locale: pt });
    } catch {
      return dataString;
    }
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const abrirDetalhesFatura = (fatura: Fatura) => {
    setFaturaSelecionada(fatura);
    setShowDetalhes(true);
  };

  // Função para exportar dados para CSV
  const exportarCSV = () => {
    import('@/utils/exportUtils').then(({ exportToCSV }) => {
      const dataFormatted = faturasData.map(fatura => ({
        id: fatura.id,
        cliente: fatura.cliente.nome,
        email: fatura.cliente.email,
        valor: fatura.valor.toFixed(2).replace('.', ','),
        dataEmissao: formatarData(fatura.dataEmissao),
        dataVencimento: formatarData(fatura.dataVencimento),
        status: fatura.status === 'pago' ? 'Pago' : 
                fatura.status === 'pendente' ? 'Pendente' : 
                fatura.status === 'atrasado' ? 'Atrasado' : 'Cancelado',
        metodo: fatura.metodo,
        recorrente: fatura.recorrente ? 'Sim' : 'Não'
      }));
      
      const headers = {
        id: 'ID',
        cliente: 'Cliente',
        email: 'Email',
        valor: 'Valor (R$)',
        dataEmissao: 'Data Emissão',
        dataVencimento: 'Vencimento',
        status: 'Status',
        metodo: 'Método',
        recorrente: 'Recorrente'
      };
        exportToCSV(dataFormatted, `faturamento_${format(new Date(), 'yyyy-MM-dd')}`, headers);
    });
    // O link é criado dentro da função exportToCSV, então não precisamos manipulá-lo aqui
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faturamento</h1>
          <p className="text-gray-600">Gerencie suas faturas e recebimentos</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" asChild>
            <Link to="/financeiro">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/financeiro/pagamentos">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Pagamentos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/financeiro/agenda">
              <Calendar className="mr-2 h-4 w-4" />
              Agenda
            </Link>
          </Button>
          <Button className="bg-crm-primary hover:bg-crm-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nova Fatura
          </Button>
          <Button variant="outline" onClick={exportarCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Estatísticas e Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-3 border-0 shadow-lg">
          <CardContent className="pt-6">
            <Tabs defaultValue="mensal" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Visão Geral do Faturamento</h3>
                <TabsList>
                  <TabsTrigger value="mensal">Mensal</TabsTrigger>
                  <TabsTrigger value="trimestral">Trimestral</TabsTrigger>
                  <TabsTrigger value="anual">Anual</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="mensal" className="mt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={faturamentoMensalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => formatarValor(Number(value))} />
                    <Line type="monotone" dataKey="valor" stroke="#2563eb" name="Faturamento" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="trimestral" className="mt-0">
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  Dados trimestrais em desenvolvimento
                </div>
              </TabsContent>

              <TabsContent value="anual" className="mt-0">
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  Dados anuais em desenvolvimento
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Distribuição de Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={statusDistribuicaoData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="status" type="category" width={80} />
                <RechartsTooltip formatter={(value) => formatarValor(Number(value))} />
                <Bar dataKey="valor" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 bg-green-50 rounded-md">
                <div className="text-xs text-gray-500">Pagas</div>
                <div className="font-semibold text-green-600">2</div>
              </div>
              <div className="text-center p-2 bg-amber-50 rounded-md">
                <div className="text-xs text-gray-500">Pendentes</div>
                <div className="font-semibold text-amber-600">3</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-md">
                <div className="text-xs text-gray-500">Atrasadas</div>
                <div className="font-semibold text-red-600">1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Faturas */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Faturas</CardTitle>
              <CardDescription>
                Total: {faturasFiltradas.length} faturas | {formatarValor(totalFaturas)}
              </CardDescription>
            </div>            <div className="flex flex-wrap items-center gap-2">
              <FinanceFilters
                filters={filters}
                onUpdateFilters={updateFilters}
                onResetFilters={resetFilters}
                totalFiltered={faturasFiltradas.length !== faturasData.length}
                totalResults={totalResults}
                categorias={metodosPagamento}
                contas={[]}
              />

              <div className="flex gap-1">
                <Button 
                  variant={viewMode === 'lista' ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode('lista')}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'detalhes' ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode('detalhes')}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>        <CardContent>
          {viewMode === 'lista' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left font-medium py-3">Nº Fatura</th>
                    <th className="text-left font-medium py-3">Cliente</th>
                    <th className="text-left font-medium py-3">
                      <div className="flex items-center">
                        Valor
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left font-medium py-3">
                      <div className="flex items-center">
                        Emissão
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left font-medium py-3">
                      <div className="flex items-center">
                        Vencimento
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left font-medium py-3">Status</th>
                    <th className="text-left font-medium py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {faturasFiltradas.map((fatura) => (
                    <tr key={fatura.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">{fatura.id}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                            {fatura.cliente.avatar || fatura.cliente.nome.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{fatura.cliente.nome}</div>
                            <div className="text-gray-500 text-xs">{fatura.cliente.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-medium">{formatarValor(fatura.valor)}</td>
                      <td className="py-4">{formatarData(fatura.dataEmissao)}</td>
                      <td className="py-4">{formatarData(fatura.dataVencimento)}</td>
                      <td className="py-4">
                        <Badge className={getStatusColor(fatura.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(fatura.status)}
                            {fatura.status === 'pago' ? 'Pago' : 
                             fatura.status === 'pendente' ? 'Pendente' : 
                             fatura.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => abrirDetalhesFatura(fatura)}>
                            Visualizar
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Send className="mr-2 h-4 w-4" />
                                <span>Enviar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileBarChart className="mr-2 h-4 w-4" />
                                <span>Relatório</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>            </div>
          ) : viewMode === 'detalhes' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left font-medium py-3">Nº Fatura</th>
                    <th className="text-left font-medium py-3">Cliente</th>
                    <th className="text-left font-medium py-3">Valor</th>
                    <th className="text-left font-medium py-3">Emissão</th>
                    <th className="text-left font-medium py-3">Vencimento</th>
                    <th className="text-left font-medium py-3">Status</th>
                    <th className="text-left font-medium py-3">Método</th>
                    <th className="text-left font-medium py-3">Recorrente</th>
                    <th className="text-left font-medium py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {faturasFiltradas.map((fatura) => (
                    <tr key={fatura.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">{fatura.id}</td>
                      <td className="py-4">{fatura.cliente.nome}</td>
                      <td className="py-4 font-medium">{formatarValor(fatura.valor)}</td>
                      <td className="py-4">{formatarData(fatura.dataEmissao)}</td>
                      <td className="py-4">{formatarData(fatura.dataVencimento)}</td>
                      <td className="py-4">
                        <Badge className={getStatusColor(fatura.status)}>
                          {fatura.status === 'pago' ? 'Pago' : 
                          fatura.status === 'pendente' ? 'Pendente' : 
                          fatura.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                        </Badge>
                      </td>
                      <td className="py-4">{fatura.metodo}</td>
                      <td className="py-4">{fatura.recorrente ? 'Sim' : 'Não'}</td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm" onClick={() => abrirDetalhesFatura(fatura)}>
                          Detalhes
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faturasFiltradas.map((fatura) => (
                <Card key={fatura.id} className="overflow-hidden">
                  <div className={`h-2 w-full ${fatura.status === 'pago' ? 'bg-green-500' : fatura.status === 'pendente' ? 'bg-amber-500' : 'bg-red-500'}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-base">{fatura.id}</CardTitle>
                        <CardDescription>{fatura.cliente.nome}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(fatura.status)}>
                        {fatura.status === 'pago' ? 'Pago' : 
                        fatura.status === 'pendente' ? 'Pendente' : 
                        fatura.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Valor:</span>
                        <span className="font-medium">{formatarValor(fatura.valor)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Emissão:</span>
                        <span>{formatarData(fatura.dataEmissao)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Vencimento:</span>
                        <span>{formatarData(fatura.dataVencimento)}</span>
                      </div>
                      {fatura.recorrente && (
                        <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                          Recorrente
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => abrirDetalhesFatura(fatura)}>
                      Detalhes
                    </Button>
                    <Button size="sm" className="bg-crm-primary hover:bg-crm-primary/90" onClick={() => abrirDetalhesFatura(fatura)}>
                      {fatura.status === 'pago' ? 'Comprovante' : 'Registrar Pagamento'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando {faturasFiltradas.length} de {faturasData.length} faturas
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-crm-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes da Fatura */}
      <Dialog open={showDetalhes} onOpenChange={setShowDetalhes}>
        <DialogContent className="max-w-3xl">
          {faturaSelecionada && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Fatura {faturaSelecionada.id}
                  </DialogTitle>
                  <Badge className={getStatusColor(faturaSelecionada.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(faturaSelecionada.status)}
                      {faturaSelecionada.status === 'pago' ? 'Pago' : 
                      faturaSelecionada.status === 'pendente' ? 'Pendente' : 
                      faturaSelecionada.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                    </div>
                  </Badge>
                </div>
                <DialogDescription>
                  Detalhes completos da fatura
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-6 p-1">
                  {/* Informações da Fatura */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Informações do Cliente</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                            {faturaSelecionada.cliente.avatar || faturaSelecionada.cliente.nome.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{faturaSelecionada.cliente.nome}</div>
                            <div className="text-gray-500 text-sm">{faturaSelecionada.cliente.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Detalhes do Pagamento</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Método:</span>
                          <span>{faturaSelecionada.metodo}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Data de Emissão:</span>
                          <span>{formatarData(faturaSelecionada.dataEmissao)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Data de Vencimento:</span>
                          <span>{formatarData(faturaSelecionada.dataVencimento)}</span>
                        </div>
                        {faturaSelecionada.recorrente && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tipo de Cobrança:</span>
                            <span className="text-purple-600 font-medium">Recorrente</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Itens da Fatura */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Itens</h3>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left py-2 px-4 font-medium">Descrição</th>
                            <th className="text-right py-2 px-4 font-medium">Quantidade</th>
                            <th className="text-right py-2 px-4 font-medium">Valor Unitário</th>
                            <th className="text-right py-2 px-4 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faturaSelecionada.items?.map((item, index) => (
                            <tr key={index} className="border-t border-gray-200">
                              <td className="py-3 px-4">{item.descricao}</td>
                              <td className="py-3 px-4 text-right">{item.quantidade}</td>
                              <td className="py-3 px-4 text-right">{formatarValor(item.valorUnitario)}</td>
                              <td className="py-3 px-4 text-right font-medium">{formatarValor(item.quantidade * item.valorUnitario)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-100 font-medium">
                          <tr>
                            <td colSpan={3} className="py-3 px-4 text-right">Total</td>
                            <td className="py-3 px-4 text-right">{formatarValor(faturaSelecionada.valor)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  
                  {/* Histórico e Observações */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Histórico</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Fatura criada</p>
                              <span className="text-xs text-gray-500">{formatarData(faturaSelecionada.dataEmissao)}</span>
                            </div>
                            <p className="text-xs text-gray-500">Fatura gerada no sistema</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Fatura enviada</p>
                              <span className="text-xs text-gray-500">{formatarData(faturaSelecionada.dataEmissao)}</span>
                            </div>
                            <p className="text-xs text-gray-500">Enviada por email para {faturaSelecionada.cliente.email}</p>
                          </div>
                        </div>

                        {faturaSelecionada.status === 'pago' && (
                          <div className="flex">
                            <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">Pagamento recebido</p>
                                <span className="text-xs text-gray-500">{formatarData(faturaSelecionada.dataVencimento)}</span>
                              </div>
                              <p className="text-xs text-gray-500">Pagamento via {faturaSelecionada.metodo}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {faturaSelecionada.status === 'pendente' || faturaSelecionada.status === 'atrasado' ? (
                    <Button variant="outline" size="sm" className="gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Marcar como Pago
                    </Button>
                  ) : null}

                  <Button variant="outline" size="sm" className="gap-1">
                    <Send className="h-4 w-4" />
                    Enviar por Email
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Baixar PDF
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </div>
                
                <Button size="sm" className="ml-auto gap-1">
                  <Edit className="h-4 w-4" />
                  Editar Fatura
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Faturamento;
