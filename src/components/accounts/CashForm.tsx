import { useState } from "react";
import api from "../../api/api";
import { CashAccount } from "../../pages/accounts/Cash";

interface Props {
  account: CashAccount | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CashForm({ account, onClose, onSaved }: Props) {
  const [name, setName] = useState(account?.name ?? "");
  const [balance, setBalance] = useState(account?.balance ?? 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      alert("Name are required");
      return;
    }

    try {
      setLoading(true);
      if (account) {
        await api.put(`/accounts/${account.id}`, {
          name,
          balance,
          type: "CASH",
        });
      } else {
        await api.post("/accounts", {
          name,
          balance,
          type: "CASH",
        });
      }
      onSaved();
    } catch {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 space-y-4">
        <h2 className="text-xl font-bold">
          {account ? "Edit WALLET" : "Add WALLET"}
        </h2>

        <input
          className="w-full border p-2"
          placeholder="Wallet Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2"
          placeholder="Opening Balance"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
