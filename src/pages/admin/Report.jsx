// src/pages/Admin/Reports.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Reports = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const totalOrders = orders.length;
      const completed = orders.filter(o => o.status === "completed").length;
      const pending = orders.filter(o => o.status === "pending").length;
      const cancelled = orders.filter(o => o.status === "cancelled").length;
      const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);

      setStats({ totalOrders, completed, pending, cancelled, totalRevenue });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Total Orders</p>
          <h2 className="text-2xl font-bold text-blue-600">{stats.totalOrders}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Completed Orders</p>
          <h2 className="text-2xl font-bold text-green-600">{stats.completed}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Pending Orders</p>
          <h2 className="text-2xl font-bold text-yellow-600">{stats.pending}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Cancelled Orders</p>
          <h2 className="text-2xl font-bold text-red-600">{stats.cancelled}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">₹{stats.totalRevenue}</h2>
        </div>
      </div>
    </div>
  );
};

export default Reports;
