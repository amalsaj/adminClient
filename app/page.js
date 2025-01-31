"use client";
import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { url } from "./utils/url";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setIsLoginFailed(false);

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setIsLoginFailed(true);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfull! 🎉");
      setTimeout(() => redirect("/dashboard"), 1000);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Incorrect email or password."
        );
        setPasswordError("Incorrect email or password.");
      } else {
        toast.error("Temporary error. Please try again later.");
      }
      setIsLoginFailed(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen bg-[#fdf5e9] flex flex-col items-center justify-center relative">
        <Header />
        <div className="w-full max-w-md text-black p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-center text-3xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
                  isLoginFailed && (emailError || passwordError)
                    ? "border-red-500"
                    : "focus:ring-orange-500"
                } hover:border-orange-400`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                autoComplete="off"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className={`w-full border p-3 rounded focus:outline-none focus:ring-2 ${
                  isLoginFailed && (passwordError || emailError)
                    ? "border-red-500"
                    : "focus:ring-orange-500"
                } hover:border-orange-400`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-3xl bg-orange-300 text-white flex justify-center items-center hover:bg-orange-400 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <h1 className="text-sm text-gray-800">
              <a href="/reset-password">Forgot Your Password?</a>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
