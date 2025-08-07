// import React, { useState } from "react";
// import { images } from "../../../assets/assets";
// import { IoIosArrowRoundUp } from "react-icons/io";
// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { useGetCarsQuery } from "../../../redux/services/api";

// // Safe capitalize function
// const capitalize = (str) => {
//   if (!str || typeof str !== "string") return "";
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

// const GetAllCarsSection = () => {
//   const navigate = useNavigate();
//   const { data: cars = [], isLoading, error } = useGetCarsQuery();

//   const [activeTab, setActiveTab] = useState("in stock");
//   const [savedCars, setSavedCars] = useState([]);

//   const toggleSave = (id) => {
//     setSavedCars((prev) =>
//       prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
//     );
//   };

//   // Extract unique conditions safely
//   const uniqueConditions = Array.from(
//     new Set(
//       Array.isArray(cars)
//         ? cars.map((car) => car.condition?.toLowerCase()).filter((c) => c) // remove undefined/null
//         : []
//     )
//   );
//   const tabs = ["in stock", ...uniqueConditions];

//   const filteredCars =
//     activeTab === "in stock"
//       ? cars
//       : cars.filter((car) => car.condition?.toLowerCase() === activeTab);

//   if (isLoading) {
//     return (
//       <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
//         <h2 className="text-center text-xl">Loading cars...</h2>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
//         <h2 className="text-center text-xl text-red-500">Error loading cars</h2>
//       </section>
//     );
//   }

//   return (
//     <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
//       <div>
//         <h1 className="md:text-4xl text-2xl font-medium">
//           Explore All Vehicles
//         </h1>

//         {/* Tabs */}
//         <div className="flex space-x-8 border-b mt-5 border-gray-200">
//           {tabs.map((condition) => {
//             const label = capitalize(condition);
//             return (
//               <button
//                 key={condition || "unknown"}
//                 onClick={() => setActiveTab(condition)}
//                 className={`pb-3 text-lg font-medium text-[#0B0C1E] transition-all duration-300 ${
//                   activeTab === condition
//                     ? "border-b-[3px] border-[#FFB400]"
//                     : "text-opacity-60"
//                 }`}
//               >
//                 {label} {condition !== "in stock" && "Cars"}
//               </button>
//             );
//           })}
//         </div>

//         {/* Cars Grid */}
//         <div className="my-5 grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
//           {filteredCars.length === 0 ? (
//             <p className="col-span-full text-center text-gray-500">
//               No cars found for {capitalize(activeTab)}.
//             </p>
//           ) : (
//             filteredCars.map((car, index) => {
//               const carId = car._id || index;

//               return (
//                 <div className="md:px-6 md:py-8 bg-[#D9D9D9]" key={carId}>
//                   <div className="w-full h-full border border-gray-100 rounded-bl-2xl rounded-br-2xl md:pb-8 pb-14">
//                     <div className="h-[60%] relative">
//                       <img
//                         className="h-full w-full object-cover bg-center"
//                         src={car.images?.[0] || images.carPlaceholder}
//                         alt={`${car.make || "Car"} ${car.model || ""}`}
//                       />
//                       <button
//                         onClick={() => toggleSave(carId)}
//                         className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
//                       >
//                         {savedCars.includes(carId) ? (
//                           <BsBookmarkFill className="text-primary-500 text-xl" />
//                         ) : (
//                           <BsBookmark className="text-primary-500 text-xl" />
//                         )}
//                       </button>
//                     </div>

//                     <div className="p-5">
//                       <h4 className="md:text-xl text-lg font-medium">
//                         {car.make} {car.model} - {car.year}
//                       </h4>
//                       <p className="border-b border-gray-200 pb-1.5">
//                         {Array.isArray(car.features)
//                           ? car.features.join(", ")
//                           : car.features || "No features listed"}
//                       </p>

//                       <div className="flex items-center my-3 justify-around border-b border-gray-200 pb-3">
//                         <div className="flex items-center flex-col gap-2">
//                           <img src={images.milesIcon} alt="Miles Icon" />
//                           {car.mileage} km
//                         </div>
//                         <div className="flex items-center flex-col gap-2">
//                           <img src={images.fuelTypeIcon} alt="Fuel Icon" />
//                           {car.fuelType}
//                         </div>
//                         <div className="flex items-center flex-col gap-2">
//                           <img
//                             src={images.transmissionIcon}
//                             alt="Transmission Icon"
//                           />
//                           {car.transmission}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between py-4">
//                         <div className="flex items-center gap-2 md:text-xl font-medium text-lg">
//                           AED{" "}
//                           <h5 className="price">
//                             {car.price?.toLocaleString() || "N/A"}
//                           </h5>
//                         </div>
//                         <button
//                           onClick={() => navigate(`/cars/${car._id}`)}
//                           className="text-primary-500 flex items-center gap-2"
//                         >
//                           View Details
//                           <IoIosArrowRoundUp className="text-2xl rotate-[43deg]" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetAllCarsSection;

import React, { useState } from "react";
import { images } from "../../../assets/assets";
import { IoIosArrowRoundUp } from "react-icons/io";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useGetCarsQuery } from "../../../redux/services/api";

// Safe capitalize function
const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const GetAllCarsSection = () => {
  const navigate = useNavigate();
  const { data: carsData, isLoading, error } = useGetCarsQuery();
  const [activeTab, setActiveTab] = useState("in stock");
  const [savedCars, setSavedCars] = useState([]);

  // Ensure cars is always an array
  const cars = Array.isArray(carsData) ? carsData : [];

  const toggleSave = (id) => {
    setSavedCars((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  // Extract unique conditions safely
  const uniqueConditions = Array.from(
    new Set(
      cars
        .map((car) => car?.condition?.toLowerCase())
        .filter((condition) => condition) // remove undefined/null
    )
  ).filter((condition) => condition !== "in stock"); // exclude "in stock" from conditions

  const tabs = ["in stock", ...uniqueConditions];

  // Safely filter cars
  const filteredCars =
    activeTab === "in stock"
      ? cars
      : cars.filter((car) => car?.condition?.toLowerCase() === activeTab);

  if (isLoading) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
        <h2 className="text-center text-xl">Loading cars...</h2>
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
          {tabs.map((condition) => {
            const label = capitalize(condition);
            return (
              <button
                key={condition || "unknown"}
                onClick={() => setActiveTab(condition)}
                className={`pb-3 text-lg font-medium text-[#0B0C1E] transition-all duration-300 whitespace-nowrap ${
                  activeTab === condition
                    ? "border-b-[3px] border-[#FFB400]"
                    : "text-opacity-60"
                }`}
              >
                {label} {condition !== "in stock" && "Cars"}
              </button>
            );
          })}
        </div>

        {/* Cars Grid */}
        <div className="my-5 grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
          {filteredCars.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-8">
              No cars found for {capitalize(activeTab)}.
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
                    <div className="h-[60%] relative">
                      <img
                        className="h-full w-full object-cover bg-center"
                        src={carImage}
                        alt={`${carMake} ${carModel}`}
                        onError={(e) => {
                          e.target.src = images.carPlaceholder;
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
                          <img src={images.milesIcon} alt="Miles Icon" />
                          {car?.mileage || "N/A"} km
                        </div>
                        <div className="flex items-center flex-col gap-2">
                          <img src={images.fuelTypeIcon} alt="Fuel Icon" />
                          {car?.fuelType || "N/A"}
                        </div>
                        <div className="flex items-center flex-col gap-2">
                          <img
                            src={images.transmissionIcon}
                            alt="Transmission Icon"
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
      </div>
    </section>
  );
};

export default GetAllCarsSection;
