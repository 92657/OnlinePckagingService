import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Truck,
  X,
} from "lucide-react";

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

 const menuItems = [
  {
    name: "Dashboard",
    path: "/user/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Products",
    path: "/user/userproducts",
    icon: <Package size={20} />,
  },
  {
    name: "Place Order",
    path: "/user/place-order",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "My Orders",
    path: "/user/orders",
    icon: <Truck size={20} />,
  },
];
  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-[#0F172A]
          border-r border-slate-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            User Panel
          </h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-300"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;