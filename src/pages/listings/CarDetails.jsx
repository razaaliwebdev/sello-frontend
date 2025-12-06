import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../redux/services/api";
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
import Breadcrumb from "../../components/common/Breadcrumb";
import SimilarListings from "../../components/sections/carDetails/SimilarListings";
import RecentlyViewed from "../../components/sections/carDetails/RecentlyViewed";
import UserReviewSection from "../../components/reviews/UserReviewSection";
import Spinner from "../../components/Spinner";

const CarDetails = () => {
  const { id } = useParams();
  const { data: car, isLoading } = useGetSingleCarQuery(id, {
    skip: !id,
  });
  
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cars', path: '/cars' },
    { label: car ? `${car.make} ${car.model}` : 'Car Details', path: `/cars/${id}` }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Spinner fullScreen={false} />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Car not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <CarDetailsHeroSection />
      <CarDetailsGallerySection />
      <Btns />
      <CarDetailsEtc />
      {car.postedBy && (
        <div className="px-4 md:px-20 py-8">
          <UserReviewSection 
            userId={car.postedBy._id || car.postedBy} 
            carId={id}
            sellerName={car.postedBy?.name}
          />
        </div>
      )}
      <CustomerReviews />
      
      {/* Similar Listings Section */}
      <SimilarListings carId={id} />
      
      {/* Recently Viewed Section */}
      <RecentlyViewed />
      
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
