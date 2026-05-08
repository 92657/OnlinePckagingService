import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./Usernavbar";
import UserSidebar from "./Usersidebar";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full bg-[#020B1A] text-slate-200 overflow-x-hidden flex">
      
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#020B1A]">
        
        {/* Navbar */}
        <UserNavbar />

        {/* Page Content */}
        <main className="flex-1 w-full bg-[#020B1A] p-3 sm:p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;