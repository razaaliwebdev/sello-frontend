import React from "react";

const NewsLatter = () => {
  return (
    <div className="bg-[#050B20] flex md:flex-row flex-col items-center justify-between px-4 md:px-16 py-12">
      <div className="text-white md:py-10 py-5">
        <h2 className="md:text-4xl text-3xl py-4">Join Sello</h2>
        <p className="">Receive pricing updates,shopping tips & more.</p>
      </div>
      <div className="md:py-10 py-5">
        <div className="field bg-white/20 h-16 md:w-150 mx-auto px-4 flex items-center md:justify-between justify-around gap-4 rounded-full w-[94%]">
          <input
            className="flex-1 h-[85%] text-lg outline-none text-primary-500 bg-transparent border-none"
            type="email"
            placeholder="You Email Address..."
          />
          <button className="bg-primary-500 md:py-3 md:px-7 py-2 px-4 mr-3 hover:opacity-90 rounded-full">
            Subscibe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
