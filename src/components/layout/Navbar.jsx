import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#0F172A] text-white z-40 border-b border-slate-800">
      <div className="h-full px-4 sm:px-6 flex justify-between items-center">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Menu */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>

          <span className="text-lg font-semibold tracking-wide">
            Packaging Service
          </span>
        </div>

        {/* Right */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#2563EB] px-4 py-2 rounded-md text-sm hover:bg-[#1E40AF] transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;