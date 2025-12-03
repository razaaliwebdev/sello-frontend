import React, { useState } from "react";
import FilterForm from "../../components/sections/filter/FilterForm";
import GridCars from "../../components/sections/filter/GridCars";
import LoanCalculator from "../../components/sections/filter/LoanCalculator";
import BannerInFilter from "../../components/sections/filter/BannerInFilter";
import BlogSection from "../../components/sections/home/BlogSection";
import FilteredCarsResults from "../../components/sections/filter/FilteredCarsResults";
import { useGetFilteredCarsQuery } from "../../redux/services/api";

const FilterPage = () => {
  const [queryParams, setQueryParams] = useState(null);
  const { data: filteredCars, isLoading } = useGetFilteredCarsQuery(queryParams, { 
    skip: !queryParams 
  });

  const handleFilter = (filters) => {
    setQueryParams(filters);
  };

  return (
    <div className="px-4 md:px-16 py-12">
      <h1 className="md:text-3xl text-xl font-semibold text-center text-primary-500">
        Filter
      </h1>
      <div className="border-[1px] border-gray-700 rounded-lg md:px-5 md:py-6 px-7 py-8 my-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Filter Sidebar - Equal width (50/50) */}
          <div>
            <FilterForm onFilter={handleFilter} />
          </div>
          
          {/* Results Section */}
          <div>
            {queryParams ? (
              <FilteredCarsResults filteredCars={filteredCars} isLoading={isLoading} />
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No filters applied</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Apply filters on the left to see matching cars
                </p>
              </div>
            )}
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
