import { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken, isTokenExpired } from "../utils/jwt";

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      setRole(getRoleFromToken(token));
    } else {
      logout();
    }
    setIsLoaded(true);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(getRoleFromToken(newToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token && !!role && !isTokenExpired(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
