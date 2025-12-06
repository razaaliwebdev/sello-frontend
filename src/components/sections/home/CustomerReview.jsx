import React, { useState, useEffect } from "react";
import { images } from "../../../assets/assets";
import { useGetTestimonialsQuery, useSubmitReviewMutation } from "../../../redux/services/api";
import { useGetMeQuery } from "../../../redux/services/api";
import toast from "react-hot-toast";
import Spinner from "../../Spinner";

const CustomerReview = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });

  const { data: user } = useGetMeQuery();
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery({ isActive: true });
  const [submitReview, { isLoading: isSubmitting }] = useSubmitReviewMutation();

  const testimonials = testimonialsData || [];
  
  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user?.user?.name) {
      setFormData(prev => ({
        ...prev,
        name: user.user.name,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.text) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('role', formData.role || '');
      formDataToSend.append('text', formData.text);
      formDataToSend.append('rating', formData.rating);

      await submitReview(formDataToSend).unwrap();
      toast.success("Review submitted successfully! It will be published after admin approval.");
      setFormData({ name: user?.user?.name || "", role: "", text: "", rating: 5 });
      setShowReviewForm(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit review. Please try again.");
    }
  };

  // Calculate average rating
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : "4.7";

  const totalReviews = testimonials.length || 28370;

  if (isLoading) {
    return (
      <section className="px-4 md:px-16 py-12 bg-[#F5F5F5] flex items-center justify-center min-h-[400px]">
        <Spinner fullScreen={false} />
      </section>
    );
  }

  const currentTestimonial = testimonials[currentReview] || testimonials[0];

  return (
    <section className="px-4 md:px-16 py-12 bg-[#F5F5F5]">
      <div className="flex items-center gap-10 md:flex-row flex-col">
        <div className="md:w-[70%] w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center my-7 justify-between gap-4">
            <h2 className="md:text-4xl text-3xl font-semibold">
              What our customers say
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Rated {averageRating}/5 based on {totalReviews} reviews showing our 4 & 5 stars reviews
            </p>
          </div>

          {testimonials.length > 0 ? (
            <div className="relative">
              <div className="flex flex-col md:flex-row md:gap-16 gap-6">
                <div className="relative">
                  <img
                    src={currentTestimonial?.image || images.aliTufan}
                    alt={currentTestimonial?.name || "Customer"}
                    className="w-[340px] h-[340px] mx-auto md:w-auto md:h-auto object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = images.aliTufan;
                    }}
                  />
                  {/* Carousel indicators */}
                  {testimonials.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReview(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentReview
                              ? 'w-8 bg-primary-500'
                              : 'w-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to review ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="rating flex items-center gap-3 md:gap-5">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        className={`${
                          index < (currentTestimonial?.rating || 5)
                            ? 'text-primary-500'
                            : 'text-gray-300'
                        } md:text-3xl text-2xl transition-colors`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="flag bg-primary-500 px-2 py-1 rounded-md text-white text-sm font-medium">
                      {currentTestimonial?.rating || 5}.0
                    </span>
                  </div>
                  <h3 className="name md:text-3xl text-2xl font-semibold mt-5">
                    {currentTestimonial?.name || "Customer"}
                  </h3>
                  {currentTestimonial?.role && (
                    <h6 className="professional text-gray-700 mb-5">
                      {currentTestimonial.role}
                      {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                    </h6>
                  )}
                  <p className="text-base md:text-xl text-gray-800 leading-relaxed">
                    "{currentTestimonial?.text || "Great service!"}"
                  </p>
                </div>
              </div>

              {/* Navigation arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                    aria-label="Previous review"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentReview((prev) => (prev + 1) % testimonials.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                    aria-label="Next review"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:gap-16 gap-6 items-center justify-center py-12">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to review!</p>
            </div>
          )}

          {/* Submit Review Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {user?.user ? "Write a Review" : "Login to Write a Review"}
            </button>
          </div>
        </div>
        <div className="ad"></div>
      </div>

      {/* Review Form Modal/Popup */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-gray-800">Write a Review</h3>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setFormData({ name: user?.user?.name || "", role: "", text: "", rating: 5 });
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitReview} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role/Title (optional)
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Designer, Developer, Customer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating }))}
                      className={`text-4xl transition-all hover:scale-110 ${
                        rating <= formData.rating
                          ? 'text-primary-500'
                          : 'text-gray-300'
                      }`}
                      aria-label={`Rate ${rating} stars`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">
                    {formData.rating} / 5
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  placeholder="Share your experience with us..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.text.length} characters
                </p>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Review"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setFormData({ name: user?.user?.name || "", role: "", text: "", rating: 5 });
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReview;
