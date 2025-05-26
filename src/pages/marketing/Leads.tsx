import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Filter,
  SlidersHorizontal,
  Download,
  Trash2,
  Mail,
  CheckCircle2,
  Phone, 
  Send,
  Calendar,
  Clipboard,
  User,
  MapPin,
  CreditCard,
  Clock,
  Tag
} from 'lucide-react';
import { getLeads } from '@/services/leadService';
// Interface para os dados de lead
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'novo' | 'contato' | 'qualificado' | 'proposta' | 'ganho' | 'perdido';
  value: number;
  date: string;
  company?: string;
  city?: string;
  notes?: string;
  tags: string[];
  lastContact?: string;
}

// Obter cor de acordo com o status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'novo':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'contato': 
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'qualificado':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'proposta':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'ganho':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'perdido':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Converter status para texto em português
const getStatusText = (status: string) => {
  switch (status) {
    case 'novo': return 'Novo';
    case 'contato': return 'Em Contato';
    case 'qualificado': return 'Qualificado';
    case 'proposta': return 'Proposta';
    case 'ganho': return 'Ganho';
    case 'perdido': return 'Perdido';
    default: return 'Desconhecido';
  }
};

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  // Dados mockados para leads
  const [leads, setLeads] = useState<Lead[]>([
    { 
      id: '1', 
      name: 'João Silva', 
      email: 'joao.silva@empresa.com', 
      phone: '(11) 98765-4321', 
      source: 'Google Ads', 
      status: 'novo', 
      value: 5000, 
      date: '2025-05-15',
      company: 'Empresa ABC',
      city: 'São Paulo, SP',
      notes: 'Cliente interessado em serviços de marketing digital, especialmente SEO.',
      tags: ['marketing digital', 'website'],
      lastContact: '2025-05-18'
    },
    { 
      id: '2', 
      name: 'Maria Santos', 
      email: 'maria@tecnologiaxyz.com', 
      phone: '(21) 98765-1234', 
      source: 'Email Marketing', 
      status: 'contato', 
      value: 3500, 
      date: '2025-05-10',
      company: 'Tecnologia XYZ',
      city: 'Rio de Janeiro, RJ',
      notes: 'Conversou sobre planos de marketing para startup. Agendar reunião de follow-up.',
      tags: ['startup', 'marketing digital'],
      lastContact: '2025-05-19'
    },
    { 
      id: '3', 
      name: 'Carlos Mendes', 
      email: 'carlos@consulcorp.com', 
      phone: '(31) 99876-5432', 
      source: 'Indicação', 
      status: 'qualificado', 
      value: 12000, 
      date: '2025-05-08',
      company: 'ConsulCorp',
      city: 'Belo Horizonte, MG',
      notes: 'Precisa de solução completa de marketing digital. Demonstrou muito interesse na apresentação inicial.',
      tags: ['consultoria', 'alta prioridade'],
      lastContact: '2025-05-20'
    },
    { 
      id: '4', 
      name: 'Ana Souza', 
      email: 'ana@modaestilo.com', 
      phone: '(41) 99765-4321', 
      source: 'Instagram', 
      status: 'proposta', 
      value: 7500, 
      date: '2025-04-30',
      company: 'Moda & Estilo',
      city: 'Curitiba, PR',
      notes: 'Proposta enviada para campanha de lançamento da coleção de inverno.',
      tags: ['moda', 'campanha', 'instagram'],
      lastContact: '2025-05-17'
    },
    { 
      id: '5', 
      name: 'Roberto Almeida', 
      email: 'roberto@tectudo.com', 
      phone: '(51) 98888-7777', 
      source: 'Website', 
      status: 'ganho', 
      value: 15000, 
      date: '2025-04-15',
      company: 'TecTudo Soluções',
      city: 'Porto Alegre, RS',
      notes: 'Contrato assinado para serviços de marketing digital por 6 meses.',
      tags: ['tecnologia', 'website', 'contrato'],
      lastContact: '2025-05-16'
    },
    { 
      id: '6', 
      name: 'Fernanda Lima', 
      email: 'fernanda@belebeleza.com', 
      phone: '(71) 99999-8888', 
      source: 'Facebook Ads', 
      status: 'perdido', 
      value: 4000, 
      date: '2025-05-05',
      company: 'Bele Beleza',
      city: 'Salvador, BA',
      notes: 'Optou por agência concorrente. Mantendo contato para futuras oportunidades.',
      tags: ['beleza', 'facebook'],
      lastContact: '2025-05-15'
    },
    { 
      id: '7', 
      name: 'Paulo Andrade', 
      email: 'paulo@construforte.com', 
      phone: '(85) 97777-6666', 
      source: 'LinkedIn', 
      status: 'novo', 
      value: 20000, 
      date: '2025-05-20',
      company: 'Construforte',
      city: 'Fortaleza, CE',
      notes: 'Empresa de construção civil buscando marketing digital para nova linha de produtos.',
      tags: ['construção', 'b2b'],
      lastContact: '2025-05-20'
    }
  ]);
 const loadLeads = async () => {
    try {
      const fetchedLeads = await getLeads();
      setLeads(fetchedLeads);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    }
  };


  useEffect(() => {
    loadLeads();
  }, []);

  // Funções para manipulação de leads
  const toggleLeadSelection = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const selectAllLeads = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  // Filtrar leads com base na busca
  const filteredLeads = leads.filter(lead => {
    const searchLower = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.company?.toLowerCase().includes(searchLower) ||
      lead.source.toLowerCase().includes(searchLower)
    );
  });

  // Agrupar leads por status para visualização Kanban
  const leadsByStatus = {
    'novo': filteredLeads.filter(lead => lead.status === 'novo'),
    'contato': filteredLeads.filter(lead => lead.status === 'contato'),
    'qualificado': filteredLeads.filter(lead => lead.status === 'qualificado'),
    'proposta': filteredLeads.filter(lead => lead.status === 'proposta'),
    'ganho': filteredLeads.filter(lead => lead.status === 'ganho'),
    'perdido': filteredLeads.filter(lead => lead.status === 'perdido')
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600">Gerencie seus potenciais clientes</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-crm-primary hover:bg-crm-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Novo Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Lead</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo potencial cliente.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Nome do lead" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@exemplo.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input id="company" placeholder="Nome da empresa" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="source">Origem</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="google-ads">Google Ads</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="indicacao">Indicação</SelectItem>
                        <SelectItem value="email">Email Marketing</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="value">Valor Estimado</Label>
                    <Input id="value" placeholder="R$ 0,00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Detalhes adicionais sobre o lead" 
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Separe as tags por vírgula" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Adicionar Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Buscar leads..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Select defaultValue="todos">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="novo">Novos</SelectItem>
              <SelectItem value="contato">Em Contato</SelectItem>
              <SelectItem value="qualificado">Qualificados</SelectItem>
              <SelectItem value="proposta">Propostas</SelectItem>
              <SelectItem value="ganho">Ganhos</SelectItem>
              <SelectItem value="perdido">Perdidos</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 ml-1">
            <Button 
              variant={viewMode === 'list' ? "default" : "outline"} 
              size="icon"
              className={viewMode === 'list' ? "" : ""}
              onClick={() => setViewMode('list')}
            >
              <Clipboard className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'kanban' ? "default" : "outline"} 
              size="icon"
              onClick={() => setViewMode('kanban')}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Selected leads actions */}
      {selectedLeads.length > 0 && viewMode === 'list' && (
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border animate-in slide-in-from-top">
          <span className="text-sm font-medium">
            {selectedLeads.length} {selectedLeads.length === 1 ? 'lead selecionado' : 'leads selecionados'}
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Mail className="h-3.5 w-3.5 mr-1" />
              Email
            </Button>
            <Button size="sm" variant="outline">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Atualizar Status
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Excluir
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'list' ? (
        <Card className="border-0 shadow-lg">
          <CardHeader className="px-6 py-4">
            <CardTitle>Lista de Leads</CardTitle>
            <CardDescription>
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead encontrado' : 'leads encontrados'}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <div className="rounded-md border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-2 text-left">
                      <div className="flex items-center">
                        <Checkbox 
                          checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                          onCheckedChange={selectAllLeads}
                          aria-label="Selecionar todos"
                          className="mr-1 data-[state=checked]:bg-crm-primary data-[state=checked]:border-crm-primary"
                        />
                      </div>
                    </th>
                    <th className="py-3 px-2 text-left">Lead</th>
                    <th className="py-3 px-4 text-left">Origem</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Valor</th>
                    <th className="py-3 px-4 text-left">Data</th>
                    <th className="py-3 px-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className={`border-b ${selectedLeads.includes(lead.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-2 px-2">
                        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                          <Checkbox 
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={() => toggleLeadSelection(lead.id)}
                            aria-label={`Selecionar ${lead.name}`}
                            className="data-[state=checked]:bg-crm-primary data-[state=checked]:border-crm-primary"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium mr-3">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-gray-500 text-xs">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{lead.source}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={getStatusColor(lead.status)}>
                          {getStatusText(lead.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(lead.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-2 text-right" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Ligar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Agendar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mudar Status
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
          <CardFooter className="px-6 py-4 flex justify-between border-t">
            <div className="text-sm text-gray-500">
              Mostrando {filteredLeads.length} de {leads.length} leads
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1" />
              Exportar
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Object.entries(leadsByStatus).map(([status, statusLeads]) => (
            <Card key={status} className="border-0 shadow-lg">
              <CardHeader className={`px-4 py-3 ${getStatusColor(status)}`}>
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{getStatusText(status)}</span>
                  <Badge variant="outline" className="bg-white/70">{statusLeads.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {statusLeads.length === 0 ? (
                    <div className="text-center py-6 px-2 text-sm text-gray-500">
                      Nenhum lead neste estágio
                    </div>
                  ) : (
                    statusLeads.map(lead => (
                      <div 
                        key={lead.id}
                        className="border rounded-md p-3 bg-white shadow-sm hover:shadow cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium truncate">{lead.name}</div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" />
                                Ligar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="text-xs text-gray-500 mb-2 truncate">{lead.email}</div>
                        <div className="text-sm font-medium">
                          {lead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">{lead.source}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-crm-primary">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Adicionar Lead
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Lead Details Dialog */}
      <Dialog 
        open={selectedLead !== null}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Lead</DialogTitle>
                <Badge variant="outline" className={`${getStatusColor(selectedLead.status)} mt-2`}>
                  {getStatusText(selectedLead.status)}
                </Badge>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">{selectedLead.name}</h4>
                        {selectedLead.company && (
                          <p className="text-sm text-gray-600">{selectedLead.company}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{selectedLead.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{selectedLead.phone}</span>
                    </div>
                    
                    {selectedLead.city && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{selectedLead.city}</span>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-1">Tags:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedLead.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">
                        Valor estimado: {selectedLead.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Send className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Origem: {selectedLead.source}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">Cadastrado em: {new Date(selectedLead.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {selectedLead.lastContact && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">
                          Último contato: {new Date(selectedLead.lastContact).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-1">Observações:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                        {selectedLead.notes || "Nenhuma observação registrada."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="timeline" className="mt-2">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                  <TabsTrigger value="files">Arquivos</TabsTrigger>
                  <TabsTrigger value="proposals">Propostas</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline" className="py-3">
                  <div className="text-sm text-center text-gray-500 py-6">
                    Histórico de interações em desenvolvimento.
                  </div>
                </TabsContent>
                <TabsContent value="tasks" className="py-3">
                  <div className="text-sm text-center text-gray-500 py-6">
                    Lista de tarefas em desenvolvimento.
                  </div>
                </TabsContent>
                <TabsContent value="files" className="py-3">
                  <div className="text-sm text-center text-gray-500 py-6">
                    Gerenciador de arquivos em desenvolvimento.
                  </div>
                </TabsContent>
                <TabsContent value="proposals" className="py-3">
                  <div className="text-sm text-center text-gray-500 py-6">
                    Propostas e orçamentos em desenvolvimento.
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Phone className="h-4 w-4" />
                  Ligar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Agendar
                </Button>
                <Button size="sm" className="gap-1 ml-auto">
                  <Edit className="h-4 w-4" />
                  Editar Lead
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
