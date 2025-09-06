import React from "react";
import UserListingHero from "../../components/userListings/UserListingHero";
import BrandMarquee from "../../components/BrandMarquee";
import brands from "../../assets/carLogos/brands";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import UserListings from "../../components/userListings/UsreListings";
import BannerInUesrListings from "../../components/userListings/BannerInUesrListings";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import ReviewSectionInUser from "../../components/userListings/ReviewSectionInUser";

const UserListingPage = () => {
  return (
    <div>
      <UserListingHero />
      <div className="py-5 px-10">
        <div className=" flex items-center justify-between w-full">
          <h2 className="md:text-3xl text-xl font-semibold">
            Explore Our Premium Brands
          </h2>
          <Link
            to={"/view-all-brands"}
            className="flex items-center gap-2 text-lg"
          >
            Show All Brands <GoArrowUpRight />{" "}
          </Link>
        </div>
        <BrandMarquee brands={brands} />
      </div>
      <UserListings />
      <BannerInUesrListings />
      <WhyChooseUsUtility />
      <ReviewSectionInUser />
    </div>
  );
};

export default UserListingPage;
