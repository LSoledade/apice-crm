// src/services/leadService.ts

const API_BASE_URL = import.meta.env.VITE_BACKEND_API || 'https://combinat.com.br/api/api/v1/';

export interface CreateLeadCommand {
  name: string;
  mail: string;
  source: string;
  company?: string;
  phone?: string;
  status: number;
  tags: number;
  createdDate: string;
  updatedDate?: string;
  lastContact?: string;
  description?: string;
}

export interface UpdateLeadCommand {
  id: string;
  name?: string;
  mail?: string;
  source?: string;
  company?: string;
  phone?: string;
  status?: number;
  tags?: number;
  createdDate: string; // Added to match expected payload
  updatedDate: string;
  lastContact?: string;
  description?: string;
}

export interface ApiLead {
  id: string;
  name: string;
  mail: string;
  source: string;
  company?: string;
  phone?: string;
  status: number;
  tags: number;
  createdDate: string;
  updatedDate: string;
  lastContact?: string;
  description?: string;
}

// Status mapping
export const STATUS_MAP = {
  0: 'novo',
  1: 'contato', 
  2: 'qualificado',
  3: 'proposta',
  4: 'ganho',
  5: 'perdido'
} as const;

export const REVERSE_STATUS_MAP = {
  'novo': 0,
  'contato': 1,
  'qualificado': 2,
  'proposta': 3,
  'ganho': 4,
  'perdido': 5
} as const;

export const getLeads = async (): Promise<ApiLead[]> => {
  const response = await fetch(`${API_BASE_URL}Leads/`);
  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }
  return response.json();
};

export const getLeadById = async (id: string): Promise<ApiLead> => {
  const response = await fetch(`${API_BASE_URL}Leads/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch lead');
  }
  return response.json();
};

export const createLead = async (lead: CreateLeadCommand): Promise<ApiLead> => {
  const response = await fetch(`${API_BASE_URL}Leads/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead)
  });
  if (!response.ok) {
    throw new Error('Failed to create lead');
  }
  return response.json();
};

export const updateLead = async (lead: UpdateLeadCommand): Promise<ApiLead> => {
  const response = await fetch(`${API_BASE_URL}Leads/${lead.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead)
  });
  if (!response.ok) {
    let errorDetails = `Status: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorDetails += ` - ${JSON.stringify(errorData)}`;
    } catch (e) {
      // Ignore if response is not JSON or empty
    }
    throw new Error(`Failed to update lead. ${errorDetails}`);
  }
  return response.json();
};

export const deleteLead = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}Leads/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    let errorDetails = `Status: ${response.status} ${response.statusText}`;
    try {
      // DELETE responses might not have a body or might not be JSON
      const textError = await response.text();
      if (textError) {
        errorDetails += ` - ${textError}`;
      }
    } catch (e) {
      // Ignore if response body is not text or empty
    }
    throw new Error(`Failed to delete lead. ${errorDetails}`);
  }
  // No need to return response.json() for a successful DELETE if the API returns no content (204)
  // or if the content is not needed. If the API does return JSON and it's needed,
  // add `return response.json();` here.
};
