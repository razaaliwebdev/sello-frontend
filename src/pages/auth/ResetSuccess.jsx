import React from "react";
import HeaderLogo from "../../components/utils/HeaderLogo";
import RightSide from "../../components/utils/RightSide";
import { IoShieldCheckmark } from "react-icons/io5";
import { images } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row">
      <div className="md:w-1/2 w-[90%]">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon  bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <IoShieldCheckmark className="" />
          </div>
        </div>
        <div className="flex items-center justify-center mt-10 text-xl text-primary-500">
          <p className="capitalize">your password reset successfully.</p>
        </div>
        <div className="flex items-center justify-center flex-col mt-20">
          <img src={images.verified} alt="" />
          <button
            onClick={() => navigate("/login")}
            className="bg-primary-500 hover:opacity-90 shadow-lg shadow-gray-500 w-[55%]  font-bold py-3 px-4  mt-10"
          >
            Go To Login
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide leftPath={"/reset-password"} rightPath={"/login"} />
      </div>
    </div>
  );
};

export default ResetSuccess;
