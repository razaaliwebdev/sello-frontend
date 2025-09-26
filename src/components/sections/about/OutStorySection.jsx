

import React from "react";
import {
  ourStoryData,
  selloGroupData,
} from "../../../assets/about/aboutAssets";

const OutStorySection = () => {
  return (
    <div className="py-14 px-6 md:px-10 w-full h-full space-y-16">
      {/* Our Story */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-between items-center md:items-start">
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-medium capitalize mb-5">
            {ourStoryData.title}
          </h2>
          <p className="text-base md:text-2xl mt-5 leading-relaxed">
            {ourStoryData.description}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-[40%] border-[6px] md:border-[8px] border-primary-500 rounded-tr-[30px] md:rounded-tr-[45px] rounded-bl-[30px] md:rounded-bl-[45px] overflow-hidden">
          <img
            src={ourStoryData.img}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>

      {/* Sello Group */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-between items-center md:items-start">
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-medium capitalize mb-5">
            {selloGroupData.title}
          </h2>
          <p className="text-base md:text-2xl mt-5 leading-relaxed">
            {selloGroupData.description}
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-[40%] border-[6px] md:border-[8px] border-primary-500 rounded-tr-[30px] md:rounded-tr-[45px] rounded-bl-[30px] md:rounded-bl-[45px] overflow-hidden">
          <img
            src={selloGroupData.img}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default OutStorySection;
