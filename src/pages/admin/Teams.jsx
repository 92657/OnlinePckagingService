// src/pages/Admin/Teams.jsx
import React from "react";

const teamMembers = [
  { id: 1, name: "Rahul Sharma", role: "Admin", status: "Active" },
  { id: 2, name: "Amit Patel", role: "Operations Manager", status: "Active" },
  { id: 3, name: "Sneha Verma", role: "Packaging Staff", status: "Active" },
  { id: 4, name: "Rohit Kumar", role: "Delivery Coordinator", status: "Inactive" },
  { id: 5, name: "Neha Singh", role: "Customer Support", status: "Active" },
  { id: 6, name: "Vikas Mehta", role: "Warehouse Supervisor", status: "Active" },
];

const Teams = () => {
  return (
    <div className="p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <span className="text-sm text-gray-500">
          Total Members: {teamMembers.length}
        </span>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{member.role}</p>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                member.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
