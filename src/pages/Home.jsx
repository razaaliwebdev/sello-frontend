import React, { memo } from "react";
import Hero from "../components/sections/home/Hero";
import BrandsSection from "../components/sections/home/BrandsSection";
import PopularMakes from "../components/sections/home/PopularMakes";
import ShopBoxCar from "../components/sections/home/ShopBoxCarSection";
import CustomerReview from "../components/sections/home/CustomerReview";
import BlogSection from "../components/sections/home/BlogSection";
import NewsLatter from "../components/utils/NewsLatter";
import BuySellCards from "../components/utils/BuySellCards";
import GetAllCarsSection from "../components/sections/listings/GetAllCarsSection";
import BannerCarousal from "../components/utils/BannerCarousal";

const Home = () => {
  return (
    <div className="">
      <div className="">
        <Hero />
        <BrandsSection />
        <BannerCarousal/>
        <PopularMakes />
        <ShopBoxCar />
        <GetAllCarsSection />
        <CustomerReview />
        <BlogSection />
        <BuySellCards />
        <NewsLatter />
      </div>
    </div>
  );
};

export default memo(Home);
