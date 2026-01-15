import { createContext, useContext, useEffect, useState } from "react";
import { getRoleFromToken, isTokenExpired } from "../utils/jwt";
import { getProfile } from "../api/auth";

interface ProfileData {
  username?: string;
  role?: string;
  profilePictureUrl?: string;
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  user: ProfileData | null;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: ProfileData) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<ProfileData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      if (token && !isTokenExpired(token)) {
        setRole(getRoleFromToken(token));
        try {
          const profile = await getProfile();
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch profile", err);
          setUser(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setIsLoaded(true);
    };
    initialize();
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(getRoleFromToken(newToken));

    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (err) {
      console.error("Failed to fetch profile on login", err);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated: !!token && !!role && !isTokenExpired(token),
        user,
        setUser,
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
