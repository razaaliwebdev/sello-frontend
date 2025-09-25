import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCarsQuery } from "../../../redux/services/api";
import { images } from "../../../assets/assets";
import MapView from "./MapLocation";

const CarDetailsEtc = () => {
  const { id } = useParams();
  const { data: carsResponse, isLoading, error } = useGetCarsQuery({
    page: 1,
    limit: 100,
  });
  const car = carsResponse?.cars?.find((c) => c._id === id);

  const [showMore, setShowMore] = useState(false);

  if (isLoading) {
    return <p className="px-4 py-10">Loading details...</p>;
  }

  if (error || !car) {
    return (
      <p className="px-4 py-10 text-red-500">
        Failed to load car details. Please try again later.
      </p>
    );
  }

  const coordinates =
    car.geoLocation?.coordinates?.length === 2
      ? [car.geoLocation.coordinates[1], car.geoLocation.coordinates[0]]
      : [25.217136, 55.284207];

  return (
    <div className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
      <div className="border-[1px] border-gray-400 border-t-0 md:px-5 md:py-6 p-4 rounded-bl-xl rounded-br-xl">
        <div className="border-b-[1px] border-gray-400">
          <h2 className="md:text-4xl text-2xl font-semibold">{`${car.title} ${car.model} - ${car.year}`}</h2>
          <p className="my-2 text-sm md:text-base">
            {car.features} {car.variant} - {car.transmission} - {car.bodyType}
          </p>
        </div>

        {/* Icons Section (always visible) */}
        <div className="flex flex-wrap justify-between border-b-[1px] border-gray-400 py-3 gap-4">
          {/* ... keep your icon props here as they are ... */}
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img
              className="md:h-10 md:w-10 h-8 w-8"
              src={images.milesIcon}
              alt=""
            />
            <p className="text-sm">{car.mileage} Miles</p>
          </div>
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img
              className="md:h-10 md:w-10 h-8 w-8"
              src={images.fuelIcon}
              alt=""
            />
            <p className="text-sm">{car.fuelType}</p>
          </div>
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img
              className="md:h-10 md:w-10 h-8 w-8"
              src={images.transmissionIcon}
              alt=""
            />
            <p className="text-sm">{car.transmission}</p>
          </div>
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img
              className="md:h-10 md:w-10 h-8 w-8"
              src={images.sedan}
              alt=""
            />
            <p className="text-sm">{car.bodyType}</p>
          </div>
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img className="md:h-10 md:w-10 h-8 w-8" src={images.door} alt="" />
            <p className="text-sm">{car.carDoors}</p>
          </div>
          <div className="flex items-center gap-4 my-2 w-[48%] sm:w-auto">
            <img className="md:h-10 md:w-10 h-8 w-8" src={images.cc} alt="" />
            <p className="text-sm">{car.engineCapacity}</p>
          </div>
        </div>

        {/* Specs Section (always visible) */}
        <div className="flex flex-wrap justify-between border-b-[1px] border-gray-400 py-5 gap-4">
          {/* ... keep your specs props here ... */}
          <div className="flex gap-3 items-center w-full sm:w-auto">
            <div>
              <h4 className="text-sm font-medium">Interior Color</h4>
              <p className="text-sm">{car.colorInterior}</p>
            </div>
            <div
              style={{ backgroundColor: `${car.colorInterior}` }}
              className="h-5 w-5 rounded-full"
            ></div>
          </div>
          <div className="flex gap-3 items-center w-full sm:w-auto">
            <div>
              <h4 className="text-sm font-medium">Exterior Color</h4>
              <p className="text-sm">{car.colorExterior}</p>
            </div>
            <div
              style={{ backgroundColor: `${car.colorExterior}` }}
              className="h-5 w-5 rounded-full"
            ></div>
          </div>
          <div className="w-full sm:w-auto">
            <h4 className="text-sm font-medium">Regional Specs</h4>
            <p className="text-sm">{car.regionalSpec}</p>
          </div>
          <div className="w-full sm:w-auto">
            <h4 className="text-sm font-medium">Number of Cylinders</h4>
            <p className="text-sm">{car.numberOfCylinders}</p>
          </div>
          <div className="w-full sm:w-auto">
            <h4 className="text-sm font-medium">Seats</h4>
            <p className="text-sm">4</p>
          </div>
          <div className="w-full sm:w-auto">
            <h4 className="text-sm font-medium">Seller Type</h4>
            <p className="text-sm">{car.sellerType}</p>
          </div>
          <div className="w-full sm:w-auto">
            <h4 className="text-sm font-medium">Warranty</h4>
            <p className="text-sm">{car.warranty}</p>
          </div>
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <div>
              <h4 className="text-sm font-medium">Horsepower</h4>
              <p className="text-sm">{car.horsepower}</p>
            </div>
            <img src={images.hp} alt="" className="h-5 w-5" />
          </div>
        </div>

        {/* Price and Proceed Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
          <h2 className="md:text-2xl text-xl font-semibold">AED {car.price}</h2>
          <button className="bg-primary-500 px-4 py-2 rounded hover:opacity-90 transition">
            Proceed
          </button>
        </div>

        {/* Expand/Collapse More Details */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-primary-500 underline text-lg mt-5 font-medium"
          >
            {showMore ? "Collapse" : "Expand"}
          </button>
        </div>

        {showMore && (
          <div className="mt-6 border-t border-gray-300 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Make:</span> {car.make}
            </p>
            <p>
              <span className="font-medium">Variant:</span> {car.variant}
            </p>
            <p>
              <span className="font-medium">Condition:</span> {car.condition}
            </p>
            <p>
              <span className="font-medium">Owner Type:</span> {car.ownerType}
            </p>
            <p>
              <span className="font-medium">City:</span> {car.city}
            </p>
            <p>
              <span className="font-medium">Location:</span> {car.location}
            </p>
            <p>
              <span className="font-medium">Contact:</span> {car.contactNumber}
            </p>
            <div className="sm:col-span-2">
              <span className="font-medium">Features:</span>{" "}
              {car.features?.length > 0
                ? car.features.join(", ")
                : "No features listed"}
            </div>
          </div>
        )}
      </div>

      {/* Map Section */}
      <div>
        <h2 className="md:text-4xl text-2xl font-semibold my-4">Location</h2>
        <div className="map">
          <MapView coordinates={coordinates} />
        </div>
      </div>

      {/* Description Section */}
      <div className="">
        <h2 className="md:text-4xl text-2xl font-semibold my-4">Description</h2>
        <p className="text-sm md:text-base">{car.description}</p>
      </div>
    </div>
  );
};

export default CarDetailsEtc;
