import { useEffect, useState } from "react";
import { api } from "../api/auth";

export default function Dashboard() {
  const [data, setData] = useState(null);

    // useEffect(() => {
    //     api.get("/dashboard")
    //         .then(res => setData(res.data))
    //         .catch(err => console.error(err));
    // }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}