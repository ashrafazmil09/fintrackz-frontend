import { useEffect, useState } from "react";
import api from "../../api/api";

export interface ExpenseTransaction {
  id?: number;
  account_id: number;
  amount: number;
  description: string;
  transaction_date: string;
}

interface Props {
  transaction: ExpenseTransaction | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function ExpensesForm({ transaction, onClose, onSaved }: Props) {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>([]);
  const [accountId, setAccountId] = useState<number>(
    transaction?.account_id ?? 0,
  );
  const [amount, setAmount] = useState<number>(transaction?.amount ?? 0);
  const [description, setDescription] = useState<string>(
    transaction?.description ?? "",
  );
  const [transactionDate, setTransactionDate] = useState<string>(
    transaction?.transaction_date ?? new Date().toISOString().slice(0, 16),
  );

  const [loading, setLoading] = useState(false);

  const [accountType, setAccountType] = useState<"BANK" | "EWALLET" | "CASH">(
    "BANK",
  );

  useEffect(() => {
    if (!accountType) return;

    api
      .get("/accounts", { params: { type: accountType } })
      .then((res) => setAccounts(res.data))
      .catch(() => alert("Failed to load accounts"));
  }, [accountType]);

  const handleSubmit = async () => {
    if (!accountId || amount <= 0) {
      alert("Please select an account and enter a valid amount");
      return;
    }

    const payload = {
      accountId,
      amount,
      description,
      transactionDate,
      categoryId: 2,
    };

    try {
      setLoading(true);
      if (transaction) {
        await api.put(`/transactions/${transaction.id}`, payload);
      } else {
        await api.post("/transactions", payload);
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
          {transaction ? "Edit Expense" : "Add Expense"}
        </h2>

        <div className="flex gap-4 mb-2">
          {["BANK", "EWALLET", "CASH"].map((type) => (
            <label key={type} className="flex items-center gap-1">
              <input
                type="radio"
                value={type}
                checked={accountType === type}
                onChange={() => setAccountType(type as any)}
              />
              {type}
            </label>
          ))}
        </div>

        <select
          className="w-full border p-2"
          value={accountId}
          onChange={(e) => setAccountId(Number(e.target.value))}
        >
          <option value={0}>Select Account</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          className="w-full border p-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <input
          type="text"
          className="w-full border p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
