import { useState } from "react";

export default function RegistrationForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 15, // space between inputs
        alignItems: "center", // center inputs horizontally
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontSize: 16,
        }}
      />
      <button
        type="submit"
        style={{
          width: "50%",
          padding: 10,
          borderRadius: 8,
          border: "none",
          backgroundColor: "#FF6347",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
}
