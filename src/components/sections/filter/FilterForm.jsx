
import React from "react";
import RangeFilter from "../../utils/RangeFilter";
import Input from "../../utils/Input";

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
      </form>
    </div>
  );
};

export default FilterForm;
