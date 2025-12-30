import React from "react";
import { Link } from "react-router-dom";
import { Package, Truck, ShieldCheck, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart & Reliable Packaging Solutions
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-8">
          Order high-quality packaging materials online and get them delivered
          fast, safe, and affordable — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="border border-slate-700 hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-4">
        <Feature
          icon={<Package size={32} />}
          title="Quality Packaging"
          desc="Strong, durable and eco-friendly packaging materials."
        />
        <Feature
          icon={<Truck size={32} />}
          title="Fast Delivery"
          desc="Quick delivery to your doorstep without delays."
        />
        <Feature
          icon={<ShieldCheck size={32} />}
          title="Secure Orders"
          desc="Your orders are safe and tracked at every step."
        />
        <Feature
          icon={<Clock size={32} />}
          title="24/7 Service"
          desc="Order anytime, from anywhere with ease."
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#020617] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Step
              number="01"
              title="Create Account"
              desc="Sign up and login to access all services."
            />
            <Step
              number="02"
              title="Place Order"
              desc="Choose packaging materials and submit your order."
            />
            <Step
              number="03"
              title="Fast Delivery"
              desc="We pack and deliver straight to your location."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Pack And Move Your Stuff?
        </h2>
        <p className="text-slate-400 mb-6">
          Join today and simplify your packaging needs.
        </p>

        <Link
          to="/register"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium"
        >
          Start Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Online Packaging Service. All rights reserved.
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800 text-center">
    <div className="flex justify-center mb-4 text-blue-500">{icon}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="bg-[#0F172A] p-6 rounded-xl border border-slate-800 text-center">
    <div className="text-blue-500 font-bold text-xl mb-2">{number}</div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-slate-400">{desc}</p>
  </div>
);

export default Home;
