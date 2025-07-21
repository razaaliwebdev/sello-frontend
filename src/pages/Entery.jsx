import React from "react";
import RightSide from "../components/utils/RightSide";
import { images } from "../assets/assets";
import HeaderLogo from "../components/utils/HeaderLogo";

const Entery = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left Side */}
      <div className="md:w-1/2 w-full hidden md:flex flex-col justify-between bg-gray-100">
        {/* <HeaderLogo /> */}
        <div className="w-full my-3">
          <div className="w-80 mx-auto rounded-tl-[35px] rounded-br-[35px] bg-primary-500 md:h-36 flex items-center justify-center">
            <img src={images.logo} className="h-36" alt="" />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            className="max-w-full h-full object-cover"
            src={images.illustration}
            alt="Illustration"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center">
        <RightSide rightPath="/login" leftPath="/" />
      </div>
    </div>
  );
};

export default Entery;
