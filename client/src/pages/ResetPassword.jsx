import React, { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Remove error and success state variables as we'll use toast instead
  
  useEffect(() => {
    // Verify token validity on component mount
    const verifyToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/verify-reset-token/${token}`);
      } catch (err) {
        toast.error("Invalid or expired reset token. Please request a new password reset link.", {
          position: "top-right",
          autoClose: 5000
        });
        setTimeout(() => navigate("/forgot-password"), 5000);
      }
    };
    
    verifyToken();
  }, [token, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
        autoClose: 3000
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/reset-password/${token}`,
        { password }
      );

      if (response.data.success) {
        toast.success("Password reset successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000
        });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Invalid or expired token! Try resetting again.", {
          position: "top-right",
          autoClose: 5000
        });
      } else {
        toast.error(err.response?.data?.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 5000
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Toast Container */}
      <ToastContainer />
      
      {/* Left Section (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white">
        <h1
          className="md:hidden text-[32px] md:text-[64px] font-extrabold"
          style={{ fontFamily: "'Merriweather Sans'" }}
        >
          <span className="text-custom-purple">Stock</span>
          <span className="text-custom-blue">Sync</span>
        </h1>
        <p
          className="text-[24px] text-center mt-2"
          style={{ fontFamily: "'Nunito'" }}
        >
          Reset Password
        </p>
        <p
          className="text-[16px] text-center mt-2"
          style={{ fontFamily: "'Nunito'" }}
        >
          Set your new password.
        </p>

        <form
          className="w-full max-w-2xs mt-6 text-[14px]"
          style={{ fontFamily: "'Nunito'" }}
          onSubmit={handleSubmit}
        >
          {/* New Password */}
          <div className="relative mt-4 mb-8">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="pl-10 pr-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mt-4 mb-8">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="pl-10 pr-10 w-full py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Reset Password Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-1 text-[20px] font-bold bg-custom-purple text-white rounded-full shadow-md hover:bg-custom-purple"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            {loading ? "Resetting..." : "Confirm"}
          </button>
        </form>

        <p
          className="absolute text-[15px] font-semibold mt-4 left-5 md:left-20 bottom-5"
          style={{ fontFamily: "'Montserrat'" }}
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-custom-blue">
            Register
          </Link>
        </p>
      </div>

      {/* Right Section (Info) */}
      <div className="hidden lg:flex w-1/2 bg-custom-purple justify-center items-center p-10">
        <div className="text-left px-20">
          <h1
            className="text-[32px] md:text-[64px] md:text-[64px] font-extrabold"
            style={{ fontFamily: "'Merriweather Sans'" }}
          >
            <span className="text-white">Stock</span>
            <span className="text-custom-blue">Sync</span>
          </h1>
          <p
            className="mt-3 text-[24px] font-semibold"
            style={{ fontFamily: "'Montserrat'" }}
          >
            Seamless inventory, smarter business.
          </p>
          <p className="mt-3 text-[13px] " style={{ fontFamily: "'Nunito'" }}>
            Welcome to StockSync, your all-in-one solution for seamless
            inventory management. Whether you're a supplier tracking stock, a
            customer placing orders, or an admin overseeing operations, our
            platform keeps everything organized and efficient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;