import React from "react";
import LoanPlansHeroSection from "../../components/sections/loanPlans/LoanPlansHeroSection";
import HeroFilter from "../../components/utils/HeroFilter";
import LoanPlanFilterSection from "../../components/sections/loanPlans/LoanPlanFilterSection";
import BrandsMarqueeInLoanSection from "../../components/sections/loanPlans/BrandsMarqueeInLoanSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import LoanCutomersReviews from "../../components/sections/loanPlans/LoanCutomersReviews";
import BlogSection from '../../components/sections/home/BlogSection';

const LoanPlansPage = () => {
  return (
    <div>
      <LoanPlansHeroSection />
      <LoanPlanFilterSection />
      <BrandsMarqueeInLoanSection />
      <GetAllCarsSection />
      <WhyChooseUsUtility />
      <LoanCutomersReviews />
      <BlogSection />
    </div>
  );
};

export default LoanPlansPage;
