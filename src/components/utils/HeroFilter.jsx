import React, { useState, useMemo } from "react";
import { useCarCategories } from "../../hooks/useCarCategories";

const HeroFilter = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Dynamic categories from admin panel
  const {
    makes,
    models,
    years,
    getModelsByMake,
    isLoading: categoriesLoading,
  } = useCarCategories();

  const [filters, setFilters] = useState({
    year: "",
    make: "",
    model: "",
    mileage: "< 10000",
    engine: "5 Speed Manual",
    status: "Old Car",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Search submitted:", filters, "Tab:", activeTab);
  };

  // Year options from categories (fallback to a static list)
  const yearOptions = useMemo(() => {
    if (years && years.length > 0) {
      return years
        .map((y) => y.name)
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a));
    }
    return ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  }, [years]);

  // Make options from categories (fallback to a static list)
  const makeOptions = useMemo(() => {
    if (makes && makes.length > 0) {
      return makes
        .map((m) => m.name)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
    }
    return ["Audi", "BMW", "Mercedes", "Toyota", "Honda"];
  }, [makes]);

  // Model options from categories, filtered by selected make when present
  const modelOptions = useMemo(() => {
    if (models && models.length > 0) {
      if (filters.make && makes && makes.length > 0 && getModelsByMake) {
        const selectedMake = makes.find((m) => m.name === filters.make);
        if (selectedMake) {
          const listForMake = getModelsByMake[selectedMake._id] || [];
          const byMake = listForMake.length ? listForMake : models;
          return byMake.map((m) => m.name).filter(Boolean);
        }
      }
      // No make selected → show all models
      return models.map((m) => m.name).filter(Boolean);
    }
    // Fallback static models if no categories yet
    return ["A7 Sportback", "A4", "A6", "Q5", "Q7"];
  }, [models, makes, getModelsByMake, filters.make]);

  const mileageOptions = ["< 10000", "10000-25000", "25000-50000", "50000+"];
  const engineOptions = ["5 Speed Manual", "6 Speed Auto", "Electric", "Hybrid"];
  const statusOptions = ["Old Car", "New Car", "Certified", "Premium"];

  return (
    <div className=" p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Filter Container */}
        <div className=" rounded-xl shadow-2xl overflow-hidden border-4  bg-primary-500">
          {/* Header Section */}
          <div className="bg-[#050B20] px-6 py-4 border-b border-[#050B20]">
            <h2 className="text-2xl font-bold text-white">
              Find Your Perfect Car
            </h2>
          </div>

          {/* Tabs Section */}
          <div className="flex bg-[#050B20] border-b border-[#050B20]">
            {["all", "used", "new"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-sm font-bold uppercase transition-all ${
                  activeTab === tab
                    ? "bg-primary-500 text-gray-900"
                    : "bg-[#050B20]/50 text-white hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Section */}
          <div className="flex flex-col lg:flex-row">
            {/* Left Section - Orange Background with Filters */}
            <div className="bg-primary-500 p-6 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Year Filter */}
                <FilterSelect
                  label="Year"
                  value={filters.year}
                  onChange={(v) => handleChange("year", v)}
                  options={yearOptions}
                  disabled={categoriesLoading}
                />

                {/* Make Filter */}
                <FilterSelect
                  label="Select make"
                  value={filters.make}
                  onChange={(v) => handleChange("make", v)}
                  options={makeOptions}
                  disabled={categoriesLoading}
                />

                {/* Model Filter */}
                <FilterSelect
                  label="Select model"
                  value={filters.model}
                  onChange={(v) => handleChange("model", v)}
                  options={modelOptions}
                  disabled={categoriesLoading}
                />

                {/* Mileage Filter */}
                <FilterSelect
                  label="Moved (km)"
                  value={filters.mileage}
                  onChange={(v) => handleChange("mileage", v)}
                  options={mileageOptions}
                />

                {/* Engine Filter */}
                <FilterSelect
                  label="Select engine"
                  value={filters.engine}
                  onChange={(v) => handleChange("engine", v)}
                  options={engineOptions}
                />

                {/* Status Filter */}
                <FilterSelect
                  label="Car Status"
                  value={filters.status}
                  onChange={(v) => handleChange("status", v)}
                  options={statusOptions}
                />
              </div>
            </div>

            {/* Right Section - Dark Background with Pricing */}
            <div className="bg-gray-800 p-6 lg:w-72 flex flex-col justify-between">
              <div>
                <h4 className="text-white text-sm font-semibold mb-4">
                  Pricing ( AED )
                </h4>

                <div className="flex gap-4 mb-6">
                  <div>
                    <label className="block text-white text-xs font-medium mb-2">
                      From
                    </label>
                    <input
                      type="number"
                      value={filters.minPrice}
                      onChange={(e) => handleChange("minPrice", e.target.value)}
                      placeholder="Min"
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-xs font-medium mb-2">
                      To
                    </label>
                    <input
                      type="number"
                      value={filters.maxPrice}
                      onChange={(e) => handleChange("maxPrice", e.target.value)}
                      placeholder="Max"
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-primary-500 hover:bg-primary-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Search Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Reusable Components */

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="text-gray-900 text-xs font-bold mb-2 uppercase">
      {label}
    </label>
    <select
      className="w-full h-10 px-3 rounded-md bg-white text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 border border-gray-300 cursor-pointer"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default HeroFilter;
