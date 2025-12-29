// src/pages/Admin/Orders.jsx
import React, { useEffect, useState } from "react";
import OrderCard from "../../components/cards/Ordercard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Orders = () => {
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

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <span className="text-sm text-gray-500">Total Orders: {orders.length}</span>
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No orders found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              orderId={order.id}
              customer={order.customer}
              service={order.product} 
              amount={order.price || 0} 
              status={order.status}
              date={order.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
