
import React, { useEffect, useRef, useState } from "react";
import {
  ourStoryData,
  selloGroupData,
} from "../../../assets/about/aboutAssets";

const OutStorySection = () => {
  const [isVisible, setIsVisible] = useState({ story: false, group: false });
  const storyRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === storyRef.current) {
              setIsVisible((prev) => ({ ...prev, story: true }));
            } else if (entry.target === groupRef.current) {
              setIsVisible((prev) => ({ ...prev, group: true }));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    if (groupRef.current) observer.observe(groupRef.current);

    return () => {
      if (storyRef.current) observer.unobserve(storyRef.current);
      if (groupRef.current) observer.unobserve(groupRef.current);
    };
  }, []);

  return (
    <div className="py-16 md:py-24 px-6 md:px-10 lg:px-16 w-full h-full space-y-20 md:space-y-28 bg-gradient-to-b from-white to-gray-50">
      {/* Our Story */}
      <div
        ref={storyRef}
        className={`flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 justify-between items-center md:items-start transition-all duration-1000 ${
          isVisible.story
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-block mb-2">
            <span className="text-primary-500 font-semibold text-sm md:text-base uppercase tracking-wider">
              Our Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold capitalize leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {ourStoryData.title}
          </h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
          <p className="text-base md:text-lg lg:text-xl mt-6 leading-relaxed text-gray-700">
            {ourStoryData.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">12M+</span>
              <span className="text-sm text-gray-600">Customers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">50%</span>
              <span className="text-sm text-gray-600">Growth</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">£3B+</span>
              <span className="text-sm text-gray-600">Cars Bought</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[45%] relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-tr-[40px] md:rounded-tr-[60px] rounded-bl-[40px] md:rounded-bl-[60px] blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative border-[6px] md:border-[8px] border-primary-500 rounded-tr-[30px] md:rounded-tr-[45px] rounded-bl-[30px] md:rounded-bl-[45px] overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src={ourStoryData.img}
              className="h-full w-full object-cover"
              alt="Our Story"
            />
          </div>
        </div>
      </div>

      {/* Sello Group */}
      <div
        ref={groupRef}
        className={`flex flex-col md:flex-row-reverse gap-10 md:gap-12 lg:gap-16 justify-between items-center md:items-start transition-all duration-1000 ${
          isVisible.group
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="inline-block mb-2">
            <span className="text-primary-500 font-semibold text-sm md:text-base uppercase tracking-wider">
              Our Group
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold capitalize leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {selloGroupData.title}
          </h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full"></div>
          <p className="text-base md:text-lg lg:text-xl mt-6 leading-relaxed text-gray-700">
            {selloGroupData.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">1.1B+</span>
              <span className="text-sm text-gray-600">YouTube Views</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">1.2M</span>
              <span className="text-sm text-gray-600">Magazine Copies</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-lg">
              <span className="text-2xl font-bold text-primary-500">100M+</span>
              <span className="text-sm text-gray-600">Website Visits</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[45%] relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-tl-[40px] md:rounded-tl-[60px] rounded-br-[40px] md:rounded-br-[60px] blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative border-[6px] md:border-[8px] border-primary-500 rounded-tl-[30px] md:rounded-tl-[45px] rounded-br-[30px] md:rounded-br-[45px] overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src={selloGroupData.img}
              className="h-full w-full object-cover"
              alt="Sello Group"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutStorySection;
