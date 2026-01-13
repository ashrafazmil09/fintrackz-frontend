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
      roles: ["USER", "ADMIN"],
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
      to: "/users",
      roles: ["ADMIN"],
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ];

  const filteredLinks = links.filter(
    (link) => normalizedRole && link.roles.includes(normalizedRole),
  );

  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="text-xl font-bold">
          {collapsed ? "Ft" : "FinTrackz"}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-gray-700 rounded p-1"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2 px-2">
        {filteredLinks.map((link) =>
          link.dropdown ? (
            <div key={link.label}>
              <button
                onClick={() => toggleDropdown(link.label)}
                className={`flex items-center gap-3 px-3 py-2 rounded w-full hover:bg-gray-700 ${
                  openDropdowns.includes(link.label) ? "bg-gray-700" : ""
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
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
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
      <div className="p-4 text-sm text-gray-400">
        {collapsed ? "v1" : "v1.0"}
      </div>
    </aside>
  );
}
