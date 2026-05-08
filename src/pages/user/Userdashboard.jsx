import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ClipboardList, Truck } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    // Real-time listener
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // Calculate stats dynamically
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const deliveredOrders = orders.filter(order => order.status === "delivered").length;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold mb-1">
          Welcome to your Dashboard 👋
        </h2>
        <p className="text-slate-400 text-sm">
          Manage your packaging orders and track deliveries easily.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
            <Package size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Total Orders</p>
            <p className="text-lg font-semibold">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400">
            <ClipboardList size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Pending Orders</p>
            <p className="text-lg font-semibold">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
            <Truck size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-400">Delivered</p>
            <p className="text-lg font-semibold">{deliveredOrders}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/user/place-order"
            className="bg-[#2563EB] px-5 py-2 rounded-md text-sm hover:bg-[#1E40AF] transition"
          >
            Place New Order
          </Link>

          <Link
            to="/user/orders"
            className="bg-slate-800 px-5 py-2 rounded-md text-sm hover:bg-slate-700 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
