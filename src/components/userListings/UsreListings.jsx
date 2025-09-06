import React, { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../../redux/services/api"; // adjust path
import LazyImage from "../../components/common/LazyImage";
import { images } from "../../assets/assets";

const UserListings = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMyCarsQuery();
  const [savedCars, setSavedCars] = useState([]);

  const toggleSave = (id) => {
    setSavedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
        <h1 className="md:text-4xl text-2xl font-medium mb-8">My Listings</h1>
        <p>Loading your cars...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
        <h1 className="md:text-4xl text-2xl font-medium mb-8">My Listings</h1>
        <p className="text-red-500">Error loading your listings</p>
      </section>
    );
  }

  const cars = Array.isArray(data?.cars) ? data.cars : [];

  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <h1 className="md:text-4xl text-2xl font-medium mb-8">My Listings</h1>

      {cars.length === 0 ? (
        <p>You haven’t posted any cars yet.</p>
      ) : (
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6 ">
          {cars.map((car, index) => {
            const carId = car?._id || index;
            const carImage = car?.images?.[0] || images.carPlaceholder;
            const carMake = car?.make || "Unknown Make";
            const carModel = car?.model || "Unknown Model";
            const carYear = car?.year || "N/A";
            const carPrice = car?.price?.toLocaleString() || "N/A";

            return (
              <div
                className="md:px-6 md:py-8 bg-[#D9D9D9] rounded-lg shadow-sm"
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
                    <div className="flex items-center gap-5 justify-center">
                      <button className="px-6 w-[45%] hover:bg-primary py-2 bg-white text-lg font-medium rounded-md">
                        Make As Sold
                      </button>
                      <button className="px-6 w-[45%] hover:bg-primary py-2 bg-white text-lg font-medium rounded-md">
                        Share
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

export default UserListings;
