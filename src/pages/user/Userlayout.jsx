import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./Usernavbar";
import UserSidebar from "./Usersidebar";


const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      <UserSidebar/>

      <div className="flex-1 flex flex-col">
        <UserNavbar/>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
