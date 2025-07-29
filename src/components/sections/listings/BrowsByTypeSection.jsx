import React from "react";
import { carTypes } from "../../../assets/assets";
import BuySellCards from "../../utils/BuySellCards";

const BrowsByTypeSection = () => {
  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5] overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-800">
        Browse by Car Type
      </h2>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Marquee Inner */}
        <div className="flex w-max animate-marquee gap-6">
          {/* Original List */}
          {carTypes.map((type, index) => (
            <div
              key={index}
              className="min-w-[120px] sm:min-w-[140px] bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700">{type.title}</p>
            </div>
          ))}

          {/* Duplicate List for Seamless Scroll */}
          {carTypes.map((type, index) => (
            <div
              key={`duplicate-${index}`}
              className="min-w-[120px] sm:min-w-[140px] bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition duration-300"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm font-medium text-gray-700">{type.title}</p>
            </div>
          ))}
        </div>
        <BuySellCards />
      </div>
    </section>
  );
};

export default BrowsByTypeSection;
