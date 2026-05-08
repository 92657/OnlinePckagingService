import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./Usernavbar";
import UserSidebar from "./Usersidebar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
      
      {/* Sidebar */}
      <UserSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        
        {/* Navbar */}
        <UserNavbar setSidebarOpen={setSidebarOpen} />

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;