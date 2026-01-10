import { useEffect, useState } from "react";
import api from "../api/api";

interface ProfileData {
  username: string;
  email: string;
  role?: string;
}

export default function Profile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setData(res.data))
      .catch(() => setError("Unauthorized"));
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-gray-100 p-4 rounded space-y-2">
        <p>
          <strong>Username:</strong> {data.username}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>

        {data.role && (
          <p>
            <strong>Role:</strong> {data.role.replace("ROLE_", "")}
          </p>
        )}
      </div>
    </div>
  );
}
