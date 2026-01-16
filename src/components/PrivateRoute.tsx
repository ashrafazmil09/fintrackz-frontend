import { ReactNode, useEffect, useState } from "react";
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

  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      logout();
      setRedirect("/login");
    } else if (
      allowedRoles &&
      (!normalizedRole || !allowedRoles.includes(normalizedRole))
    ) {
      setRedirect("/unauthorized");
    }
  }, [token, normalizedRole, allowedRoles, logout]);

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
