// src/pages/Admin/Reports.jsx

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  Package,
  CheckCircle,
  Clock,
  XCircle,
  IndianRupee,
} from "lucide-react";

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
    const ordersCollection =
      collection(db, "orders");

    const unsubscribe = onSnapshot(
      ordersCollection,
      (snapshot) => {
        const orders =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        const totalOrders =
          orders.length;

        const completed =
          orders.filter(
            (o) =>
              o.status ===
              "completed"
          ).length;

        const pending =
          orders.filter(
            (o) =>
              o.status ===
              "pending"
          ).length;

        const cancelled =
          orders.filter(
            (o) =>
              o.status ===
              "cancelled"
          ).length;

        const totalRevenue =
          orders.reduce(
            (sum, o) =>
              sum +
              (o.price || 0),
            0
          );

        setStats({
          totalOrders,
          completed,
          pending,
          cancelled,
          totalRevenue,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: Package,
      color:
        "bg-blue-500/20 text-blue-400",
    },

    {
      title: "Completed Orders",
      value: stats.completed,
      icon: CheckCircle,
      color:
        "bg-green-500/20 text-green-400",
    },

    {
      title: "Pending Orders",
      value: stats.pending,
      icon: Clock,
      color:
        "bg-yellow-500/20 text-yellow-400",
    },

    {
      title: "Cancelled Orders",
      value: stats.cancelled,
      icon: XCircle,
      color:
        "bg-red-500/20 text-red-400",
    },

    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: IndianRupee,
      color:
        "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 sm:p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Reports & Analytics
        </h1>

        <p className="text-slate-400 mt-2">
          Track business performance
          and order analytics
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map(
          (
            item,
            index
          ) => (
            <div
              key={index}
              className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 transition hover:border-slate-700"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm text-slate-400 mb-2">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`p-4 rounded-xl ${item.color}`}
                >
                  <item.icon
                    size={24}
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Reports;