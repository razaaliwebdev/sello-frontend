import React, { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { images } from "../../../assets/assets";
import LazyImage from "../../common/LazyImage";

// Skeleton loader (reused from GetAllCarsSection)
const CarCardSkeleton = () => (
  <div className="md:px-6 md:py-8 bg-white rounded-lg shadow-sm animate-pulse">
    <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between mb-4">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

const FilteredCarsResults = ({ filteredCars, isLoading }) => {
  const navigate = useNavigate();
  const [savedCars, setSavedCars] = useState([]);

  const toggleSave = (id) => {
    setSavedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  // Normalize cars data
  const cars = Array.isArray(filteredCars?.data)
    ? filteredCars.data
    : Array.isArray(filteredCars)
    ? filteredCars
    : [];

  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <h2 className="md:text-4xl text-2xl font-medium mb-6">
        Filtered Cars Results
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {[...Array(6)].map((_, idx) => (
            <CarCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* No results */}
      {!isLoading && cars.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No cars match your filters.
        </p>
      )}

      {/* Cars Grid */}
      {!isLoading && cars.length > 0 && (
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {cars.map((car, index) => {
            const carId = car?._id || index;
            const carImage = car?.images?.[0] || images.carPlaceholder;
            const carMake = car?.make || "Unknown Make";
            const carModel = car?.model || "Unknown Model";
            const carYear = car?.year || "N/A";
            const carPrice = car?.price?.toLocaleString() || "N/A";

            return (
              <div
                key={carId}
                className="md:px-6 md:py-8 bg-white rounded-lg shadow-sm"
              >
                <div className="w-full h-full border border-gray-100 rounded-bl-2xl rounded-br-2xl md:pb-8 pb-14">
                  <div className="h-48 relative">
                    <LazyImage
                      src={carImage}
                      alt={`${carMake} ${carModel}`}
                      className="rounded-t-lg"
                      width="100%"
                      height="100%"
                    />
                    <button
                      onClick={() => toggleSave(carId)}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                    >
                      {savedCars.includes(carId) ? (
                        <BsBookmarkFill className="text-primary-500 text-xl" />
                      ) : (
                        <BsBookmark className="text-primary-500 text-xl" />
                      )}
                    </button>
                  </div>

                  <div className="p-5">
                    <h4 className="md:text-xl text-lg font-medium">
                      {carMake} {carModel} - {carYear}
                    </h4>
                    <p className="border-b border-gray-200 pb-1.5">
                      {Array.isArray(car?.features)
                        ? car.features.join(", ")
                        : car?.features || "No features listed"}
                    </p>

                    <div className="flex items-center my-3 justify-around border-b border-gray-200 pb-3">
                      <div className="flex items-center flex-col gap-2">
                        <LazyImage
                          src={images.milesIcon}
                          alt="Miles Icon"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                        {car?.mileage || "N/A"} km
                      </div>
                      <div className="flex items-center flex-col gap-2">
                        <LazyImage
                          src={images.fuelTypeIcon}
                          alt="Fuel Icon"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                        {car?.fuelType || "N/A"}
                      </div>
                      <div className="flex items-center flex-col gap-2">
                        <LazyImage
                          src={images.transmissionIcon}
                          alt="Transmission Icon"
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                        {car?.transmission || "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-2 md:text-xl font-medium text-lg">
                        AED <h5 className="price">{carPrice}</h5>
                      </div>
                      <button
                        onClick={() => car?._id && navigate(`/cars/${car._id}`)}
                        className="text-primary-500 flex items-center gap-2"
                        disabled={!car?._id}
                      >
                        View Details
                        <IoIosArrowRoundUp className="text-2xl rotate-[43deg]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FilteredCarsResults;
