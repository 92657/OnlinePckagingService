// src/pages/Admin/Orders.jsx

import React, { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  Truck,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";

import { db } from "../../firebase/Firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersCollection =
      collection(db, "orders");

    const unsubscribe = onSnapshot(
      ordersCollection,
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

  /* Update Status */
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await updateDoc(
        doc(db, "orders", id),
        {
          status,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* Pending Orders */
  const pendingOrders = orders.filter(
    (order) =>
      order.status === "pending"
  );

  /* Delivered Orders */
  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "delivered"
    );

  /* Order Card */
  const OrderCard = ({
    order,
    delivered = false,
  }) => (
    <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">

      {/* Header */}
      <div className="flex justify-between items-start mb-4">

        <div>
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Truck size={20} />
            {order.truckType}
          </h2>

          <p className="text-sm text-gray-500">
            {order.createdAt}
          </p>
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full capitalize ${
            delivered
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Locations */}
      <div className="space-y-2 mb-4">

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin
            size={16}
            className="text-green-500"
          />

          <span>
            <span className="font-semibold">
              From:
            </span>{" "}
            {order.from}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin
            size={16}
            className="text-red-500"
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
      <p className="text-sm text-gray-600 mb-3">
        Distance:
        <span className="font-semibold ml-2">
          {order.distance} KM
        </span>
      </p>

      {/* Payment */}
      <div className="mb-4 bg-gray-100 rounded-xl p-3">

        <div className="flex items-center gap-2 mb-2">
          <CreditCard
            size={16}
            className="text-blue-500"
          />

          <p className="font-semibold">
            Payment
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Method:
          <span className="font-semibold ml-2">
            {order.paymentMethod}
          </span>
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Status:
          <span
            className={`ml-2 font-semibold ${
              order.paymentMethod ===
              "UPI"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {order.paymentMethod ===
            "UPI"
              ? "Paid"
              : "Pending (COD)"}
          </span>
        </p>
      </div>

      {/* Packaging */}
      {order.packagingItems &&
        order.packagingItems.length >
          0 && (
          <div className="mb-4">

            <div className="flex items-center gap-2 mb-2">
              <Package
                size={16}
                className="text-purple-500"
              />

              <p className="font-semibold">
                Packaging Items
              </p>
            </div>

            <div className="space-y-2">

              {order.packagingItems.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-100 rounded-lg px-3 py-2 text-sm"
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
      <div className="flex justify-between items-center border-t pt-4">

        <div>
          <p className="text-gray-500 text-sm">
            Total Price
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            ₹ {order.price}
          </h3>
        </div>

        {/* Deliver Button */}
        {!delivered && (
          <button
            onClick={() =>
              updateStatus(
                order.id,
                "delivered"
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            Mark Delivered
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Orders Kanban
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all moving orders
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl shadow text-gray-700 font-semibold">
          Total Orders:
          {" "}
          {orders.length}
        </div>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pending */}
        <div className="bg-[#FEFCE8] rounded-2xl p-4 border border-yellow-200">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold text-yellow-700">
              Pending Orders
            </h2>

            <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
              {
                pendingOrders.length
              }
            </span>
          </div>

          <div className="space-y-4">

            {pendingOrders.length ===
            0 ? (
              <div className="text-center text-gray-500 py-10">
                No pending orders
              </div>
            ) : (
              pendingOrders.map(
                (order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                  />
                )
              )
            )}
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-[#F0FDF4] rounded-2xl p-4 border border-green-200">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold text-green-700">
              Delivered Orders
            </h2>

            <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
              {
                deliveredOrders.length
              }
            </span>
          </div>

          <div className="space-y-4">

            {deliveredOrders.length ===
            0 ? (
              <div className="text-center text-gray-500 py-10">
                No delivered orders
              </div>
            ) : (
              deliveredOrders.map(
                (order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    delivered
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;