import React from "react";
import LoanPlansHeroSection from "../../components/sections/loanPlans/LoanPlansHeroSection";
import HeroFilter from "../../components/utils/HeroFilter";
import LoanPlanFilterSection from "../../components/sections/loanPlans/LoanPlanFilterSection";

const LoanPlansPage = () => {
  return (
    <div>
      <LoanPlansHeroSection />
      <LoanPlanFilterSection />
    </div>
  );
};

export default LoanPlansPage;
