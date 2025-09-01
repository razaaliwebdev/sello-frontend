import React from "react";
import FilteredCarsResults from "./FilteredCarsResults";

const FilterResultsSection = ({ filteredCars, isLoading }) => {
  return (
    <div className="mt-6">
      {filteredCars && (
        <div className="space-y-4">
          <FilteredCarsResults
            filteredCars={filteredCars}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default FilterResultsSection;
