import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/Firebase"; // 🔥 import auth
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");

  const products = [
    "Small Box",
    "Medium Box",
    "Large Box",
    "Bubble Wrap Pack",
    "Tape Roll",
    "Envelope Pack",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 HARD CHECK
    if (!auth.currentUser) {
      alert("Please login to place an order");
      return;
    }

    if (!product || !quantity || !address) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,   // 🔥 REQUIRED BY RULES
        product,
        quantity: Number(quantity),
        address,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully!");

      setProduct("");
      setQuantity("");
      setAddress("");

      navigate("/user/orders");
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="max-w-xl bg-[#0F172A] p-6 rounded-xl border border-slate-800">
      <h2 className="text-lg font-semibold mb-4">Place New Order</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full bg-[#020617] border border-slate-700 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Select Product</option>
          {products.map((p, index) => (
            <option key={index} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full bg-[#020617] border border-slate-700 rounded-md px-3 py-2 text-sm"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-[#020617] border border-slate-700 rounded-md px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-[#2563EB] px-4 py-2 rounded-md hover:bg-[#1E40AF] text-sm"
        >
          Submit Order 
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
