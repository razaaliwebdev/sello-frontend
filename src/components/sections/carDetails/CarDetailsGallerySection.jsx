import React, { useState } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useGetCarsQuery } from "../../../redux/services/api";

const CarDetailsGallerySection = () => {
  const { id } = useParams();
  const { data: carsData = [], isLoading, error } = useGetCarsQuery();

  const car = carsData.find((c) => c._id === id);

  const images = car?.images || [];
  const [current, setCurrent] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleBookmark = () => setBookmarked((prev) => !prev);

  if (isLoading) {
    return (
      <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
        <h2 className="text-center text-lg">Loading car images...</h2>
      </section>
    );
  }

  if (error || !car) {
    return (
      <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
        <h2 className="text-center text-lg text-red-500">
          Failed to load car images.
        </h2>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
      {/* Main Image Area */}
      <div className="relative  rounded overflow-hidden">
        <div className="w-full h-[200px] md:h-[490px] rounded-lg overflow-hidden bg-gray-100 relative">
          <img
            src={images[current]}
            alt={`Car Image ${current + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-car.jpg";
            }}
          />
        </div>

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
        {images.length > 1 && (
          <>
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
          </>
        )}

        {/* Image Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
          <CiImageOn size={18} />
          <span>
            {current + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-5 bottom-image-gallery overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setCurrent(idx)}
            className={` h-40 w-40 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
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
