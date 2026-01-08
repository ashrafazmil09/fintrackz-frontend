import { useState } from "react";

interface RegistrationFormProps {
  onSubmit: (data: { username: string; email: string; password: string; }) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-orange-400"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-orange-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-orange-400"
      />

      <button
        type="submit"
        className="w-1/2 px-4 py-2 mx-auto rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
      >
        Register
      </button>
    </form>
  );
}