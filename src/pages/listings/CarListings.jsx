import React from "react";
import ListingHeroSection from "../../components/sections/listings/ListingHeroSection";
import BrowsByTypeSection from "../../components/sections/listings/BrowsByTypeSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import NeedInspiration from "../../components/sections/listings/NeedInspiration";
import BoxCarBanner from "../../components/sections/listings/BoxCarBanner";
import OurTeamSection from "../../components/sections/listings/OurTeamSection";
import BlogSection from "../../components/sections/home/BlogSection";
import ExploreBrands from "../../components/sections/listings/ExploreBrands";

const CarListings = () => {
  return (
    <div>
      <ListingHeroSection />
      <BrowsByTypeSection />
      <GetAllCarsSection />
      <WhyChooseUsUtility />
      <NeedInspiration />
      <BoxCarBanner />
      <OurTeamSection />
      <BlogSection />
      <ExploreBrands />
    </div>
  );
};

export default CarListings;
