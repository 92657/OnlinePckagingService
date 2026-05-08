import React from "react";
import { Menu, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-[#020617] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-slate-200"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-white">
          User Dashboard
        </h1>
      </div>

      {/* Right */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium"
      >
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
};

export default UserNavbar;