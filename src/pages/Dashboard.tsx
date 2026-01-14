import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../api/api";

interface DashboardStats {
  netWorth: number;
  incomeThisMonth: number;
  expenseThisMonth: number;
  netThisMonth: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: {
    id: number;
    name: string;
    type: "INCOME" | "EXPENSE";
  };
  account: {
    name: string;
    platform: string;
  };
  transaction_date: string;
}

interface Account {
  id: number;
  name: string;
  balance: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    netWorth: 0,
    incomeThisMonth: 0,
    expenseThisMonth: 0,
    netThisMonth: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    [],
  );
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await api.get("/dashboard");

        // Stats
        setStats({
          netWorth: Number(res.data.stats.netWorth),
          incomeThisMonth: Number(res.data.stats.incomeThisMonth),
          expenseThisMonth: Number(res.data.stats.expenseThisMonth),
          netThisMonth: Number(res.data.stats.netThisMonth),
        });

        // Transactions
        setRecentTransactions(res.data.recentTransactions);

        // Accounts
        setAccounts(res.data.accounts);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-8">Loading dashboard...</p>;

  // Chart: only expenses
  const expenseTransactions = recentTransactions.filter(
    (tx) => tx.category.type === "EXPENSE",
  );
  const chartData = {
    labels: expenseTransactions.map((tx) => tx.description),
    datasets: [
      {
        label: "Expenses (RM)",
        data: expenseTransactions.map((tx) => tx.amount),
        backgroundColor: "rgba(239, 68, 68, 0.7)", // red bars
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Expense Breakdown (This Month)" },
    },
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Net Worth" value={stats.netWorth} />
        <StatCard title="Income (This Month)" value={stats.incomeThisMonth} />
        <StatCard title="Expense (This Month)" value={stats.expenseThisMonth} />
        <StatCard title="Net (This Month)" value={stats.netThisMonth} />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow">
          <h2 className="font-semibold mb-4">Expense Breakdown</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>
          <ul className="space-y-3 text-sm">
            {recentTransactions.map((tx) => (
              <li key={tx.id} className="flex justify-between items-center">
                <span className="text-gray-600">{tx.description}</span>
                <span
                  className={
                    tx.category.type === "INCOME"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {tx.category.type === "INCOME" ? "+" : "-"}RM{tx.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ACCOUNTS */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="font-semibold mb-4">Accounts</h2>
        <div className="space-y-3 text-sm">
          {accounts.map((acc) => (
            <div key={acc.id} className="flex justify-between items-center">
              <span className="text-gray-600">{acc.name}</span>
              <span className="font-medium">RM{acc.balance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">RM{value}</p>
    </div>
  );
}
