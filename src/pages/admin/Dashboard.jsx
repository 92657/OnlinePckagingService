import React, { useEffect, useState } from "react";
import {
  Package,
  IndianRupee,
  Users,
  Clock,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const statsInitial = [
  {
    title: "Total Orders",
    value: "0",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Revenue",
    value: "₹0",
    icon: IndianRupee,
    color: "bg-green-500",
  },
  {
    title: "Customers",
    value: "0",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Pending Orders",
    value: "0",
    icon: Clock,
    color: "bg-orange-500",
  },
];

const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-50";
    case "Processing":
      return "text-blue-600 bg-blue-50";
    case "Pending":
      return "text-orange-600 bg-orange-50";
    default:
      return "";
  }
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(statsInitial);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    // Real-time listener
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toLocaleString() || "",
      }));
      setOrders(fetchedOrders);

      // Update stats dynamically
      const totalOrders = fetchedOrders.length;
      const revenue = fetchedOrders.reduce(
        (acc, order) => acc + (order.price || 0) * (order.quantity || 1),
        0
      );
      const customers = [...new Set(fetchedOrders.map((o) => o.customer))].length;
      const pendingOrders = fetchedOrders.filter(
        (o) => o.status === "Pending" || o.status === "Processing"
      ).length;

      setStats([
        { ...statsInitial[0], value: totalOrders },
        { ...statsInitial[1], value: `₹${revenue.toLocaleString()}` },
        { ...statsInitial[2], value: customers },
        { ...statsInitial[3], value: pendingOrders },
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 text-sm">
          Overview of all user orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-500">{item.title}</p>
              <h3 className="text-2xl font-semibold text-slate-800">{item.value}</h3>
            </div>
            <div className={`p-3 rounded-lg text-white ${item.color}`}>
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3 text-left">Order ID</th>
                <th className="px-5 py-3 text-left">Customer</th>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Quantity</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Ordered On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-3 font-medium text-slate-800">{order.id}</td>
                  <td className="px-5 py-3">{order.customer}</td>
                  <td className="px-5 py-3">{order.product}</td>
                  <td className="px-5 py-3">{order.quantity}</td>
                  <td className="px-5 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
