import React from "react";
import { images } from "../../../assets/assets";

const BottomBanner = () => {
  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div className="bg-primary-500 rounded-tr-[100px] rounded-bl-[100px] w-full min-h-[50vh] flex flex-col md:flex-row items-center overflow-hidden justify-between">
        {/* Left image */}
        <div className="h-[50%]">
          <img
            src={images.mailbox}
            className="w-full h-full object-cover"
            alt="mailbox"
          />
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 text-white flex flex-col items-center md:items-start justify-center px-6 md:px-12 py-8 space-y-4">
          <h3 className="text-2xl md:text-4xl font-bold text-center md:text-left">
            Subscribe To Our Mailing List And Stay Up to Date
          </h3>
          <p className="text-sm md:text-base opacity-90 text-center md:text-left">
            We'll keep you updated with the best new jobs.
          </p>

          {/* Input + Button */}
          <div className="flex w-full max-w-md mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-white bg-transparent border-[1px] border-gray-100 ::placeholder:text-white"
            />
            <button
              type="submit"
              className="bg-white text-primary-500 font-semibold px-6 py-3 rounded-r-lg"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
