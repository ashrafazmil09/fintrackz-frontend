import { useEffect, useState } from "react";
import { api } from "../api/auth";

interface DashboardData {
  [key: string]: any;
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {data ? <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}
