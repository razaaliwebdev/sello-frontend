import React, { useEffect, useState } from "react";
import { carFilterData } from "../../assets/carFilterData";

const HeroFilter = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [km, setKm] = useState("");
  const [engine, setEngine] = useState("");
  const [status, setStatus] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const MARKETCHECK_API_KEY = "moVS1VykrNPtKGbEyZyk2KBOYADDSz70";
  const MARJKETCHECK_API_SECRET = "M0m6HyF2ePAKlGqV";

  // Removed direct API call to marketcheck.com due to CORS restrictions
  // This should be handled by the backend if needed
  // useEffect(() => {
  //   async function fetchData() {
  //     const url = `https://api.marketcheck.com/v1/search?api_key=${MARKETCHECK_API_KEY}&country=US&price_range=10000-50000`;
  //     try {
  //       const response = await fetch(url);
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching car data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="relative md:absolute md:inset-0 z-10 flex items-start md:items-center justify-center text-center px-3 py-6 md:p-4">
      <form className="bg-[#EEEEEE]/60 backdrop-blur-md rounded md:rounded-tl-3xl md:rounded-br-3xl flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] w-full max-w-6xl mx-auto p-4 md:p-0 md:pl-12">
        {/* Right Side */}
        <div className="rightSide grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4 p-1 md:p-3 w-full md:py-6">
          {carFilterData.map((field, i) => (
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
