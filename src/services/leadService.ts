// src/services/leadService.ts

const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export interface CreateLeadCommand {
  name?: string;
  mail?: string;
  source?: string;
  status?: number;
  tags?: number;
  createdDate: string;
  updatedDate?: string;
  lastContact?: string;
  description?: string;
}

export interface UpdateLeadCommand {
  id?: string;
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  role?: string;
}

export const getLeads = async () => {
  const response = await fetch(API_BASE_URL + 'Leads/');
  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }
  return response.json();
};

export const getLeadById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};

export const createLead = async (lead: CreateLeadCommand) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead)
  });
  return response.json();
};

export const updateLead = async (lead: UpdateLeadCommand) => {
  const response = await fetch(`${API_BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lead)
  });
  return response.json();
};
