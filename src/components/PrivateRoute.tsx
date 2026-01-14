import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isTokenExpired } from "../utils/jwt";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { token, role, logout } = useAuth();
  const normalizedRole = role?.replace("ROLE_", "");

  // 1️⃣ Check token
  if (!token || isTokenExpired(token)) {
    logout();
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Check role
  if (
    allowedRoles &&
    (!normalizedRole || !allowedRoles.includes(normalizedRole))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
