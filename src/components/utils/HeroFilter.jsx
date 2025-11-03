import React from "react";

const HeroFilter = () => {
  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center  text-center p-4">
      <form className="bg-[#EEEEEE]/60 backdrop-blur-md rounded-tl-3xl rounded-br-3xl flex flex-col md:flex-row gap-6 overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] w-[98%] max-w-6xl mx-auto md:p-0 md:pl-12">
        {/* Right Side */}
        <div className="rightSide grid grid-cols-2 md:grid-cols-3 gap-4 p-3 w-full md:py-6">
          {[
            { label: "Year of manufacture", options: ["2021"] },
            { label: "Select Make", options: ["Audi"] },
            { label: "Select Model", options: ["A7 Sportback"] },
            { label: "Moved (km)", options: ["< 1000"] },
            { label: "Select Engine", options: ["5 Speed Manual"] },
            { label: "Car Status", options: ["Old", "New"] },
          ].map((field, i) => (
            <div key={i} className="filter-feild">
              <label className="text-gray-600 text-sm block mb-1">
                {field.label}
              </label>
              <select className="w-full h-9 px-2 rounded">
                {field.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Left Side (Pricing) */}
        <div className="leftSide bg-white/50 rounded-tl-3xl px-4 py-5 md:py-6 md:px-7 w-full md:w-auto">
          <h4 className="mb-3 text-gray-800 text-lg">Pricing (AED)</h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label
                className="block text-left text-gray-600 text-sm md:text-md mb-1"
                htmlFor="from"
              >
                From
              </label>
              <input
                className="p-2 w-full rounded outline-primary-500"
                type="number"
                id="from"
              />
            </div>
            <div>
              <label
                className="block text-left text-gray-600 text-sm md:text-md mb-1"
                htmlFor="to"
              >
                To
              </label>
              <input
                className="p-2 w-full rounded outline-primary-500"
                type="number"
                id="to"
              />
            </div>
          </div>
          <button className="w-full sm:w-auto px-7 py-2 hover:bg-opacity-90 bg-primary-500 mt-4 sm:mt-5 rounded">
            Search Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroFilter;
