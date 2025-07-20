import React from "react";
import { images } from "../assets/assets";
import RightSide from "../components/utils/RightSide";

const Entery = () => {
  return (
    <div className="h-[89vh] flex ">
      <div className="h-full w-1/2 hidden md:block">
        <div className="w-full h-[35%] flex items-center justify-center">
          <div className="bg-primary-500 w-[70%] h-[70%] flex items-center justify-center shadow-xl shadow-gray-500 rounded-tl-[30px] rounded-br-[30px]">
            <img className="w-[62%]" src={images.logo} alt="" />
          </div>
        </div>
        <div className="w-full h-[65%]">
          <img
            src={images.illustration}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>

      <div className="h-full md:w-1/2 w-full">
        <RightSide path={"login"} />
      </div>
    </div>
  );
};

export default Entery;
