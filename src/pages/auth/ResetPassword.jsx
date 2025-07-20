import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightSide from "../../components/utils/RightSide";
import { LuKeyRound } from "react-icons/lu";
import { useResetPasswordMutation } from "../../redux/services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      return toast.error("All fields are required.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      await resetPassword({ password }).unwrap();
      console.log("Password being sent:", password);
      toast.success("Password reset successfully!");
      navigate("/password-updated");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="h-[89vh] flex">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="h-[80%] w-[65%] flex flex-col items-center justify-start">
          <div className="">
            <div className="h-[150px] w-[150px] flex items-center justify-center rounded-full bg-white shadow-lg shadow-gray-600">
              <LuKeyRound className="text-7xl text-primary-500" />
            </div>
          </div>

          <div className="w-full border my-8 p-4 border-gray-400">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none text-xl placeholder:text-gray-400 font-[200] w-full"
              placeholder="New Password"
            />
          </div>
          <div className="w-full border my-8 p-4 border-gray-400">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="outline-none text-xl placeholder:text-gray-400 font-[200] w-full"
              placeholder="Confirm Password"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary-500 w-full mt-5 shadow-lg shadow-gray-400 p-4 text-lg font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Continue"}
          </button>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RightSide path={"login"} />
      </div>
    </div>
  );
};

export default ResetPassword;
