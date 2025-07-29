import React, { useState } from "react";
import { dummyCars, images } from "../../../assets/assets";
import { IoIosArrowRoundUp } from "react-icons/io";

// Capitalize function for tab labels
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const GetAllCarsSection = () => {
  const uniqueConditions = Array.from(
    new Set(dummyCars.map((car) => car.condition.toLowerCase()))
  );

  const tabs = ["in stock", ...uniqueConditions]; // Add "In Stock" at the beginning

  const [activeTab, setActiveTab] = useState("in stock");

  const filteredCars =
    activeTab === "in stock"
      ? dummyCars
      : dummyCars.filter((car) => car.condition.toLowerCase() === activeTab);

  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div>
        <h1 className="md:text-4xl text-2xl font-medium">
          Explore All Vehicles
        </h1>

        {/* Tabs */}
        <div className="flex space-x-8 border-b mt-5 border-gray-200">
          {tabs.map((condition) => (
            <button
              key={condition}
              onClick={() => setActiveTab(condition)}
              className={`pb-3 text-lg font-medium text-[#0B0C1E] transition-all duration-300 ${
                activeTab === condition
                  ? "border-b-[3px] border-[#FFB400]"
                  : "text-opacity-60"
              }`}
            >
              {capitalize(condition)} {condition !== "in stock" && "Cars"}
            </button>
          ))}
        </div>

        {/* Cars List */}
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {filteredCars.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No cars found for {capitalize(activeTab)}.
            </p>
          ) : (
            filteredCars.map((car, index) => (
              <div className="md:px-6 md:py-8 bg-[#D9D9D9]" key={index}>
                <div
                  className="w-full h-full border-[1px] border-gray-100 rounded-bl-2xl rounded-br-2xl md:pb-8 pb-14 "
                  key={index}
                >
                  <div className=" h-[60%] relative">
                    <img
                      className="h-full w-full object-cover bg-center"
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="md:text-xl text-lg font-medium">
                      {car.make} {car.model} - {car.year}
                    </h4>
                    <p className="border-b-[1px] border-gray-200 pb-1.5">
                      {car.features}
                    </p>
                    <div className="flex items-center my-3 justify-around border-b-[1px] border-gray-200 pb-3">
                      <div className="flex items-center flex-col gap-2">
                        <img src={images.milesIcon} alt="Miles Icon" />
                        {car.mileage} km
                      </div>
                      <div className="flex items-center flex-col gap-2">
                        <img src={images.fuelTypeIcon} alt="Fuel Icon" />
                        {car.fuelType}
                      </div>
                      <div className="flex items-center flex-col gap-2">
                        <img
                          src={images.transmissionIcon}
                          alt="Transmission Icon"
                        />
                        {car.transmission}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-2 md:text-xl font-medium text-lg">
                        AED <h5 className="price">{car.price}</h5>
                      </div>
                      <button className="text-primary-500 flex items-center gap-2">
                        View Details{" "}
                        <IoIosArrowRoundUp className="text-2xl rotate-[43deg]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GetAllCarsSection;
