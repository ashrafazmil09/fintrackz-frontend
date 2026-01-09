import { useEffect, useState } from "react";
import { api } from "../api/auth";
import { getRoleFromToken, isTokenExpired } from "../utils/jwt";

interface DashboardData {
  username: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not logged in");
      return;
    }

    if (isTokenExpired(token)) {
      setError("Session expired. Please log in again.");
      return;
    }

    const role = getRoleFromToken(token);
    if (!role) {
      setError("Invalid token");
      return;
    }

    const endpoint = role === "ROLE_ADMIN" ? "/dashboard/admin" : "/dashboard/user";

    api
      .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setData(res.data))
      .catch((err) => setError("Failed to fetch dashboard"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {data ? (
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>Username:</strong> {data.username}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Role:</strong> {data.role.replace("ROLE_", "")}</p>
          <p>
            {data.role.toUpperCase() === "ADMIN"
              ? "Welcome ADMIN, manage your system!"
              : "Welcome USER, here is your dashboard!"}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
