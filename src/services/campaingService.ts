const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export const getCampaings = async () => {
  const response = await fetch(`${API_BASE_URL}Campaings/`);
  return response.json();
};

export interface CreateCampaingCommand {
  // definir campos necessários aqui
}

export const createCampaing = async (campaing: CreateCampaingCommand) => {
  const response = await fetch(`${API_BASE_URL}Campaings/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campaing)
  });
  return response.json();
};
