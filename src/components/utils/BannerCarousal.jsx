import React, { useState, useEffect } from 'react';

const BannerCarousal = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Sample slides data - you can replace with actual banner data from API
    const slides = [
        {
            id: 1,
            title: "Find Your Next Car",
            // You can add image URLs here when available
        },
        {
            id: 2,
            title: "Premium Collection",
        },
        {
            id: 3,
            title: "Best Deals",
        },
        {
            id: 4,
            title: "New Arrivals",
        },
        {
            id: 5,
            title: "Featured Cars",
        },
    ];

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
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

    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
            {/* Carousel Container */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {/* Main Slide Content */}
                        <div className="relative w-full h-full flex items-center">
                            {/* Left Section - Cityscape & White Car */}
                            <div className="relative w-1/2 h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
                                {/* Cityscape Background with Sky */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-300/40 via-blue-200/20 to-gray-300/60">
                                    {/* Futuristic cityscape representation */}
                                    <div className="absolute bottom-0 left-0 right-0 h-3/4">
                                        {/* Elevated road structures */}
                                        <div className="absolute bottom-20 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-500/60 to-transparent transform -skew-y-3"></div>
                                        <div className="absolute bottom-32 left-10 right-10 h-1 bg-gray-400/40"></div>
                                        
                                        {/* Building shapes - creating depth */}
                                        <div className="absolute bottom-0 left-8 w-12 h-24 bg-gray-700/60 transform -skew-x-3"></div>
                                        <div className="absolute bottom-0 left-24 w-16 h-32 bg-gray-800/60"></div>
                                        <div className="absolute bottom-0 left-44 w-14 h-28 bg-gray-700/60 transform skew-x-3"></div>
                                        <div className="absolute bottom-0 left-64 w-18 h-40 bg-gray-800/60"></div>
                                        <div className="absolute bottom-0 left-88 w-12 h-26 bg-gray-700/60"></div>
                                    </div>
                                </div>

                                {/* Orange Call-to-Action Box - Top Left */}
                                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 bg-primary-500 rounded-2xl px-5 py-3 md:px-8 md:py-4 shadow-2xl border-2 border-primary-600/30">
                                    <h2 className="text-xl md:text-3xl font-bold text-black leading-tight">
                                        {slide.title}
                                    </h2>
                                </div>

                                {/* White Car - Bottom Left */}
                                <div className="absolute bottom-0 left-0 right-0 h-3/5 flex items-end justify-center z-10">
                                    <div className="w-56 h-36 md:w-96 md:h-56 relative transform -rotate-12">
                                        {/* Car body - white with glass roof */}
                                        <div className="absolute inset-0 bg-white rounded-t-[40px] shadow-2xl">
                                            {/* Glass roof */}
                                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-900/70 to-gray-800/80 rounded-t-[40px]"></div>
                                            {/* Orange taillight strip */}
                                            <div className="absolute bottom-8 left-4 right-4 h-3 bg-primary-500 rounded-full shadow-lg"></div>
                                            {/* Wheels */}
                                            <div className="absolute -bottom-2 left-6 w-14 h-14 rounded-full bg-gray-900 border-4 border-gray-700 shadow-xl">
                                                <div className="absolute inset-2 rounded-full bg-gray-800"></div>
                                            </div>
                                            <div className="absolute -bottom-2 right-6 w-14 h-14 rounded-full bg-gray-900 border-4 border-gray-700 shadow-xl">
                                                <div className="absolute inset-2 rounded-full bg-gray-800"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Orange/Yellow Background & Golden Car */}
                            <div className="relative w-1/2 h-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 overflow-hidden">
                                {/* Diagonal Split Effect with Grey Texture */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-gray-200/30 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-gray-100/20 via-transparent to-transparent"></div>
                                </div>

                                {/* Sello Branding - Diamond Logo - Centered */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className="relative">
                                        {/* Diamond Shape */}
                                        <div className="w-28 h-28 md:w-44 md:h-44 bg-black transform rotate-45 shadow-2xl border-2 border-gray-800">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center transform -rotate-45">
                                                {/* Orange S Logo - Stylized */}
                                                <div className="text-primary-500 text-3xl md:text-6xl font-black mb-1 leading-none">
                                                    S
                                                </div>
                                                {/* SELLO Text */}
                                                <div className="text-white text-base md:text-2xl font-bold tracking-wider">
                                                    SELLO
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info - Top Right */}
                                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 text-black">
                                    <div className="text-base md:text-xl font-bold">Sello.pk</div>
                                    <div className="text-xs md:text-sm font-medium">info@Sello.pk</div>
                                </div>

                                {/* Golden Car - Bottom Right */}
                                <div className="absolute bottom-0 right-0 h-3/5 flex items-end justify-end z-10 pr-4 md:pr-8">
                                    <div className="w-52 h-32 md:w-80 md:h-48 relative transform rotate-12">
                                        {/* Car body - golden/bronze metallic */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-t-[40px] shadow-2xl">
                                            {/* Glass roof */}
                                            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-gray-900/70 to-gray-800/80 rounded-t-[40px]"></div>
                                            {/* Orange accent */}
                                            <div className="absolute bottom-6 left-3 right-3 h-2 bg-primary-500/40 rounded-full"></div>
                                            {/* Wheels */}
                                            <div className="absolute -bottom-2 left-5 w-12 h-12 rounded-full bg-gray-900 border-4 border-gray-700 shadow-xl">
                                                <div className="absolute inset-2 rounded-full bg-gray-800"></div>
                                            </div>
                                            <div className="absolute -bottom-2 right-5 w-12 h-12 rounded-full bg-gray-900 border-4 border-gray-700 shadow-xl">
                                                <div className="absolute inset-2 rounded-full bg-gray-800"></div>
                                            </div>
                                        </div>
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