import React from "react";
import { aboutImages } from "../../../assets/about/aboutAssets";

const AboutHeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#845D16] flex flex-col md:flex-row items-center md:items-start">
      {/* Dark rotated top panel */}
      <div
        className="absolute inset-x-0 top-0 h-[40vh] md:h-[60vh] -rotate-2 origin-top-left bg-[#272525]
                   rounded-bl-[40px] z-20 pointer-events-none"
      />

      {/* Text Content */}
      <div className="relative z-30 w-full md:w-1/2 px-6 md:px-12 py-8 md:py-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
          About Us
        </h1>
        <p className="mt-6 text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
          At Sello we’re building the world’s most trusted and transparent
          automotive marketplace. We make it easy to find great deals from
          top-rated dealers and provide the guidance consumers need to make a
          more informed purchase. We also help dealers quickly and easily market
          their vehicles and connect with ready-to-buy shoppers.
        </p>
      </div>

      {/* Car Image */}
      <div className="relative z-40 w-full md:w-1/2 flex justify-center md:justify-end px-6 md:px-12 mt-6 md:mt-0">
        <img
          src={aboutImages.hero}
          className="w-full max-w-[280px] sm:max-w-md md:max-w-xl lg:max-w-2xl object-contain scale-150 md:scale-100"
          alt="Car"
        />
      </div>

      {/* Decorative gold bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#845D16] to-transparent z-10 rounded-t-[60px] md:rounded-t-[80px] pointer-events-none" />
    </section>
  );
};

export default AboutHeroSection;
