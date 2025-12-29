import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  ClipboardList,
  Box,
  ChevronLeft,
} from "lucide-react"; // Using Box icon for Products

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition
    ${
      isActive
        ? "bg-[#1E293B] text-white border-l-4 border-[#2563EB]"
        : "text-slate-300 hover:bg-[#1E293B]"
    }`;

  return (
    <aside
      className={`bg-[#0F172A] border-r border-slate-800
      transition-all duration-300 relative
      ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Collapse button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-[#0F172A]
        border border-slate-700 rounded-full p-1
        hover:bg-slate-800 transition"
      >
        <ChevronLeft
          size={18}
          className={`${!isOpen && "rotate-180"} transition`}
        />
      </button>

      {/* NAV LINKS */}
      <nav className="mt-10 px-2 space-y-1">
        <NavLink to="/user/dashboard" className={linkClass}>
          <Home size={18} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/user/place-order" className={linkClass}>
          <Package size={18} />
          {isOpen && <span>Place Order</span>}
        </NavLink>

        <NavLink to="/user/orders" className={linkClass}>
          <ClipboardList size={18} />
          {isOpen && <span>My Orders</span>}
        </NavLink>

        <NavLink to="/user/userproducts" className={linkClass}>
          <Box size={18} />
          {isOpen && <span>Products</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;
