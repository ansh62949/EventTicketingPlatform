import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

/**
 * Provider component that managed the global authentication state.
 * Interfaces with the AuthService for network operations.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthSession = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    
    checkAuthSession();
  }, []);

  const login = async (credentials) => {
    try {
      const authData = await authService.login(credentials);
      if (!authData || !authData.token) {
        throw new Error("Invalid response from security vault");
      }
      
      const { token, user: userData } = authData;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const authData = await authService.signup(userData);
      if (authData && authData.token) {
        const { token, user: registeredUser } = authData;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(registeredUser));
        setUser(registeredUser);
        return registeredUser;
      }
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
