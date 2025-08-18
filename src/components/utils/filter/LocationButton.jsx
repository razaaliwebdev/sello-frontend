import React from "react";
import { images } from "../../../assets/assets";

const LocationButton = () => {
  return (
    <div>
      <div className="border p-3 rounded-lg border-gray-500  hover:bg-gray-100">
        <button className="flex items-center justify-between w-full">
          {" "}
          <img src={images.location} alt="" />
          <p className="text-sm">Dubai</p>
          <div className=""></div>
        </button>
      </div>
    </div>
  );
};

export default LocationButton;
