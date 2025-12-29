import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Users, FileText, ChevronLeft } from "lucide-react";

const Sidebar = ({ isOpen, toggle }) => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={18} /> },
    { name: "Orders", path: "/admin/order", icon: <Package size={18} /> },
    { name: "Teams", path: "/admin/teams", icon: <Users size={18} /> },
    { name: "Reports", path: "/admin/reports", icon: <FileText size={18} /> },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0F172A] text-slate-300 border-r border-slate-800 transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <button
        onClick={toggle}
        className="absolute -right-3 top-6 bg-[#0F172A] border border-slate-700 text-slate-300 rounded-full p-1 hover:bg-slate-800 transition"
      >
        <ChevronLeft size={18} className={`${!isOpen && "rotate-180"} transition`} />
      </button>

      <nav className="mt-10 px-2 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-[#1E293B] text-white border-l-4 border-[#2563EB]"
                  : "hover:bg-[#1E293B]"
              }`
            }
          >
            {link.icon}
            {isOpen && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
