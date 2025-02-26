import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../common/Card";

function Navbar() {
  const path = [
    { label: "Home", href: "/", active: useLocation().pathname === "/" },
    {
      label: "Services",
      href: "/services",
      active: useLocation().pathname === "/services",
    },
    {
      label: "Products",
      href: "/products",
      active: useLocation().pathname === "/products",
    },
    {
      label: "Research",
      href: "/research",
      active: useLocation().pathname === "/research",
    },
  ];

  return (
    <nav className="flex items-center px-6 py-4 bg-slate-300">
      <div className="w-full ">
        {path.map((item) => (
          <Card key={item.label} {...item} />
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
