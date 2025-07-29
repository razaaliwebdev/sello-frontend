import React from "react";
import { goThemBuyOrSell } from "../../assets/assets";
import { IoIosArrowRoundUp } from "react-icons/io";

const BuySellCards = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-16 gap-3 md:pt-16">
      {goThemBuyOrSell.map((post, index) => (
        <div className="w-full md:w-1/2  p-8 " key={index}>
          <h3 className="md:text-2xl text-xl font-bold text-gray-900 mb-4">
            {post.title}
          </h3>
          <p className="text-base text-gray-600 mb-6">{post.description}</p>
          <div className="flex  sm:flex-row items-center sm:items-center gap-6 justify-between">
            <button className="bg-primary-500 hover:opacity-90  transition-colors flex items-center gap-2 px-6 py-3 rounded-lg font-medium">
              Get Started
              <IoIosArrowRoundUp className="text-xl rotate-[43deg]" />
            </button>
            <img
              src={post.image}
              alt="go image buy or sell"
              className="w-full max-w-[90px] object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuySellCards;
