import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layout/AppLayout";
import Login from "./pages/auth/Login";
import Registration from "./pages/Registration";
import BankAccounts from "./pages/accounts/BankAccounts";
import Ewallet from "./pages/accounts/EWallet";
import Cash from "./pages/accounts/Cash";
import Incomes from "./pages/transactions/Incomes";
import Expenses from "./pages/transactions/Expenses";
import AccountLedgerPageWrapper from "./pages/accountledgers/AccountLedgerPageWrapper";
import AccountLedgerList from "./pages/accountledgers/AccountLedgerList";

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
            <PrivateRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts/bankaccounts"
          element={
            <PrivateRoute>
              <AppLayout>
                <BankAccounts />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts/ewallet"
          element={
            <PrivateRoute>
              <AppLayout>
                <Ewallet />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/accounts/cash"
          element={
            <PrivateRoute>
              <AppLayout>
                <Cash />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/incomes"
          element={
            <PrivateRoute>
              <AppLayout>
                <Incomes />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/expenses"
          element={
            <PrivateRoute>
              <AppLayout>
                <Expenses />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/accountledger"
          element={
            <PrivateRoute>
              <AppLayout>
                <AccountLedgerList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/accountledger/:accountId"
          element={
            <PrivateRoute>
              <AppLayout>
                <AccountLedgerPageWrapper />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
