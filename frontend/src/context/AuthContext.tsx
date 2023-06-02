import React, { createContext, useState, useEffect } from "react";
import { iUser } from "../api/models/user.interface";
import { iAuthContext } from "../api/models/authContext.interface";

const initialAuthContextValue: iAuthContext = {
  user: null,
  login: () => {
    null;
  },
  logout: () => {
    null;
  },
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<iAuthContext>(initialAuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<iUser | null>(null);

  const login = (userData: iUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
