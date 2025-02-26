import React from "react";
import { Link } from "react-router-dom";

function Card({ label, href, active }) {
  return (
    <Link
      key={label}
      to={href}
      className={`font-bold text-lg rounded px-3 ${
        active && "text-blue-500"
      }`}
    >
      {label}
    </Link>
  );
}

export default Card;