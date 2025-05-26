const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export const getCalendar = async () => {
  const response = await fetch(`${API_BASE_URL}Calendar/`);
  return response.json();
};
