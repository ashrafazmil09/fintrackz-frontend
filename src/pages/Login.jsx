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
    <div
      style={{
        backgroundColor: "#FFDAB9", // peach background
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          width: 350,
          maxWidth: "90%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
            style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 36,
                fontWeight: "700",
                background: "linear-gradient(90deg, #FF7E5F, #FEB47B)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
            }}
        >
            FinTrackz
        </h1>
        <p
            style={{
                margin: 0,
                marginTop: 4,
                marginBottom: 30,
                fontSize: 16,
                color: "#555",
                fontStyle: "italic",
            }}
        >
            Your personal finance tracker
        </p>
        <h1 style={{ marginBottom: 20, fontSize: 20 }}>Login</h1>
        <div style={{ width: "100%" }}>
          <LoginForm onSubmit={handleLogin} />
        </div>
        <p style={{ marginTop: 20 }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{
              border: "none",
              background: "none",
              color: "#FF6347",
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
    </div>
  );
}
