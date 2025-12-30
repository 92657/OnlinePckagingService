import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";

/* 🚚 Truck options */
const trucks = [
  { id: 1, name: "Mini Truck", basePrice: 2000 },
  { id: 2, name: "Medium Truck", basePrice: 4000 },
  { id: 3, name: "Large Truck", basePrice: 7000 },
];

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 🌍 Convert place name to coordinates using OpenStreetMap */
  const getCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place
      )}&format=json`
    );
    const data = await res.json();
    if (!data.length) throw new Error("Location not found");
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  /* 📏 Calculate distance using Haversine formula */
  const calculateDistance = async () => {
    if (!from || !to) {
      alert("Enter both locations");
      return;
    }

    setLoading(true);
    try {
      const [lat1, lon1] = await getCoords(from);
      const [lat2, lon2] = await getCoords(to);

      const toRad = (x) => (x * Math.PI) / 180;
      const R = 6371; // km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

  /* 💰 Calculate price */
  const calculatePrice = (truck) => {
    if (!distance) {
      alert("Calculate distance first");
      return;
    }
    const total = truck.basePrice + distance * 20; // ₹20 per km
    setSelectedTruck(truck);
    setPrice(total);
  };

  /* 📦 Submit order to Firebase */
  const handleSubmit = async () => {
    if (!auth.currentUser) {
      alert("Login required");
      return;
    }

    if (!from || !to || !distance || !selectedTruck) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        from,
        to,
        distance: Number(distance),
        truckType: selectedTruck.name,
        price,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully!");
      navigate("/user/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-[#0F172A] p-6 rounded-xl text-white">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Place Moving Order
        </h2>

        {/* Locations */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            placeholder="From location"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-[#020617] border border-slate-700 rounded px-3 py-2"
          />
          <input
            placeholder="To location"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-[#020617] border border-slate-700 rounded px-3 py-2"
          />
          <button
            onClick={calculateDistance}
            className="bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? "Calculating..." : "Calculate Distance"}
          </button>
        </div>

        {distance && (
          <p className="text-center mb-4">
            Distance: <b className="text-blue-400">{distance} KM</b>
          </p>
        )}

        {/* Trucks */}
        <div className="grid md:grid-cols-3 gap-4">
          {trucks.map((truck) => (
            <div
              key={truck.id}
              onClick={() => calculatePrice(truck)}
              className={`cursor-pointer p-4 rounded border ${
                selectedTruck?.id === truck.id
                  ? "border-blue-500"
                  : "border-slate-700"
              }`}
            >
              <p className="text-center">{truck.name}</p>
            </div>
          ))}
        </div>

        {price && (
          <div className="mt-6 text-center">
            <p className="text-slate-400">Estimated Price</p>
            <h3 className="text-2xl text-blue-400 font-bold">₹ {price}</h3>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
