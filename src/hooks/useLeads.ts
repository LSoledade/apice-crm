import { useState, useEffect } from 'react';
import { 
  getLeads, 
  createLead, 
  updateLead as updateLeadAPI, 
  deleteLead as deleteLeadAPI,
  ApiLead,
  STATUS_MAP,
  REVERSE_STATUS_MAP,
  CreateLeadCommand,
  UpdateLeadCommand
} from '@/services/leadService';
import { Lead } from './useLeadSelection';

// Convert API lead to internal Lead format
const mapApiLeadToLead = (apiLead: ApiLead): Lead => ({
  id: apiLead.id,
  name: apiLead.name || 'Nome não informado',
  email: apiLead.mail || '',
  phone: apiLead.phone || '',
  source: apiLead.source || '',
  status: STATUS_MAP[apiLead.status as keyof typeof STATUS_MAP] || 'novo',
  value: 0, // This field doesn't exist in API, using default
  date: apiLead.createdDate ? apiLead.createdDate.split('T')[0] : new Date().toISOString().split('T')[0], // Convert to YYYY-MM-DD format
  company: apiLead.company || '',
  city: '', // This field doesn't exist in API
  notes: apiLead.description || '',
  tags: [], // API uses number, we'll keep empty array for now
  lastContact: apiLead.lastContact?.split('T')[0] || (apiLead.createdDate ? apiLead.createdDate.split('T')[0] : new Date().toISOString().split('T')[0])
});

// Convert internal Lead to API format for creation
const mapLeadToCreateCommand = (lead: Omit<Lead, 'id'>): CreateLeadCommand => ({
  name: lead.name,
  mail: lead.email,
  source: lead.source,
  company: lead.company,
  phone: lead.phone,
  status: REVERSE_STATUS_MAP[lead.status as keyof typeof REVERSE_STATUS_MAP] || 0,
  tags: 0, // Default for now
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  lastContact: new Date().toISOString(),
  description: lead.notes || ''
});

// Convert internal Lead to API format for update
const mapLeadToUpdateCommand = (id: string, updates: Partial<Lead>, originalLead: Lead): UpdateLeadCommand => {
  // Ensure all fields expected by the API payload are present,
  // taking from 'updates' if available, otherwise from 'originalLead'.
  return {
    id,
    name: updates.name !== undefined ? updates.name : originalLead.name,
    mail: updates.email !== undefined ? updates.email : originalLead.email,
    source: updates.source !== undefined ? updates.source : originalLead.source,
    company: updates.company !== undefined ? updates.company : originalLead.company,
    phone: updates.phone !== undefined ? updates.phone : originalLead.phone,
    status: updates.status 
      ? REVERSE_STATUS_MAP[updates.status as keyof typeof REVERSE_STATUS_MAP] 
      : REVERSE_STATUS_MAP[originalLead.status as keyof typeof REVERSE_STATUS_MAP],
    tags: 0, // Per payload, tags is 0. If updatable, map updates.tags here.
    createdDate: new Date(originalLead.date).toISOString(), // Convert YYYY-MM-DD to full ISO string
    updatedDate: new Date().toISOString(),
    // API expects full ISO string for lastContact. Lead.lastContact is YYYY-MM-DD.
    lastContact: updates.lastContact 
      ? new Date(updates.lastContact).toISOString() 
      : (originalLead.lastContact ? new Date(originalLead.lastContact).toISOString() : new Date().toISOString()),
    description: updates.notes !== undefined ? updates.notes : originalLead.notes
  };
};

// Mock data fallback in case API is not available
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    phone: '(11) 99999-9999',
    source: 'Website',
    status: 'novo',
    value: 5000,
    date: '2024-01-15',
    company: 'Empresa ABC',
    city: 'São Paulo',
    notes: 'Interessado em nosso produto premium',
    tags: ['hot-lead', 'enterprise'],
    lastContact: '2024-01-15'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@startup.com',
    phone: '(21) 88888-8888',
    source: 'LinkedIn',
    status: 'contato',
    value: 3000,
    date: '2024-01-14',
    company: 'Startup XYZ',
    city: 'Rio de Janeiro',
    notes: 'Primeira reunião agendada',
    tags: ['startup', 'tech'],
    lastContact: '2024-01-16'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@tradicional.com',
    phone: '(31) 77777-7777',
    source: 'Indicação',
    status: 'qualificado',
    value: 8000,
    date: '2024-01-13',
    company: 'Tradicional Ltd',
    city: 'Belo Horizonte',
    notes: 'Cliente com grande potencial',
    tags: ['qualified', 'high-value'],
    lastContact: '2024-01-17'
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@digital.com',
    phone: '(41) 66666-6666',
    source: 'Google Ads',
    status: 'proposta',
    value: 12000,
    date: '2024-01-12',
    company: 'Digital Agency',
    city: 'Curitiba',
    notes: 'Proposta enviada, aguardando retorno',
    tags: ['proposal', 'agency'],
    lastContact: '2024-01-18'
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos@solutions.com',
    phone: '(51) 55555-5555',
    source: 'Evento',
    status: 'ganho',
    value: 15000,
    date: '2024-01-11',
    company: 'Solutions Inc',
    city: 'Porto Alegre',
    notes: 'Cliente fechado! Implementação em andamento',
    tags: ['won', 'implementation'],
    lastContact: '2024-01-19'
  },
  {
    id: '6',
    name: 'Lucia Mendes',
    email: 'lucia@pequena.com',
    phone: '(61) 44444-4444',
    source: 'Website',
    status: 'perdido',
    value: 2000,
    date: '2024-01-10',
    company: 'Pequena Empresa',
    city: 'Brasília',
    notes: 'Não tinha orçamento suficiente',
    tags: ['lost', 'budget'],
    lastContact: '2024-01-20'
  }
];

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);    const loadLeads = async () => {    setLoading(true);
    setError(null);
    try {
      const apiLeads = await getLeads();
      if (apiLeads.length === 0) {
        // If the API returns an empty array, use mock data but don't show an error
        console.log('Nenhum lead encontrado. Usando dados de exemplo.');
        setLeads(mockLeads);
      } else {
        const mappedLeads = apiLeads.map(mapApiLeadToLead);
        setLeads(mappedLeads);
      }
    } catch (error: unknown) {
      console.error('Erro ao carregar leads:', error);
      // Check if the error is related to empty database or server not found
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
      
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Usando dados de exemplo.');
        setLeads(mockLeads); // Use mock data without showing error when API is not available
      } else {
        // Show error only for other types of errors
        setError(`Erro ao carregar leads: ${errorMessage}. Usando dados de exemplo.`);
        setLeads(mockLeads);
      }
    } finally {
      setLoading(false);
    }
  };  const addLead = async (leadData: Omit<Lead, 'id'>) => {
    try {
      const createCommand = mapLeadToCreateCommand(leadData);
      const apiLead = await createLead(createCommand);
      const newLead = mapApiLeadToLead(apiLead);
      setLeads(prev => [...prev, newLead]);
      return newLead;
    } catch (error: unknown) {
      console.error('Erro ao adicionar lead:', error);
      
      // Check if the error is related to API availability
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Adicionando lead localmente.');
      }
      
      // Fallback to local addition if API fails
      const newLead: Lead = {
        ...leadData,
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      setLeads(prev => [...prev, newLead]);
      return newLead;
    }
  };
  const updateLead = async (id: string, updatedLeadPartial: Partial<Lead>) => {
    const originalLead = leads.find(l => l.id === id);

    if (!originalLead) {
      const errorMsg = `Lead original com ID ${id} não encontrado para atualização.`;
      console.error(errorMsg);
      // Consider if an alert to the user is appropriate here, or if the calling component handles UI feedback
      // alert(\'Erro: Lead original não encontrado para atualização.\'); 
      throw new Error(errorMsg);
    }

    try {
      const updateCommand = mapLeadToUpdateCommand(id, updatedLeadPartial, originalLead);
      const apiLead = await updateLeadAPI(updateCommand);
      const mappedLead = mapApiLeadToLead(apiLead);
      setLeads(prev => prev.map(lead => 
        lead.id === id ? mappedLead : lead
      ));
    } catch (error: unknown) {
      console.error('Erro ao atualizar lead:', error);
      
      // Check if the error is related to API availability
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
        
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Atualizando lead localmente.');
      }
      
      // Fallback to local update if API fails
      setLeads(prev => prev.map(lead => 
        lead.id === id ? { ...lead, ...updatedLeadPartial } : lead
      ));
      
      // Only throw if it's not a connectivity issue
      if (!errorMessage.includes('Failed to fetch')) {
        throw error;
      }
    }
  };
  const deleteLead = async (id: string) => {
    try {
      await deleteLeadAPI(id);
      setLeads(prev => prev.filter(lead => lead.id !== id));
    } catch (error: unknown) {
      console.error('Erro ao deletar lead:', error);
      
      // Check if the error is related to API availability
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
        
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Deletando lead localmente.');
      }
      
      // Fallback to local deletion if API fails
      setLeads(prev => prev.filter(lead => lead.id !== id));
      
      // Only throw if it's not a connectivity issue
      if (!errorMessage.includes('Failed to fetch')) {
        throw error;
      }
    }
  };  const deleteMultipleLeads = async (ids: string[]) => {
    try {
      // Delete each lead individually since there's no bulk delete endpoint
      await Promise.all(ids.map(id => deleteLeadAPI(id)));
      setLeads(prev => prev.filter(lead => !ids.includes(lead.id)));
    } catch (error: unknown) {
      console.error('Erro ao deletar leads:', error);
      
      // Check if the error is related to API availability
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
        
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Deletando leads localmente.');
      }
      
      // Fallback to local deletion if API fails
      setLeads(prev => prev.filter(lead => !ids.includes(lead.id)));
      
      // Only throw if it's not a connectivity issue
      if (!errorMessage.includes('Failed to fetch')) {
        throw error;
      }
    }
  };
  const updateMultipleLeadsStatus = async (ids: string[], status: Lead['status']) => {
    try {
      // Update each lead individually since there's no bulk update endpoint
      await Promise.all(ids.map(async (id) => { // Added async here
        const originalLead = leads.find(l => l.id === id);
        if (!originalLead) {
          console.error(`Lead with ID ${id} not found. Skipping status update.`);
          return; // Skip this update if original lead not found
        }
        const updateCommand = mapLeadToUpdateCommand(id, { status }, originalLead);
        return updateLeadAPI(updateCommand);
      }));
      setLeads(prev => prev.map(lead => 
        ids.includes(lead.id) ? { ...lead, status } : lead
      ));
    } catch (error: unknown) {
      console.error('Erro ao atualizar status dos leads:', error);
      
      // Check if the error is related to API availability
      const errorMessage = (typeof error === 'object' && error !== null && 'message' in error)
        ? (error as { message: string }).message
        : 'Erro desconhecido';
        
      if (errorMessage.includes('Failed to fetch')) {
        console.log('API não disponível. Atualizando status dos leads localmente.');
      }
      
      // Fallback to local update if API fails
      setLeads(prev => prev.map(lead => 
        ids.includes(lead.id) ? { ...lead, status } : lead
      ));
      
      // Only throw if it's not a connectivity issue
      if (!errorMessage.includes('Failed to fetch')) {
        throw error;
      }
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);
  return { 
    leads, 
    loading, 
    error,
    loadLeads, 
    addLead, 
    updateLead, 
    deleteLead,
    deleteMultipleLeads,
    updateMultipleLeadsStatus
  };
};
