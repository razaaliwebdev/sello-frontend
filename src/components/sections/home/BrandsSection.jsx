import React, { memo } from "react";
import BrandMarquee from "../../BrandMarquee";
import { Link } from "react-router-dom";
import { brandsCategory } from "../../../assets/assets";
// import brands from "../../../assets/carLogos/brands";

const BrandsSection = () => {
  return (
    <section className="md:h-screen bg-[#F5F5F5] w-full px-4 md:px-16 py-8 md:rounded-tl-[80px]">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Explore Our Premium Brands
        </h1>
        <Link
          to={"/view-all-brands"}
          className="text-primary-500 text-sm md:text-md hover:underline"
        >
          Show All Brands
        </Link>
      </div>
      {/* BrandMarquee will fetch brands from admin categories automatically */}
      <BrandMarquee />
      <div className="maiBrandsLogos  py-5 flex md:flex-row flex-col items-center justify-between">
        {/* <div className="nav flex md:gap-10 gap-7 my-2">
          <button className="">In Stock</button>
          <button className="">New Cars</button>
          <button className="">Used Cars</button>
        </div> */}
        <div className="grid md:grid-cols-4 grid-cols-2 gap-6 md:w-[70%] w-full">
          {brandsCategory.map((brand, index) => {
            const isLastItem = index === brandsCategory.length - 1;
            const isOddNumberOfItems = brandsCategory.length % 2 !== 0;

            return (
              <div
                className={`
          bg-[#DADADA] flex flex-col items-center justify-center rounded-2xl
          ${isLastItem && isOddNumberOfItems ? "md:col-span-2 col-span-2" : ""}
        `}
                key={index}
              >
                <img
                  className="h-48 w-48"
                  src={brand.image}
                  alt="brand"
                  loading="lazy"
                />
                <span className="pb-4 text-xl">{brand.title}</span>
              </div>
            );
          })}
        </div>
        {/* ad */}
        <div className="ad"></div>
      </div>
    </section>
  );
};

export default memo(BrandsSection);
