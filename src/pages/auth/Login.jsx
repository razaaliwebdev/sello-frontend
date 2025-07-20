import React, { useState } from "react";
import RighSide from "../../components/utils/RightSide";
import { images } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/services/api";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await loginUser(formData).unwrap();
      localStorage.setItem("email", formData.email);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to login.");
    }
  };

  return (
    <div className="h-[89vh] flex w-full">
      <div className="md:w-1/2 w-full h-full flex  items-center justify-center">
        <div className="h-[90%] md:w-[70%] w-full">
          <div className="flex justify-center">
            <img src={images.userIcon} alt="" />
          </div>
          <h1 className="text-center font-medium my-[4px] text-3xl">
            Welcome Back
          </h1>
          <p className="text-center  font-[200] text-[#D6D6D6]">
            Welcome Back.Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className=" mt-8 w-[68%] mx-auto">
            <div className="w-full my-4 max-w-md field flex flex-col gap-1 border-b border-black p-2">
              <label className=" text-gray-700 font-medium ">Email</label>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                className="text-md font-[200] outline-none bg-transparent placeholder:black"
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full my-4 max-w-md field flex flex-col gap-1 border-b border-black p-2">
              <label className=" text-gray-700 font-medium">Password</label>
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="Password"
                className="text-md font-[200] outline-none bg-transparent placeholder:black"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex mt-5 items-center justify-between w-full">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-primary-500 w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700 font-light">
                  Remember for 30 days
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-primary-500 hover:text-primary-400 font-medium"
              >
                Forgot Password
              </Link>
            </div>
            <button
              disabled={isLoading}
              className="bg-primary-500 w-full my-5  shadow-lg shadow-gray-400 p-4 text-lg font-semibold hover:opacity-95"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const token = credentialResponse.credential;

                // POST token to your backend
                const res = await axios.post(
                  "http://localhost:3000/api/auth/google",
                  {
                    token,
                  }
                );

                // Save JWT returned from backend
                localStorage.setItem("token", res.data.token);

                // Redirect user
                window.location.href = "/home";
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            <div className=" mt-3">
              <span className="text-[#D6D6D6]"> Don't have an account? </span>
              <Link
                to={"/sign-up"}
                className="text-primary-500 hover:text-primary-400 font-[200]"
              >
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RighSide path={"sign-up"} />
      </div>
    </div>
  );
};

export default Login;
