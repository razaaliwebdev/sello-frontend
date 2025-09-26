import React from "react";

const ReviewsAnalysis = () => {
  return (
    <div className="bg-[#D9D9D9] pt-5">
      <div className="bg-[#272525] rounded-tl-[50px] px-4 sm:px-6 md:px-8 py-10 md:py-14">
        <div>
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-gray-100 py-5">
            Here's What Customers think of Sello Dealers
          </h2>

          {/* Rating summary */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-100 gap-2">
            <span className="text-lg sm:text-xl md:text-2xl">
              <span className="text-primary-500">★★★★★</span> 4.8 out of 5
            </span>
            <span className="text-base sm:text-lg md:text-2xl">
              209321 Carwow buyer reviews
            </span>
          </div>

          {/* Sub ratings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 text-gray-100 text-lg sm:text-xl md:text-2xl my-5">
            <div>
              <span className="text-primary-500">★★★★★</span> Friendliness
            </div>
            <div>
              <span className="text-primary-500">★★★★★</span> Communication
            </div>
            <div>
              <span className="text-primary-500">★★★★★</span> Knowledge
            </div>
            <div>
              <span className="text-primary-500">★★★★★</span> Ordering process
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-100 my-5 md:my-7">
            Rating Distribution
          </h3>

          <div className="p-2 sm:p-3 md:p-4 text-white w-full max-w-xl">
            {/* 5 star */}
            <div className="flex items-center mb-2">
              <span className="w-12 sm:w-14 md:w-16 text-xs sm:text-sm font-bold text-gray-100">
                5 star
              </span>
              <div className="w-1 bg-primary-500 h-3 sm:h-4 mx-1"></div>
              <div className="flex-1 bg-transparent relative">
                <div
                  className="h-3 sm:h-4 bg-green-600 rounded-r-full"
                  style={{ width: "89%" }}
                ></div>
              </div>
              <span className="w-8 sm:w-10 text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                89%
              </span>
            </div>

            {/* 4 star */}
            <div className="flex items-center mb-2">
              <span className="w-12 sm:w-14 md:w-16 text-xs sm:text-sm font-bold text-gray-100">
                4 star
              </span>
              <div className="w-1 bg-primary-500 h-3 sm:h-4 mx-1"></div>
              <div className="flex-1 bg-transparent relative">
                <div
                  className="h-3 sm:h-4 bg-yellow-400 rounded-r-full"
                  style={{ width: "9%" }}
                ></div>
              </div>
              <span className="w-8 sm:w-10 text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                9%
              </span>
            </div>

            {/* 3 star */}
            <div className="flex items-center mb-2">
              <span className="w-12 sm:w-14 md:w-16 text-xs sm:text-sm font-bold text-gray-100">
                3 star
              </span>
              <div className="w-1 bg-primary-500 h-3 sm:h-4 mx-1"></div>
              <div className="flex-1 bg-transparent relative">
                <div
                  className="h-3 sm:h-4 bg-red-400 rounded-r-full"
                  style={{ width: "1%" }}
                ></div>
              </div>
              <span className="w-8 sm:w-10 text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                1%
              </span>
            </div>

            {/* 2 star */}
            <div className="flex items-center mb-2">
              <span className="w-12 sm:w-14 md:w-16 text-xs sm:text-sm font-bold text-gray-100">
                2 star
              </span>
              <div className="w-1 bg-primary-500 h-3 sm:h-4 mx-1"></div>
              <div className="flex-1 bg-transparent relative">
                <div
                  className="h-3 sm:h-4 bg-transparent rounded-r-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <span className="w-8 sm:w-10 text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                0%
              </span>
            </div>

            {/* 1 star */}
            <div className="flex items-center">
              <span className="w-12 sm:w-14 md:w-16 text-xs sm:text-sm font-bold text-gray-100">
                1 star
              </span>
              <div className="w-1 bg-primary-500 h-3 sm:h-4 mx-1"></div>
              <div className="flex-1 bg-transparent relative">
                <div
                  className="h-3 sm:h-4 bg-transparent rounded-r-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <span className="w-8 sm:w-10 text-xs sm:text-sm font-bold ml-1 sm:ml-2">
                0%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsAnalysis;
