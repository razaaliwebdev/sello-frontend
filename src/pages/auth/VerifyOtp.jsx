import React, { useState, useEffect } from "react";
import { HiPhoneMissedCall } from "react-icons/hi";
import RightSide from "../../components/utils/RightSide";
import OTPFields from "../../components/OTPFields";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../redux/services/api";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    if (timeLeft <= 0) {
      toast.error("OTP has expired. Please request a new one.");
      return;
    }

    try {
      await verifyOtp(otp).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/reset-password");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="h-[89vh] flex">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="h-[80%] w-[65%] flex flex-col items-center justify-start">
          <div className="h-[150px] w-[150px] flex items-center justify-center rounded-full bg-white shadow-lg shadow-gray-600">
            <HiPhoneMissedCall className="text-7xl text-primary-500" />
          </div>

          <div className="w-full mt-10 text-center text-3xl font-[300] p-3 border-gray-300 border">
            OTP
          </div>

          <div className="my-5 w-full flex justify-center">
            <OTPFields value={otp} onChange={setOtp} />
          </div>

          <h3 className="capitalize text-gray-400 font-[200]">
            Enter the OTP we have sent you on your email.
          </h3>

          <div className="text-red-500 font-medium mt-2">
            Expires in: {formatTime(timeLeft)}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary-500 w-full mt-5 shadow-lg shadow-gray-400 p-4 text-lg font-semibold hover:opacity-95 disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RightSide path={"login"} />
      </div>
    </div>
  );
};

export default VerifyOtp;
