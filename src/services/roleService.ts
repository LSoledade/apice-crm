const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export const getRoles = async () => {
  const response = await fetch(`${API_BASE_URL}Roles/`);
  return response.json();
};
