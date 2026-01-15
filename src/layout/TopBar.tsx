import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { API_BASE_URL } from "../api/api";

export default function TopBar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const username = user?.username || "User";
  const role = user?.role?.replace("ROLE_", "") || "";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Avatar state
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

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

  // Load profile picture
  useEffect(() => {
    if (user?.profilePictureUrl) {
      const url = user.profilePictureUrl.startsWith("http")
        ? user.profilePictureUrl
        : `${API_BASE_URL}${user.profilePictureUrl}`;
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setPreview(url);
        setLoading(false);
      };
      img.onerror = () => setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user?.profilePictureUrl]);

  return (
    <header className="h-16 bg-white shadow-md flex items-center px-6 justify-end relative z-50">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-full px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden flex items-center justify-center bg-gray-200">
            {loading ? (
              <span className="text-gray-500 text-sm">...</span>
            ) : preview ? (
              <img
                src={preview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                }}
              >
                {getInitials(username)}
              </div>
            )}
          </div>

          {/* Username and Role */}
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
