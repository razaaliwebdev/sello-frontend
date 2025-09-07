

import React, { useRef } from "react";
import { loanPageCustomersReviews } from "../../../assets/images/carDetails/types/bodyTypes";
import { images } from "../../../assets/assets";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LoanCutomersReviews = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="w-full rounded-tr-[100px] rounded-bl-[100px] bg-primary-500 text-white">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            What our customers say
          </h2>
          <p className="text-sm md:text-base opacity-90 text-center md:text-right">
            Rated <span className="font-semibold">4.7 / 5</span> based on{" "}
            <span className="font-semibold">28,370 reviews</span> — Showing our
            4 & 5 stars reviews
          </p>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 pb-8 scroll-smooth"
          >
            {loanPageCustomersReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white text-black p-6 rounded-2xl min-w-[280px] md:min-w-[380px] h-[320px] shadow-lg flex flex-col justify-between"
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-4">
                  <h6 className="text-lg font-semibold">Great Work</h6>
                  <img src={images.comma} alt="comma" className="w-6 h-6" />
                </div>

                {/* Review text */}
                <p className="text-sm text-gray-600 flex-1">{rev.review}</p>

                {/* Customer info */}
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={rev.image || images.aliTufan}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h6 className="text-sm font-bold">{rev.customerName}</h6>
                    <p className="text-xs text-gray-500">{rev.customerRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows at bottom center */}
          <div className="flex pl-12 gap-4 pb-6">
            <button
              onClick={scrollLeft}
              className="bg-white text-lg text-black px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <IoIosArrowBack size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="bg-white text-lg text-black px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <IoIosArrowForward size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LoanCutomersReviews;
