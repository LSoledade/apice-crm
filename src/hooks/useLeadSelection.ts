import { useState } from 'react';

export interface Lead {
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

export const useLeadSelection = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  const toggleLeadSelection = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };
  
  const selectAllLeads = (leads: Lead[]) => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const clearSelection = () => {
    setSelectedLeads([]);
  };

  return { 
    selectedLeads, 
    toggleLeadSelection, 
    selectAllLeads, 
    clearSelection 
  };
};
