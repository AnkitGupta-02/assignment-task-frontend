import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import one from "../../assets/one.jpeg";

import Input from "../common/Input";
import Button from "../common/Button";
import Loading from "../common/Loading";

import { loginAdmin } from "../../Services/admin-api";

function LoginForm() {
  const [isLoading, setIsLoading ] = useState(false);
  const [value, setValue] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await loginAdmin(value);
      if (response) {
        toast.success("Login Successful", { autoClose: 2000 });
      }
      navigate("/");
      setValue({ username: "", password: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="flex w-full w-md:w-[400px] lg:w-[512px] h-2/6 md:h-full">
        <img src={one} className="object-cover w-full h-full" /> 
      </div>
      <div className="w-md:w-5/6 lg:w-[calc(100vw-512px)] flex md:justify-start justify-center items-center p-8">
        <form onSubmit={handleSubmit}>
          <div className="px-3 py-2">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-gray-600 ">Log in to access your account.</p>
          </div>
          <Input
            type="text"
            name="username"
            value={value.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <Input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <div className="flex items-center justify-between">
            <Link className="pr-3 text-blue-500">Forget?</Link>
          </div>
          <Button
            className={`text-lg border-none text-white rounded-md bg-[#2A2D34] flex items-center justify-center ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "LOGIN"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;