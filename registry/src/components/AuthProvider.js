import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthProvider = createContext();

export const  AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверьте наличие куков или выполните API-запрос для проверки статуса аутентификации
    const checkAuth = async () => {
      const response = await fetch('/api/user', {
        credentials: 'include' // для передачи куков
      });
      if (response.ok) {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthProvider.Provider value={{ isAuthenticated }}>
      {children}
    </AuthProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthProvider);
