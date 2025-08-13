import React from "react";
import RangeFilter from "../../utils/filter/RangeFilter";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
import Seats from "../../utils/filter/Seats";

const FilterForm = () => {
  return (
    <div>
      <form className="space-y-6">
        {/* Price */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Price From</label>
              <Input inputType={"number"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input inputType={"number"} />
            </div>
          </div>
          <div className="range">
            <RangeFilter type="price" min={0} max={100000} onChange={null} />
          </div>
        </div>

        {/* Car Make */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Make</label>
              <Input inputType={"text"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Model</label>
              <Input inputType={"text"} />
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Year From</label>
              <Input inputType={"number"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input inputType={"number"} />
            </div>
          </div>
          <div className="range">
            <RangeFilter type="price" min={0} max={100000} onChange={null} />
          </div>
        </div>

        {/* Kilometers */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Kilometers From</label>
              <Input inputType={"number"} />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input inputType={"number"} />
            </div>
          </div>
          <div className="range">
            <RangeFilter type="price" min={0} max={100000} onChange={null} />
          </div>
        </div>
        {/* Car Type */}
        <div className="">
          <label className="block mb-1">Body Types</label>
          <BodyTypes
          // onBodyTypeChange={(name) => console.log("Selected:", name)}
          />
        </div>
        {/* Car Regional Specs */}
        <div className="">
          <label className="block mb-1">Regional Specs</label>
          <RegionalSpecs
            onBodyTypeChange={(name) => console.log("Selected:", name)}
          />
        </div>
        {/* Searts */}
        <div className="">
          <label className="block mb-1">Seats</label>
          <Seats />
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
