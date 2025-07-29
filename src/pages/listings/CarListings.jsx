import React from "react";
import ListingHeroSection from "../../components/sections/listings/ListingHeroSection";
import BrowsByTypeSection from "../../components/sections/listings/BrowsByTypeSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";
import WhyChooseUsUtility from '../../components/utils/WhyChooseUsUtility'

const CarListings = () => {
  return (
    <div>
      <ListingHeroSection />
      <BrowsByTypeSection />
      <GetAllCarsSection />
      <WhyChooseUsUtility />
    </div>
  );
};

export default CarListings;
