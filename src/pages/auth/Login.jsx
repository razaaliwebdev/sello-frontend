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
      
      // Redirect based on user role
      if (res.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.user?.role === "dealer" && res.user?.dealerInfo?.verified) {
        navigate("/dealer/dashboard");
      } else if (res.user?.role === "individual" || res.user?.role === "dealer") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);
      
      if (!credentialResponse?.credential) {
        throw new Error("No credential received from Google");
      }
      
      const token = credentialResponse.credential;
      const res = await googleLogin(token).unwrap();

      // Check response structure - handle both transformed and raw responses
      const responseToken = res?.token || res?.data?.token;
      const responseUser = res?.user || res?.data?.user;

      if (!responseToken || !responseUser) {
        console.error("Invalid response structure:", res);
        throw new Error("Invalid response from server. Please try again.");
      }

      localStorage.setItem("token", responseToken);
      localStorage.setItem("user", JSON.stringify(responseUser));

      toast.success("Google login successful");
      
      // Redirect based on user role
      if (responseUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (responseUser?.role === "dealer" && responseUser?.dealerInfo?.verified) {
        navigate("/dealer/dashboard");
      } else if (responseUser?.role === "individual" || responseUser?.role === "dealer") {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Google login error:", err);
      console.error("Error details:", {
        status: err?.status,
        data: err?.data,
        message: err?.message,
        originalStatus: err?.originalStatus
      });
      
      let errorMessage = "Google login failed. Please try again.";
      
      // Handle RTK Query errors - check nested data structure
      const errorData = err?.data || err;
      
      if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (errorData?.error) {
        errorMessage = errorData.error;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.status === 401 || err?.originalStatus === 401) {
        errorMessage = "Authentication failed. Please try logging in again.";
      } else if (err?.status === 403 || err?.originalStatus === 403) {
        errorMessage = "Access denied. Please contact support.";
      } else if (err?.status === 500 || err?.originalStatus === 500) {
        errorMessage = "Server error. Please try again later or contact support.";
      } else if (err?.status === 'FETCH_ERROR' || err?.status === 'PARSING_ERROR' || err?.message?.includes('Failed to fetch')) {
        errorMessage = "Unable to connect to server. Please ensure the backend server is running and try again.";
      } else if (err?.error === 'TypeError: Failed to fetch' || err?.data?.error === 'TypeError: Failed to fetch') {
        errorMessage = "Server connection failed. Please check if the backend server is running on port 4000.";
      }
      
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <>
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
                className="w-full h-12 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors mb-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Google Sign In Button */}
              <div className="mb-4 w-full">
                <div className="googleBtn">
                  <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={(error) => {
                      console.error("Google OAuth error:", error);
                      let errorMsg = "Google login failed. ";
                      
                      if (error?.type === "popup_closed_by_user") {
                        errorMsg = "Login cancelled.";
                      } else if (error?.type === "popup_failed_to_open") {
                        errorMsg = "Popup blocked. Please allow popups for this site.";
                      } else if (error?.type === "idpiframe_initialization_failed") {
                        errorMsg = "Google authentication service unavailable. Please check your internet connection.";
                      } else {
                        errorMsg += "Please try again or use email/password login.";
                      }
                      
                      toast.error(errorMsg);
                    }}
                    useOneTap={false}
                    theme="outline"
                    shape="rectangular"
                    size="large"
                    text="signin_with"
                    auto_select={false}
                  />
                </div>
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
      </div>
    </>
  );
};

export default Login;
