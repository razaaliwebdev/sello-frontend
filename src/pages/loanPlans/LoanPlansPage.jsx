import React from "react";
import LoanPlansHeroSection from "../../components/sections/loanPlans/LoanPlansHeroSection";
import HeroFilter from "../../components/utils/HeroFilter";
import LoanPlanFilterSection from "../../components/sections/loanPlans/LoanPlanFilterSection";
import BrandsMarqueeInLoanSection from "../../components/sections/loanPlans/BrandsMarqueeInLoanSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";

const LoanPlansPage = () => {
  return (
    <div>
      <LoanPlansHeroSection />
      <LoanPlanFilterSection />
      <BrandsMarqueeInLoanSection />
      <GetAllCarsSection />
    </div>
  );
};

export default LoanPlansPage;
