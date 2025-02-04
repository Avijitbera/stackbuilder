// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provides authentication context to its children components.
 * Manages authentication state including token storage and retrieval.
 * Offers `login` and `logout` functions to update authentication state.
 * Stores the token in localStorage for persistent authentication.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components that have access to the authentication context.
 */


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token); // Store token in localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};