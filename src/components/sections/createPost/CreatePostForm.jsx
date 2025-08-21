import React from "react";
import ImagesUpload from "../createPost/ImagesUpload";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
import Seats from "../../utils/filter/Seats";
import FuelSpecs from "../../utils/filter/FuelSpecs";
import TransmissionSpecs from "../../utils/filter/TransmissionSpecs";
import CylindersSpecs from "../../utils/filter/CylindersSpecs";
import ExteriorColor from "../../utils/filter/ExteriorColor";
import InteriorColor from "../../utils/filter/InteriorColor";
import DoorsSpecs from "../../utils/filter/DoorsSpecs";
import OwnerTypeSpecs from "../../utils/filter/OwnerTypeSpecs";
import WarrantyType from "../../utils/filter/WarrantyType";
import HorsePowerSpecs from "../../utils/filter/HorsePowerSpecs";
import EngineCapacitySpecs from "../../utils/filter/EngineCapacitySpecs";
import TechnicalFeaturesSpecs from "../../utils/filter/TechnicalFeaturesSpecs";
import LocationButton from "../../utils/filter/LocationButton";

const CreatePostForm = () => {
  return (
    <div className="px-4 md:px-20 py-12">
      <h1 className="text-center md:text-3xl font-semibold">Post</h1>
      <div className="border-[1px] border-gray-700 rounded-md px-5 py-6 my-5">
        <div className="my-2">
          <ImagesUpload />
        </div>
        {/* price */}
        <div className="price mt-5 mb-2">
          <label className="block mb-1">Price</label>
          <Input inputType={"number"} />
        </div>
        {/* Car make and car model */}
        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Car Make</label>
            <Input inputType={"text"} />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Car Model</label>
            <Input inputType={"text"} />
          </div>
        </div>
        {/* Car year and kilometers */}
        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Year</label>
            <Input inputType={"number"} />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Kilometers</label>
            <Input inputType={"number"} />
          </div>
        </div>
        {/* Body Types Spces */}
        <div className="">
          <label className="block mb-1">Body Types</label>
          <BodyTypes />
        </div>
        {/* Region Specs */}
        <div className="">
          <label className="block mb-1">Regional Specs</label>
          <RegionalSpecs />
        </div>
        {/* Seats */}
        <div className="">
          <label className="block mb-1">Seats</label>
          <Seats />
        </div>
        {/* Fuel Type */}
        <div className="">
          <label className="block mb-1">Fuel Types</label>
          <FuelSpecs />
        </div>
        {/* Transmission Type */}
        <div className="">
          <label className="block mb-1">Transmission Types</label>
          <TransmissionSpecs />
        </div>
        {/* Number of cylinders */}
        <div className="">
          <label className="block mb-1">Number of Cylinders</label>
          <CylindersSpecs />
        </div>
        {/* Exterior Color */}
        <div className="">
          <label className="block mb-1">Exterior Color</label>
          <ExteriorColor />
        </div>
        {/* Interior Color */}
        <div className="">
          <label className="block mb-1">Interior Color</label>
          <InteriorColor />
        </div>
        {/* Doors */}
        <div className="">
          <label className="block mb-1">Doors</label>
          <DoorsSpecs />
        </div>
        {/* Owner Type */}
        <div className="">
          <label className="block mb-1">Owner Type</label>
          <OwnerTypeSpecs />
        </div>
        {/* Warranty */}
        <div className="">
          <label className="block mb-1"></label>
          <WarrantyType />
        </div>
        {/* Horse Power */}
        <div className="">
          <label className="block mb-1">Horsepower</label>
          <HorsePowerSpecs />
        </div>
        {/* Engine Capacity */}
        <div className="">
          <label className="block mb-1">Engine Capacity CC</label>
          <EngineCapacitySpecs />
        </div>
        {/* Technical Features */}
        <div className="">
          <label className="block mb-1">Technical Features</label>
          <TechnicalFeaturesSpecs />
        </div>
        {/* Location Button */}
        <div className="my-4">
          <label className="block mb-1">Location</label>
          <LocationButton />
        </div>
        {/* Post Button */}
        <div className="">
          <button className="bg-primary-500 px-4 my-5 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold ">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
