import React, { useState } from "react";
import HeaderLogo from "../../components/utils/HeaderLogo";
import AuthFooter from "../../components/utils/AuthFooter";
import { images } from "../../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import {
  useLoginUserMutation,
  useGoogleLoginMutation,
} from "../../redux/services/api";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [googleLoading, setGoogleLoading] = useState(false); // ✅

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await loginUser(data).unwrap();

      // Store token in the Local Storage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login successful");
      
      // Redirect to admin dashboard if user is admin
      if (res.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true); // ✅ Start loading spinner
      const token = credentialResponse.credential;
      const res = await googleLogin(token).unwrap();

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Google login successful");
      
      // Redirect to admin dashboard if user is admin
      if (res.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Google login error:", err);
      const errorMessage = err?.data?.message || err?.message || "Google login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false); // ✅ End loading
    }
  };

  return (
    <>
      {(isLoading || googleLoading) && <Spinner />}
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Orange Header */}
        <HeaderLogo />

        {/* Main Content - White Panel */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* User Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <img
                  className="w-10 h-10"
                  src={images.userIcon}
                  alt="userIcon"
                />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Please enter your details.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Checkbox and Links */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Remember for 30 days</span>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm text-primary-500 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-12 bg-primary-500 text-white font-semibold rounded hover:opacity-90 transition-opacity mb-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Google Sign In Button */}
              <div className="mb-4 googleBtn">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => toast.error("Google login failed")}
                />
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/sign-up"}
                  className="text-primary-500 hover:underline font-medium"
                >
                  Sign up now
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Dark Blue Footer */}
        <AuthFooter
          text="Sello is your go-to destination for everything on wheels, offering a wide variety of used cars for sale along with the latest models for those looking to buy new cars. The platform ensures trust and quality by listing only certified pre-owned cars that meet high standards. Whether you’re planning to buy Toyota Corolla online, searching for a reliable SUV for sale, or exploring budget cars under (price), Sello has options to suit every lifestyle and budget. With its user-friendly process, Sello makes car buying and selling convenient, transparent, and stress-free."
        />
      </div>
    </>
  );
};

export default Login;
