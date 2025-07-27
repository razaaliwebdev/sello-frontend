import React from "react";
import { images } from "../../../assets/assets";

const CustomerReview = () => {
  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div className="flex flex-col md:flex-row items-start md:items-center my-7 justify-between gap-4">
        <h2 className="md:text-4xl text-3xl font-semibold">
          What our customers say
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          Rated 4.7/5 based on 28,370 reviews showing our 4 & 5 stars reviews
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-16 gap-6">
        <img
          src={images.aliTufan}
          alt="Customer image"
          className="w-[340px] h-[340px] mx-auto md:w-auto md:h-auto object-cover"
        />

        <div>
          <div className="rating flex items-center gap-3 md:gap-5">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className="text-primary-500 md:text-3xl text-2xl"
              >
                ★
              </span>
            ))}
            <span className="flag bg-primary-500 px-2 py-1 rounded-md text-white text-sm font-medium">
              5.0
            </span>
          </div>
          <h3 className="name md:text-3xl text-2xl font-semibold mt-5">
            Ali Tufan
          </h3>
          <h6 className="professional text-gray-700 mb-5">Designer</h6>
          <p className="text-base md:text-3xl text-gray-800 leading-relaxed">
            " I'd suggest Macklin Motors Nissan Glasgow South to a friend because
            I had great service from my salesman Patrick and all of the team."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
