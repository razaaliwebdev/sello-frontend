import React, { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { images } from "../../../assets/assets";
import LazyImage from "../../common/LazyImage";

// Skeleton loader (reused from GetAllCarsSection)
const CarCardSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg animate-pulse hover:shadow-md transition-shadow bg-white">
    <div className="md:w-48 h-32 bg-gray-100 rounded-lg"></div>
    <div className="flex-1 flex flex-col justify-between py-2">
      <div>
        <div className="h-5 bg-gray-100 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-24 mb-3"></div>
        <div className="flex gap-6">
          <div className="h-4 bg-gray-100 rounded w-20"></div>
          <div className="h-4 bg-gray-100 rounded w-20"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-6 bg-gray-100 rounded w-24"></div>
        <div className="h-9 bg-gray-100 rounded-lg w-28"></div>
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
    <section className="py-2">
      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, idx) => (
            <CarCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        cars.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">
              {cars.length} {cars.length === 1 ? "Car Found" : "Cars Found"}
            </h2>
            <div className="space-y-3">
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
                    className="flex flex-col md:flex-row gap-6 p-5 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 bg-white"
                  >
                    {/* Car Image */}
                    <div className="md:w-52 h-40 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center relative">
                      <LazyImage
                        src={carImage}
                        alt={`${carMake} ${carModel}`}
                        className="w-full h-full object-cover"
                        width={208}
                        height={160}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(carId);
                        }}
                        className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
                      >
                        {savedCars.includes(carId) ? (
                          <BsBookmarkFill className="text-primary-500 text-lg" />
                        ) : (
                          <BsBookmark className="text-gray-400 text-lg hover:text-primary-500" />
                        )}
                      </button>
                    </div>

                    {/* Car Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {carMake} {carModel}
                            </h3>
                            <p className="text-gray-500 text-sm mt-1">
                              {carYear}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 rounded-lg min-w-[80px]">
                            <LazyImage
                              src={images.milesIcon}
                              alt="Mileage"
                              className="w-3 h-3 opacity-70"
                            />
                            <span className="text-xs font-medium text-gray-700">
                              {car?.mileage
                                ? `${car.mileage.toLocaleString()} km`
                                : "N/A"}
                            </span>
                            <span className="text-xs text-gray-500">
                              Mileage
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 rounded-lg min-w-[80px]">
                            <LazyImage
                              src={images.fuelTypeIcon}
                              alt="Fuel"
                              className="w-3 h-3 opacity-70"
                            />
                            <span className="text-xs font-medium text-gray-700">
                              {car?.fuelType || "N/A"}
                            </span>
                            <span className="text-xs text-gray-500">
                              Fuel Type
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 rounded-lg min-w-[80px]">
                            <LazyImage
                              src={images.transmissionIcon}
                              alt="Transmission"
                              className="w-3 h-3 opacity-70"
                            />
                            <span className="text-xs font-medium text-gray-700">
                              {car?.transmission || "N/A"}
                            </span>
                            <span className="text-xs text-gray-500">
                              Transmission
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-sm text-gray-500">
                            Starting from
                          </div>
                          <div className="text-xl font-bold text-primary-500">
                            AED {carPrice}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/cars/${carId}`);
                          }}
                          className=" bg-primary-500 hover:placeholder-opacity-85 flex items-center text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                        >
                          View Details
                          <IoIosArrowRoundUp className="ml-1 transform rotate-90 text-base" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )
      )}
    </section>
  );
};

export default FilteredCarsResults;
