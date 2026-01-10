import { useNavigate } from "react-router-dom";
import RegistrationForm from "../../components/auth/RegistrationForm";
import { register } from "../../api/auth";

export default function Registration() {
  const navigate = useNavigate();

  const handleRegister = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
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
          Your personal finance tracker
        </p>
        <h2 className="text-xl font-semibold mb-6">Register</h2>

        <div className="w-full">
          <RegistrationForm onSubmit={handleRegister} />
        </div>

        <p className="mt-5 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-500 underline cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
