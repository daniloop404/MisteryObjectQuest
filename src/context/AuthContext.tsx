import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkUserLoggedIn } from '../services/authService';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkUserLoggedIn();
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true); 
    console.log("Usuario autenticado:", true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log("Usuario autenticado:", false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);