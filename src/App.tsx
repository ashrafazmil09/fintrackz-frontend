import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import BankAccounts from "./pages/accounts/BankAccounts";
import Ewallet from "./pages/accounts/EWallet";
import Cash from "./pages/accounts/Cash";
import Incomes from "./pages/transactions/Incomes";
import Expenses from "./pages/transactions/Expenses";
import AccountLedgerPageWrapper from "./pages/accountledgers/AccountLedgerPageWrapper";
import AccountLedgerList from "./pages/accountledgers/AccountLedgerList";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected top-level pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN"]}>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AppLayout>
                <AdminDashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["USER", "ADMIN"]}>
              <AppLayout>
                <Profile />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accounts/bankaccounts"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <BankAccounts />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accounts/ewallet"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <Ewallet />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accounts/cash"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <Cash />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions/incomes"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <Incomes />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions/expenses"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <Expenses />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accountledger"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <AccountLedgerList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accountledger/:accountId"
          element={
            <PrivateRoute allowedRoles={["USER"]}>
              <AppLayout>
                <AccountLedgerPageWrapper />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
