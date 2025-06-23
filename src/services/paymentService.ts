const API_BASE_URL = import.meta.env.VITE_BACKEND_API || 'https://combinat.com.br/api/api/v1/';

export const getPayments = async () => {
  const response = await fetch(`${API_BASE_URL}Payment/`);
  return response.json();
};
