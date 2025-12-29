import React from "react";
import { LogOut, User } from "lucide-react";

const UserNavbar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-sm md:text-base font-semibold tracking-wide">
        User Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-300 text-sm">
          <User size={16} />
          <span>Welcome</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#2563EB] px-4 py-1.5 rounded-md text-sm hover:bg-[#1E40AF] transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
