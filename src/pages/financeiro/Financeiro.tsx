import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  DollarSign,
  CreditCard,
  ArrowUpDown,
  FileText,
  AlertCircle,
  Clock,
  PiggyBank
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Financeiro = () => {
  // Dados mockados para os gráficos
  const fluxoCaixaData = [
    { name: 'Jan', entrada: 42000, saida: 24500, saldo: 17500 },
    { name: 'Fev', entrada: 38000, saida: 27800, saldo: 10200 },
    { name: 'Mar', entrada: 49000, saida: 32000, saldo: 17000 },
    { name: 'Abr', entrada: 45000, saida: 29800, saldo: 15200 },
    { name: 'Mai', entrada: 52000, saida: 34500, saldo: 17500 },
    { name: 'Jun', entrada: 54000, saida: 36000, saldo: 18000 },
  ];

  const categoriasGastoData = [
    { name: 'Marketing', value: 25000, color: '#2563eb' },
    { name: 'Folha', value: 42000, color: '#8b5cf6' },
    { name: 'Operacional', value: 18500, color: '#06b6d4' },
    { name: 'Impostos', value: 15500, color: '#10b981' }
  ];

  const faturasRecentes = [
    { id: 'INV-2023-001', cliente: 'Tech Solutions Ltda.', valor: 'R$ 4.800,00', emissao: '15/05/2023', vencimento: '15/06/2023', status: 'pago' },
    { id: 'INV-2023-002', cliente: 'Comércio Digital S.A.', valor: 'R$ 7.200,00', emissao: '22/05/2023', vencimento: '22/06/2023', status: 'pendente' },
    { id: 'INV-2023-003', cliente: 'Marketing Global', valor: 'R$ 3.500,00', emissao: '25/05/2023', vencimento: '25/06/2023', status: 'atrasado' },
    { id: 'INV-2023-004', cliente: 'Consultoria JKL', valor: 'R$ 9.600,00', emissao: '01/06/2023', vencimento: '01/07/2023', status: 'pendente' },
  ];

  const pagamentosAgendados = [
    { descricao: 'Folha de Pagamento', valor: 'R$ 18.500,00', data: '05/06/2023', tipo: 'despesa', categoria: 'Folha' },
    { descricao: 'Aluguel Escritório', valor: 'R$ 4.200,00', data: '10/06/2023', tipo: 'despesa', categoria: 'Operacional' },
    { descricao: 'Serviços de Marketing', valor: 'R$ 5.300,00', data: '12/06/2023', tipo: 'despesa', categoria: 'Marketing' },
    { descricao: 'Imposto X', valor: 'R$ 7.850,00', data: '20/06/2023', tipo: 'despesa', categoria: 'Impostos' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-amber-100 text-amber-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoTransacaoColor = (tipo: string) => {
    switch (tipo) {
      case 'receita': return 'text-green-600';
      case 'despesa': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Folha': return 'bg-purple-100 text-purple-800';
      case 'Marketing': return 'bg-blue-100 text-blue-800';
      case 'Operacional': return 'bg-cyan-100 text-cyan-800';
      case 'Impostos': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financeiro</h1>
          <p className="text-gray-600">Gestão financeira da sua empresa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/financeiro/faturamento">
              <FileText className="mr-2 h-4 w-4" />
              Faturamento
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
            Nova Transação
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 54.000,00</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +12.3% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Mensais</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 36.000,00</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-red-500" />
              +8.1% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucratividade</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33.3%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +1.2% desde o mês passado
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contas a Receber</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 28.500,00</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              -4.3% desde o mês passado
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="faturas">Faturas</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fluxo de Caixa Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Fluxo de Caixa
                </CardTitle>
                <CardDescription>Comparativo dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={fluxoCaixaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    <Line type="monotone" dataKey="entrada" stroke="#2563eb" name="Entradas" />
                    <Line type="monotone" dataKey="saida" stroke="#ef4444" name="Saídas" />
                    <Line type="monotone" dataKey="saldo" stroke="#10b981" name="Saldo" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Categorias de Gastos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Categorias de Gastos</CardTitle>
                <CardDescription>Distribuição por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoriasGastoData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoriasGastoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Últimas Faturas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Últimas Faturas
                </CardTitle>
                <CardDescription>Faturas recentes emitidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-3 font-medium">ID</th>
                        <th className="text-left pb-3 font-medium">Cliente</th>
                        <th className="text-left pb-3 font-medium">Valor</th>
                        <th className="text-left pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faturasRecentes.map((fatura, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{fatura.id}</td>
                          <td className="py-3">{fatura.cliente}</td>
                          <td className="py-3">{fatura.valor}</td>
                          <td className="py-3">
                            <Badge className={getStatusColor(fatura.status)}>
                              {fatura.status === 'pago' ? 'Pago' : fatura.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Pagamentos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Próximos Pagamentos
                </CardTitle>
                <CardDescription>Pagamentos agendados para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-3 font-medium">Descrição</th>
                        <th className="text-left pb-3 font-medium">Valor</th>
                        <th className="text-left pb-3 font-medium">Data</th>
                        <th className="text-left pb-3 font-medium">Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagamentosAgendados.map((pagamento, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{pagamento.descricao}</td>
                          <td className={`py-3 ${getTipoTransacaoColor(pagamento.tipo)}`}>{pagamento.valor}</td>
                          <td className="py-3">{pagamento.data}</td>
                          <td className="py-3">
                            <Badge className={getCategoriaColor(pagamento.categoria)}>
                              {pagamento.categoria}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faturas">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Faturas</CardTitle>
              <CardDescription>Todas as faturas emitidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Cliente</th>
                      <th className="pb-3 font-medium">Valor</th>
                      <th className="pb-3 font-medium">Emissão</th>
                      <th className="pb-3 font-medium">Vencimento</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {faturasRecentes.map((fatura, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">{fatura.id}</td>
                        <td className="py-4">{fatura.cliente}</td>
                        <td className="py-4">{fatura.valor}</td>
                        <td className="py-4">{fatura.emissao}</td>
                        <td className="py-4">{fatura.vencimento}</td>
                        <td className="py-4">
                          <Badge className={getStatusColor(fatura.status)}>
                            {fatura.status === 'pago' ? 'Pago' : fatura.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                          </Badge>
                        </td>
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

        <TabsContent value="transacoes">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    Receitas
                  </CardTitle>
                  <Badge>Mensal</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium text-green-600">R$ 54.000,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Média</span>
                    <span className="font-medium">R$ 9.000,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Realizado</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <TrendingDown className="mr-2 h-5 w-5 text-red-600" />
                    Despesas
                  </CardTitle>
                  <Badge className="bg-amber-100 text-amber-800">Mensal</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium text-red-600">R$ 36.000,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Média</span>
                    <span className="font-medium">R$ 6.000,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Realizado</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
                    Pendências
                  </CardTitle>
                  <Badge className="bg-purple-100 text-purple-800">Importante</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">A Receber</span>
                    <span className="font-medium text-blue-600">R$ 28.500,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">A Pagar</span>
                    <span className="font-medium text-red-600">R$ 18.200,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saldo</span>
                    <span className="font-medium text-green-600">R$ 10.300,00</span>
                  </div>
                  <Progress value={60} className="h-2 mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Alertas Financeiros */}
      <Card className="border-0 shadow-lg mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Alertas Financeiros
          </CardTitle>
          <CardDescription>Notificações importantes sobre sua saúde financeira</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-red-50 rounded-lg">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-4">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-red-800">5 faturas com pagamento atrasado</h4>
                <p className="text-sm text-red-600">Total de R$ 12.800,00 pendentes há mais de 30 dias</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-red-200 text-red-600 hover:bg-red-50">
                Visualizar
              </Button>
            </div>
            
            <div className="flex items-center p-4 bg-amber-50 rounded-lg">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-4">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-amber-800">3 impostos vencem essa semana</h4>
                <p className="text-sm text-amber-600">Total de R$ 8.340,00 com vencimento até 15/06</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-amber-200 text-amber-600 hover:bg-amber-50">
                Visualizar
              </Button>
            </div>
            
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">Meta mensal alcançada</h4>
                <p className="text-sm text-green-600">A meta de faturamento de R$ 50.000,00 foi atingida</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto border-green-200 text-green-600 hover:bg-green-50">
                Relatório
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-crm-primary">
              Ver todos os alertas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financeiro;
