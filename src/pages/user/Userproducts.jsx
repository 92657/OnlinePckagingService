import React from "react";
import {
  Truck,
  Box,
  Package,
 CircleDot,
  ShieldCheck,
} from "lucide-react";

const UserProducts = () => {
  const products = [
    {
      id: 1,
      name: "Mini Truck",
      price: "₹2000",
      description: "Perfect for small shifting",
      icon: <Truck size={45} />,
    },
    {
      id: 2,
      name: "Medium Truck",
      price: "₹4000",
      description: "Best for apartments",
      icon: <Truck size={45} />,
    },
    {
      id: 3,
      name: "Large Truck",
      price: "₹7000",
      description: "Ideal for large house moving",
      icon: <Truck size={45} />,
    },
    {
      id: 4,
      name: "Small Box",
      price: "₹100",
      description: "Ideal for small items",
      icon: <Box size={40} />,
    },
    {
      id: 5,
      name: "Bubble Wrap",
      price: "₹150",
      description: "Protect fragile items",
      icon: <ShieldCheck size={40} />,
    },
    {
      id: 6,
      name: "Tape Roll",
      price: "₹50",
      description: "Strong adhesive tape",
      icon: <CircleDot size={40} />,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Our Services & Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 text-center"
          >
            <div className="flex justify-center mb-4">
              {product.icon}
            </div>

            <h3 className="font-semibold text-lg">
              {product.name}
            </h3>

            <p className="text-slate-400">
              {product.description}
            </p>

            <p className="mt-3 font-semibold text-blue-400">
              {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;