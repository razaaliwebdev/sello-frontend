import React, { useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetMyCarsQuery } from "../../redux/services/api"; // adjust path
import LazyImage from "../../components/common/LazyImage";
import { images } from "../../assets/assets";
import toast from "react-hot-toast";

const UserListings = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetMyCarsQuery();
  const [savedCars, setSavedCars] = useState([]);
  const [updatingCars, setUpdatingCars] = useState(new Set());

  const toggleSave = (id) => {
    setSavedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  const handleMarkAsSold = async (car, isSold) => {
    if (window.confirm(`Are you sure you want to mark this car as ${isSold ? 'sold' : 'available'}?`)) {
      try {
        setUpdatingCars(prev => new Set(prev).add(car._id));
        const token = localStorage.getItem("token");
        const BASE_URL = import.meta.env.VITE_API_URL || "https://sello-backend.onrender.com";
        const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;
        const response = await fetch(`${API_URL}/cars/${car._id}/sold`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ isSold: !isSold })
        });
        const data = await response.json();
        if (data.success) {
          toast.success(`Car marked as ${!isSold ? 'sold' : 'available'}`);
          refetch();
        } else {
          toast.error(data.message || "Failed to update status");
        }
      } catch (error) {
        toast.error("Failed to update car status");
      } finally {
        setUpdatingCars(prev => {
          const newSet = new Set(prev);
          newSet.delete(car._id);
          return newSet;
        });
      }
    }
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
                      className={`rounded-t-lg ${car?.isSold ? 'opacity-60' : ''}`}
                      width="100%"
                      height="100%"
                    />
                    {car?.isSold && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                        SOLD
                      </div>
                    )}
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
                        AED <h5 className={`price ${car?.isSold ? 'line-through text-gray-500' : ''}`}>{carPrice}</h5>
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
                      <button 
                        onClick={() => navigate(`/edit-car/${car._id}`)}
                        className="px-6 w-[45%] hover:bg-primary-600 py-2 bg-primary-500 text-white text-lg font-medium rounded-md transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleMarkAsSold(car, car?.isSold)}
                        disabled={updatingCars.has(car._id)}
                        className={`px-6 w-[45%] py-2 text-lg font-medium rounded-md transition-colors ${
                          car?.isSold 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {updatingCars.has(car._id) 
                          ? 'Updating...' 
                          : car?.isSold 
                            ? 'Mark as Available' 
                            : 'Mark as Sold'}
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
