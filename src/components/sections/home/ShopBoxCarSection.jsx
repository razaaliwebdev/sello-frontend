import React, { useState, useMemo, useCallback, memo } from "react";
import {
  carBrandCategories,
  carBrandsByCategory,
} from "../../../assets/assets";

const ShopBoxCar = () => {
  const [activeTab, setActiveTab] = useState("new");

  const activeBrands = useMemo(() => carBrandsByCategory[activeTab] || [], [activeTab]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <section className="px-4 md:px-20 py-12 bg-[#F9FAFB] w-full flex items-center gap-10 md:flex-row flex-col">
      <div className=" md:w-[70%] w-full">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
        Shop Sello Your Way
      </h2>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-300 mb-8 overflow-x-auto">
        {carBrandCategories.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`pb-2 md:text-base text-sm font-medium whitespace-nowrap ${
              activeTab === tab.value
                ? "border-b-2 border-yellow-500 text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Filtered Brands Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-5">
        {activeBrands.map((brand, index) => (
          <p
            key={index}
            className="text-sm md:text-base text-gray-800 hover:underline cursor-pointer"
          >
            {brand}
          </p>
        ))}
      </div>
      </div>
      {/* ad */}
      <div className="ad"></div>
    </section>
  );
};

export default memo(ShopBoxCar);
