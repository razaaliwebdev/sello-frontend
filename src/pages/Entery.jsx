import React from "react";
import RightSide from "../components/utils/RightSide";
import { images } from "../assets/assets";
import HeaderLogo from "../components/utils/HeaderLogo";

const Entery = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[50%] hidden md:block">
        <div className="logo">
          <img className="w-40 p-5" src={images.headerLogo} alt="" />
        </div>
        <HeaderLogo />
        <div className="">
          <img src={images.illustration} alt="" />
        </div>
      </div>
      <div className="h-screen md:w-[50%] w-full ">
        <RightSide rightPath="/login" leftPath="/" />
      </div>
    </div>
  );
};

export default Entery;
