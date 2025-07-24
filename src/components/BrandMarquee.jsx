import React from "react";
import { useNavigate } from "react-router-dom";
import brands from "../assets/carLogos/brands"; // must be [{ img: '...' }, ...]

const BrandMarquee = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-6 backdrop-blur-sm overflow-hidden">
      <div className="rounded-xl px-4 py-4 overflow-hidden relative">
        <div className="inline-flex gap-6 animate-marquee whitespace-nowrap min-w-full">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`brand-${index}`}
              className="bg-white rounded-xl p-4 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 shadow-sm"
            >
              {brand.img ? (
                <img
                  src={brand.img}
                  alt={`brand-${index}`}
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.target.src = "/fallback-logo.png";
                    e.target.className =
                      "object-contain w-full h-full opacity-50";
                  }}
                />
              ) : (
                <div className="text-gray-400 text-xs">No Image</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
