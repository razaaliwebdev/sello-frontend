import React from "react";
import Hero from "../components/sections/Hero";
import BrandsSection from "../components/sections/BrandsSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import PopularMakes from "../components/sections/PopularMakes";
import ShopBoxCar from "../components/sections/ShopBoxCarSection";
import CustomerReview from "../components/sections/CustomerReview";

const Home = () => {
  return (
    <div className="">
      <div className="bg-[#050B20]">
        <Hero />
        <BrandsSection />
        <WhyChooseUs />
        <PopularMakes />
        <ShopBoxCar />
        <CustomerReview />
      </div>
    </div>
  );
};

export default Home;
