import React from "react";
import ListingHeroSection from "../../components/sections/listings/ListingHeroSection";
import BrowsByTypeSection from "../../components/sections/listings/BrowsByTypeSection";
import GetAllCarsSection from "../../components/sections/listings/GetAllCarsSection";
import NeedInspiration from "../../components/sections/listings/NeedInspiration";
import BoxCarBanner from "../../components/sections/listings/BoxCarBanner";
import BlogSection from "../../components/sections/home/BlogSection";
import ExploreBrands from "../../components/sections/listings/ExploreBrands";
import PartnerOffersSection from "../../components/sections/listings/PartnerOffersSection";
import Ads from "../../components/utils/Ads";

const CarListings = () => {
  return (
    <div>
      <ListingHeroSection />
      <BrowsByTypeSection />
      <GetAllCarsSection />
      <Ads />
      <NeedInspiration />
      <BoxCarBanner />
      <BlogSection />
      <ExploreBrands />
      <PartnerOffersSection />
    </div>
  );
};

export default CarListings;
