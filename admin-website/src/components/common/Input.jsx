import React, { useState } from "react";
import classNames from "classnames";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const finalclassName = classNames(
    "px-4 py-2 border border-gray-300 w-full rounded-md focus:outline-none",
    className
  );

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  if (type === "password") {
    return (
      <div className="flex justify-center px-3 py-2">
        <div className="flex items-center w-full bg-white border border-gray-300 rounded-md">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-md focus:outline-none"
            disabled={disabled}
          />
          <span className="py-2 pr-2">
            {(value.length > 0) && (showPassword ? (
              <FaEye onClick={handleClick} />
            ) : (
              <FaEyeSlash onClick={handleClick} />
            ))}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center px-3 py-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={finalclassName}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;