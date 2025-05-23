import { JwtPayload } from '@/interfaces/JwtPayload';
import { jwtDecode } from 'jwt-decode';

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000; // em segundos
    return decoded.exp > now;
  } catch {
    return false;
  }
};

// Outras funções úteis (ex: recuperar token, logout, etc)
export const getStoredUser = () => {
  const item = localStorage.getItem('apice-crm-user');
  return item ? JSON.parse(item) : null;
};

export const logout = () => {
  localStorage.removeItem('apice-crm-user');
};
