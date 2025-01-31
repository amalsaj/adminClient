"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import emailjs from "emailjs-com";
import { url } from "../utils/url";

function Page() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setEmailError("");

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }

      setIsSubmitting(true);

      const response = await axios.post(`${url}/auth/sendResetMail`, { email });

      if (response.status === 200) {
        const resetLink = response.data.resetUrl;
        const templateParams = {
          user_email: email,
          reset_link: resetLink,
        };
        emailjs
          .send(
            "service_6jwnusv",
            "template_saa6u9a",
            templateParams,
            "R54vonq60--MSFUad"
          )
          .then(
            (response) => {
              toast.success("Password reset link has been sent to your email.");
              setIsSubmitting(false);
            },
            (error) => {
              toast.error("Failed to send the email. Please try again.");
              console.error(error);
              setIsSubmitting(false);
            }
          );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#fdf5e9] flex flex-col items-center justify-center relative">
      <Header />
      <div className="w-full max-w-md text-black p-6">
        <form onSubmit={handleResetPassword} className="space-y-6">
          <h2 className="text-center text-3xl font-bold mb-4">
            Password Reset
          </h2>
          <p className="text-center text-sm text-gray-600 mb-10">
            Please enter the email address you are currently using. We will send
            you a URL to reset your password.
          </p>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                className={`w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-400 
                  ${emailError ? "border-red-500" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                autoComplete="off"
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-3xl bg-orange-300 text-white flex justify-center items-center hover:bg-orange-400 transition duration-300 
              ${isSubmitting ? "bg-orange-200 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Sending..." : "Send URL for Password Reset"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <h1 className="text-sm text-gray-800">
            <a href="/login">Return to Login</a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
