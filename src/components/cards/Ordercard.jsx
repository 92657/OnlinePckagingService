// src/components/cards/OrderCard.jsx
import React from "react";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderCard = ({ orderId, customer, service, amount, status, date }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">
          Order #{orderId}
        </h3>

        <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="text-sm text-gray-600 space-y-1">
        <p><b>Customer:</b> {customer}</p>
        <p><b>Service:</b> {service}</p>
        <p><b>Date:</b> {date}</p>
      </div>

      {/* Amount */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">Amount</span>
        <span className="text-lg font-bold text-blue-600">
          ₹{amount}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
