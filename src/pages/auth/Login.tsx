import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login: loginContext } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await login(email, password);
      loginContext(res.token);
      const role = res.role === "ADMIN" ? "/admin/dashboard" : "/dashboard";
      navigate(role);
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-100 p-5">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
          FinTrackz
        </h1>
        <p className="italic text-gray-500 mb-8 mt-2">
          Your persodnal finance tracker
        </p>
        <h2 className="text-xl font-semibold mb-6">Login</h2>

        <div className="w-full">
          <LoginForm onSubmit={handleLogin} />
        </div>

        <p className="mt-5 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-orange-500 underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
