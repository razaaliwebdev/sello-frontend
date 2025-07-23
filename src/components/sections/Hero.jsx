import React, { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../assets/assets";
import gsap from "gsap";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentImageIndex === heroSlides.length - 1 ? 0 : currentImageIndex + 1;

      gsap.to(slideRefs.current[currentImageIndex], {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(slideRefs.current[nextIndex], {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      setCurrentImageIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="min-h-[88vh] md:h-screen w-full relative overflow-hidden">
      {/* Background slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slideRefs.current[index] = el)}
          className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: index === 0 ? 1 : 0,
            zIndex: index === currentImageIndex ? 2 : 1,
          }}
        />
      ))}

      {/* Overlay content */}
      <div className="absolute z-10 inset-0 flex items-center justify-center  text-center p-4">
        <form className="bg-[#EEEEEE]/60 backdrop-blur-md rounded-tl-3xl rounded-br-3xl hidden flex-col md:flex-row gap-6 overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] w-[80%] max-w-6xl mx-auto p-4 md:pl-12">
          {/* Right Side */}
          <div className="rightSide grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full md:py-6">
            {[
              { label: "Year of manufacture", options: ["2021"] },
              { label: "Select Make", options: ["Audi"] },
              { label: "Select Model", options: ["A7 Sportback"] },
              { label: "Moved (km)", options: ["< 1000"] },
              { label: "Select Engine", options: ["5 Speed Manual"] },
              { label: "Car Status", options: ["Old"] },
            ].map((field, i) => (
              <div key={i} className="filter-feild">
                <label className="text-gray-600 text-sm block mb-1">
                  {field.label}
                </label>
                <select className="w-full h-9 px-2 rounded">
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Left Side (Pricing) */}
          <div className="leftSide bg-white/50 rounded-tl-3xl px-4 py-5 md:py-6 md:px-7 w-full md:w-auto">
            <h4 className="mb-3  text-gray-800 text-lg">Pricing (AED)</h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label
                  className="block text-gray-600 text-sm md:text-md mb-1"
                  htmlFor="from"
                >
                  From
                </label>
                <input
                  className="p-2 w-full rounded outline-primary-500"
                  type="number"
                  id="from"
                />
              </div>
              <div>
                <label
                  className="block text-gray-600 text-sm md:text-md mb-1"
                  htmlFor="to"
                >
                  To
                </label>
                <input
                  className="p-2 w-full rounded outline-primary-500"
                  type="number"
                  id="to"
                />
              </div>
            </div>
            <button className="w-full sm:w-auto px-7 py-2 hover:bg-opacity-90 bg-primary-500 mt-4 sm:mt-5 rounded">
              Search Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
