// src/pages/Admin/Teams.jsx

import React from "react";

import {
  ShieldCheck,
  UserCog,
  Package,
  Truck,
  Headphones,
  Warehouse,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Admin",
    status: "Active",
    icon: ShieldCheck,
  },

  {
    id: 2,
    name: "Amit Patel",
    role: "Operations Manager",
    status: "Active",
    icon: UserCog,
  },

  {
    id: 3,
    name: "Sneha Verma",
    role: "Packaging Staff",
    status: "Active",
    icon: Package,
  },

  {
    id: 4,
    name: "Rohit Kumar",
    role: "Delivery Coordinator",
    status: "Inactive",
    icon: Truck,
  },

  {
    id: 5,
    name: "Neha Singh",
    role: "Customer Support",
    status: "Active",
    icon: Headphones,
  },

  {
    id: 6,
    name: "Vikas Mehta",
    role: "Warehouse Supervisor",
    status: "Active",
    icon: Warehouse,
  },
];

const Teams = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 sm:p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Team Members
          </h1>

          <p className="text-slate-400 mt-1">
            Manage all company staff
          </p>
        </div>

        <div className="bg-[#0F172A] border border-slate-800 px-4 py-2 rounded-xl text-slate-300 font-semibold">
          Total Members: {teamMembers.length}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
          >
            
            {/* Top */}
            <div className="flex items-start justify-between mb-5">

              <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
                <member.icon size={24} />
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  member.status === "Active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {member.status}
              </span>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>

              <p className="text-slate-400 mt-2">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;