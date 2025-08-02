import React from "react";

const NewsLatter = () => {
  return (
    <div className="bg-[#050B20] flex md:flex-row flex-col items-center justify-between px-4 md:px-16 py-12">
      <div className="text-white md:py-10 py-5">
        <h2 className="md:text-4xl text-3xl py-4">Join Sello</h2>
        <p className="">Receive pricing updates,shopping tips & more.</p>
      </div>
      <div className="md:py-10 py-5">
        <div className="field bg-white/20 h-12 sm:h-14 md:h-16 w-full max-w-md mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3 rounded-full">
          <input
            className="flex-1 h-full text-sm sm:text-base md:text-lg outline-none text-primary-500 bg-transparent border-none placeholder:text-primary-500/80"
            type="email"
            placeholder="Your Email Address..."
          />
          <button className="bg-primary-500  text-xs sm:text-sm md:text-base py-1.5 px-3 sm:py-2 sm:px-4 md:py-3 md:px-6 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
