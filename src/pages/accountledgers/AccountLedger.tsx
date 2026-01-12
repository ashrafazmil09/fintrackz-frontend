import { useEffect, useState } from "react";
import api from "../../api/api";

export interface AccountLedger {
  id: number;
  account: {
    id: number;
    name: string;
    platform: string;
  };
  transaction?: {
    id: number;
  } | null;
  direction: "CREDIT" | "DEBIT";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reason: string;
  createdAt: string;
}

interface AccountLedgerProps {
  accountId: number;
}

export default function AccountLedgerPage({ accountId }: AccountLedgerProps) {
  const [ledgers, setLedgers] = useState<AccountLedger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLedgers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/ledgers", {
        params: { accountId },
      });
      setLedgers(res.data);
    } catch (err) {
      console.error("Failed to fetch ledger:", err);
      setError("Failed to load account ledger.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgers();
  }, [accountId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Account Ledger</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {ledgers.length === 0 ? (
            <p>No ledger entries found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Account</th>
                    <th className="p-2 text-left">Platform</th>
                    <th className="p-2 text-left">Reason</th>
                    <th className="p-2 text-right">Debit (RM)</th>
                    <th className="p-2 text-right">Credit (RM)</th>
                    <th className="p-2 text-right">Balance After (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgers.map((l) => (
                    <tr key={l.id} className="border-t">
                      <td className="p-2">
                        {new Date(l.createdAt).toLocaleString()}
                      </td>
                      <td className="p-2">{l.account.name}</td>
                      <td className="p-2">{l.account.platform}</td>
                      <td className="p-2">{l.reason}</td>
                      <td className="p-2 text-right">
                        {l.direction === "DEBIT" ? l.amount.toFixed(2) : "-"}
                      </td>
                      <td className="p-2 text-right">
                        {l.direction === "CREDIT" ? l.amount.toFixed(2) : "-"}
                      </td>
                      <td className="p-2 text-right">
                        {l.balanceAfter.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
