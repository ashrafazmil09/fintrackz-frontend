import { useState } from "react";

interface RegistrationFormProps {
  onSubmit: (data: { username: string; email: string; password: string }) => void;
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  // Validation functions
  const validateUsername = (value: string) => {
    if (!value) return "Username is required";
    if (value.length < 3 || value.length > 30) return "Username must be 3–30 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Email is invalid";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 8 || value.length > 72) return "Password must be 8–72 characters";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError || emailError || passwordError) {
      setErrors({ username: usernameError, email: emailError, password: passwordError });
      return;
    }

    setErrors({});
    onSubmit({ username, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setErrors((prev) => ({ ...prev, username: validateUsername(username) }))}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring ${
            errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
          }`}
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(email) }))}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring ${
            errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setErrors((prev) => ({ ...prev, password: validatePassword(password) }))}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring ${
            errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-orange-400"
          }`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-1/2 px-4 py-2 mx-auto rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
      >
        Register
      </button>
    </form>
  );
}