import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) navigate("/login", { replace: true });
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  if (!user) return null;

  return (
    <>
      <Navbar
        onLogout={async () => {
          await signOut(auth);
          navigate("/login");
        }}
      />

      <div className="pt-16 min-h-screen bg-[#F8FAFC]">
        <Sidebar
          isOpen={sidebarOpen}
          toggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main
          className={`p-6 transition-all duration-300 pb-14
          ${sidebarOpen ? "ml-64" : "ml-20"}`}
        >
          <Outlet /> {/* Renders child routes like /dashboard */}
        </main>

        <Footer
          className="fixed bottom-0 left-0 z-40
            bg-white border-t border-slate-200
            text-slate-500 text-sm py-3"
        />
      </div>
    </>
  );
};

export default AdminLayout;
