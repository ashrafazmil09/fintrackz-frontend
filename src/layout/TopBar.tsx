import { useState } from "react";
import { parseJwt } from "../utils/jwt";

export default function TopBar() {
  const token = localStorage.getItem("token");
  const payload = token ? parseJwt(token) : null;
  const username = payload?.sub || "User"; // 'sub' is standard JWT subject

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="h-14 bg-white shadow flex items-center px-6 justify-end relative">

      <div className="relative">
        <button
          className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {/* First letter of username */}
          <span className="text-sm font-bold">
            {username.charAt(0).toUpperCase()}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Go to profile")}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}