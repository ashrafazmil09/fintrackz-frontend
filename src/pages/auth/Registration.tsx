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
      alert("Registration failed. Please check your details.");
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

        {/* Registration Header */}
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <hr className="w-full border-gray-200 mb-6" />

        {/* Registration Form */}
        <div className="w-full flex flex-col space-y-4">
          <RegistrationForm onSubmit={handleRegister} />
        </div>

        {/* Login link */}
        <p className="mt-5 text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-500 font-semibold underline cursor-pointer"
          >
            Log In
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
