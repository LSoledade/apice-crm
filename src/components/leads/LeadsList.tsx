import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal,
  Phone, 
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  Download
} from 'lucide-react';

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

interface LeadsListProps {
  leads: Lead[];
  selectedLeads: string[];
  onLeadSelect: (lead: Lead) => void;
  onToggleSelection: (id: string) => void;
  onSelectAll: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
  onDeleteLead?: (id: string) => void;
}

export const LeadsList: React.FC<LeadsListProps> = ({
  leads,
  selectedLeads,
  onLeadSelect,
  onToggleSelection,
  onSelectAll,
  getStatusColor,
  getStatusText,
  onDeleteLead
}) => {
  const handleDeleteClick = (e: React.MouseEvent, leadId: string) => {
    e.stopPropagation();
    if (onDeleteLead && window.confirm('Tem certeza que deseja excluir este lead?')) {
      onDeleteLead(leadId);
    }
  };

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.stopPropagation();
    window.open(`mailto:${email}`);
  };

  const handlePhoneClick = (e: React.MouseEvent, phone: string) => {
    e.stopPropagation();
    window.open(`tel:${phone}`);
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="px-6 py-4 bg-gray-50/50 border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Lista de Leads</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {leads.length} {leads.length === 1 ? 'lead encontrado' : 'leads encontrados'}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedLeads.length} selecionados
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left w-12">
                  <Checkbox 
                    checked={selectedLeads.length === leads.length && leads.length > 0}
                    onCheckedChange={onSelectAll}
                    aria-label="Selecionar todos"
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                </th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Lead</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Origem</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Valor</th>
                <th className="py-3 px-4 text-left font-medium text-gray-700">Data</th>
                <th className="py-3 px-4 text-right font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr 
                  key={lead.id || JSON.stringify(lead)} 
                  className={`transition-colors duration-150 hover:bg-gray-50 cursor-pointer group ${
                    selectedLeads.includes(lead.id) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => onLeadSelect(lead)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => onToggleSelection(lead.id)}
                        aria-label={`Selecionar ${lead.name}`}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {lead.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">{lead.name || 'Nome não informado'}</div>
                        <div className="text-gray-500 text-xs truncate">{lead.email || 'Email não informado'}</div>
                        {lead.company && (
                          <div className="text-gray-400 text-xs truncate">{lead.company}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{lead.source || 'Não informado'}</div>
                    {lead.lastContact && (
                      <div className="text-xs text-gray-500">
                        Último contato: {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className={`${getStatusColor(lead.status)} border-0 shadow-sm`}>
                      {getStatusText(lead.status)}
                    </Badge>
                    {lead.tags && lead.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {lead.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={tag + idx} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                            {tag}
                          </Badge>
                        ))}
                        {lead.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                            +{lead.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {(lead.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">
                      {lead.date ? new Date(lead.date).toLocaleDateString('pt-BR') : 'Data não informada'}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      {lead.email && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => handleEmailClick(e, lead.email)}
                          title="Enviar email"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      {lead.phone && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => handlePhoneClick(e, lead.phone)}
                          title="Ligar"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Agendar reunião
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Alterar status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={(e) => handleDeleteClick(e, lead.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir lead
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
      </CardContent>
      <CardFooter className="px-6 py-4 flex justify-between items-center border-t bg-gray-50/50">
        <div className="text-sm text-gray-600">
          Mostrando {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
