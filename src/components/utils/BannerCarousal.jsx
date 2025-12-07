import React, { useState, useEffect } from 'react';
import { useGetBannersQuery } from '../../redux/services/api';

const BannerCarousal = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Fetch active banners from API
    const { data: bannersData, isLoading } = useGetBannersQuery({ 
        type: 'homepage', 
        position: 'hero',
        isActive: true 
    });
    
    const banners = bannersData || [];
    
    // Sort banners by order field
    const sortedBanners = [...banners].sort((a, b) => (a.order || 0) - (b.order || 0));
    
    // Use banners if available, otherwise show nothing
    const slides = sortedBanners.length > 0 ? sortedBanners : [];

    // Auto-play functionality
    useEffect(() => {
        if (slides.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000); // Change slide every 5 seconds

            return () => clearInterval(interval);
        }
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Don't render if no banners or loading
    if (isLoading) {
        return (
            <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gray-100 animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-gray-400">Loading banners...</div>
                </div>
            </section>
        );
    }

    if (slides.length === 0) {
        return null; // Don't render if no banners
    }

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            {/* Carousel Container */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide._id || slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Main Slide Content */}
                        <div className="relative w-full h-full flex items-center">
                            {/* Banner Image Background */}
                            {slide.image ? (
                                <div 
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="absolute inset-0 bg-black/30"></div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
                            )}
                            
                            {/* Content Overlay */}
                            <div className="relative z-10 w-full h-full flex items-center px-6 md:px-16">
                                {/* Left Section - Title */}
                                <div className="w-1/2">
                                    <div className="bg-primary-500 rounded-2xl px-5 py-3 md:px-8 md:py-4 shadow-2xl border-2 border-primary-600/30 inline-block">
                                        <h2 className="text-xl md:text-3xl font-bold text-black leading-tight">
                                            {slide.title || "Welcome to Sello"}
                                        </h2>
                                        {slide.linkUrl && (
                                            <a 
                                                href={slide.linkUrl}
                                                className="mt-2 inline-block text-sm md:text-base text-black hover:underline font-semibold"
                                            >
                                                Learn More →
                                            </a>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === currentSlide
                                ? 'w-2.5 h-2.5 bg-gray-300'
                                : 'w-2 h-2 bg-gray-800 hover:bg-gray-700'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerCarousal;