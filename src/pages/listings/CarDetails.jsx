import React from "react";
import CarDetailsHeroSection from "../../components/sections/carDetails/CarDetailsHeroSection";
import CarDetailsGallerySection from "../../components/sections/carDetails/CarDetailsGallerySection";
import Btns from "../../components/sections/carDetails/Btns";
import CarDetailsEtc from "../../components/sections/carDetails/CarDetailsEtc";

const CarDetails = () => {
  return (
    <div>
      <CarDetailsHeroSection />
      <CarDetailsGallerySection />
      <Btns />
      <CarDetailsEtc />
    </div>
  );
};

export default CarDetails;
