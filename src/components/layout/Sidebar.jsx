import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  FileText,
  ClipboardList,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, toggle }) => {
  const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Home size={18} />,
  },
  {
    name: "Orders",
    path: "/admin/order",
    icon: <ClipboardList size={18} />,
  },
  {
    name: "Teams",
    path: "/admin/teams",
    icon: <Users size={18} />,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: <FileText size={18} />,
  },
];
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-[#0F172A]
          text-slate-300
          border-r border-slate-800
          transition-transform duration-300
          z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            Admin Panel
          </h2>

          {/* Close Button */}
          <button
            onClick={toggle}
            className="text-slate-300 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={toggle}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-[#1E293B] text-white border-l-4 border-[#2563EB]"
                    : "hover:bg-[#1E293B]"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;