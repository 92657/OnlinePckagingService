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
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Revenue",
    value: "₹0",
    icon: IndianRupee,
    color: "bg-green-500/20 text-green-400",
  },
  {
    title: "Customers",
    value: "0",
    icon: Users,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Pending Orders",
    value: "0",
    icon: Clock,
    color: "bg-orange-500/20 text-orange-400",
  },
];

const statusColor = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-400 bg-green-500/10";

    case "Processing":
      return "text-blue-400 bg-blue-500/10";

    case "Pending":
      return "text-orange-400 bg-orange-500/10";

    default:
      return "text-slate-300 bg-slate-700";
  }
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(statsInitial);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");

    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate().toLocaleString() || "",
      }));

      setOrders(fetchedOrders);

      // Stats
      const totalOrders = fetchedOrders.length;

      const revenue = fetchedOrders.reduce(
        (acc, order) =>
          acc + (order.price || 0) * (order.quantity || 1),
        0
      );

      const customers = [
        ...new Set(fetchedOrders.map((o) => o.customer)),
      ].length;

      const pendingOrders = fetchedOrders.filter(
        (o) =>
          o.status === "Pending" ||
          o.status === "Processing"
      ).length;

      setStats([
        { ...statsInitial[0], value: totalOrders },
        {
          ...statsInitial[1],
          value: `₹${revenue.toLocaleString()}`,
        },
        { ...statsInitial[2], value: customers },
        { ...statsInitial[3], value: pendingOrders },
      ]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Overview of all user orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#0F172A] rounded-xl border border-slate-800 p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-400">
                {item.title}
              </p>

              <h3 className="text-2xl font-semibold text-white">
                {item.value}
              </h3>
            </div>

            <div
              className={`p-3 rounded-xl ${item.color}`}
            >
              <item.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-[#0F172A] rounded-xl border border-slate-800 overflow-hidden">
        
        {/* Table Header */}
        <div className="p-5 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white">
            Recent Orders
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            
            <thead className="bg-[#111827] text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left">
                  Order ID
                </th>

                <th className="px-5 py-4 text-left">
                  Customer
                </th>

                <th className="px-5 py-4 text-left">
                  Product
                </th>

                <th className="px-5 py-4 text-left">
                  Quantity
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-left">
                  Ordered On
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-slate-800 hover:bg-[#111827] transition"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {order.id}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {order.customer}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {order.product}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {order.quantity}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {order.createdAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;