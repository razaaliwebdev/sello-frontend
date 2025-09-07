import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsTelephoneXFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import HeaderLogo from "../../components/utils/HeaderLogo";
import RightSide from "../../components/utils/RightSide";
import OtpFields from "../../components/OTPFields";
import Spinner from "../../components/Spinner";
import { useVerifyOtpMutation } from "../../redux/services/api";
import { toast } from "react-hot-toast";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      return toast.error("Please enter a valid OTP");
    }

    try {
      const response = await verifyOtp(otp).unwrap();
      console.log("OTP Verified Response:", response);

      toast.success("OTP verified successfully");

      // Navigate to reset-password page
      navigate("/reset-password");
    } catch (err) {
      console.error("OTP verification failed:", err);
      toast.error(err?.data?.message || "Invalid OTP, please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row relative">
      {isLoading && <Spinner />}

      <div className="md:w-1/2">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <BsTelephoneXFill />
          </div>

          <div className="md:w-[55%] w-[90%] my-10 flex py-3 items-center justify-center md:text-2xl border-[1px] border-gray-400 text-gray-400">
            OTP
          </div>

          <form className="md:w-[55%] w-[90%]" onSubmit={handleSubmit}>
            <OtpFields value={otp} onChange={setOtp} />

            <div className="md:text-2xl my-5 text-gray-500 text-center">
              Enter the OTP we have sent to your registered mobile number to
              proceed.
            </div>

            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </button>

            <div className="text-center mt-2 text-lg text-gray-400">
              Didn't receive it?{" "}
              <Link
                className="text-primary-500 hover:underline"
                to="/forgot-password"
              >
                Resend
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide
          leftPath={"/forgot-password"}
          rightPath={"/reset-password"}
          text={
            "Sello is a trusted online car marketplace that makes buying and selling cars simple and hassle-free. Whether you want to buy used cars at great prices or quickly sell your car online, Sello provides a seamless experience for every customer. As a leading car buying website, it connects sellers and buyers with transparency and convenience. From budget-friendly options to premium models, you’ll find a wide range of affordable cars for sale. With Sello, your car journey is smarter, faster, and more reliable."
          }
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
