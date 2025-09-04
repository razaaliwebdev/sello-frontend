import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const {
    data: filteredCars,
    isLoading,
    error,
  } = useGetFilteredCarsQuery(queryParams, { skip: !queryParams });

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
    if (
      filters.minPrice &&
      filters.maxPrice &&
      Number(filters.minPrice) > Number(filters.maxPrice)
    ) {
      toast.error("Minimum price cannot be greater than maximum price");
      return false;
    }
    if (
      filters.minYear &&
      filters.maxYear &&
      Number(filters.minYear) > Number(filters.maxYear)
    ) {
      toast.error("Minimum year cannot be greater than maximum year");
      return false;
    }
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
    if (!validateFilters(filters)) return;

    const backendFilters = {};

    // Map filters to backend query
    if (filters.minPrice) backendFilters.priceMin = filters.minPrice;
    if (filters.maxPrice) backendFilters.priceMax = filters.maxPrice;
    if (filters.minYear) backendFilters.yearMin = filters.minYear;
    if (filters.maxYear) backendFilters.yearMax = filters.maxYear;
    if (filters.minKilometers)
      backendFilters.mileageMin = filters.minKilometers;
    if (filters.maxKilometers)
      backendFilters.mileageMax = filters.maxKilometers;
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
    if (filters.horsePower) {
      backendFilters.hpMin = filters.horsePower.split("-")[0];
      backendFilters.hpMax = filters.horsePower.split("-")[1];
    }
    if (filters.engineCapacity) {
      backendFilters.engineMin = filters.engineCapacity.split("-")[0];
      backendFilters.engineMax = filters.engineCapacity.split("-")[1];
    }
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
    if (onFilter) onFilter(cleanFilters);
    toast.success("Filters applied successfully!");
  };

  // ✅ Navigate after API gives filteredCars
  useEffect(() => {
    if (filteredCars && !isLoading) {
      navigate("/search-results", { state: { filteredCars, isLoading } });
    }
  }, [filteredCars, isLoading, navigate]);

  useEffect(() => {
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
                inputType="number"
                value={filters.minPrice}
                onChange={(e) => handleChange("minPrice", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxPrice}
                onChange={(e) => handleChange("maxPrice", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="price"
            min={0}
            max={100000}
            onChange={(values) => handleRangeChange("price", values)}
          />
        </div>

        {/* Car Make & Model */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Make</label>
              <Input
                inputType="text"
                value={filters.make}
                onChange={(e) => handleChange("make", e.target.value)}
                placeholder="e.g., Toyota"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Model</label>
              <Input
                inputType="text"
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
                inputType="number"
                value={filters.minYear}
                onChange={(e) => handleChange("minYear", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxYear}
                onChange={(e) => handleChange("maxYear", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="year"
            min={1990}
            max={new Date().getFullYear()}
            onChange={(values) => handleRangeChange("year", values)}
          />
        </div>

        {/* Kilometers */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Kilometers From</label>
              <Input
                inputType="number"
                value={filters.minKilometers}
                onChange={(e) => handleChange("minKilometers", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxKilometers}
                onChange={(e) => handleChange("maxKilometers", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="kilometers"
            min={0}
            max={300000}
            onChange={(values) => handleRangeChange("kilometers", values)}
          />
        </div>

        {/* More Filters */}
        <BodyTypes
          onBodyTypeChange={(value) => handleChange("bodyType", value)}
        />
        <RegionalSpecs
          onBodyTypeChange={(value) => handleChange("regionalSpecs", value)}
        />
        <Seats onChange={(value) => handleChange("seats", value)} />
        <FuelSpecs onChange={(value) => handleChange("fuelType", value)} />
        <TransmissionSpecs
          onChange={(value) => handleChange("transmission", value)}
        />
        <CylindersSpecs
          onChange={(value) => handleChange("cylinders", value)}
        />
        <ExteriorColor
          onChange={(value) => handleChange("exteriorColor", value)}
        />
        <InteriorColor
          onChange={(value) => handleChange("interiorColor", value)}
        />
        <DoorsSpecs onChange={(value) => handleChange("doors", value)} />
        <OwnerTypeSpecs
          onChange={(value) => handleChange("ownerType", value)}
        />
        <WarrantyType onChange={(value) => handleChange("warranty", value)} />
        <HorsePowerSpecs
          onChange={(value) => handleChange("horsePower", value)}
        />
        <EngineCapacitySpecs
          onChange={(value) => handleChange("engineCapacity", value)}
        />
        <TechnicalFeaturesSpecs
          onChange={(value) => handleChange("technicalFeatures", value)}
        />
        <LocationButton onChange={handleLocationChange} />

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-primary-500 px-4 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Applying Filters..." : "Apply Filters"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
