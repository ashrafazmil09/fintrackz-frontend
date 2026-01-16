import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  HomeIcon,
  UsersIcon,
  Bars3Icon,
  BanknotesIcon,
  WalletIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const { role } = useAuth();
  const normalizedRole = role?.replace("ROLE_", "");

  const [collapsed, setCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (label: string) => {
    if (openDropdowns.includes(label)) {
      setOpenDropdowns(openDropdowns.filter((l) => l !== label));
    } else {
      setOpenDropdowns([...openDropdowns, label]);
    }
  };

  const links = [
    {
      label: "Dashboard",
      to: "/dashboard",
      roles: ["USER"],
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Dashboard",
      to: "/admin/dashboard",
      roles: ["ADMIN"],
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Accounts",
      roles: ["USER"],
      icon: <CreditCardIcon className="w-5 h-5" />,
      dropdown: [
        {
          label: "Bank Accounts",
          to: "/accounts/bankaccounts",
          icon: <BanknotesIcon className="w-4 h-4" />,
        },
        {
          label: "E-Wallet",
          to: "/accounts/ewallet",
          icon: <WalletIcon className="w-4 h-4" />,
        },
        {
          label: "Cash",
          to: "/accounts/cash",
          icon: <CurrencyDollarIcon className="w-4 h-4" />,
        },
      ],
    },
    {
      label: "Transactions",
      roles: ["USER"],
      icon: <BanknotesIcon className="w-5 h-5" />,
      dropdown: [
        {
          label: "Incomes",
          to: "/transactions/incomes",
          icon: <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />,
        },
        {
          label: "Expenses",
          to: "/transactions/expenses",
          icon: <ArrowRightEndOnRectangleIcon className="w-4 h-4" />,
        },
      ],
    },
    {
      label: "Account Ledger",
      to: "/accountledger",
      roles: ["USER"],
      icon: <BookOpenIcon className="w-5 h-5" />,
    },
    {
      label: "Users",
      to: "/admin/userlist",
      roles: ["ADMIN"],
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ];

  const filteredLinks = links.filter(
    (link) => normalizedRole && link.roles.includes(normalizedRole),
  );

  return (
    <aside
      className={`bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="text-xl font-bold text-orange-400">
          {collapsed ? "Ft" : "FinTrackz"}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-gray-800 rounded p-1 transition"
        >
          <Bars3Icon className="w-6 h-6 text-gray-100" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-1 px-2 mt-2">
        {filteredLinks.map((link) =>
          link.dropdown ? (
            <div key={link.label}>
              <button
                onClick={() => toggleDropdown(link.label)}
                className={`flex items-center gap-3 px-3 py-2 rounded w-full hover:bg-orange-500 hover:text-white transition-colors ${
                  openDropdowns.includes(link.label)
                    ? "bg-orange-500 text-white"
                    : ""
                }`}
              >
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
                {!collapsed && (
                  <span className="ml-auto">
                    {openDropdowns.includes(link.label) ? "▾" : "▸"}
                  </span>
                )}
              </button>

              {openDropdowns.includes(link.label) && !collapsed && (
                <div className="flex flex-col pl-8 mt-1 space-y-1">
                  {link.dropdown.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition-colors ${
                          isActive ? "bg-orange-500 text-white" : ""
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
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors ${
                  isActive ? "bg-orange-500 text-white" : ""
                }`
              }
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          ),
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
        {!collapsed && "v1.0"} {collapsed && "v1"}
      </div>
    </aside>
  );
}
