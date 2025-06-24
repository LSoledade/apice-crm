import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFinanceFilters } from '@/hooks/use-finance-filters';
import { FinanceFilters } from '@/components/finance/finance-filters';
import EventoFinanceiroForm from '@/components/forms/evento-financeiro-form';
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Trash2,
  Edit,
  Check,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Filter,
  AlertCircle,
  Share2,
  CreditCard,
  FileText,
  Download,
  ArrowUpDown
} from 'lucide-react';
import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';
import { pt as ptBR } from 'date-fns/locale';

// Tipo para os eventos financeiros
interface EventoFinanceiro {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  valor: number;
  categoria: string;
  tipo: 'entrada' | 'saida';
  status: 'pendente' | 'concluido' | 'atrasado';
  origem: string;
  beneficiario?: string;
  comprovante?: string;
  observacao?: string;
  recorrente: boolean;
}

const AgendaFinanceira = () => {  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [eventos, setEventos] = useState<EventoFinanceiro[]>([]);
  const [eventoSelecionado, setEventoSelecionado] = useState<EventoFinanceiro | null>(null);
  const [showDetalhes, setShowDetalhes] = useState(false);

  // Dados mockados para os eventos
  const eventosMockados: EventoFinanceiro[] = [
    {
      id: 'EV-001',
      titulo: 'Pagamento de Aluguel',
      data: format(today, 'yyyy-MM-dd'),
      hora: '08:00',
      valor: 3500,
      categoria: 'Instalações',
      tipo: 'saida',
      status: 'pendente',
      origem: 'Conta Empresarial',
      beneficiario: 'Imobiliária Central',
      recorrente: true,
      observacao: 'Aluguel escritório referente ao mês vigente'
    },
    {
      id: 'EV-002',
      titulo: 'Recebimento Tech Solutions',
      data: format(addDays(today, 3), 'yyyy-MM-dd'),
      hora: '14:00',
      valor: 4800,
      categoria: 'Serviços',
      tipo: 'entrada',
      status: 'pendente',
      origem: 'Invoice #FAT-2023-002',
      recorrente: false
    },
    {
      id: 'EV-003',
      titulo: 'Pagamento Energia Elétrica',
      data: format(addDays(today, 1), 'yyyy-MM-dd'),
      hora: '10:00',
      valor: 890,
      categoria: 'Utilidades',
      tipo: 'saida',
      status: 'pendente',
      origem: 'Conta Empresarial',
      beneficiario: 'Companhia Elétrica',
      recorrente: true
    },
    {
      id: 'EV-004',
      titulo: 'Folha de Pagamento',
      data: format(addDays(today, 5), 'yyyy-MM-dd'),
      hora: '08:00',
      valor: 18500,
      categoria: 'Salários',
      tipo: 'saida',
      status: 'pendente',
      origem: 'Conta Empresarial',
      beneficiario: 'Funcionários',
      recorrente: true
    },
    {
      id: 'EV-005',
      titulo: 'Recebimento Rede ABC',
      data: format(addDays(today, 8), 'yyyy-MM-dd'),
      hora: '16:30',
      valor: 5800,
      categoria: 'Vendas',
      tipo: 'entrada',
      status: 'pendente',
      origem: 'Invoice #FAT-2023-006',
      recorrente: false
    },
    {
      id: 'EV-006',
      titulo: 'Impostos Trimestrais',
      data: format(addDays(today, -2), 'yyyy-MM-dd'),
      hora: '12:00',
      valor: 5680,
      categoria: 'Impostos',
      tipo: 'saida',
      status: 'atrasado',
      origem: 'Conta Impostos',
      beneficiario: 'Receita Federal',
      recorrente: false,
      observacao: 'Impostos referentes ao trimestre anterior'
    }
  ];

  // Funções auxiliares
  const formatarData = (dataString: string) => {
    try {
      return format(parseISO(dataString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dataString;
    }
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-amber-100 text-amber-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
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
      case 'entrada': return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case 'saida': return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    const cores: Record<string, string> = {
      'Instalações': 'bg-blue-100 text-blue-800',
      'Serviços': 'bg-green-100 text-green-800',
      'Utilidades': 'bg-cyan-100 text-cyan-800',
      'Impostos': 'bg-red-100 text-red-800',
      'Salários': 'bg-indigo-100 text-indigo-800',
      'Vendas': 'bg-purple-100 text-purple-800'
    };
    
    return cores[categoria] || 'bg-gray-100 text-gray-800';
  };

  const abrirDetalhesEvento = (evento: EventoFinanceiro) => {
    setEventoSelecionado(evento);
    setShowDetalhes(true);
  };
  // Extrair categorias e origens para usar nos filtros
  const categorias = Array.from(new Set(eventosMockados.map(e => e.categoria)));
  const origens = Array.from(new Set(eventosMockados.map(e => e.origem)));
  
  // Usar o hook de filtros financeiros
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    filteredData: eventosFiltrados,
    totalResults
  } = useFinanceFilters(eventosMockados);

  // Filtrar eventos para a data selecionada
  const eventosDoDia = eventosFiltrados.filter(evento => {
    if (!selectedDate) return false;
    return isSameDay(parseISO(evento.data), selectedDate);
  });
  // Verificar se uma data tem eventos
  const temEventosNaData = (date: Date) => {
    return eventosFiltrados.some(evento => isSameDay(parseISO(evento.data), date));
  };

  // Função para renderizar o indicador de eventos no calendário
  const renderDiaCalendario = (date: Date) => {
    const hasEvents = temEventosNaData(date);
    return hasEvents ? (
      <div className="w-full h-full relative flex items-center justify-center">
        <div className="absolute w-1 h-1 rounded-full bg-crm-primary bottom-1"></div>
      </div>
    ) : null;
  };

  // Funções para formatação de datas no cabeçalho de eventos
  const formatarDiaEventos = (date?: Date) => {
    if (!date) return '';
    return format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <div className="p-6 space-y-6">      {/* Header */}      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda Financeira</h1>
          <p className="text-gray-600">Visualize e gerencie sua programação financeira</p>
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
            <Link to="/financeiro/pagamentos">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Pagamentos
            </Link>
          </Button>          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-crm-primary hover:bg-crm-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Novo Evento Financeiro</DialogTitle>
                <DialogDescription>
                  Registre uma nova movimentação financeira na agenda.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="titulo">Título</Label>
                    <Input id="titulo" placeholder="Título do evento financeiro" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select>
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entrada">
                            <div className="flex items-center">
                              <ArrowUpCircle className="h-4 w-4 mr-2 text-green-500" />
                              Entrada
                            </div>
                          </SelectItem>
                          <SelectItem value="saida">
                            <div className="flex items-center">
                              <ArrowDownCircle className="h-4 w-4 mr-2 text-red-500" />
                              Saída
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="valor">Valor</Label>
                      <Input id="valor" placeholder="0,00" type="number" step="0.01" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="data">Data</Label>
                      <Input id="data" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="hora">Hora</Label>
                      <Input id="hora" type="time" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select>
                        <SelectTrigger id="categoria">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instalacoes">Instalações</SelectItem>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="utilidades">Utilidades</SelectItem>
                          <SelectItem value="salarios">Salários</SelectItem>
                          <SelectItem value="impostos">Impostos</SelectItem>
                          <SelectItem value="vendas">Vendas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="origem">Origem/Conta</Label>
                      <Select>
                        <SelectTrigger id="origem">
                          <SelectValue placeholder="Selecionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="principal">Conta Principal</SelectItem>
                          <SelectItem value="empresarial">Conta Empresarial</SelectItem>
                          <SelectItem value="impostos">Conta Impostos</SelectItem>
                          <SelectItem value="fatura">Fatura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="beneficiario">Beneficiário/Pagador</Label>
                    <Input id="beneficiario" placeholder="Nome do beneficiário ou pagador" />
                  </div>
                  
                  <div>
                    <Label htmlFor="observacao">Observação</Label>
                    <Textarea id="observacao" placeholder="Detalhes adicionais sobre este evento" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="recorrente" />
                    <Label htmlFor="recorrente">Evento recorrente</Label>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-crm-primary hover:bg-crm-primary/90">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
            <Button variant="outline" onClick={() => {
            import('@/utils/exportUtils').then(({ exportToCSV }) => {
              const dataFormatted = eventosFiltrados.map(evento => ({
                id: evento.id,
                titulo: evento.titulo,
                data: formatarData(evento.data),
                hora: evento.hora,
                valor: evento.valor.toFixed(2).replace('.', ','),
                categoria: evento.categoria,
                tipo: evento.tipo === 'entrada' ? 'Entrada' : 'Saída',
                status: evento.status === 'concluido' ? 'Concluído' :
                        evento.status === 'pendente' ? 'Pendente' : 
                        evento.status === 'atrasado' ? 'Atrasado' : 'Outro',
                origem: evento.origem,
                beneficiario: evento.beneficiario || '',
                recorrente: evento.recorrente ? 'Sim' : 'Não'
              }));
              
              const headers = {
                id: 'ID',
                titulo: 'Título',
                data: 'Data',
                hora: 'Hora',
                valor: 'Valor (R$)',
                categoria: 'Categoria',
                tipo: 'Tipo',
                status: 'Status',
                origem: 'Origem/Conta',
                beneficiario: 'Beneficiário',
                recorrente: 'Recorrente'
              };
              
              exportToCSV(dataFormatted, `agenda_financeira_${format(new Date(), 'yyyy-MM-dd')}`, headers);
            });
          }}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>      </div>
      
      {/* Filtros Avançados */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Filtros</CardTitle>
            <FinanceFilters
              filters={filters}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
              totalFiltered={eventosFiltrados.length !== eventosMockados.length}
              totalResults={totalResults}
              categorias={categorias}
              contas={origens}
            />
          </div>
        </CardHeader>
      </Card>

      {/* Calendário e Eventos */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Calendário */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Calendário
            </CardTitle>
            <CardDescription>
              {selectedDate && format(selectedDate, "MMMM yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              locale={ptBR}              components={{
                DayContent: (props) => (
                  <div className="relative flex items-center justify-center w-full h-full">
                    <div>{props.date.getDate()}</div>
                    {temEventosNaData(props.date) && (
                      <div className="absolute w-1 h-1 rounded-full bg-crm-primary bottom-1"></div>
                    )}
                  </div>
                )
              }}
            />

            <div className="mt-4 space-y-2">              <div className="flex justify-between items-center text-sm py-2 border-b">
                <span>Total de eventos no mês:</span>
                <Badge variant="outline" className="bg-gray-50">
                  {eventosFiltrados.length}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm py-2 border-b">
                <span>Entradas previstas:</span>
                <Badge className="bg-green-50 text-green-700 hover:bg-green-50">
                  {formatarValor(eventosFiltrados
                    .filter(ev => ev.tipo === 'entrada')
                    .reduce((sum, ev) => sum + ev.valor, 0))}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm py-2 border-b">
                <span>Saídas previstas:</span>
                <Badge className="bg-red-50 text-red-700 hover:bg-red-50">
                  {formatarValor(eventosFiltrados
                    .filter(ev => ev.tipo === 'saida')
                    .reduce((sum, ev) => sum + ev.valor, 0))}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-sm py-2">
                <span className="font-medium">Saldo projetado:</span>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                  {formatarValor(
                    eventosFiltrados.filter(ev => ev.tipo === 'entrada').reduce((sum, ev) => sum + ev.valor, 0) -
                    eventosFiltrados.filter(ev => ev.tipo === 'saida').reduce((sum, ev) => sum + ev.valor, 0)
                  )}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Eventos */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-xl">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Eventos {selectedDate && formatarDiaEventos(selectedDate)}
                </CardTitle>                <CardDescription>
                  {eventosDoDia.length > 0
                    ? `${eventosDoDia.length} eventos programados` 
                    : 'Nenhum evento programado para esta data'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate || today, -1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setSelectedDate(addDays(selectedDate || today, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {eventosDoDia.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">Nenhum evento financeiro</h3>
                <p className="text-gray-500 mt-1">Não há eventos financeiros programados para esta data.</p>
                <Button className="mt-4 bg-crm-primary hover:bg-crm-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Evento
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {eventosDoDia.map((evento) => (
                  <Card key={evento.id} className="overflow-hidden shadow-sm hover:shadow transition-shadow cursor-pointer" onClick={() => abrirDetalhesEvento(evento)}>
                    <div className={`h-1 w-full ${evento.tipo === 'entrada' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <CardContent className="p-4">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7 md:col-span-8">
                          <div className="flex mb-2">
                            {getTipoIcon(evento.tipo)}
                            <h3 className="text-base font-medium ml-2">{evento.titulo}</h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-1" />
                              <span>{evento.hora}</span>
                            </div>
                            
                            <div>
                              <Badge className={getCategoriaColor(evento.categoria)}>
                                {evento.categoria}
                              </Badge>
                            </div>
                            
                            <div>
                              <Badge className={getStatusColor(evento.status)}>
                                {evento.status === 'concluido' ? 'Concluído' : 
                                evento.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-5 md:col-span-4 flex flex-col items-end justify-between">
                          <div className={`text-lg font-bold ${getTipoColor(evento.tipo)}`}>
                            {evento.tipo === 'entrada' ? '+' : '-'}{formatarValor(evento.valor)}
                          </div>
                          <div className="text-xs text-gray-500">{evento.origem}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Lembretes */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Próximos Eventos Financeiros
          </CardTitle>
          <CardDescription>Principais eventos programados para os próximos 15 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm">
                  <th className="text-left font-medium py-3">Evento</th>
                  <th className="text-left font-medium py-3">Data</th>
                  <th className="text-left font-medium py-3">Valor</th>
                  <th className="text-left font-medium py-3">Categoria</th>
                  <th className="text-left font-medium py-3">Status</th>
                  <th className="text-left font-medium py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {eventosMockados
                  .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                  .slice(0, 5)
                  .map((evento) => (
                    <tr key={evento.id} className="border-b">
                      <td className="py-3">
                        <div className="flex items-center">
                          {getTipoIcon(evento.tipo)}
                          <span className="ml-2">{evento.titulo}</span>
                        </div>
                      </td>
                      <td className="py-3">{formatarData(evento.data)}</td>
                      <td className={`py-3 ${getTipoColor(evento.tipo)}`}>
                        {evento.tipo === 'entrada' ? '+' : '-'}{formatarValor(evento.valor)}
                      </td>
                      <td className="py-3">
                        <Badge className={getCategoriaColor(evento.categoria)}>
                          {evento.categoria}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge className={getStatusColor(evento.status)}>
                          {evento.status === 'concluido' ? 'Concluído' : 
                          evento.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm" onClick={() => abrirDetalhesEvento(evento)}>
                          Detalhes
                        </Button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-crm-primary">
              Ver todos os eventos
              <CalendarDays className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Evento */}
      <Dialog open={showDetalhes} onOpenChange={setShowDetalhes}>
        <DialogContent className="max-w-2xl">
          {eventoSelecionado && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl flex items-center">
                    {getTipoIcon(eventoSelecionado.tipo)}
                    <span className="ml-2">{eventoSelecionado.titulo}</span>
                  </DialogTitle>
                  <Badge className={getStatusColor(eventoSelecionado.status)}>
                    {eventoSelecionado.status === 'concluido' ? 'Concluído' : 
                    eventoSelecionado.status === 'pendente' ? 'Pendente' : 'Atrasado'}
                  </Badge>
                </div>
                <DialogDescription>
                  Detalhes completos do evento financeiro
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Informações Gerais</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ID:</span>
                          <span>{eventoSelecionado.id}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Data:</span>
                          <span>{formatarData(eventoSelecionado.data)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Hora:</span>
                          <span>{eventoSelecionado.hora}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tipo:</span>
                          <span className={getTipoColor(eventoSelecionado.tipo)}>
                            {eventoSelecionado.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Categoria:</span>
                          <Badge className={getCategoriaColor(eventoSelecionado.categoria)}>
                            {eventoSelecionado.categoria}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Origem/Destino</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Origem/Conta:</span>
                          <span>{eventoSelecionado.origem}</span>
                        </div>
                        {eventoSelecionado.beneficiario && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Beneficiário/Pagador:</span>
                            <span>{eventoSelecionado.beneficiario}</span>
                          </div>
                        )}
                        {eventoSelecionado.recorrente && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Recorrência:</span>
                            <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                              Evento recorrente
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Detalhes Financeiros</h3>
                    <Card className={`${eventoSelecionado.tipo === 'entrada' ? 'bg-green-50' : 'bg-red-50'} border-0`}>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          {getTipoIcon(eventoSelecionado.tipo)}
                          <div className="ml-3">
                            <p className="text-sm font-medium">
                              {eventoSelecionado.tipo === 'entrada' ? 'Entrada' : 'Saída'} de recursos
                            </p>
                            <p className={`text-2xl font-bold ${getTipoColor(eventoSelecionado.tipo)}`}>
                              {formatarValor(eventoSelecionado.valor)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {eventoSelecionado.observacao && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Observações</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm">{eventoSelecionado.observacao}</p>
                      </div>
                    </div>
                  )}

                  {eventoSelecionado.comprovante && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Comprovante</h3>
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
                </div>
              </div>

              <DialogFooter className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                  {eventoSelecionado.status === 'pendente' && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Check className="h-4 w-4" />
                      Marcar como Concluído
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" className="gap-1">
                    <CreditCard className="h-4 w-4" />
                    Ver Transação
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

export default AgendaFinanceira;
