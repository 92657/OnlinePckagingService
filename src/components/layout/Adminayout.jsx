import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);

      if (!currentUser) {
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Checking authentication...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={async () => {
          await signOut(auth);
          navigate("/login");
        }}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main
        className={`
          pt-20 px-4 sm:px-6 pb-16 transition-all duration-300
          min-h-screen bg-[#020617]
          ${sidebarOpen ? "md:ml-64" : "md:ml-0"}
        `}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminLayout;