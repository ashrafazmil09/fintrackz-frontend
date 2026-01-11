import { useEffect, useState } from "react";
import api from "../../api/api";
import IncomeForm from "../../components/transactions/IncomeForm";

export interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  account: {
    name: string;
    platform: string;
  };
  amount: number;
  description: string;
  transaction_date: string;
}

interface GetTransactionsPayload {
  accountId?: number;
  categoryId: number;
  startDate?: string;
  endDate?: string;
}

export default function Incomes() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);

  const fetchTransactions = async (
    payload: GetTransactionsPayload = { categoryId: 1 },
  ) => {
    try {
      setLoading(true);
      const res = await api.get("/transactions", { params: payload });
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to load income transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSaved = () => {
    setShowForm(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Income Transactions</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Income
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {transactions.length === 0 ? (
            <p>No income transactions found.</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Account</th>
                  <th className="p-2 text-left">Platform</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t">
                    <td className="p-2">{t.account.name}</td>
                    <td className="p-2">{t.account.platform}</td>
                    <td className="p-2">{t.description}</td>
                    <td className="p-2 text-right">RM {t.amount.toFixed(2)}</td>
                    <td className="p-2 text-center space-x-2">
                      <button
                        className="text-blue-600"
                        onClick={() => {
                          setEditingTransaction(t);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => setDeleteTarget(t)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <IncomeForm
          transaction={editingTransaction}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="text-xl font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={async () => {
                  if (!deleteTarget) return;
                  try {
                    await api.delete(`/transactions/${deleteTarget.id}`);
                    setTransactions((prev) =>
                      prev.filter((t) => t.id !== deleteTarget.id),
                    );
                  } catch {
                    alert("Delete failed");
                  } finally {
                    setDeleteTarget(null);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
