"use client";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import { toast} from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import axios from "axios";
import { url } from "@/app/utils/url";

const PasswordSetup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;

  const { token } = useParams();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!passwordRegex.test(newPassword)) {
      setPasswordError("Must be 8-20 characters long and include uppercase, lowercase letters, and a number");
    } else {
      setPasswordError("");
    }
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
    return password === confirmPassword;
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);
    checkPasswordsMatch(password, confirmPasswordInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token!");
      return;
    }

    if (!checkPasswordsMatch(password, confirmPassword)) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${url}/auth/resetPassword`,
        { password },
        { headers: { "Content-Type": "application/json" }, params: { token } }
      );

      if (res.status === 200) {
        toast.success("Password set successfully 🎉");
        setTimeout(() => redirect("/"), 2000);
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error setting password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#fdf5e9] flex flex-col items-center justify-center relative">
      <Header />
      <div className="w-full max-w-xl text-black">
        <form className="p-6" onSubmit={handleSubmit}>
          <h2 className="text-center text-3xl font-bold mb-2">
            Set Password
          </h2>
          <p className="text-center text-sm text-gray-600 mb-10">
            Enter your password and click "Set"
          </p>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="w-full border p-2 rounded focus:outline-none hover:border-orange-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-600"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-600 mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full border p-2 rounded focus:outline-none hover:border-orange-400"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 text-gray-600"
              >
                {confirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-xs text-red-600 mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={password !== confirmPassword || passwordError}
            className={`w-full py-2 rounded ${
              password !== confirmPassword || passwordError
                ? "bg-gray-400"
                : "bg-orange-300"
            } text-white flex justify-center items-center hover:bg-orange-400`}
          >
            {loading ? (
              <div className="animate-spin rounded-full border-t-2 border-white w-6 h-6 mr-2"></div>
            ) : (
              "Set"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return showLoader ? <Loader /> : <PasswordSetup />;
}
