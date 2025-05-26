const API_BASE_URL = import.meta.env.BACKEND_API || 'http://localhost:53759/api/v1/';

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}User/`);
  return response.json();
};

export interface CreateUserCommand {
  // definir campos necessários aqui
}

export const createUser = async (user: CreateUserCommand) => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.json();
};
