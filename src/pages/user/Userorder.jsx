import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Userorder = () => {
  const [orders, setOrders] = useState([]);

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
    });

    return () => unsubscribe(); // clean up listener
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order: ", error);
      alert("Failed to delete order.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">My Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800 text-slate-400">
          No orders placed yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0F172A] p-5 rounded-xl border border-slate-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{order.product}</h3>

                <div className="flex items-center gap-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                    {order.status}
                  </span>

                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-400 hover:text-red-500 transition"
                    title="Delete Order"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-400">Quantity: {order.quantity}</p>
              <p className="text-sm text-slate-400">Address: {order.address}</p>
              <p className="text-xs text-slate-500 mt-2">
                Ordered on {order.createdAt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Userorder;
