import React, { useState } from "react";
import { useGetFilteredCarsQuery } from "../../../redux/services/api";
import toast from "react-hot-toast";
import RangeFilter from "../../utils/filter/RangeFilter";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
import Seats from "../../utils/filter/Seats";
import FuelSpecs from "../../utils/filter/FuelSpecs";
import TransmissionSpecs from "../../utils/filter/TransmissionSpecs";
import CylindersSpecs from "../../utils/filter/CylindersSpecs";
import ExteriorColor from "../../utils/filter/ExteriorColor";
import InteriorColor from "../../utils/filter/InteriorColor";
import DoorsSpecs from "../../utils/filter/DoorsSpecs";
import OwnerTypeSpecs from "../../utils/filter/OwnerTypeSpecs";
import WarrantyType from "../../utils/filter/WarrantyType";
import HorsePowerSpecs from "../../utils/filter/HorsePowerSpecs";
import EngineCapacitySpecs from "../../utils/filter/EngineCapacitySpecs";
import TechnicalFeaturesSpecs from "../../utils/filter/TechnicalFeaturesSpecs";
import LocationButton from "../../utils/filter/LocationButton";
import FilteredCarsResults from "./FilteredCarsResults";
import FilterResultsSection from "./FilterResultsSection";

const FilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    make: "",
    model: "",
    minYear: "",
    maxYear: "",
    minKilometers: "",
    maxKilometers: "",
    bodyType: "",
    regionalSpecs: "",
    seats: "",
    fuelType: "",
    transmission: "",
    cylinders: "",
    exteriorColor: "",
    interiorColor: "",
    doors: "",
    ownerType: "",
    warranty: "",
    horsePower: "",
    engineCapacity: "",
    technicalFeatures: "",
    location: "",
  });

  const [queryParams, setQueryParams] = useState(null);

  const { data: filteredCars, isLoading, error } = useGetFilteredCarsQuery(
    queryParams,
    {
      skip: !queryParams,
    }
  );

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleRangeChange = (type, values) => {
    if (type === "price") {
      setFilters((prev) => ({
        ...prev,
        minPrice: values[0],
        maxPrice: values[1],
      }));
    } else if (type === "year") {
      setFilters((prev) => ({
        ...prev,
        minYear: values[0],
        maxYear: values[1],
      }));
    } else if (type === "kilometers") {
      setFilters((prev) => ({
        ...prev,
        minKilometers: values[0],
        maxKilometers: values[1],
      }));
    }
  };

  const handleLocationChange = (locationData) => {
    if (locationData && locationData.coordinates) {
      handleChange("location", JSON.stringify(locationData.coordinates));
    } else if (typeof locationData === "string") {
      handleChange("location", locationData);
    }
  };

  const validateFilters = (filters) => {
    // Validate price range
    if (
      filters.minPrice &&
      filters.maxPrice &&
      Number(filters.minPrice) > Number(filters.maxPrice)
    ) {
      toast.error("Minimum price cannot be greater than maximum price");
      return false;
    }

    // Validate year range
    if (
      filters.minYear &&
      filters.maxYear &&
      Number(filters.minYear) > Number(filters.maxYear)
    ) {
      toast.error("Minimum year cannot be greater than maximum year");
      return false;
    }

    // Validate kilometers range
    if (
      filters.minKilometers &&
      filters.maxKilometers &&
      Number(filters.minKilometers) > Number(filters.maxKilometers)
    ) {
      toast.error(
        "Minimum kilometers cannot be greater than maximum kilometers"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate filters
    if (!validateFilters(filters)) {
      return;
    }

    // Map frontend parameter names to backend parameter names
    const backendFilters = {};

    // Range filters mapping
    if (filters.minPrice) backendFilters.priceMin = filters.minPrice;
    if (filters.maxPrice) backendFilters.priceMax = filters.maxPrice;
    if (filters.minYear) backendFilters.yearMin = filters.minYear;
    if (filters.maxYear) backendFilters.yearMax = filters.maxYear;
    if (filters.minKilometers)
      backendFilters.mileageMin = filters.minKilometers;
    if (filters.maxKilometers)
      backendFilters.mileageMax = filters.maxKilometers;

    // Direct mapping filters
    if (filters.make) backendFilters.make = filters.make;
    if (filters.model) backendFilters.model = filters.model;
    if (filters.bodyType) backendFilters.condition = filters.bodyType;
    if (filters.ownerType) backendFilters.sellerType = filters.ownerType;
    if (filters.transmission)
      backendFilters.transmission = filters.transmission;
    if (filters.fuelType) backendFilters.fuelType = filters.fuelType;
    if (filters.location) backendFilters.city = filters.location;
    if (filters.exteriorColor)
      backendFilters.colorExterior = filters.exteriorColor;
    if (filters.interiorColor)
      backendFilters.colorInterior = filters.interiorColor;
    if (filters.doors) backendFilters.doors = filters.doors;
    if (filters.horsePower)
      backendFilters.hpMin = filters.horsePower.split("-")[0];
    if (filters.horsePower)
      backendFilters.hpMax = filters.horsePower.split("-")[1];
    if (filters.engineCapacity)
      backendFilters.engineMin = filters.engineCapacity.split("-")[0];
    if (filters.engineCapacity)
      backendFilters.engineMax = filters.engineCapacity.split("-")[1];
    if (filters.technicalFeatures)
      backendFilters.features = filters.technicalFeatures;

    // Remove empty values
    const cleanFilters = {};
    Object.entries(backendFilters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        cleanFilters[key] = value;
      }
    });

    console.log("Frontend Filters:", filters);
    console.log("Backend Query Parameters:", cleanFilters);

    setQueryParams(cleanFilters);

    if (onFilter) {
      onFilter(cleanFilters);
    }

    toast.success("Filters applied successfully!");
  };

  React.useEffect(() => {
    if (filteredCars) {
      console.log("Filtered Cars API Response:", filteredCars);
      toast.success(
        `Found ${
          filteredCars.count || filteredCars.length || 0
        } cars matching your filters`
      );
    }
  }, [filteredCars]);

  React.useEffect(() => {
    if (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "Failed to filter cars");
    }
  }, [error]);

  return (
    <div>
      <form className="space-y-6 h-auto" onSubmit={handleSubmit}>
        {/* Price */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Price From</label>
              <Input
                inputType={"number"}
                value={filters.minPrice}
                onChange={(e) => handleChange("minPrice", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType={"number"}
                value={filters.maxPrice}
                onChange={(e) => handleChange("maxPrice", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="range">
            <RangeFilter
              type="price"
              min={0}
              max={100000}
              onChange={(values) => handleRangeChange("price", values)}
            />
          </div>
        </div>

        {/* Car Make */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Make</label>
              <Input
                inputType={"text"}
                value={filters.make}
                onChange={(e) => handleChange("make", e.target.value)}
                placeholder="e.g., Toyota"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Model</label>
              <Input
                inputType={"text"}
                value={filters.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="e.g., Camry"
              />
            </div>
          </div>
        </div>

        {/* Year */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Year From</label>
              <Input
                inputType={"number"}
                value={filters.minYear}
                onChange={(e) => handleChange("minYear", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType={"number"}
                value={filters.maxYear}
                onChange={(e) => handleChange("maxYear", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="range">
            <RangeFilter
              type="year"
              min={1990}
              max={new Date().getFullYear()}
              onChange={(values) => handleRangeChange("year", values)}
            />
          </div>
        </div>

        {/* Kilometers */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Kilometers From</label>
              <Input
                inputType={"number"}
                value={filters.minKilometers}
                onChange={(e) => handleChange("minKilometers", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType={"number"}
                value={filters.maxKilometers}
                onChange={(e) => handleChange("maxKilometers", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <div className="range">
            <RangeFilter
              type="kilometers"
              min={0}
              max={300000}
              onChange={(values) => handleRangeChange("kilometers", values)}
            />
          </div>
        </div>

        {/* Car Type */}
        <div className="">
          <label className="block mb-1">Body Types</label>
          <BodyTypes
            onBodyTypeChange={(value) => handleChange("bodyType", value)}
          />
        </div>

        {/* Car Regional Specs */}
        <div className="">
          <label className="block mb-1">Regional Specs</label>
          <RegionalSpecs
            onBodyTypeChange={(value) => handleChange("regionalSpecs", value)}
          />
        </div>

        {/* Seats */}
        <div className="">
          <label className="block mb-1">Seats</label>
          <Seats onChange={(value) => handleChange("seats", value)} />
        </div>

        {/* Fuel type */}
        <div className="">
          <label className="block mb-1">Fuel Type</label>
          <FuelSpecs onChange={(value) => handleChange("fuelType", value)} />
        </div>

        {/* Transmission Type */}
        <div className="">
          <label className="block mb-1">Transmission Type</label>
          <TransmissionSpecs
            onChange={(value) => handleChange("transmission", value)}
          />
        </div>

        {/* Cylinders */}
        <div className="">
          <label className="block mb-1">Numbers of Cylinders</label>
          <CylindersSpecs
            onChange={(value) => handleChange("cylinders", value)}
          />
        </div>

        {/* Exterior Colors */}
        <div className="">
          <label className="block mb-1">Exterior Colors</label>
          <ExteriorColor
            onChange={(value) => handleChange("exteriorColor", value)}
          />
        </div>

        {/* Interior Color */}
        <div className="">
          <label className="block mb-1">Interior Color</label>
          <InteriorColor
            onChange={(value) => handleChange("interiorColor", value)}
          />
        </div>

        {/* Doors */}
        <div className="">
          <label className="block mb-1">Doors</label>
          <DoorsSpecs onChange={(value) => handleChange("doors", value)} />
        </div>

        {/* Owner Type */}
        <div className="">
          <label className="block mb-1">Owner Type</label>
          <OwnerTypeSpecs
            onChange={(value) => handleChange("ownerType", value)}
          />
        </div>

        {/* Warranty Type */}
        <div className="">
          <label className="block mb-1">Warranty</label>
          <WarrantyType onChange={(value) => handleChange("warranty", value)} />
        </div>

        {/* Horse Power Specs */}
        <div className="">
          <label className="block mb-1">Horse Power</label>
          <HorsePowerSpecs
            onChange={(value) => handleChange("horsePower", value)}
          />
        </div>

        {/* Engine Capacity Specs */}
        <div className="">
          <label className="block mb-1">Engine Capacity</label>
          <EngineCapacitySpecs
            onChange={(value) => handleChange("engineCapacity", value)}
          />
        </div>

        {/* Technical Features Specs */}
        <div className="">
          <label className="block mb-1">Technical Features</label>
          <TechnicalFeaturesSpecs
            onChange={(value) => handleChange("technicalFeatures", value)}
          />
        </div>

        {/* Location */}
        <div className="">
          <label className="block mb-1">Location</label>
          <LocationButton onChange={handleLocationChange} />
        </div>

        {/* Submit */}
        <div className="">
          <button
            type="submit"
            className="bg-primary-500 px-4 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold "
            disabled={isLoading}
          >
            {isLoading ? "Applying Filters..." : "Apply Filters"}
          </button>
        </div>

        {/* Display loading and error states */}
        {isLoading && (
          <div className="text-center text-primary-500">
            Loading filtered results...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            Error: {error?.data?.message || "Failed to filter cars"}
          </div>
        )}

        {/* {filteredCars && (
          <div className="text-center text-green-500">
            Found {filteredCars.count || filteredCars.data?.length || 0} cars
            matching your filters
          </div>
        )} */}

        {/* <FilterResultsSection
          filteredCars={filteredCars}
          isLoading={isLoading}
        /> */}
      </form>
    </div>
  );
};

export default FilterForm;
