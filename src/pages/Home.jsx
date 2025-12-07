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
import SEO from "../components/common/SEO";
import Video from "../components/sections/home/Video";

const Home = () => {
  return (
    <div className="">
      <SEO
        title="Sello - Buy and Sell Cars in UAE"
        description="Find your perfect car on Sello. Browse thousands of new and used cars from trusted sellers in UAE. Buy or sell your car today with confidence!"
        keywords="buy cars UAE, sell cars Dubai, used cars, new cars, car marketplace UAE, car dealers Dubai"
      />
      <div className="">
        <Hero />
        <BrandsSection />
        <Video/>
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
