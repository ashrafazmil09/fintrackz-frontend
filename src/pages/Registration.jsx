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
    <div style={{ padding: 50 }}>
      <h1>Register</h1>
      <RegistrationForm onSubmit={handleRegister} />

      {/* Link to login */}
      <p style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate("/login")}
        >
          Log In
        </span>
      </p>
    </div>
  );
}
