import React from "react";
import Hero from "../components/sections/Hero";
import BrandsSection from "../components/sections/BrandsSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import PopularMakes from "../components/sections/PopularMakes";
import ShopBoxCar from "../components/sections/ShopBoxCarSection";
import CustomerReview from "../components/sections/CustomerReview";
import BlogSection from "../components/sections/BlogSection";
import NewsLatter from "../components/utils/NewsLatter";

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
        <NewsLatter />
      </div>
    </div>
  );
};

export default Home;
