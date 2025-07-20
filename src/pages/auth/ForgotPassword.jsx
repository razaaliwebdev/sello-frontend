import React, { useState } from "react";
import RightSide from "../../components/utils/RightSide";
import { HiPhoneMissedCall } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/services/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP Sent Successfully.");
      setTimeout(() => {
        navigate("/verify-otp");
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to login.");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="h-[89vh] flex">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="h-[80%] w-[65%] flex flex-col items-center justify-start">
          <div className="">
            <div className="h-[150px] w-[150px] flex items-center justify-center rounded-full bg-white shadow-lg shadow-gray-600">
              <HiPhoneMissedCall className="text-7xl text-primary-500" />
            </div>
          </div>
          <h2 className="text-4xl font-semibold my-5">Forgot Password?</h2>
          <p className="text-lg font-[200] text-gray-300">
            Do not worry! We will help you to recover <br /> your password.
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full my-4 max-w-md field flex flex-col gap-1 border-b border-black p-2">
              <label className=" text-gray-700 font-medium ">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="text-md font-[200] outline-none bg-transparent placeholder:black"
                placeholder="Enter your email"
              />
            </div>
            <button className="bg-primary-500 w-full mt-5  shadow-lg shadow-gray-400 p-4 text-lg font-semibold hover:opacity-95">
              {isLoading ? "Sending OTP..." : " Send OTP"}
            </button>
            <div className="my-5 text-center text-lg font-[200]">
              Back to{" "}
              <Link to={"/login"} className="font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RightSide path={"login"} />
      </div>
    </div>
  );
};

export default ForgotPassword;
