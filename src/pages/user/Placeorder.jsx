import React, { useState } from "react";

import {
  Truck,
  Package,
  Box,
  CircleDot,
  ShieldCheck,
  X,
} from "lucide-react";

import { QRCodeCanvas } from "qrcode.react";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../../firebase/Firebase";

import { useNavigate } from "react-router-dom";

/* 🚚 Truck options */
const trucks = [
  {
    id: 1,
    name: "Mini Truck",
    basePrice: 2000,
    icon: <Truck size={40} />,
  },
  {
    id: 2,
    name: "Medium Truck",
    basePrice: 4000,
    icon: <Truck size={45} />,
  },
  {
    id: 3,
    name: "Large Truck",
    basePrice: 7000,
    icon: <Truck size={50} />,
  },
];

/* 📦 Packaging Items */
const packagingItems = [
  {
    id: 1,
    name: "Small Box",
    price: 100,
    icon: <Box size={35} />,
  },
  {
    id: 2,
    name: "Medium Box",
    price: 200,
    icon: <Package size={35} />,
  },
  {
    id: 3,
    name: "Bubble Wrap",
    price: 150,
    icon: <ShieldCheck size={35} />,
  },
  {
    id: 4,
    name: "Tape Roll",
    price: 50,
    icon: <CircleDot size={35} />,
  },
];

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");

  const [to, setTo] = useState("");

  const [distance, setDistance] =
    useState(null);

  const [selectedTruck, setSelectedTruck] =
    useState(null);

  const [selectedItems, setSelectedItems] =
    useState({});

  const [price, setPrice] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [
    showPaymentModal,
    setShowPaymentModal,
  ] = useState(false);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("");

  /* 🌍 Get Coordinates */
  const getCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place
      )}&format=json`
    );

    const data = await res.json();

    if (!data.length) {
      throw new Error("Location not found");
    }

    return [
      parseFloat(data[0].lat),
      parseFloat(data[0].lon),
    ];
  };

  /* 📏 Distance Calculation */
  const calculateDistance = async () => {
    if (!from || !to) {
      alert("Enter both locations");
      return;
    }

    setLoading(true);

    try {
      const [lat1, lon1] =
        await getCoords(from);

      const [lat2, lon2] =
        await getCoords(to);

      const toRad = (x) =>
        (x * Math.PI) / 180;

      const R = 6371;

      const dLat = toRad(lat2 - lat1);

      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;

      const c =
        2 *
        Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      const km = (R * c).toFixed(1);

      setDistance(km);

      setSelectedTruck(null);

      setPrice(null);
    } catch (err) {
      console.error(err);

      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* 💰 Price Calculation */
  const calculatePrice = (
    truck,
    items = selectedItems
  ) => {
    if (!distance) {
      alert("Calculate distance first");
      return;
    }

    let packagingTotal = 0;

    packagingItems.forEach((item) => {
      const qty = items[item.id] || 0;

      packagingTotal +=
        qty * item.price;
    });

    const total =
      truck.basePrice +
      Number(distance) * 20 +
      packagingTotal;

    setSelectedTruck(truck);

    setPrice(total);
  };

  /* ➕ Increase Qty */
  const increaseQty = (item) => {
    const updated = {
      ...selectedItems,
      [item.id]:
        (selectedItems[item.id] || 0) +
        1,
    };

    setSelectedItems(updated);

    if (selectedTruck) {
      calculatePrice(
        selectedTruck,
        updated
      );
    }
  };

  /* ➖ Decrease Qty */
  const decreaseQty = (item) => {
    const currentQty =
      selectedItems[item.id] || 0;

    if (currentQty === 0) return;

    const updated = {
      ...selectedItems,
      [item.id]: currentQty - 1,
    };

    setSelectedItems(updated);

    if (selectedTruck) {
      calculatePrice(
        selectedTruck,
        updated
      );
    }
  };

  /* 📦 Save Order */
  const placeOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,

        from,

        to,

        distance: Number(distance),

        truckType: selectedTruck.name,

        packagingItems: packagingItems
          .filter(
            (item) =>
              selectedItems[item.id] > 0
          )
          .map((item) => ({
            name: item.name,
            quantity:
              selectedItems[item.id],
          })),

        paymentMethod,

        price,

        status: "pending",

        createdAt: serverTimestamp(),
      });

      alert(
        "Order placed successfully!"
      );

      navigate("/user/orders");
    } catch (err) {
      console.error(err);

      alert("Failed to place order");
    }
  };

  /* Open Payment Modal */
  const handleSubmit = () => {
    if (!auth.currentUser) {
      alert("Login required");
      return;
    }

    if (
      !from ||
      !to ||
      !distance ||
      !selectedTruck
    ) {
      alert("Fill all fields");
      return;
    }

    setShowPaymentModal(true);
  };

  /* Fake UPI */
  const upiLink = `upi://pay?pa=yourupiid@okhdfcbank&pn=Yuvraj Thakkar&am=${price}&cu=INR&tn=Moving Service Payment`;

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center px-4 py-8">

      <div className="w-full max-w-5xl bg-[#0F172A] p-6 rounded-xl text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Place Moving Order
        </h2>

        {/* Locations */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <input
            placeholder="From location"
            value={from}
            onChange={(e) =>
              setFrom(e.target.value)
            }
            className="bg-[#020617] border border-slate-700 rounded px-3 py-2"
          />

          <input
            placeholder="To location"
            value={to}
            onChange={(e) =>
              setTo(e.target.value)
            }
            className="bg-[#020617] border border-slate-700 rounded px-3 py-2"
          />

          <button
            onClick={calculateDistance}
            className="bg-blue-600 rounded hover:bg-blue-700 py-2"
          >
            {loading
              ? "Calculating..."
              : "Calculate Distance"}
          </button>
        </div>

        {/* Distance */}
        {distance && (
          <p className="text-center mb-6">
            Distance:
            <span className="text-blue-400 font-bold">
              {" "}
              {distance} KM
            </span>
          </p>
        )}

        {/* Trucks */}
        <h3 className="text-lg font-semibold mb-3">
          Select Truck
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          {trucks.map((truck) => (
            <div
              key={truck.id}
              onClick={() =>
                calculatePrice(truck)
              }
              className={`cursor-pointer p-5 rounded-xl border text-center transition-all ${
                selectedTruck?.id ===
                truck.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700"
              }`}
            >
              <div className="flex justify-center mb-3">
                {truck.icon}
              </div>

              <p className="font-semibold">
                {truck.name}
              </p>

              <p className="text-slate-400">
                ₹{truck.basePrice}
              </p>
            </div>
          ))}
        </div>

        {/* Packaging */}
        <h3 className="text-lg font-semibold mb-3">
          Packaging Items
        </h3>

        <div className="grid md:grid-cols-4 gap-4">

          {packagingItems.map((item) => {
            const qty =
              selectedItems[item.id] || 0;

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-700 text-center"
              >
                <div className="flex justify-center mb-2">
                  {item.icon}
                </div>

                <p>{item.name}</p>

                <p className="text-slate-400 mb-3">
                  ₹{item.price}
                </p>

                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() =>
                      decreaseQty(item)
                    }
                    className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">
                    {qty}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item)
                    }
                    className="bg-green-500 hover:bg-green-600 w-8 h-8 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price */}
        {price && (
          <div className="mt-8 text-center">

            <p className="text-slate-400">
              Estimated Price
            </p>

            <h3 className="text-3xl text-blue-400 font-bold">
              ₹ {price}
            </h3>
          </div>
        )}

        {/* Confirm */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          Confirm Order
        </button>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#0F172A] w-full max-w-md rounded-2xl p-6 text-white relative">

            {/* Close */}
            <button
              onClick={() =>
                setShowPaymentModal(false)
              }
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Select Payment Method
            </h2>

            {/* COD */}
            <button
              onClick={() => {
                setPaymentMethod(
                  "Cash on Delivery"
                );

                placeOrder();
              }}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl mb-4"
            >
              Cash on Delivery
            </button>

            {/* UPI */}
            <button
              onClick={() =>
                setPaymentMethod("UPI")
              }
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl"
            >
              Pay via UPI
            </button>

            {/* QR */}
            {paymentMethod === "UPI" && (
              <div className="mt-6 text-center">

                <div className="bg-white p-4 rounded-xl inline-block">
                  <QRCodeCanvas
                    value={upiLink}
                    size={220}
                  />
                </div>

                <p className="mt-4 text-slate-400">
                  Scan QR using any UPI app
                </p>

                <p className="mt-2">
                  UPI ID:
                </p>

                <p className="text-blue-400 font-bold">
                  demo@upi
                </p>

                <p className="text-3xl font-bold text-blue-400 mt-3">
                  ₹ {price}
                </p>

                <button
                  onClick={placeOrder}
                  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl"
                >
                  I Have Paid
                </button>

                <p className="text-xs text-slate-500 mt-3">
                  Demo payment only —
                  no actual money will
                  be deducted.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;