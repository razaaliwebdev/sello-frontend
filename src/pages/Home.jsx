import React from "react";
import Hero from "../components/sections/home/Hero";
import BrandsSection from "../components/sections/home/BrandsSection";
import WhyChooseUs from "../components/sections/home/WhyChooseUs";
import PopularMakes from "../components/sections/home/PopularMakes";
import ShopBoxCar from "../components/sections/home/ShopBoxCarSection";
import CustomerReview from "../components/sections/home/CustomerReview";
import BlogSection from "../components/sections/home/BlogSection";
import NewsLatter from "../components/utils/NewsLatter";
import BuySellCards from "../components/utils/BuySellCards";

const Home = () => {
  return (
    <div className="">
      <div className="">
        <Hero />
        <BrandsSection />
        <WhyChooseUs />
        <PopularMakes />
        <ShopBoxCar />
        <CustomerReview />
        <BlogSection />
        <BuySellCards />
        <NewsLatter />
      </div>
    </div>
  );
};

export default Home;
