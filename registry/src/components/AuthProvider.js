
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем наличие куков или выполняем API-запрос для проверки статуса аутентификации
    const checkAuth = async () => {
      try {
        const response = await axios.get('/user', {
          withCredentials: true // для передачи куков
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Ошибка аутентификации:', error);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post('/logout', {}, {
        withCredentials: true,
        maxRedirects: 0
      });
      if (response.status === 200) {
        console.log('Logout response:', response);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
