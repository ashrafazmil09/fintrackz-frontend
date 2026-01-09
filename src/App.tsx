import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layout/AppLayout";
import { getRoleFromToken, isTokenExpired } from "./utils/jwt";

export default function App() {
  const token = localStorage.getItem("token");
  const loggedIn = token && !isTokenExpired(token);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <AppLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  {/* Nested dashboard pages */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Top-level fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
