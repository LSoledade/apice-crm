import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PopoverContent, Popover, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Clock,
  Users,
  Trash2,
  Edit,
  Check,
  Megaphone,
  Mail,
  MessageSquare,
  Share2,
  Send
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipos para os eventos da agenda
interface EventType {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'email' | 'social' | 'campaign' | 'meeting' | 'other';
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

const getEventTypeColor = (type: string): string => {
  switch (type) {
    case 'email':
      return 'bg-blue-500';
    case 'social':
      return 'bg-purple-500';
    case 'campaign':
      return 'bg-green-500';
    case 'meeting':
      return 'bg-orange-500';
    default:
      return 'bg-gray-500';
  }
};

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'social':
      return <MessageSquare className="h-4 w-4" />;
    case 'campaign':
      return <Megaphone className="h-4 w-4" />;
    case 'meeting':
      return <Users className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'scheduled':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Agendado</Badge>;
    case 'in-progress':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Em andamento</Badge>;
    case 'completed':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Concluído</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const Agenda = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [events, setEvents] = useState<EventType[]>([
    {
      id: '1',
      title: 'Campanha de Email - Novidades de Junho',
      date: new Date(2025, 5, 15),
      startTime: '10:00',
      endTime: '11:00',
      type: 'email',
      description: 'Envio de newsletter com as ofertas do mês para a base de clientes.',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Reunião de Estratégia de Redes Sociais',
      date: new Date(2025, 5, 15),
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      description: 'Discussão sobre as diretrizes de conteúdo para o próximo trimestre.',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Lançamento Campanha de Inverno',
      date: new Date(2025, 5, 22),
      startTime: '09:00',
      endTime: '10:00',
      type: 'campaign',
      description: 'Ativação da campanha de inverno em todos os canais de marketing.',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Webinar: Estratégias de SEO',
      date: new Date(2025, 5, 15),
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      description: 'Webinar para clientes sobre otimização para motores de busca.',
      status: 'scheduled'
    },
    {
      id: '5',
      title: 'Postagem de Blog - Tendências de Marketing',
      date: new Date(2025, 5, 18),
      startTime: '12:00',
      endTime: '12:30',
      type: 'social',
      description: 'Publicação do novo artigo do blog sobre tendências de marketing digital.',
      status: 'scheduled'
    },
    {
      id: '6',
      title: 'Email de Acompanhamento - Clientes Potenciais',
      date: new Date(2025, 5, 20),
      startTime: '11:00',
      endTime: '12:00',
      type: 'email',
      description: 'Envio de emails personalizados para leads qualificados do último evento.',
      status: 'scheduled'
    },
    {
      id: '7',
      title: 'Análise de Métricas de Marketing',
      date: new Date(2025, 5, 28),
      startTime: '15:00',
      endTime: '16:30',
      type: 'meeting',
      description: 'Revisão mensal de KPIs e métricas de desempenho das campanhas.',
      status: 'scheduled'
    }
  ]);

  // Filtra os eventos para o dia selecionado
  const selectedDateEvents = events.filter(
    (event) => event.date.toDateString() === date?.toDateString()
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Verifica se há eventos na data selecionada
  const hasEventsOnDate = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda de Marketing</h1>
          <p className="text-gray-600">Gerencie suas atividades de marketing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-crm-primary hover:bg-crm-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Evento</DialogTitle>
              <DialogDescription>
                Crie um novo evento na agenda de marketing. Preencha os detalhes abaixo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Nome do evento ou atividade" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, 'dd/MM/yyyy') : <span>Selecionar data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="social">Redes Sociais</SelectItem>
                      <SelectItem value="campaign">Campanha</SelectItem>
                      <SelectItem value="meeting">Reunião</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Início</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">Término</Label>
                  <Input id="endTime" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descreva os detalhes do evento" 
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="scheduled">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="in-progress">Em andamento</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar Evento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Calendar */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Calendário
            </CardTitle>
            <CardDescription>
              {date && format(date, "MMMM yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => hasEventsOnDate(date)
              }}
              modifiersStyles={{
                hasEvent: {
                  backgroundColor: 'var(--crm-primary-light)',
                  color: 'var(--crm-primary)',
                  borderColor: 'var(--crm-primary)'
                }
              }}
            />
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-crm-primary mr-2"></div>
              <span className="text-xs text-gray-600">Eventos agendados</span>
            </div>
            <Button variant="outline" size="sm">
              Hoje
            </Button>
          </CardFooter>
        </Card>

        {/* Events List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {date && format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length === 0 
                  ? "Nenhum evento programado para este dia" 
                  : `${selectedDateEvents.length} evento${selectedDateEvents.length > 1 ? 's' : ''} agendado${selectedDateEvents.length > 1 ? 's' : ''}`}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={() => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() - 1);
                  setDate(newDate);
                }
              }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => {
                if (date) {
                  const newDate = new Date(date);
                  newDate.setDate(newDate.getDate() + 1);
                  setDate(newDate);
                }
              }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-340px)] pr-4">
              <div className="space-y-4">
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CalendarDays className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-gray-500 mb-1">Nenhum evento agendado</h3>
                    <p className="text-gray-400 text-sm">
                      Use o botão "Novo Evento" para adicionar uma atividade a este dia
                    </p>
                  </div>
                ) : (
                  selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-start p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className={`w-1.5 self-stretch rounded-full mr-4 ${getEventTypeColor(event.type)}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 truncate">{event.title}</h4>
                          {getStatusBadge(event.status)}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                      </div>
                      <span className="flex-shrink-0 ml-4">
                        {getEventTypeIcon(event.type)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Event Details Dialog */}
      <Dialog 
        open={selectedEvent !== null} 
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <div className="flex items-center mt-2">
                  {getStatusBadge(selectedEvent.status)}
                  <span className="ml-2 text-sm text-gray-500">
                    {format(selectedEvent.date, "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </span>
                </div>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex items-center py-2 border-b">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <div className="text-sm">
                    <span className="font-medium">Horário:</span> {selectedEvent.startTime} - {selectedEvent.endTime}
                  </div>
                </div>
                
                <div className="flex items-center py-2 border-b">
                  <div className={`h-4 w-4 rounded-full mr-2 flex items-center justify-center ${getEventTypeColor(selectedEvent.type)}`}>
                    {getEventTypeIcon(selectedEvent.type)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Tipo:</span> {selectedEvent.type === 'email' ? 'Email Marketing' : 
                      selectedEvent.type === 'social' ? 'Redes Sociais' :
                      selectedEvent.type === 'campaign' ? 'Campanha' : 
                      selectedEvent.type === 'meeting' ? 'Reunião' : 'Outro'}
                  </div>
                </div>
                
                <div className="py-2">
                  <p className="text-sm font-medium mb-1">Descrição:</p>
                  <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                  <Button size="sm" className="gap-1 ml-auto">
                    {selectedEvent.status === 'completed' ? (
                      <>
                        <Check className="h-4 w-4" />
                        Concluído
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Marcar como Concluído
                      </>
                    )}
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

export default Agenda;
