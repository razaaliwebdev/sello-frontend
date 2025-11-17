import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { images } from "../../../assets/assets";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetCarsQuery } from "../../../redux/services/api";
import LazyImage from "../../common/LazyImage";

// Skeleton Loader Component
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

// Safe capitalize function
// const capitalize = (str) => {
//   if (!str || typeof str !== "string") return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

// capitalize();

const GetAllCarsSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [savedCars, setSavedCars] = useState([]);
  const [page, setPage] = useState(1);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // Memoize query params to prevent unnecessary refetches
  const queryParams = useMemo(() => ({
    page,
    limit: 6,
    // Only apply condition filter if not 'all cars'
    ...(activeTab !== "all" && { condition: activeTab }),
  }), [page, activeTab]);

  // Call backend with pagination and filtering
  const { data: carsData, isLoading, error } = useGetCarsQuery(queryParams);

  // Reset to first page when changing tabs
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // Cars data from API with fallback to empty array
  const cars = useMemo(() => {
    return Array.isArray(carsData?.cars) ? carsData.cars : [];
  }, [carsData?.cars]);
  
  const totalPages = carsData?.pages || 1;

  // Handle tab change with useCallback
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Handle page change with loading state
  // const handlePageChange = (newPage) => {
  //   if (newPage !== page) {
  //     setIsPageChanging(true);
  //     setPage(newPage);
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // };

  // handlePageChange();

  const toggleSave = useCallback((id) => {
    setSavedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  }, []);

  // Define the available tabs - memoized
  const tabs = useMemo(() => [
    { id: "all", label: "All Cars" },
    { id: "new", label: "New Cars" },
    { id: "used", label: "Used Cars" },
  ], []);

  // Reset loading state when data is loaded
  useEffect(() => {
    if (cars.length > 0) {
      setIsPageChanging(false);
    }
  }, [cars]);

  // Filter cars based on active tab (client-side fallback) - memoized
  const filteredCars = useMemo(() => {
    if (activeTab === "all") return cars;
    return cars.filter((car) => car.condition?.toLowerCase() === activeTab.toLowerCase());
  }, [cars, activeTab]);

  // Show skeleton loaders while loading
  if (isLoading) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5] relative">
        {isPageChanging && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700">Loading cars...</span>
            </div>
          </div>
        )}
        <h1 className="md:text-4xl text-2xl font-medium mb-8">
          Explore All Vehicles
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {[...Array(6)].map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
        <h2 className="text-center text-xl text-red-500">
          Error loading cars: {error.message}
        </h2>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div>
        <h1 className="md:text-4xl text-2xl font-medium">
          Explore All Vehicles
        </h1>

        {/* Tabs */}
        <div className="flex space-x-8 border-b mt-5 border-gray-200 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`pb-3 text-lg font-medium text-[#0B0C1E] transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-[3px] border-[#FFB400]"
                  : "text-opacity-60 hover:text-opacity-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {filteredCars.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-8">
              {activeTab === "all"
                ? "No cars available at the moment."
                : `No ${activeTab} cars found.`}
            </p>
          ) : (
            filteredCars.map((car, index) => {
              const carId = car?._id || index;
              const carImage = car?.images?.[0] || images.carPlaceholder;
              const carMake = car?.make || "Unknown Make";
              const carModel = car?.model || "Unknown Model";
              const carYear = car?.year || "N/A";
              const carPrice = car?.price?.toLocaleString() || "N/A";

              return (
                <div
                  className="md:px-6 md:py-8 bg-white rounded-lg shadow-sm"
                  key={carId}
                >
                  <div className="w-full h-full border border-gray-100 rounded-bl-2xl rounded-br-2xl md:pb-8 pb-14">
                    <div className="h-48 relative">
                      <LazyImage
                        src={carImage}
                        alt={`${carMake} ${carModel}`}
                        className="rounded-t-lg"
                        width="100%"
                        height="100%"
                        onError={() => {
                          // This will be handled by the LazyImage component
                        }}
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
                          onClick={() =>
                            car?._id && navigate(`/cars/${car._id}`)
                          }
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
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg shadow-sm bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg shadow-sm bg-primary hover:bg-opacity-80 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary rerenders
export default memo(GetAllCarsSection);
