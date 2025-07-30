import React, { useState } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

const images = [
  "https://images.unsplash.com/photo-1626621394541-b9a48e35a95d?w=1000",
  "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1000",
  "https://images.unsplash.com/photo-1587852676182-53a9ba68b61a?w=1000",
  "https://images.unsplash.com/photo-1500883859571-70b85e129372?w=1000",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1000",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?w=1000",
];

const CarDetailsGallerySection = () => {
  const [current, setCurrent] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleBookmark = () => setBookmarked((prev) => !prev);

  return (
    <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
      {/* Main Image Area */}
      <div className="relative rounded overflow-hidden">
        <img
          src={images[current]}
          alt="Car"
          className="w-full h-[300px] md:h-[450px] object-cover rounded"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
          Low Mileage
        </span>

        {/* Bookmark Toggle */}
        <button
          onClick={toggleBookmark}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          {bookmarked ? (
            <FaBookmark className="text-primary-500" size={20} />
          ) : (
            <FaRegBookmark className="text-gray-700" size={20} />
          )}
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <FaChevronLeft size={18} />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Image Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
          <CiImageOn size={18} />
          <span>
            {current + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Row with visible scrollbar */}
      <div className="flex gap-3 mt-5 bottom-image-gallery overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setCurrent(idx)}
            className={`h-56 w-56  object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
              current === idx ? "border-primary-500" : "border-transparent"
            }`}
            alt={`Thumbnail ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CarDetailsGallerySection;
