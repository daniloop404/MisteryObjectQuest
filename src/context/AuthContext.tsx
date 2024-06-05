import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { checkUserLoggedIn } from '../services/authService';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkUserLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true); 
    console.log("Usuario autenticado:", true); // Asegúrate de loguear el valor correcto
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log("Usuario autenticado:", false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);