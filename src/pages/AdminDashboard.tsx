import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { getAdminDashboard } from "../api/auth";

interface AdminStats {
  totalUsers: number;
  totalActiveUsers: number;
  totalAccounts: number;
  totalTransactions: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalActiveUsers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
  });

  const [transactionsByMonth, setTransactionsByMonth] = useState<
    { month: string; total: number }[]
  >([]);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      setLoading(true);
      try {
        const data = await getAdminDashboard();

        setStats({
          totalUsers: data.stats.totalUsers,
          totalActiveUsers: data.stats.totalActiveUsers,
          totalAccounts: data.stats.totalAccounts,
          totalTransactions: data.stats.totalTransactions,
        });

        setTransactionsByMonth(data.transactionsByMonth);
      } catch (err) {
        console.error("Failed to fetch admin dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  if (loading) return <p className="p-8">Loading admin dashboard...</p>;

  const activeUserChartData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [
          stats.totalActiveUsers,
          stats.totalUsers - stats.totalActiveUsers,
        ],
        backgroundColor: ["rgba(34, 197, 94, 0.7)", "rgba(156, 163, 175, 0.7)"],
      },
    ],
  };

  const transactionsChartData = {
    labels: transactionsByMonth.map((t) => t.month),
    datasets: [
      {
        label: "Total Transactions",
        data: transactionsByMonth.map((t) => t.total),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Active User" value={stats.totalActiveUsers} />
        <StatCard title="Total Account Generated" value={stats.totalAccounts} />
        <StatCard
          title="Total Transaction Made"
          value={stats.totalTransactions}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="font-semibold mb-4">Active vs Inactive Users</h2>
          <div className="h-72 flex items-center justify-center">
            <Pie data={activeUserChartData} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="font-semibold mb-4">Transactions (Last 6 Months)</h2>
          <div className="h-72">
            <Bar data={transactionsChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
