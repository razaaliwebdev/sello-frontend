import React, { useState, useEffect } from "react";
import { useGetFilteredCarsQuery } from "../../../redux/services/api";
import toast from "react-hot-toast";
import RangeFilter from "../../utils/filter/RangeFilter";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
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
import { useCarCategories } from "../../../hooks/useCarCategories";

const FilterForm = ({ onFilter }) => {
  const { makes, models, getModelsByMake, isLoading: categoriesLoading } = useCarCategories();
  const [selectedMake, setSelectedMake] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    make: "",
    model: "",
    minYear: "",
    maxYear: "",
    minMileage: "",
    maxMileage: "",
    bodyType: "",
    regionalSpec: "",
    fuelType: "",
    transmission: "",
    minCylinders: "",
    maxCylinders: "",
    exteriorColor: "",
    interiorColor: "",
    minDoors: "",
    maxDoors: "",
    ownerType: "",
    warranty: "",
    minHorsePower: "",
    maxHorsePower: "",
    minEngineCapacity: "",
    maxEngineCapacity: "",
    technicalFeatures: "",
    city: "",
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
    
    // When make changes, update available models
    if (field === "make") {
      setSelectedMake(value);
      const selectedMakeObj = makes.find(m => m.name === value);
      if (selectedMakeObj) {
        const makeModels = getModelsByMake[selectedMakeObj._id] || [];
        setAvailableModels(makeModels);
        // Reset model if it's not available for the new make
        if (filters.model && !makeModels.find(m => m.name === filters.model)) {
          setFilters((prev) => ({ ...prev, model: "" }));
        }
      } else {
        setAvailableModels([]);
        setFilters((prev) => ({ ...prev, model: "" }));
      }
    }
  };
  
  // Initialize available models when make is selected on mount
  useEffect(() => {
    if (filters.make && makes.length > 0) {
      const selectedMakeObj = makes.find(m => m.name === filters.make);
      if (selectedMakeObj) {
        const makeModels = getModelsByMake[selectedMakeObj._id] || [];
        setAvailableModels(makeModels);
      }
    }
  }, [filters.make, makes, getModelsByMake]);

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
    } else if (type === "mileage") {
      setFilters((prev) => ({
        ...prev,
        minMileage: values[0],
        maxMileage: values[1],
      }));
    } else if (type === "cylinders") {
      setFilters((prev) => ({
        ...prev,
        minCylinders: values[0],
        maxCylinders: values[1],
      }));
    } else if (type === "doors") {
      setFilters((prev) => ({
        ...prev,
        minDoors: values[0],
        maxDoors: values[1],
      }));
    } else if (type === "horsePower") {
      setFilters((prev) => ({
        ...prev,
        minHorsePower: values[0],
        maxHorsePower: values[1],
      }));
    } else if (type === "engineCapacity") {
      setFilters((prev) => ({
        ...prev,
        minEngineCapacity: values[0],
        maxEngineCapacity: values[1],
      }));
    }
  };

  const handleLocationChange = (locationData) => {
    if (locationData && locationData.coordinates) {
      handleChange("city", locationData.city || ""); // Map to city for text filter
    } else if (typeof locationData === "string") {
      handleChange("city", locationData);
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
      filters.minMileage &&
      filters.maxMileage &&
      Number(filters.minMileage) > Number(filters.maxMileage)
    ) {
      toast.error("Minimum mileage cannot be greater than maximum mileage");
      return false;
    }
    if (
      filters.minCylinders &&
      filters.maxCylinders &&
      Number(filters.minCylinders) > Number(filters.maxCylinders)
    ) {
      toast.error("Minimum cylinders cannot be greater than maximum cylinders");
      return false;
    }
    if (
      filters.minDoors &&
      filters.maxDoors &&
      Number(filters.minDoors) > Number(filters.maxDoors)
    ) {
      toast.error("Minimum doors cannot be greater than maximum doors");
      return false;
    }
    if (
      filters.minHorsePower &&
      filters.maxHorsePower &&
      Number(filters.minHorsePower) > Number(filters.maxHorsePower)
    ) {
      toast.error(
        "Minimum horsepower cannot be greater than maximum horsepower"
      );
      return false;
    }
    if (
      filters.minEngineCapacity &&
      filters.maxEngineCapacity &&
      Number(filters.minEngineCapacity) > Number(filters.maxEngineCapacity)
    ) {
      toast.error(
        "Minimum engine capacity cannot be greater than maximum engine capacity"
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
    if (filters.search) backendFilters.search = filters.search;
    if (filters.minPrice) backendFilters.priceMin = filters.minPrice;
    if (filters.maxPrice) backendFilters.priceMax = filters.maxPrice;
    if (filters.minYear) backendFilters.yearMin = filters.minYear;
    if (filters.maxYear) backendFilters.yearMax = filters.maxYear;
    if (filters.minMileage) backendFilters.mileageMin = filters.minMileage;
    if (filters.maxMileage) backendFilters.mileageMax = filters.maxMileage;
    if (filters.make) backendFilters.make = filters.make;
    if (filters.model) backendFilters.model = filters.model;
    if (filters.bodyType) backendFilters.bodyType = filters.bodyType;
    if (filters.regionalSpec)
      backendFilters.regionalSpec = filters.regionalSpec;
    if (filters.fuelType) backendFilters.fuelType = filters.fuelType;
    if (filters.transmission)
      backendFilters.transmission = filters.transmission;
    if (filters.minCylinders) backendFilters.cylMin = filters.minCylinders;
    if (filters.maxCylinders) backendFilters.cylMax = filters.maxCylinders;
    if (filters.exteriorColor)
      backendFilters.colorExterior = filters.exteriorColor;
    if (filters.interiorColor)
      backendFilters.colorInterior = filters.interiorColor;
    if (filters.minDoors) backendFilters.doorsMin = filters.minDoors;
    if (filters.maxDoors) backendFilters.doorsMax = filters.maxDoors;
    if (filters.ownerType) backendFilters.ownerType = filters.ownerType;
    if (filters.warranty) backendFilters.warranty = filters.warranty;
    if (filters.minHorsePower) backendFilters.hpMin = filters.minHorsePower;
    if (filters.maxHorsePower) backendFilters.hpMax = filters.maxHorsePower;
    if (filters.minEngineCapacity)
      backendFilters.engineMin = filters.minEngineCapacity;
    if (filters.maxEngineCapacity)
      backendFilters.engineMax = filters.maxEngineCapacity;
    if (filters.technicalFeatures)
      backendFilters.features = filters.technicalFeatures;
    if (filters.city) backendFilters.city = filters.city;

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
        {/* Title Search */}
        <div className="field space-y-2">
          <label className="block mb-1">Search by Title</label>
          <Input
            inputType="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="e.g., Toyota Camry"
          />
        </div>

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
              <select
                value={filters.make}
                onChange={(e) => handleChange("make", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={categoriesLoading}
              >
                <option value="">All Makes</option>
                {makes.map((make) => (
                  <option key={make._id} value={make.name}>
                    {make.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Car Model</label>
              <select
                value={filters.model}
                onChange={(e) => handleChange("model", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={categoriesLoading || !filters.make}
              >
                <option value="">All Models</option>
                {availableModels.map((model) => (
                  <option key={model._id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </select>
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

        {/* Mileage */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Mileage From</label>
              <Input
                inputType="number"
                value={filters.minMileage}
                onChange={(e) => handleChange("minMileage", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxMileage}
                onChange={(e) => handleChange("maxMileage", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="mileage"
            min={0}
            max={300000}
            onChange={(values) => handleRangeChange("mileage", values)}
          />
        </div>

        {/* Cylinders */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Cylinders From</label>
              <Input
                inputType="number"
                value={filters.minCylinders}
                onChange={(e) => handleChange("minCylinders", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxCylinders}
                onChange={(e) => handleChange("maxCylinders", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="cylinders"
            min={1}
            max={16}
            onChange={(values) => handleRangeChange("cylinders", values)}
          />
        </div>

        {/* Doors */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Doors From</label>
              <Input
                inputType="number"
                value={filters.minDoors}
                onChange={(e) => handleChange("minDoors", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxDoors}
                onChange={(e) => handleChange("maxDoors", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="doors"
            min={1}
            max={8}
            onChange={(values) => handleRangeChange("doors", values)}
          />
        </div>

        {/* Horsepower */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Horsepower From</label>
              <Input
                inputType="number"
                value={filters.minHorsePower}
                onChange={(e) => handleChange("minHorsePower", e.target.value)}
                placeholder="Min"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxHorsePower}
                onChange={(e) => handleChange("maxHorsePower", e.target.value)}
                placeholder="Max"
              />
            </div>
          </div>
          <RangeFilter
            type="horsePower"
            min={50}
            max={1000}
            onChange={(values) => handleRangeChange("horsePower", values)}
          />
        </div>

        {/* Engine Capacity */}
        <div className="field space-y-2">
          <div className="flex flex-col sm:flex-row w-full mx-auto gap-4 items-center">
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">Engine Capacity From</label>
              <Input
                inputType="number"
                value={filters.minEngineCapacity}
                onChange={(e) =>
                  handleChange("minEngineCapacity", e.target.value)
                }
                placeholder="Min (cc)"
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block mb-1">To</label>
              <Input
                inputType="number"
                value={filters.maxEngineCapacity}
                onChange={(e) =>
                  handleChange("maxEngineCapacity", e.target.value)
                }
                placeholder="Max (cc)"
              />
            </div>
          </div>
          <RangeFilter
            type="engineCapacity"
            min={0}
            max={5000}
            onChange={(values) => handleRangeChange("engineCapacity", values)}
          />
        </div>

        {/* Other Filters */}
        <BodyTypes
          onBodyTypeChange={(value) => handleChange("bodyType", value)}
        />
        <RegionalSpecs
          onChange={(value) => handleChange("regionalSpec", value)}
        />
        <FuelSpecs onChange={(value) => handleChange("fuelType", value)} />
        <TransmissionSpecs
          onChange={(value) => handleChange("transmission", value)}
        />
        <ExteriorColor
          onChange={(value) => handleChange("exteriorColor", value)}
        />
        <InteriorColor
          onChange={(value) => handleChange("interiorColor", value)}
        />
        <OwnerTypeSpecs
          onChange={(value) => handleChange("ownerType", value)}
        />
        <WarrantyType onChange={(value) => handleChange("warranty", value)} />
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
