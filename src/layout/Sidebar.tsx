import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";
import { HomeIcon, UsersIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const role = token ? getRoleFromToken(token) : null;

  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { label: "Dashboard", to: "/dashboard", roles: ["USER", "ADMIN"], icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Users", to: "/users", roles: ["ADMIN"], icon: <UsersIcon className="w-5 h-5" /> },
  ];

  const filteredLinks = links.filter(
    (link) => role && link.roles.includes(role.replace("ROLE_", ""))
  );

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
        <div className="flex items-center justify-between p-6">
            <div className="text-xl font-bold pr-1 pb-1 transition-all duration-300">
                {collapsed ? "Ft" : "FinTrackz"}
            </div>
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center hover:bg-gray-700 rounded"
            >
                {collapsed 
                ? <Bars3Icon className="w-6 h-6" /> 
                : <Bars3Icon className="w-6 h-6" />}
            </button>
        </div>

      <nav className="flex-1 flex flex-col space-y-2 px-2">
        {filteredLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <span className="w-5 h-5">{link.icon}</span>
            <span className={`transition-opacity duration-300 ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"}`}>
                {link.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 text-sm text-gray-400">{collapsed ? "v1" : "v1.0"}</div>
    </aside>
  );
}