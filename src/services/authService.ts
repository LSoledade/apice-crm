const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export interface LoginCommand {
  // definir campos necessários aqui
}

export const login = async (credentials: LoginCommand) => {
  const response = await fetch(`${API_BASE_URL}auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};
