import React from "react";
import { images } from "../../../assets/assets";
import LoanForm from "../../utils/LoanForm";

const LoanCalculator = () => {
  return (
    <div className="relative w-full">
      {/* Background container */}
      <div className="h-[90vh] md:h-screen w-full">
        <img
          className="w-full h-full object-cover"
          src={images.loan}
          alt="Loan Background"
        />
      </div>

      {/* Overlay form */}
      <div
        className="
        absolute top-0 left-0 
        md:w-[40vw] w-full
        bg-gray-200/95 
        md:h-full h-auto
        md:rounded-tr-[100px] md:rounded-bl-[100px]
        rounded-t-[40px]
        p-6
        flex flex-col justify-center
      "
      >
        <h1 className="md:text-4xl text-2xl font-semibold mb-4">
          Auto Loan Calculator
        </h1>
        <p className="mb-6 md:text-lg text-base text-gray-700">
          Use this car payment calculator to estimate monthly payments on your
          next new or used auto loan.
        </p>

        {/* Loan Form */}
        <div className="loan-calculator">
          <LoanForm />
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
