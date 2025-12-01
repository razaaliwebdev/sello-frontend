import React, { useRef, useEffect } from "react";

const BrandMarquee = ({ brands = [] }) => {
  const sliderRef = useRef(null);

  // Duplicate brands to allow seamless looping
  const items = [...brands, ...brands];

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Auto-scroll for infinite loop
  useEffect(() => {
    const el = sliderRef.current;
    if (!el || items.length === 0) return;

    const speed = 1.5; // px per tick
    const interval = setInterval(() => {
      if (!el) return;
      const halfWidth = el.scrollWidth / 2;

      if (el.scrollLeft >= halfWidth) {
        // Reset to start of first sequence for seamless loop
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += speed;
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="w-full py-6 backdrop-blur-sm">
      <div className="relative rounded-xl px-10 py-4">
        {/* Slider buttons */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
          aria-label="Previous brands"
        >
          <span className="text-lg font-bold">&#8249;</span>
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
          aria-label="Next brands"
        >
          <span className="text-lg font-bold">&#8250;</span>
        </button>

        {/* Slider track - auto & infinite */}
        <div
          ref={sliderRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {items.map((brand, index) => (
            <div
              key={`brand-${index}`}
              className="bg-white rounded-xl p-4 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 shadow-sm flex-shrink-0 snap-start"
            >
              {brand.img ? (
                <img
                  src={brand.img}
                  alt={brand.name || `brand-${index}`}
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
