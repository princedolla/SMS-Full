import {
  Home,
  UserRound,
  Layers3,
  BadgeCheck,
  BarChart3,
  LogOut,
  Menu,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();

  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home size={22} />,
    },

    {
      title: "Employees",
      path: "/employees",
      icon: <UserRound size={22} />,
    },

    {
      title: "Departments",
      path: "/departments",
      icon: <Layers3 size={22} />,
    },

    {
      title: "Job Roles",
      path: "/jobroles",
      icon: <BadgeCheck size={22} />,
    },

    {
      title: "Reports",
      path: "/reports",
      icon: <BarChart3 size={22} />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className={`${
        open ? "w-72" : "w-24"
      } bg-slate-900 min-h-screen text-white transition-all duration-300 flex flex-col shadow-2xl`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-6 border-b border-slate-700">
        {open && (
          <div>
            <h1 className="text-2xl font-bold tracking-wide">SMART HRMS</h1>

            <p className="text-xs text-slate-400 mt-1">HR Management System</p>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300

                ${
                  location.pathname === item.path
                    ? "bg-cyan-600 shadow-lg"
                    : "hover:bg-slate-800 text-slate-300"
                }
                `}
              >
                <div>{item.icon}</div>

                {open && (
                  <span className="font-medium text-[16px]">{item.title}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-3"
        >
          <LogOut size={20} />

          {open && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
