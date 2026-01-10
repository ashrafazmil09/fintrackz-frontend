import { useEffect, useState } from "react";
import api from "../../api/api";
import EWalletForm from "../../components/accounts/EwalletForm";

export interface EWalletAccount {
  id: number;
  name: string;
  platform: string;
  balance: number;
  type: "BANK" | "EWALLET" | "CASH";
}

export default function Ewallet() {
  const [accounts, setAccounts] = useState<EWalletAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<EWalletAccount | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<EWalletAccount | null>(null);

  // Fetch accounts
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/accounts?type=EWALLET");
      setAccounts(res.data);
    } catch {
      setError("Failed to load E-Wallets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSaved = () => {
    setShowForm(false);
    setEditingAccount(null);
    fetchAccounts();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">E-Wallets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add E-Wallets
        </button>
      </div>

      {accounts.length === 0 ? (
        <p>No e-wallets found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Platform</th>
              <th className="p-2 text-right">Balance</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id} className="border-t">
                <td className="p-2">{acc.name}</td>
                <td className="p-2">{acc.platform}</td>
                <td className="p-2 text-right">RM {acc.balance.toFixed(2)}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setEditingAccount(acc);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => setDeleteTarget(acc)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <EWalletForm
          account={editingAccount}
          onClose={() => {
            setShowForm(false);
            setEditingAccount(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96 space-y-4">
            <h2 className="text-xl font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete "{deleteTarget.name}"?</p>
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
                    await api.delete(`/accounts/${deleteTarget.id}`, {
                      params: { type: "EWALLET" },
                    });
                    setAccounts((prev) =>
                      prev.filter((a) => a.id !== deleteTarget.id),
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
