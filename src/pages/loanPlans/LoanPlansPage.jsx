import React from "react";
import LoanPlansHeroSection from "../../components/sections/loanPlans/LoanPlansHeroSection";
import HeroFilter from "../../components/utils/HeroFilter";
import LoanPlanFilterSection from "../../components/sections/loanPlans/LoanPlanFilterSection";
import BrandsMarqueeInLoanSection from "../../components/sections/loanPlans/BrandsMarqueeInLoanSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import LoanCutomersReviews from "../../components/sections/loanPlans/LoanCutomersReviews";
import BlogSection from "../../components/sections/home/BlogSection";
import BottomBanner from "../../components/sections/loanPlans/BottomBanner";
import NewsLatter from "../../components/utils/NewsLatter";

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
      <BottomBanner />
      <NewsLatter />
    </div>
  );
};

export default LoanPlansPage;
