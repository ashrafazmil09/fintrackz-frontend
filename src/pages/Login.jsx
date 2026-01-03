import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 400 }}>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
      <p style={{ marginTop: 20, textAlign: "center" }}>
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}