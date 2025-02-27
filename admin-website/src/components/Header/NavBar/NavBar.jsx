import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../common/Card";
import Profile from "./Profile/Profile";
import { logout } from "../../../apis/Admin-api";

function Navbar({ data }) {
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("logout Successful", { autoClose: 2000 });
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <nav className="flex items-center px-6 py-4 bg-slate-300">
      <div className="w-full ">
        {path.map((item) => (
          <Card key={item.label} {...item} />
        ))}
      </div>
      <Profile username={data?.username} onLogout={handleLogout} />
    </nav>
  );
}

export default Navbar;
