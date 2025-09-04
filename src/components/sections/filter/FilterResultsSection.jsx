import React from "react";
import FilteredCarsResults from "./FilteredCarsResults";

const FilterResultsSection = ({ filteredCars, isLoading }) => {
  if (isLoading) {
    return <p className="text-center text-primary-500">Loading cars...</p>;
  }

  if (!filteredCars || filteredCars.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No matching cars found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <FilteredCarsResults filteredCars={filteredCars} isLoading={isLoading} />
    </div>
  );
};

export default FilterResultsSection;
