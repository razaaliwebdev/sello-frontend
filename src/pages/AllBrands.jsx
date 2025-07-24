import React from "react";
import brands from "../assets/carLogos/brands"; // Array of { img: ... }

const AllBrands = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-800">
        All Car Brands
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 place-items-center">
        {brands.map((brand, index) => (
          <img
            key={index}
            src={brand.img}
            alt={`brand-${index}`}
            className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default AllBrands;
