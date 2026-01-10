import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";

export default function TopBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const payload = token ? parseJwt(token) : null;
  const username = payload?.sub || "User";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white shadow flex items-center px-6 justify-end relative">
      <div className="relative" ref={dropdownRef}>
        <button
          className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <span className="text-sm font-bold">
            {username.charAt(0).toUpperCase() || "U"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => navigate("/profile")}
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
