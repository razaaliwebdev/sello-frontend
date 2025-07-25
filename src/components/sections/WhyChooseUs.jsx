import React from "react";
import { whyUs } from "../../assets/assets";
import { IoMdCheckmark, IoIosArrowRoundUp } from "react-icons/io";

const WhyChooseUs = () => {
  return (
    <div className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Image Section */}
        <div className="w-full lg:w-[40%]">
          <img
            className="w-full h-full object-cover rounded-md"
            src={whyUs.image}
            alt="Why Us"
          />
        </div>

        {/* Right Content Section */}
        <div className="w-full lg:w-[60%]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5">
            {whyUs.title}
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            {whyUs.description}
          </p>

          <div className="space-y-4">
            {whyUs.whatWeOffer.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-white shadow flex items-center justify-center p-1">
                  <IoMdCheckmark className="text-green-600" />
                </div>
                <span className="text-gray-800 text-base md:text-lg">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-8 bg-primary-500 flex items-center gap-2 text-lg px-6 py-2 rounded-md hover:opacity-90 transition">
            Get Started
            <IoIosArrowRoundUp className="text-xl rotate-45" />
          </button>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        {whyUs.ourAchievementsData.map((item, index) => (
          <div key={index} className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold">{item.value}M</h1>
            <p className="text-base md:text-lg text-gray-700">{item.caption}</p>
          </div>
        ))}
      </div>

      <div className="px-4">
        <h2 className="text-2xl md:text-3xl font-semibold my-6 text-center md:text-left">
          Why Choose Us
        </h2>

        <div className="flex flex-col md:flex-row md:gap-10 gap-6">
          {whyUs.whyChooseUs.map((item, index) => (
            <div key={index} className="flex-1 text-center md:text-left">
              <img
                src={item.image}
                alt={item.title}
                className="w-12 mx-auto md:mx-0 my-2"
              />
              <h4 className="text-xl font-semibold py-2">{item.title}</h4>
              <p className="text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
