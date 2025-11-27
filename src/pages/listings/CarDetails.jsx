import React from "react";
import CarDetailsHeroSection from "../../components/sections/carDetails/CarDetailsHeroSection";
import CarDetailsGallerySection from "../../components/sections/carDetails/CarDetailsGallerySection";
import Btns from "../../components/sections/carDetails/Btns";
import CarDetailsEtc from "../../components/sections/carDetails/CarDetailsEtc";
import BrandMarquee from "../../components/BrandMarquee";
import brands from "../../assets/carLogos/brands";
import { Link } from "react-router-dom";
import Ads from "../../components/utils/Ads";
import BlogSection from "../../components/sections/home/BlogSection";
import CustomerReviews from "../../components/sections/carDetails/CustomerReviews";

const CarDetails = () => {
  return (
    <div>
      <CarDetailsHeroSection />
      <CarDetailsGallerySection />
      <Btns />
      <CarDetailsEtc />
      <CustomerReviews />
      <div className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
        <div className="flex items-center md:justify-between">
          <h1 className="md:text-4xl text-2xl font-semibold">
            Explore Our Premium Brands
          </h1>
          <button className="text-primary-500">
            <Link to="/view-all-brands">Show All Brands</Link>
          </button>
        </div>
        <BrandMarquee brands={brands} />
      </div>
      <Ads />
      <BlogSection />
    </div>
  );
};

export default CarDetails;
