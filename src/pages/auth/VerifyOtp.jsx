import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsTelephoneXFill } from "react-icons/bs";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { useVerifyOtpMutation } from "../../redux/services/api";
import RightSide from "../../components/utils/RightSide";
import OtpFields from "../../components/OTPFields";
import { MdEmail } from "react-icons/md";

const VerifyOtp = () => {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [otp, setOtp] = useState("");
  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row">
      <div className="md:w-1/2">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon  bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <BsTelephoneXFill className="" />
          </div>
          <div className="md:w-[55%] w-[90%] my-10 flex py-3 items-center justify-center md:text-2xl border-[1px] border-gray-400 text-gray-400">
            OTP
          </div>
          <form className="md:w-[55%] w-[90%]">
            <OtpFields value={otp} onChange={setOtp} />
            <div className="md:text-2xl my-5  text-gray-500 text-cneter">
              Enter OTP We Have Sent You On Your Email{" "}
              <MdEmail className="inline text-primary-400" />{" "}
            </div>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
              disabled={isLoading}
            >
              {isLoading ? "Continue..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide
          leftPath={"/forgot-password"}
          rightPath={"/reset-password "}
        />
      </div>
    </div>
  );
}

export default VerifyOtp;
