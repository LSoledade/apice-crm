import { AuthContextType } from '@/interfaces/AuthContextType';
import { User } from '@/interfaces/User';
import React, { createContext, useContext, useState, useEffect } from 'react';
import analyticsService from '@/services/analyticsService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const apiUrl = import.meta.env.VITE_BACKEND_API || 'https://combinat.com.br/api/api/v1/';// Para Vite

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('apice-crm-user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Identificar o usuário no Google Analytics quando ele está já logado
      analyticsService.setUser(userData.id);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulação de login - em produção, fazer chamada para API
    try {
      //await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay da API

     const response = await fetch(apiUrl + 'auth/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
      body: JSON.stringify({
      email: username,
       password: password
      })
      });

      if (!response.ok ) {
        setIsLoading(false);
        return false;
      }

      const resultResponse = await response.json();

      const userData = {
        id: '1',
        username: 'admin',
        email: 'admin@apicecrm.com',
        role: 'administrator',
        token: resultResponse.data
      };

      setUser(userData);
      localStorage.setItem('apice-crm-user', JSON.stringify(userData));
      
      // Rastrear evento de login e identificar usuário no Google Analytics
      analyticsService.setUser(userData.id);
      analyticsService.event('User', 'Login', userData.username);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    // Rastrear evento de logout antes de remover o usuário
    if (user) {
      analyticsService.event('User', 'Logout', user.username);
    }
    
    setUser(null);
    localStorage.removeItem('apice-crm-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
