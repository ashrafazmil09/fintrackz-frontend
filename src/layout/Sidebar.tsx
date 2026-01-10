import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";
import {
  HomeIcon,
  UsersIcon,
  Bars3Icon,
  BanknotesIcon,
  WalletIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const token = localStorage.getItem("token");
  const role = token ? getRoleFromToken(token) : null;

  const [collapsed, setCollapsed] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false); // controls Accounts dropdown

  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      roles: ["USER", "ADMIN"],
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Accounts",
      roles: ["USER", "ADMIN"],
      icon: <BanknotesIcon className="w-5 h-5" />,
      dropdown: [
        {
          label: "Bank Accounts",
          to: "/bankaccounts",
          icon: <BanknotesIcon className="w-4 h-4" />,
        },
        {
          label: "E-Wallet",
          to: "/ewallet",
          icon: <WalletIcon className="w-4 h-4" />,
        },
        {
          label: "Cash",
          to: "/cash",
          icon: <CurrencyDollarIcon className="w-4 h-4" />,
        },
      ],
    },
    {
      label: "Users",
      to: "/users",
      roles: ["ADMIN"],
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ];

  const filteredLinks = links.filter(
    (link) => role && link.roles.includes(role.replace("ROLE_", "")),
  );

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="text-xl font-bold pr-1 pb-1 transition-all duration-300">
          {collapsed ? "Ft" : "FinTrackz"}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center hover:bg-gray-700 rounded"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2 px-2">
        {filteredLinks.map((link) =>
          link.dropdown ? (
            <div key={link.label} className="flex flex-col">
              {/* Parent link */}
              <button
                onClick={() => setAccountsOpen(!accountsOpen)}
                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 w-full ${
                  accountsOpen ? "bg-gray-700" : ""
                }`}
              >
                <span className="w-5 h-5">{link.icon}</span>
                <span
                  className={`transition-opacity duration-300 ${
                    collapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                >
                  {link.label}
                </span>
                {!collapsed && (
                  <span className="ml-auto">{accountsOpen ? "▾" : "▸"}</span>
                )}
              </button>

              {/* Dropdown */}
              {accountsOpen && !collapsed && (
                <div className="flex flex-col pl-8 mt-1 space-y-1">
                  {link.dropdown.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-700 ${
                          isActive ? "bg-gray-700" : ""
                        }`
                      }
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.to}
              to={link.to!}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <span className="w-5 h-5">{link.icon}</span>
              <span
                className={`transition-opacity duration-300 ${
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                }`}
              >
                {link.label}
              </span>
            </NavLink>
          ),
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-400">
        {collapsed ? "v1" : "v1.0"}
      </div>
    </aside>
  );
}
