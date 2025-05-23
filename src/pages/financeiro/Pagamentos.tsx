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
import { useFinanceFilters } from '@/hooks/use-finance-filters';
import { FinanceFilters } from '@/components/finance/finance-filters';
import { 
  Search,
  Plus,
  Filter,
  Download,
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  Edit,
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Receipt,
  AlertCircle,
  BarChart4,
  Share2
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { DonutChart } from '@tremor/react';

// Interface para os dados de pagamento
interface Pagamento {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  conta: string;
  tipo: 'entrada' | 'saida';
  status: 'pendente' | 'concluido' | 'atrasado' | 'cancelado';
  recorrente: boolean;
  anexo?: boolean;
  beneficiario?: string;
  observacao?: string;
  metodoPagamento?: string;
}

const Pagamentos = () => {  const [viewMode, setViewMode] = useState<'lista' | 'categoria'>('lista');
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState<Pagamento | null>(null);
  const [showDetalhes, setShowDetalhes] = useState(false);

  // Dados mockados de pagamentos
  const pagamentosData: Pagamento[] = [
    {
      id: 'PAG-2023-001',
      descricao: 'Aluguel do Escritório',
      valor: 3500.00,
      data: '2023-06-05',
      categoria: 'Instalações',
      conta: 'Conta Empresarial',
      tipo: 'saida',
      status: 'concluido',
      recorrente: true,
      beneficiario: 'Imobiliária Central',
      metodoPagamento: 'Transferência Bancária',
      observacao: 'Referente ao mês de junho de 2023'
    },
    {
      id: 'PAG-2023-002',
      descricao: 'Serviço de Consultoria Tech Solutions',
      valor: 4800.00,
      data: '2023-06-15',
      categoria: 'Serviços',
      conta: 'Conta Principal',
      tipo: 'entrada',
      status: 'pendente',
      recorrente: false,
      anexo: true
    },
    {
      id: 'PAG-2023-003',
      descricao: 'Fornecedor XYZ',
      valor: 1250.00,
      data: '2023-05-28',
      categoria: 'Insumos',
      conta: 'Conta Secundária',
      tipo: 'saida',
      status: 'concluido',
      recorrente: false,
      beneficiario: 'Suprimentos XYZ Ltda',
      metodoPagamento: 'Boleto Bancário',
      anexo: true
    },
    {
      id: 'PAG-2023-004',
      descricao: 'Pagamento Comércio Digital S.A.',
      valor: 7200.00,
      data: '2023-06-22',
      categoria: 'Serviços',
      conta: 'Conta Principal',
      tipo: 'entrada',
      status: 'pendente',
      recorrente: true
    },
    {
      id: 'PAG-2023-005',
      descricao: 'Internet e Telefonia',
      valor: 450.00,
      data: '2023-06-10',
      categoria: 'Utilidades',
      conta: 'Conta Empresarial',
      tipo: 'saida',
      status: 'pendente',
      recorrente: true,
      beneficiario: 'Telecom Brasil',
      metodoPagamento: 'Débito Automático'
    },
    {
      id: 'PAG-2023-006',
      descricao: 'Imposto Trimestral',
      valor: 5680.00,
      data: '2023-05-20',
      categoria: 'Impostos',
      conta: 'Conta Impostos',
      tipo: 'saida',
      status: 'atrasado',
      recorrente: false,
      beneficiario: 'Receita Federal',
      metodoPagamento: 'DARF',
      anexo: true
    },
    {
      id: 'PAG-2023-007',
      descricao: 'Consultoria Marketing Global',
      valor: 3500.00,
      data: '2023-06-25',
      categoria: 'Marketing',
      conta: 'Conta Principal',
      tipo: 'entrada',
      status: 'pendente',
      recorrente: false
    },
    {
      id: 'PAG-2023-008',
      descricao: 'Folha de Pagamento',
      valor: 18500.00,
      data: '2023-06-05',
      categoria: 'Salários',
      conta: 'Conta Empresarial',
      tipo: 'saida',
      status: 'concluido',
      recorrente: true,
      beneficiario: 'Funcionários',
      metodoPagamento: 'Transferência Bancária'
    }
  ];

  // Dados para o gráfico de categorias
  const categoriasData = [
    { nome: 'Instalações', valor: 3500 },
    { nome: 'Serviços', valor: 12000 },
    { nome: 'Insumos', valor: 1250 },
    { nome: 'Utilidades', valor: 450 },
    { nome: 'Impostos', valor: 5680 },
    { nome: 'Marketing', valor: 3500 },
    { nome: 'Salários', valor: 18500 },
  ];
  
  // Função para calcular totais
  const calcularTotais = () => {
    const todos = pagamentosData;
    const entradas = pagamentosData.filter(p => p.tipo === 'entrada');
    const saidas = pagamentosData.filter(p => p.tipo === 'saida');
    
    const totalEntradas = entradas.reduce((acc, p) => acc + p.valor, 0);
    const totalSaidas = saidas.reduce((acc, p) => acc + p.valor, 0);
    const saldo = totalEntradas - totalSaidas;
    
    return { 
      totalEntradas,
      totalSaidas,
      saldo,
      totalPendente: todos.filter(p => p.status === 'pendente').reduce((acc, p) => acc + p.valor, 0),
      countEntradas: entradas.length,
      countSaidas: saidas.length,
      countPendentes: todos.filter(p => p.status === 'pendente').length
    };
  };

  // Filtrar pagamentos conforme os filtros selecionados  // Extrair categorias e contas para usar nos filtros
  const categorias = Array.from(new Set(pagamentosData.map(p => p.categoria)));
  const contas = Array.from(new Set(pagamentosData.map(p => p.conta)));
  
  // Usar o hook de filtros financeiros
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    filteredData: pagamentosFiltrados,
    totalResults
  } = useFinanceFilters(pagamentosData);
  
  const totais = calcularTotais();

  // Funções auxiliares
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-amber-100 text-amber-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      case 'cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'entrada': return 'text-green-600';
      case 'saida': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'entrada': return <ArrowUpCircle className="h-4 w-4 text-green-500" />;
      case 'saida': return <ArrowDownCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluido': return <CheckCircle className="h-4 w-4 mr-1 text-green-600" />;
      case 'pendente': return <Clock className="h-4 w-4 mr-1 text-amber-600" />;
      case 'atrasado': return <AlertCircle className="h-4 w-4 mr-1 text-red-600" />;
      case 'cancelado': return <XCircle className="h-4 w-4 mr-1 text-gray-600" />;
      default: return null;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    const cores: Record<string, string> = {
      'Instalações': 'bg-blue-100 text-blue-800',
      'Serviços': 'bg-green-100 text-green-800',
      'Insumos': 'bg-amber-100 text-amber-800',
      'Utilidades': 'bg-cyan-100 text-cyan-800',
      'Impostos': 'bg-red-100 text-red-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'Salários': 'bg-indigo-100 text-indigo-800'
    };
    
    return cores[categoria] || 'bg-gray-100 text-gray-800';
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

  const abrirDetalhesPagamento = (pagamento: Pagamento) => {
    setPagamentoSelecionado(pagamento);
    setShowDetalhes(true);
  };

  // Dados para o gráfico de categorias de gastos
  const donutChartData = categoriasData.map(cat => ({
    name: cat.nome,
    valor: cat.valor
  }));

  // Função para exportar dados para CSV
  const exportarCSV = () => {
    import('@/utils/exportUtils').then(({ exportToCSV }) => {
      const dataFormatted = pagamentosData.map(pagamento => ({
        id: pagamento.id,
        descricao: pagamento.descricao,
        valor: pagamento.valor.toFixed(2).replace('.', ','),
        data: formatarData(pagamento.data),
        categoria: pagamento.categoria,
        conta: pagamento.conta,
        tipo: pagamento.tipo === 'entrada' ? 'Entrada' : 'Saída',
        status: pagamento.status === 'concluido' ? 'Concluído' : 
               pagamento.status === 'pendente' ? 'Pendente' : 
               pagamento.status === 'atrasado' ? 'Atrasado' : 'Cancelado',
        beneficiario: pagamento.beneficiario || '-',
        recorrente: pagamento.recorrente ? 'Sim' : 'Não'
      }));
      
      const headers = {
        id: 'ID',
        descricao: 'Descrição',
        valor: 'Valor (R$)',
        data: 'Data',
        categoria: 'Categoria',
        conta: 'Conta',
        tipo: 'Tipo',
        status: 'Status',
        beneficiario: 'Beneficiário',
        recorrente: 'Recorrente'
      };
      
      exportToCSV(dataFormatted, `pagamentos_${format(new Date(), 'yyyy-MM-dd')}`, headers);
    });
  };
  
  const valueFormatter = (number: number) => formatarValor(number);
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pagamentos</h1>
          <p className="text-gray-600">Controle suas entradas e saídas financeiras</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" asChild>
            <Link to="/financeiro">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/financeiro/faturamento">
              <FileText className="mr-2 h-4 w-4" />
              Faturamento
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/financeiro/agenda">
              <Calendar className="mr-2 h-4 w-4" />
              Agenda
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-crm-primary hover:bg-crm-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Pagamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Novo Pagamento</DialogTitle>
                <DialogDescription>
                  Registre uma nova entrada ou saída de recursos.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <Tabs defaultValue="saida" className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="entrada" className="flex items-center">
                      <ArrowUpCircle className="h-4 w-4 mr-2 text-green-500" />
                      Entrada
                    </TabsTrigger>
                    <TabsTrigger value="saida" className="flex items-center">
                      <ArrowDownCircle className="h-4 w-4 mr-2 text-red-500" />
                      Saída
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="entrada" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="descricao-entrada">Descrição</Label>
                        <Input id="descricao-entrada" placeholder="Descrição da receita" />
                      </div>
                      <div>
                        <Label htmlFor="valor-entrada">Valor</Label>
                        <Input id="valor-entrada" placeholder="0,00" type="number" step="0.01" />
                      </div>
                      <div>
                        <Label htmlFor="data-entrada">Data</Label>
                        <Input id="data-entrada" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="categoria-entrada">Categoria</Label>
                        <Select>
                          <SelectTrigger id="categoria-entrada">
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="servicos">Serviços</SelectItem>
                            <SelectItem value="vendas">Vendas</SelectItem>
                            <SelectItem value="comissoes">Comissões</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="conta-entrada">Conta</Label>
                        <Select>
                          <SelectTrigger id="conta-entrada">
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principal">Conta Principal</SelectItem>
                            <SelectItem value="secundaria">Conta Secundária</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="observacao-entrada">Observação</Label>
                        <Textarea id="observacao-entrada" placeholder="Detalhes adicionais" />
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <input type="checkbox" id="recorrente-entrada" />
                        <Label htmlFor="recorrente-entrada">Receita recorrente</Label>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="saida" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="descricao-saida">Descrição</Label>
                        <Input id="descricao-saida" placeholder="Descrição da despesa" />
                      </div>
                      <div>
                        <Label htmlFor="valor-saida">Valor</Label>
                        <Input id="valor-saida" placeholder="0,00" type="number" step="0.01" />
                      </div>
                      <div>
                        <Label htmlFor="data-saida">Data</Label>
                        <Input id="data-saida" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="categoria-saida">Categoria</Label>
                        <Select>
                          <SelectTrigger id="categoria-saida">
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instalacoes">Instalações</SelectItem>
                            <SelectItem value="utilidades">Utilidades</SelectItem>
                            <SelectItem value="salarios">Salários</SelectItem>
                            <SelectItem value="impostos">Impostos</SelectItem>
                            <SelectItem value="insumos">Insumos</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="conta-saida">Conta</Label>
                        <Select>
                          <SelectTrigger id="conta-saida">
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="principal">Conta Principal</SelectItem>
                            <SelectItem value="empresarial">Conta Empresarial</SelectItem>
                            <SelectItem value="impostos">Conta Impostos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="beneficiario">Beneficiário</Label>
                        <Input id="beneficiario" placeholder="Nome do beneficiário" />
                      </div>
                      <div>
                        <Label htmlFor="metodo">Método de Pagamento</Label>
                        <Select>
                          <SelectTrigger id="metodo">
                            <SelectValue placeholder="Selecionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                            <SelectItem value="boleto">Boleto</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                            <SelectItem value="debito">Débito Automático</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="observacao-saida">Observação</Label>
                        <Textarea id="observacao-saida" placeholder="Detalhes adicionais" />
                      </div>
                      <div className="col-span-2 flex items-center space-x-2">
                        <input type="checkbox" id="recorrente-saida" />
                        <Label htmlFor="recorrente-saida">Despesa recorrente</Label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-crm-primary hover:bg-crm-primary/90">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" onClick={exportarCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {formatarValor(totais.totalEntradas)}
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <ArrowUpCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totais.countEntradas} transações
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-red-600">
                {formatarValor(totais.totalSaidas)}
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <ArrowDownCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totais.countSaidas} transações
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-2xl font-bold ${totais.saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatarValor(totais.saldo)}
              </div>
              <div className={`w-10 h-10 rounded-full ${totais.saldo >= 0 ? 'bg-blue-100' : 'bg-red-100'} flex items-center justify-center`}>
                <BarChart4 className={`h-6 w-6 ${totais.saldo >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Balanço atual
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-amber-600">
                {formatarValor(totais.totalPendente)}
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {totais.countPendentes} transações pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Abas de Visualização */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Pagamentos</CardTitle>
              <CardDescription>
                {pagamentosFiltrados.length} transações | Período: Junho/2023
              </CardDescription>
            </div>            <div className="flex flex-wrap items-center gap-2">
              <FinanceFilters
                filters={filters}
                onUpdateFilters={updateFilters}
                onResetFilters={resetFilters}
                totalFiltered={pagamentosFiltrados.length !== pagamentosData.length}
                totalResults={totalResults}
                categorias={categorias}
                contas={contas}
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
                  variant={viewMode === 'categoria' ? "default" : "outline"} 
                  size="icon"
                  onClick={() => setViewMode('categoria')}
                >
                  <BarChart4 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {viewMode === 'lista' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left font-medium py-3">ID</th>
                    <th className="text-left font-medium py-3">Descrição</th>
                    <th className="text-left font-medium py-3">
                      <div className="flex items-center">
                        Valor
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left font-medium py-3">
                      <div className="flex items-center">
                        Data
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="text-left font-medium py-3">Categoria</th>
                    <th className="text-left font-medium py-3">Status</th>
                    <th className="text-left font-medium py-3">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentosFiltrados.map((pagamento) => (
                    <tr key={pagamento.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 pl-1">
                        <div className="flex items-center">
                          {getTipoIcon(pagamento.tipo)}
                          <span className="ml-2">{pagamento.id}</span>
                        </div>
                      </td>
                      <td className="py-4 max-w-[250px] truncate">
                        <div>
                          <div className="font-medium">{pagamento.descricao}</div>
                          <div className="text-gray-500 text-xs">{pagamento.conta}</div>
                        </div>
                      </td>
                      <td className={`py-4 font-medium ${getTipoColor(pagamento.tipo)}`}>
                        {pagamento.tipo === 'entrada' ? '+' : '-'}{formatarValor(pagamento.valor)}
                      </td>
                      <td className="py-4">{formatarData(pagamento.data)}</td>
                      <td className="py-4">
                        <Badge className={getCategoriaColor(pagamento.categoria)}>
                          {pagamento.categoria}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Badge className={getStatusColor(pagamento.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(pagamento.status)}
                            {pagamento.status === 'concluido' ? 'Concluído' : 
                             pagamento.status === 'pendente' ? 'Pendente' : 
                             pagamento.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => abrirDetalhesPagamento(pagamento)}>
                            <Eye className="h-4 w-4 mr-1" /> 
                            Ver
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
                              {pagamento.status === 'pendente' && (
                                <DropdownMenuItem>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  <span>Marcar como Concluído</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              {pagamento.anexo && (
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Baixar Anexo</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Receipt className="mr-2 h-4 w-4" />
                                <span>Gerar Comprovante</span>
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
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Categoria */}
              <Card className="border shadow">
                <CardHeader>
                  <CardTitle className="text-base">Distribuição por Categorias</CardTitle>
                  <CardDescription>Saídas por categoria no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <DonutChart
                      data={donutChartData}
                      category="valor"
                      index="name"
                      valueFormatter={valueFormatter}
                      colors={["indigo", "violet", "fuchsia", "sky", "emerald", "amber", "blue"]}
                      className="mt-4 h-80"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Detalhamento por Categorias */}
              <div>
                <h3 className="text-base font-medium mb-4">Detalhamento por Categoria</h3>
                <div className="space-y-4">
                  {categoriasData.map((categoria) => (
                    <Card key={categoria.nome} className="shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge className={getCategoriaColor(categoria.nome)}>
                              {categoria.nome}
                            </Badge>
                            <span className="ml-4 font-medium">{formatarValor(categoria.valor)}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round(categoria.valor / totais.totalSaidas * 100)}% do total
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="mt-8">
                    <Button variant="outline" className="w-full">
                      Ver relatório detalhado
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {viewMode === 'lista' && (
          <CardFooter className="border-t pt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando {pagamentosFiltrados.length} de {pagamentosData.length} registros
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
          </CardFooter>
        )}
      </Card>

      {/* Dialog de Detalhes do Pagamento */}
      <Dialog open={showDetalhes} onOpenChange={setShowDetalhes}>
        <DialogContent className="max-w-3xl">
          {pagamentoSelecionado && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl flex items-center">
                    <Receipt className="mr-2 h-5 w-5" />
                    Detalhes do Pagamento
                  </DialogTitle>
                  <Badge className={getStatusColor(pagamentoSelecionado.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(pagamentoSelecionado.status)}
                      {pagamentoSelecionado.status === 'concluido' ? 'Concluído' : 
                      pagamentoSelecionado.status === 'pendente' ? 'Pendente' : 
                      pagamentoSelecionado.status === 'atrasado' ? 'Atrasado' : 'Cancelado'}
                    </div>
                  </Badge>
                </div>
                <DialogDescription>
                  {pagamentoSelecionado.id} - {pagamentoSelecionado.descricao}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Informações Gerais</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tipo:</span>
                        <span className={getTipoColor(pagamentoSelecionado.tipo)}>
                          {pagamentoSelecionado.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Valor:</span>
                        <span className={`font-medium ${getTipoColor(pagamentoSelecionado.tipo)}`}>
                          {formatarValor(pagamentoSelecionado.valor)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Data:</span>
                        <span>{formatarData(pagamentoSelecionado.data)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Conta:</span>
                        <span>{pagamentoSelecionado.conta}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Categoria:</span>
                        <Badge className={getCategoriaColor(pagamentoSelecionado.categoria)}>
                          {pagamentoSelecionado.categoria}
                        </Badge>
                      </div>
                      {pagamentoSelecionado.recorrente && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tipo:</span>
                          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                            Recorrente
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Informações Adicionais</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {pagamentoSelecionado.beneficiario && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Beneficiário:</span>
                          <span>{pagamentoSelecionado.beneficiario}</span>
                        </div>
                      )}
                      {pagamentoSelecionado.metodoPagamento && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Método de Pagamento:</span>
                          <span>{pagamentoSelecionado.metodoPagamento}</span>
                        </div>
                      )}
                      {pagamentoSelecionado.observacao && (
                        <div className="text-sm">
                          <span className="text-gray-600">Observação:</span>
                          <p className="mt-1 text-gray-700">{pagamentoSelecionado.observacao}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Histórico</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex">
                          <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">Registro criado</p>
                              <span className="text-xs text-gray-500">{formatarData(pagamentoSelecionado.data)}</span>
                            </div>
                            <p className="text-xs text-gray-500">Pagamento registrado no sistema</p>
                          </div>
                        </div>
                        
                        {pagamentoSelecionado.status === 'concluido' && (
                          <div className="flex">
                            <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">Pagamento concluído</p>
                                <span className="text-xs text-gray-500">{formatarData(pagamentoSelecionado.data)}</span>
                              </div>
                              <p className="text-xs text-gray-500">Via {pagamentoSelecionado.metodoPagamento || 'método de pagamento não informado'}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {pagamentoSelecionado.anexo && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Anexos</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between p-2 bg-white border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-500" />
                            <span className="text-sm">Comprovante.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-4">
                    <Card className={`${pagamentoSelecionado.tipo === 'entrada' ? 'bg-green-50' : 'bg-red-50'} border-0`}>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          {pagamentoSelecionado.tipo === 'entrada' ? 
                            <ArrowUpCircle className="h-5 w-5 text-green-600 mr-3" /> : 
                            <ArrowDownCircle className="h-5 w-5 text-red-600 mr-3" />
                          }
                          <div>
                            <p className="text-sm font-medium">
                              {pagamentoSelecionado.tipo === 'entrada' ? 'Entrada' : 'Saída'} de recursos
                            </p>
                            <p className={`text-lg font-bold ${pagamentoSelecionado.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                              {formatarValor(pagamentoSelecionado.valor)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {pagamentoSelecionado.status === 'pendente' && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Marcar como Concluído
                    </Button>
                  )}

                  {pagamentoSelecionado.anexo ? (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Baixar Anexo
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      Adicionar Anexo
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Receipt className="h-4 w-4" />
                    Gerar Comprovante
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
                
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                  
                  <Button size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    Editar
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

export default Pagamentos;
