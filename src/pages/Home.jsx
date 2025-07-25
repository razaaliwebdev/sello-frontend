import React from "react";
import Hero from "../components/sections/Hero";
import BrandsSection from "../components/sections/BrandsSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <div className="bg-[#050B20]">
        <Hero />
        <BrandsSection />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;
