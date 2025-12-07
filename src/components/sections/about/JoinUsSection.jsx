import React from "react";
import { selloGroupData } from "../../../assets/about/aboutAssets";

const JoinUsSection = () => {
  return (
    <div className="w-full bg-[#272525] rounded-tr-[50px] md:rounded-tr-[70px]">
      {/* Header Facts */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-8 px-6 md:px-8">
          <h5 className="text-base md:text-xl font-medium text-gray-100">
            Quick Facts 11M+
          </h5>
          <h5 className="text-base md:text-xl font-medium text-gray-100">
            YouTube Subscriber 4.5 ★
          </h5>
          <h5 className="text-base md:text-xl font-medium text-gray-100 mr-12">
            Excellent Trustpilot Rating 5,500+
          </h5>
        </div>
        <h5 className="px-6 md:px-8 pb-5 text-base md:text-xl font-medium text-gray-100">
          Trusted Dealer Partners 12M+ Registered Users
        </h5>
      </div>

      {/* Content Section */}
      <div className="bg-primary-500 flex md:rounded-tl-[50px] flex-col md:flex-row justify-between gap-8 px-6 md:px-8 py-10 rounded-b-[30px] md:rounded-none">
        {/* Text */}
        <div className="w-full md:w-[55%]">
          <h2 className="text-3xl md:text-5xl font-medium mb-5 text-gray-900">
            Join Us
          </h2>
          <p className="text-sm md:text-lg py-3 leading-relaxed text-gray-800">
            We have just been named one of the Culture 100. This puts us amongst
            the world’s most progressive tech businesses, focusing on building a
            people-centric environment of engagement, growth, diversity and
            inclusion.
          </p>
          <p className="text-sm md:text-lg py-3 leading-relaxed text-gray-800">
            Our last funding round secured $52 million, led by global venture
            capital firm Bessemer Venture Partners, an early backer of LinkedIn
            and Shopify. This investment will fuel our growth plans, further
            scaling and expanding our Sell My Car service in the UK and
            accelerating our European operations.
          </p>
          <div className="flex md:justify-end mt-6">
            <button className="px-8 md:px-12 py-2.5 md:py-3 rounded-tr-[20px] md:rounded-tr-[30px] rounded-bl-[20px] md:rounded-bl-[30px] bg-[#272525] text-base md:text-xl text-gray-100 hover:bg-transparent hover:border hover:border-[#272525] hover:text-[#272525] transition">
              View Jobs
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[40%] border-[5px] md:border-[7px] rounded-tl-[30px] md:rounded-tl-[40px] rounded-br-[30px] md:rounded-br-[40px] overflow-hidden">
          <img
            src={selloGroupData.img}
            className="h-full w-full object-cover"
            alt="group"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
