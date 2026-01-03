import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { register } from "../api/auth";

export default function Registration() {
  const navigate = useNavigate();

  const handleRegister = async ({ username, email, password }) => {
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFDAB9", // peach background
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
        <h1 style={{ marginBottom: 20, fontSize: 20 }}>Register</h1>
        <RegistrationForm onSubmit={handleRegister} />

        <p style={{ marginTop: 20, fontSize: 14 }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
