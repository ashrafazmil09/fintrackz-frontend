import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwt";
import { useAuth } from "../context/AuthContext";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function TopBar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const payload = token ? parseJwt(token) : null;
  const username = payload?.sub || "User";
  const role = payload?.role?.replace("ROLE_", "") || "";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <header className="h-16 bg-white shadow-md flex items-center px-6 justify-end relative z-50">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-full px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <UserIcon className="w-6 h-6 text-gray-600" />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-medium text-gray-700">
              {username}
            </span>
            {role && <span className="text-xs text-gray-400">{role}</span>}
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
