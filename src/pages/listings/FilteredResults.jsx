import React from "react";
import { useLocation } from "react-router-dom";
import FilterResultsSection from "../../components/sections/filter/FilterResultsSection";

const FilteredResults = () => {
  const location = useLocation();
  const { filteredCars, isLoading, filters } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
      {filters && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <h2 className="text-lg font-medium">Active Filters:</h2>
          <pre className="text-sm">{JSON.stringify(filters, null, 2)}</pre>
        </div>
      )}
      <FilterResultsSection filteredCars={filteredCars} isLoading={isLoading} />
    </div>
  );
};

export default FilteredResults;
