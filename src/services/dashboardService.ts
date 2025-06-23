const API_BASE_URL = import.meta.env.VITE_BACKEND_API || 'https://combinat.com.br/api/api/v1/';

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
};
