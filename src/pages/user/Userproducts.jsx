import React from "react";

const UserProducts = () => {
  // Sample products for packaging service
  const products = [
    { id: 1, name: "Small Box", price: "$2", description: "Ideal for small items" },
    { id: 2, name: "Medium Box", price: "$4", description: "Medium items or gifts" },
    { id: 3, name: "Large Box", price: "$6", description: "Perfect for bulky items" },
    { id: 4, name: "Bubble Wrap Pack", price: "$3", description: "Protect fragile items" },
    { id: 5, name: "Tape Roll", price: "$1", description: "Strong adhesive tape" },
    { id: 6, name: "Envelope Pack", price: "$2", description: "For documents & letters" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Our Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#0F172A] p-5 rounded-xl border border-slate-800"
          >
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-slate-400">{product.description}</p>
            <p className="mt-2 font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
