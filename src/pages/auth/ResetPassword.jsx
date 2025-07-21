import React, { useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { useResetPasswordMutation } from "../../redux/services/api";
import RightSide from "../../components/utils/RightSide";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await resetPassword({ password }).unwrap();
      console.log("Reset response:", response);
      toast.success("Password reset successfully");
      navigate("/reset-success");
    } catch (err) {
      console.error("Reset error:", err);
      toast.error(err?.data?.message || "Reset failed, please try again");
    }
  };

  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row relative">
      {isLoading && <Spinner />}

      <div className="md:w-1/2 w-[90%]">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <HiOutlineKey />
          </div>

          <form className="md:w-[55%] w-[90%] my-5" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[1px] text-center border-gray-300 my-7 outline-primary-500 py-3 px-2 text-xl"
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-[1px] text-center border-gray-300 my-7 outline-primary-500 py-3 px-2 text-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Continue"}
            </button>
          </form>
        </div>
      </div>

      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide leftPath={"/verify-otp"} rightPath={"/reset-success"} />
      </div>
    </div>
  );
};

export default ResetPassword;
