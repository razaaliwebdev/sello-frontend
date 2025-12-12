import React from "react";
import { Link } from "react-router-dom";
import { useVehicleCategories } from "../../../hooks/useVehicleCategories";
import { FaCar, FaBus, FaTruck, FaMotorcycle, FaBolt } from "react-icons/fa6";
import { FaShuttleVan } from "react-icons/fa";
import BuySellCards from "../../utils/BuySellCards";

const categoryIcons = {
    Car: FaCar,
    Bus: FaBus,
    Truck: FaTruck,
    Van: FaShuttleVan,
    Bike: FaMotorcycle,
    "E-bike": FaBolt,
};

const fallbackDescriptions = {
  "Car": "Cars, sedans, SUVs, and other passenger vehicles",
  "Bus": "Buses and commercial passenger vehicles",
  "Truck": "Trucks and heavy-duty vehicles",
  "Van": "Vans and utility vehicles",
  "Bike": "Motorcycles and bikes",
  "E-bike": "Electric bikes and scooters",
};

const BrowsByTypeSection = () => {
  const { categories, isLoading } = useVehicleCategories();

  // Default categories if none are loaded
  const defaultCategories = [
    { 
      name: "Car", 
      slug: "car",
      description: "Cars, sedans, SUVs, and other passenger vehicles"
    },
    { 
      name: "Bus", 
      slug: "bus",
      description: "Buses and commercial passenger vehicles"
    },
    { 
      name: "Truck", 
      slug: "truck",
      description: "Trucks and heavy-duty vehicles"
    },
    { 
      name: "Van", 
      slug: "van",
      description: "Vans and utility vehicles"
    },
    { 
      name: "Bike", 
      slug: "bike",
      description: "Motorcycles and bikes"
    },
    { 
      name: "E-bike", 
      slug: "e-bike",
      description: "Electric bikes and scooters"
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-800">
        Browse by Vehicle Type
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {displayCategories.map((category) => {
          const description = category.description || fallbackDescriptions[category.name];
          const Icon = categoryIcons[category.name] || FaCar;
          return (
            <Link
              key={category._id || category.slug}
              to={`/category/${category.slug}`}
              className="min-w-[120px] sm:min-w-[140px] bg-white rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-lg transition duration-300 cursor-pointer group h-full min-h-[210px] sm:min-h-[230px] gap-2"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-contain mb-2"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center mb-2 text-primary-500 group-hover:text-primary-600 transition">
                  <Icon className="text-4xl" />
                </div>
              )}
              <p className="text-sm font-medium text-gray-700 text-center">{category.name}</p>
              {description && (
                <p className="text-xs sm:text-sm text-gray-500 text-center leading-snug">
                  {description}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BrowsByTypeSection;
