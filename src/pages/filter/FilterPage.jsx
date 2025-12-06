import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterForm from "../../components/sections/filter/FilterForm";
import GridCars from "../../components/sections/filter/GridCars";
import LoanCalculator from "../../components/sections/filter/LoanCalculator";
import BannerInFilter from "../../components/sections/filter/BannerInFilter";
import BlogSection from "../../components/sections/home/BlogSection";
import { useGetFilteredCarsQuery } from "../../redux/services/api";

const FilterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState(null);
  const [currentFilters, setCurrentFilters] = useState(null);
  const hasNavigated = useRef(false);
  const { data: filteredCars, isLoading, isFetching } = useGetFilteredCarsQuery(queryParams, { 
    skip: !queryParams 
  });

  // Read URL parameters on mount and convert to filter object
  useEffect(() => {
    const urlFilters = {};
    
    // Get all URL parameters
    searchParams.forEach((value, key) => {
      if (value) {
        urlFilters[key] = value;
      }
    });

    // Convert URL params to backend filter format
    const backendFilters = {};
    if (urlFilters.city) backendFilters.city = urlFilters.city;
    if (urlFilters.bodyType) backendFilters.bodyType = urlFilters.bodyType;
    if (urlFilters.make) backendFilters.make = urlFilters.make;
    if (urlFilters.model) backendFilters.model = urlFilters.model;
    if (urlFilters.yearMin) backendFilters.yearMin = urlFilters.yearMin;
    if (urlFilters.yearMax) backendFilters.yearMax = urlFilters.yearMax;
    if (urlFilters.priceMax) backendFilters.priceMax = urlFilters.priceMax;
    if (urlFilters.priceMin) backendFilters.priceMin = urlFilters.priceMin;
    if (urlFilters.carDoors) backendFilters.doorsMin = urlFilters.carDoors;

    // Apply filters if any exist
    if (Object.keys(backendFilters).length > 0) {
      setQueryParams(backendFilters);
      setCurrentFilters(backendFilters);
    }
  }, [searchParams]);

  // Navigate to results page when filtered cars are received
  useEffect(() => {
    if (filteredCars && !isLoading && !isFetching && queryParams && !hasNavigated.current) {
      // Format the data to match what FilteredResults expects
      // Backend returns: { success: true, data: { cars: [], total: 0, ... } }
      const carsData = filteredCars?.data || {};
      const formattedData = {
        cars: Array.isArray(carsData.cars) ? carsData.cars : [],
        total: carsData.total || 0,
        data: Array.isArray(carsData.cars) ? carsData.cars : []
      };

      navigate("/search-results", {
        state: { 
          filteredCars: formattedData, 
          isLoading: false,
          filters: currentFilters
        },
      });
      hasNavigated.current = true;
    }
  }, [filteredCars, isLoading, isFetching, queryParams, navigate, currentFilters]);

  const handleFilter = (filters) => {
    hasNavigated.current = false; // Reset navigation flag when new filters are applied
    setQueryParams(filters);
    setCurrentFilters(filters);
  };

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h1 className="md:text-3xl text-xl font-semibold text-center text-primary-500 mb-8">
          Filter
        </h1>
        <div className="border-[1px] border-gray-700 rounded-lg md:px-5 md:py-6 px-7 py-8 my-4">
          <div className="w-full">
            <FilterForm onFilter={handleFilter} />
          </div>
        </div>
      </div>
      <GridCars />
      <LoanCalculator />
      <BannerInFilter />
      <BlogSection />
    </div>
  );
};

export default FilterPage;
