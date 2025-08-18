import React from "react";
import FilterForm from "../../components/sections/filter/FilterForm";
import GridCars from "../../components/sections/filter/GridCars";
import LoanCalculator from "../../components/sections/filter/LoanCalculator";
import BannerInFilter from "../../components/sections/filter/BannerInFilter";

const FilterPage = () => {
  return (
    <div className="px-4 md:px-16 py-12">
      <h1 className="md:text-3xl text-xl font-semibold text-center text-primary-500">
        Filter
      </h1>
      <div className="border-[1px] border-gray-700 rounded-lg md:px-5 md:py-6 px-7 py-8 my-4">
        <FilterForm />
      </div>
      <GridCars />
      <LoanCalculator />
      <BannerInFilter />
    </div>
  );
};

export default FilterPage;
