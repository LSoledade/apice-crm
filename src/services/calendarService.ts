const API_BASE_URL = import.meta.env.VITE_BACKEND_API || 'https://combinat.com.br/api/api/v1/';

export const getCalendar = async () => {
  const response = await fetch(`${API_BASE_URL}Calendar/`);
  return response.json();
};
