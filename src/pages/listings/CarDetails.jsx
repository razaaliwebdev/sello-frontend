import React from "react";
import CarDetailsHeroSection from "../../components/sections/carDetails/CarDetailsHeroSection";
import CarDetailsGallerySection from "../../components/sections/carDetails/CarDetailsGallerySection";
import Btns from "../../components/sections/carDetails/Btns";

const CarDetails = () => {
  return (
    <div>
      <CarDetailsHeroSection />
      <CarDetailsGallerySection />
      <Btns />
    </div>
  );
};

export default CarDetails;
