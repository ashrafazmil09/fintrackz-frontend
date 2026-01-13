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
      alert("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-5">
      <div className="bg-white p-10 rounded-2xl shadow-xl ring-1 ring-gray-200 w-full max-w-md text-center flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
          FinTrackz
        </h1>
        <p className="italic text-gray-500 mb-8 mt-2">
          Your personal finance tracker
        </p>

        {/* Login Header */}
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <hr className="w-full border-gray-200 mb-6" />

        {/* Login Form */}
        <div className="w-full flex flex-col space-y-4">
          <LoginForm onSubmit={handleLogin} />
        </div>

        {/* Sign up link */}
        <p className="mt-5 text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-orange-500 font-semibold underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>

        {/* Optional helper text */}
        <p className="mt-2 text-gray-400 text-xs">
          We never share your credentials with anyone.
        </p>
      </div>
    </div>
  );
}
