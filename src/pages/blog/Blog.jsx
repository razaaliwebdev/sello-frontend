import React from "react";
import BlogsHeroSection from "../../components/sections/blogs/BlogsHeroSection";
import brands from "../../assets/carLogos/brands";
import { GoArrowUpRight } from "react-icons/go";
import BrandMarquee from "../../components/BrandMarquee";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      <BlogsHeroSection />
      <div className="py-8 px-10">
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
    </div>
  );
};

export default Blog;
