import React from "react";
import FilteredCarsResults from "./FilteredCarsResults";

const FilterResultsSection = ({ filteredCars, isLoading }) => {
  return (
    <div>
      {filteredCars && (
        <div className="h-full">
          <h2 className="md:text-2xl text-xl font-semibold">
            Got Filtered Cars
          </h2>
          <div className="w-full h-4 bg-gray-200 rounded">
            <FilteredCarsResults
              filteredCars={filteredCars}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterResultsSection;
