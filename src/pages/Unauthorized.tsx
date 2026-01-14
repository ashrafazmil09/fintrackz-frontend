import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { role } = useAuth();
  const normalizedRole = role?.replace("ROLE_", "");

  // Determine the proper dashboard based on role
  const goToDashboard = () => {
    if (normalizedRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (normalizedRole === "USER") {
      navigate("/dashboard");
    } else {
      navigate("/login"); // fallback if role is missing
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-gray-700 mb-6">
        You do not have permission to access this page.
      </p>
      <button
        className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={goToDashboard}
      >
        Go to Dashboard
      </button>
    </div>
  );
}
