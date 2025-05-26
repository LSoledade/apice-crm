
import { AuthContextType } from '@/interfaces/AuthContextType';
import { User } from '@/interfaces/User';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulação de login - em produção, fazer chamada para API
    try {
      //await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay da API

     const response = await fetch('http://localhost:53759/api/v1/auth/login', {
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
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apice-crm-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
