import React from "react";
import HeroFilter from "../../utils/HeroFilter";
import { images } from "../../../assets/assets";

const ListingHeroSection = () => {
  return (
    <div className="h-[120vh] md:h-screen w-full flex items-center gap-5 py-5 flex-col relative overflow-hidden bg-primary-500">
      <h1 className="md:text-5xl text-4xl font-semibold text-center">
        Find Your Dream Car
      </h1>
      <div className=" md:h-[40vh] h-[80vh] relative w-full">
        <HeroFilter />
      </div>
      <img src={images.whiteCar} alt="white car" />
    </div>
  );
};

export default ListingHeroSection;
