// import React, { useState } from "react";
// import {
//   FaBookmark,
//   FaRegBookmark,
//   FaChevronRight,
//   FaChevronLeft,
// } from "react-icons/fa";
// import { CiImageOn } from "react-icons/ci";
// import { useParams } from "react-router-dom";
// import { useGetCarsQuery } from "../../../redux/services/api";

// const CarDetailsGallerySection = () => {
//   const { id } = useParams();
//   const { data: carsData = [], isLoading, error } = useGetCarsQuery();

//   const car = carsData.find((c) => c._id === id);

//   const images = car?.images || [];
//   const [current, setCurrent] = useState(0);
//   const [bookmarked, setBookmarked] = useState(false);

//   const nextImage = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrent((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const toggleBookmark = () => setBookmarked((prev) => !prev);

//   if (isLoading) {
//     return (
//       <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
//         <h2 className="text-center text-lg">Loading car images...</h2>
//       </section>
//     );
//   }

//   if (error || !car) {
//     return (
//       <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
//         <h2 className="text-center text-lg text-red-500">
//           Failed to load car images.
//         </h2>
//       </section>
//     );
//   }

//   return (
//     <section className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
//       {/* Main Image Area */}
//       <div className="relative  rounded overflow-hidden">
//         <div className="w-full h-[200px] md:h-[490px] rounded-lg overflow-hidden bg-gray-100 relative">
//           <img
//             src={images[current]}
//             alt={`Car Image ${current + 1}`}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/fallback-car.jpg";
//             }}
//           />
//         </div>

//         {/* Badge */}
//         <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
//           Low Mileage
//         </span>

//         {/* Bookmark Toggle */}
//         <button
//           onClick={toggleBookmark}
//           className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//         >
//           {bookmarked ? (
//             <FaBookmark className="text-primary-500" size={20} />
//           ) : (
//             <FaRegBookmark className="text-gray-700" size={20} />
//           )}
//         </button>

//         {/* Navigation Arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={prevImage}
//               className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
//             >
//               <FaChevronLeft size={18} />
//             </button>

//             <button
//               onClick={nextImage}
//               className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
//             >
//               <FaChevronRight size={18} />
//             </button>
//           </>
//         )}

//         {/* Image Count */}
//         <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
//           <CiImageOn size={18} />
//           <span>
//             {current + 1}/{images.length}
//           </span>
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="flex gap-3 mt-5 bottom-image-gallery overflow-x-auto">
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             onClick={() => setCurrent(idx)}
//             className={` h-40 w-40 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
//               current === idx ? "border-primary-500" : "border-transparent"
//             }`}
//             alt={`Thumbnail ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CarDetailsGallerySection;

import React, { useState, useMemo, useEffect } from "react";
import {
  FaBookmark,
  FaRegBookmark,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
} from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useGetSingleCarQuery } from "../../../redux/services/api";
import { images as placeholderImages } from "../../../assets/assets";

const CarDetailsGallerySection = () => {
  const { id } = useParams();
  const { data: car, isLoading, error } = useGetSingleCarQuery(id, {
    skip: !id,
  });

  // Filter out empty image strings and provide fallback
  const images = useMemo(() => {
    if (!car?.images || !Array.isArray(car.images)) {
      return [placeholderImages.carPlaceholder];
    }
    const validImages = car.images.filter(img => img && img.trim() !== '');
    return validImages.length > 0 ? validImages : [placeholderImages.carPlaceholder];
  }, [car?.images]);
  const [current, setCurrent] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);

  // Handle keyboard navigation in modal
  useEffect(() => {
    if (!isImageModalOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setModalCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setModalCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'Escape') {
        setIsImageModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isImageModalOpen, images.length]);

  const openImageModal = (index) => {
    setModalCurrentIndex(index);
    setIsImageModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextModalImage = () => {
    setModalCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    setModalCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
        <div 
          className="w-full h-[200px] md:h-[490px] rounded-lg overflow-hidden bg-gray-100 relative cursor-pointer"
          onClick={() => openImageModal(current)}
        >
          {images[current] ? (
            <img
              src={images[current]}
              alt={`Car Image ${current + 1}`}
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImages.carPlaceholder;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
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
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
            >
              <FaChevronLeft size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
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
      {images.length > 1 && (
        <div className="flex gap-3 mt-5 bottom-image-gallery overflow-x-auto">
          {images.map((img, idx) => (
            img ? (
              <img
                key={idx}
                src={img}
                onClick={() => {
                  setCurrent(idx);
                  openImageModal(idx);
                }}
                className={` h-40 w-40 object-cover rounded cursor-pointer border-2 transition-all duration-200 hover:opacity-80 ${
                  current === idx ? "border-primary-500" : "border-transparent"
                }`}
                alt={`Thumbnail ${idx + 1}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImages.carPlaceholder;
                }}
              />
            ) : null
          ))}
        </div>
      )}

      {/* Full Screen Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={closeImageModal}
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images[modalCurrentIndex] && (
              <img
                src={images[modalCurrentIndex]}
                alt={`Car Image ${modalCurrentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImages.carPlaceholder;
                }}
              />
            )}

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevModalImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextModalImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
                  aria-label="Next image"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <CiImageOn size={18} />
              <span>
                {modalCurrentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip at Bottom */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4 pb-2">
              {images.map((img, idx) => (
                img ? (
                  <img
                    key={idx}
                    src={img}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalCurrentIndex(idx);
                    }}
                    className={`h-16 w-16 object-cover rounded cursor-pointer border-2 transition-all ${
                      modalCurrentIndex === idx 
                        ? "border-primary-500 opacity-100" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    alt={`Thumbnail ${idx + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImages.carPlaceholder;
                    }}
                  />
                ) : null
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CarDetailsGallerySection;
