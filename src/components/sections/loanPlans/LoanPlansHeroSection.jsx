import React from "react";
import { images } from "../../../assets/assets";
import LoanCalculator from "./LoanCalculator";

const LoanPlansHeroSection = () => {
  return (
    <div
      className="bg-primary-500 md:h-[81vh] h-[100vh] w-full bg-cover bg-center relative flex flex-col md:flex-row md:items-start md:justify-between px-5 py-1"
      style={{ backgroundImage: `url(${images.loanPlanHeroImg})` }}
    >
      {/* Loan Calculator */}
      <div className="w-full md:w-[50%] md:relative md:top-0 top-5 -mt-5 md:mt-0">
        <LoanCalculator />
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white w-full md:w-[50%] md:py-6 mt-6 md:mt-0 md:text-right">
        Let's Find Your Perfect Car
      </h1>
    </div>
  );
};

export default LoanPlansHeroSection;
