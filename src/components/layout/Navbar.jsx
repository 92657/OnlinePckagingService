import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      localStorage.removeItem("isLoggedIn"); // optional
      setIsLoggedIn(false);
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full h-16 bg-[#0F172A] text-white z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
        <span className="text-lg font-semibold tracking-wide">
          Packaging Service
        </span>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#2563EB] px-4 py-1.5 rounded-md text-sm hover:bg-[#1E40AF] transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
