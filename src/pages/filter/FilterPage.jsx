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

  // Read URL parameters on mount and convert to filter object - optimized
  useEffect(() => {
    // Build backend filters directly from URL params (more efficient)
    const backendFilters = {};
    
    // Map URL params to backend filter format in single pass
    const paramMap = {
      city: 'city',
      bodyType: 'bodyType',
      make: 'make',
      model: 'model',
      yearMin: 'yearMin',
      yearMax: 'yearMax',
      priceMin: 'priceMin',
      priceMax: 'priceMax',
      carDoors: 'doorsMin'
    };

    searchParams.forEach((value, key) => {
      if (value && paramMap[key]) {
        backendFilters[paramMap[key]] = value;
        // Handle carDoors special case
        if (key === 'carDoors') {
          backendFilters.doorsMax = value;
        }
      }
    });

    // Apply filters if any exist
    if (Object.keys(backendFilters).length > 0) {
      setQueryParams(backendFilters);
      setCurrentFilters(backendFilters);
    }
  }, [searchParams]);

  // Navigate to results page when filtered cars are received - optimized
  useEffect(() => {
    // Only navigate if we have valid data and haven't navigated yet
    if (!queryParams || hasNavigated.current || isLoading || isFetching) {
      return;
    }

    if (filteredCars?.data) {
      const carsData = filteredCars.data;
      const cars = Array.isArray(carsData.cars) ? carsData.cars : [];
      const total = carsData.total || 0;

      // Only navigate if we have results or explicit empty result
      if (cars.length > 0 || total === 0) {
        const formattedData = {
          cars,
          total,
          data: cars
        };

        navigate("/search-results", {
          state: { 
            filteredCars: formattedData, 
            isLoading: false,
            filters: currentFilters
          },
          replace: true // Use replace to avoid back button issues
        });
        hasNavigated.current = true;
      }
    }
  }, [filteredCars, isLoading, isFetching, queryParams, navigate, currentFilters]);

  const handleFilter = (filters) => {
    // Reset navigation flag when new filters are applied
    hasNavigated.current = false;
    
    // Only set query params if filters exist
    if (filters && Object.keys(filters).length > 0) {
      setQueryParams(filters);
      setCurrentFilters(filters);
    } else {
      // Clear filters if empty
      setQueryParams(null);
      setCurrentFilters(null);
    }
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
