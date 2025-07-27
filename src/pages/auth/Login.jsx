import React, { useState } from "react";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
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
      navigate("/home");
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
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || "Google login failed");
    } finally {
      setGoogleLoading(false); // ✅ End loading
    }
  };

  return (
    <>
      {(isLoading || googleLoading) && <Spinner />} {/* ✅ Spinner display */}
      <div className="flex h-screen flex-wrap flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <HeaderLogo />
          <div className="md:w-[55%] mx-auto md:p-2 px-5">
            <div className="w-full">
              <img
                className="mx-auto w-14"
                src={images.userIcon}
                alt="userIcon"
              />
            </div>
            <h2 className="md:text-4xl text-2xl my-2">Welcome Back</h2>
            <p className="text-gray-400 pb-1">
              Welcome back. Please enter your details.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="field border-b-[1px] border-black my-2">
                <label className="block py-2 text-lg">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full py-2 border-none outline-none px-0 text-lg"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="field border-b-[1px] border-black my-2">
                <label className="block py-2 text-lg">Password</label>
                <div className="relative">
                  <input
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded-full border-2 bg-primary-500 border-primary-500"
                  />
                  <span className="text-sm">Remember me</span>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm text-primary-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="googleBtn my-2">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => toast.error("Google login failed")}
                />
              </div>

              <p className="text-center text-gray-400 text-lg">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/sign-up"}
                  className="text-primary-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="md:w-1/2 w-full md:block hidden">
          <RightSide leftPath={"/"} rightPath={"/sign-up"} />
        </div>
      </div>
    </>
  );
};

export default Login;
