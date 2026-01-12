import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

interface Account {
  id: number;
  name: string;
  platform: string;
  balance: number;
}

export default function AccountLedgerList() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/accounts").then((res) => {
      setAccounts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading accounts...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Accounts Ledger</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Account</th>
            <th className="p-2 text-left">Platform</th>
            <th className="p-2 text-right">Balance</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.platform}</td>
              <td className="p-2 text-right">RM {a.balance.toFixed(2)}</td>
              <td className="p-2 text-center">
                <Link
                  to={`/accountledger/${a.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  View Ledger
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
