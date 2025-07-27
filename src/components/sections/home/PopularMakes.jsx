import React, { useState } from "react";
import { images, popularMakes } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundUp } from "react-icons/io";

const PopularMakes = () => {
  const [selectBrand, setSelectBrand] = useState(null);
  const navigate = useNavigate();

  const handleFilter = (brand) => {
    setSelectBrand((prev) => (prev === brand ? null : brand));
  };

  const filteredCars = selectBrand
    ? popularMakes.filter(
        (car) => car.brand.toLowerCase() === selectBrand.toLowerCase()
      )
    : popularMakes;

  return (
    <div className="px-4 md:px-16 py-12   bg-[#F5F5F5]">
      <div className="">
        <h2 className="md:text-3xl text-2xl font-semibold mb-6 text-gray-900">
          Popular Makes
        </h2>

        <div className="filter flex flex-wrap gap-5 mb-8">
          {["Audi", "Ford", "Mercedes-Benz"].map((brand) => (
            <button
              key={brand}
              onClick={() => handleFilter(brand)}
              className={` py-2 rounded-full text-sm md:text-base transition-colors duration-200 ${
                selectBrand === brand
                  ? "text-primary-500 underline font-bold"
                  : "text-gray-800 hover:text-primary-400"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <div
          id="popularMakesSlider"
          className="flex gap-6 md:gap-10 lg:gap-14 overflow-x-auto scroll-smooth"
        >
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-[#DADADA] rounded p-4 md:p-5 min-w-[90vw] sm:min-w-[80vw] md:min-w-[60vw] lg:min-w-[50vw]"
            >
              <img
                className="h-[200px] sm:h-[250px] md:h-[280px] w-full sm:w-[250px] md:w-[280px] object-cover rounded-md"
                src={car.image}
                alt={car.brand}
              />
              <div className="flex flex-col justify-between mt-4 sm:mt-0 sm:ml-6 w-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium mb-2">
                    {car.brand} {car.model} - {car.year}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {car.description}
                  </p>

                  <div>
                    <div className="flex items-center gap-5 my-3">
                      <img src={images.milesIcon} alt="miles icon" />
                      {car.moved} Miles
                    </div>
                    <div className="flex items-center gap-5 my-3">
                      <img src={images.fuelTypeIcon} alt="fuel type icon" />
                      {car.fuelType}
                    </div>
                    <div className="flex items-center gap-5 my-3">
                      <img
                        src={images.transmissionIcon}
                        alt="transmission icon"
                      />
                      {car.transmission}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <h6 className="text-lg md:text-xl font-semibold">
                    AED {car.price}
                  </h6>
                  <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base"
                  >
                    View Details
                    <IoIosArrowRoundUp className="text-xl rotate-[40deg]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMakes;
