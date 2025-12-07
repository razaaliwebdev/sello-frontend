import React from "react";
import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import BrandMarquee from "../../BrandMarquee";

const BrandsMarqueeInLoanSection = () => {
  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div className="flex items-center justify-between">
        <h2 className="md:text-4xl text-2xl font-semibold">
          Explore Our Premium Brands
        </h2>
        <Link className="flex items-center gap-2 text-lg" to="/view-all-brands">
          Show All Brands <LuArrowUpRight />
        </Link>
      </div>
      {/* BrandMarquee will fetch brands from admin categories automatically */}
      <BrandMarquee />
    </div>
  );
};

export default BrandsMarqueeInLoanSection;
