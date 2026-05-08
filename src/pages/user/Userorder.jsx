import React, { useEffect, useState } from "react";

import {
  Trash2,
  Truck,
  MapPin,
  Package,
  CreditCard,
} from "lucide-react";

import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { db, auth } from "../../firebase/Firebase";

const Userorder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "orders"),
      where(
        "userId",
        "==",
        auth.currentUser.uid
      )
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt:
              doc.data().createdAt
                ?.toDate()
                .toLocaleString() || "",
          }));

        setOrders(fetchedOrders);
      }
    );

    return () => unsubscribe();
  }, []);

  /* 🗑 Delete Order */
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "orders", id));

      alert("Order deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting order:",
        error
      );

      alert("Failed to delete order.");
    }
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        My Orders
      </h2>

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

              {/* Header */}
              <div className="flex justify-between items-start mb-4">

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Truck size={20} />
                    {order.truckType}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    {order.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  {/* Order Status */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full capitalize ${
                      order.status ===
                      "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {order.status}
                  </span>

                  {/* Payment Badge */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      order.paymentMethod ===
                      "UPI"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {order.paymentMethod ===
                    "UPI"
                      ? "Paid"
                      : "COD"}
                  </span>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(order.id)
                    }
                    className="text-red-400 hover:text-red-500 transition"
                    title="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-2 mb-4">

                <div className="flex items-center gap-2 text-slate-300">

                  <MapPin
                    size={16}
                    className="text-green-400"
                  />

                  <span>
                    <span className="font-semibold">
                      From:
                    </span>{" "}
                    {order.from}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">

                  <MapPin
                    size={16}
                    className="text-red-400"
                  />

                  <span>
                    <span className="font-semibold">
                      To:
                    </span>{" "}
                    {order.to}
                  </span>
                </div>
              </div>

              {/* Distance */}
              <p className="text-sm text-slate-400 mb-4">
                Distance:
                <span className="text-white ml-2">
                  {order.distance} KM
                </span>
              </p>

              {/* Payment Details */}
              <div className="mb-4 bg-[#020617] border border-slate-800 rounded-lg p-4">

                <div className="flex items-center gap-2 mb-2">
                  <CreditCard
                    size={18}
                    className="text-blue-400"
                  />

                  <p className="font-semibold">
                    Payment Details
                  </p>
                </div>

                <p className="text-sm text-slate-400">
                  Method:
                  <span className="text-white font-semibold ml-2">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Status:
                  <span
                    className={`ml-2 font-semibold ${
                      order.paymentMethod ===
                      "UPI"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.paymentMethod ===
                    "UPI"
                      ? "Paid"
                      : "Pending (COD)"}
                  </span>
                </p>
              </div>

              {/* Packaging Items */}
              {order.packagingItems &&
                order.packagingItems.length >
                  0 && (
                  <div className="mb-4">

                    <p className="font-semibold flex items-center gap-2 mb-2">
                      <Package size={16} />
                      Packaging Items
                    </p>

                    <div className="space-y-2">

                      {order.packagingItems.map(
                        (
                          item,
                          index
                        ) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm text-slate-300 bg-[#020617] px-3 py-2 rounded-lg"
                          >
                            <span>
                              {item.name}
                            </span>

                            <span>
                              Qty:
                              {" "}
                              {
                                item.quantity
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Price */}
              <div className="flex justify-between items-center border-t border-slate-700 pt-4">

                <p className="text-slate-400">
                  Total Price
                </p>

                <h3 className="text-2xl font-bold text-blue-400">
                  ₹ {order.price}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Userorder;