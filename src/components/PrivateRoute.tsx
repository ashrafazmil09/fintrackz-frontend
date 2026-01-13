import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isTokenExpired } from "../utils/jwt";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { token, logout } = useAuth();

  if (!token || isTokenExpired(token)) {
    logout(); // clears state + localStorage
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
