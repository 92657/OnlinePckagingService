import React from "react";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`w-full ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Online Packaging Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
