import { Lead } from '@/hooks/useLeadSelection';

// Obter cor de acordo com o status
export const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    'novo': 'bg-blue-100 text-blue-800 border-blue-200',
    'contato': 'bg-purple-100 text-purple-800 border-purple-200',
    'qualificado': 'bg-amber-100 text-amber-800 border-amber-200',
    'proposta': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'ganho': 'bg-green-100 text-green-800 border-green-200',
    'perdido': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Converter status para texto em português
export const getStatusText = (status: string) => {
  const statusTexts: Record<string, string> = {
    'novo': 'Novo',
    'contato': 'Em Contato',
    'qualificado': 'Qualificado',
    'proposta': 'Proposta',
    'ganho': 'Ganho',
    'perdido': 'Perdido'
  };
  return statusTexts[status] || 'Desconhecido';
};

// Filtrar leads com base na busca
export const filterLeads = (leads: Lead[], searchQuery: string, statusFilter: string = 'todos') => {
  let filtered = leads;

  // Filtrar por busca
  if (searchQuery.trim()) {
    const searchLower = searchQuery.toLowerCase();
    filtered = filtered.filter(lead => 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.company?.toLowerCase().includes(searchLower) ||
      lead.source.toLowerCase().includes(searchLower)
    );
  }

  // Filtrar por status
  if (statusFilter !== 'todos') {
    filtered = filtered.filter(lead => lead.status === statusFilter);
  }

  return filtered;
};

// Agrupar leads por status para visualização Kanban
export const groupLeadsByStatus = (leads: Lead[]) => {
  return {
    'novo': leads.filter(lead => lead.status === 'novo'),
    'contato': leads.filter(lead => lead.status === 'contato'),
    'qualificado': leads.filter(lead => lead.status === 'qualificado'),
    'proposta': leads.filter(lead => lead.status === 'proposta'),
    'ganho': leads.filter(lead => lead.status === 'ganho'),
    'perdido': leads.filter(lead => lead.status === 'perdido')
  };
};
