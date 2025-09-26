import React from "react";

const reviews = [
  {
    name: "Simon J.",
    product: "bought a Qashqai e-POWER",
    review:
      "First class experience from start to finish. Phil is excellent. I would have prefered not having to drive 60 miles to Peterborough to collect it and exchange our old car, but Smith's were much more competitive than any other dealer. (And they have a very large and professional-looking dealership.)",
    rating: 5,
    date: "24th Sep 2025",
  },
  {
    name: "Simon J.",
    product: "bought a Qashqai e-POWER",
    review:
      "First class experience from start to finish. Phil is excellent. I would have prefered not having to drive 60 miles to Peterborough to collect it and exchange our old car, but Smith's were much more competitive than any other dealer. (And they have a very large and professional-looking dealership.)",
    rating: 5,
    date: "24th Sep 2025",
  },
  {
    name: "Simon J.",
    product: "bought a Qashqai e-POWER",
    review:
      "First class experience from start to finish. Phil is excellent. I would have prefered not having to drive 60 miles to Peterborough to collect it and exchange our old car, but Smith's were much more competitive than any other dealer. (And they have a very large and professional-looking dealership.)",
    rating: 5,
    date: "24th Sep 2025",
  },
];

const CustomerReviews = () => {
  return (
    <div className="bg-[#E6E6E6] px-6 py-10 w-full">
      <div className="max-w-full mx-auto space-y-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-[#E6E6E6] p-4 border-b border-gray-300 last:border-none"
          >
            {/* Header row */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg md:text-xl">{review.name}</h3>
                <p className="font-semibold text-lg md:text-xl">
                  {review.product}
                </p>
              </div>
              <div className="text-right">
                <div className="text-yellow-500 text-xl">★★★★★</div>
                <p className="text-sm md:text-base text-gray-700">
                  {review.date}
                </p>
              </div>
            </div>

            {/* Review text */}
            <p className="mt-3 text-gray-800 text-sm md:text-base leading-relaxed">
              {review.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
