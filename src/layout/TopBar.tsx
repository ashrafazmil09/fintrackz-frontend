import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Avatar from "../components/ui/avatar";

export default function TopBar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const username = user?.username || "User";
  const role = user?.role?.replace("ROLE_", "") || "";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <Avatar
            profilePictureUrl={user?.profilePictureUrl}
            size={42}
            editing={false}
          />
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
