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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface AdminStats {
  totalUsers: number;
  totalAccounts: number;
  totalIncomeThisMonth: number;
  totalExpenseThisMonth: number;
}

interface ExpenseSummary {
  label: string;
  total: number;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAccounts: 0,
    totalIncomeThisMonth: 0,
    totalExpenseThisMonth: 0,
  });
  const [expenseChart, setExpenseChart] = useState<ExpenseSummary[]>([]);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      setLoading(true);
      try {
        const res = await api.get("/admin/dashboard");

        setStats({
          totalUsers: res.data.stats.totalUsers,
          totalAccounts: res.data.stats.totalAccounts,
          totalIncomeThisMonth: res.data.stats.totalIncomeThisMonth,
          totalExpenseThisMonth: res.data.stats.totalExpenseThisMonth,
        });

        setExpenseChart(res.data.expenseByCategory);
      } catch (err) {
        console.error("Failed to fetch admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  if (loading) return <p className="p-8">Loading admin dashboard...</p>;

  const chartData = {
    labels: expenseChart.map((e) => e.label),
    datasets: [
      {
        label: "Total Expenses (RM)",
        data: expenseChart.map((e) => e.total),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
    ],
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Accounts" value={stats.totalAccounts} />
        <StatCard
          title="Income (This Month)"
          value={stats.totalIncomeThisMonth}
        />
        <StatCard
          title="Expense (This Month)"
          value={stats.totalExpenseThisMonth}
        />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="font-semibold mb-4">Expenses by Category</h2>
        <div className="h-72">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">RM{value}</p>
    </div>
  );
}
