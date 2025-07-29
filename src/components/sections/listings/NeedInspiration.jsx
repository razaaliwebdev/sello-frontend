import React from "react";

const NeedInspiration = () => {
  return (
    <div className="bg-[#F5F5F5] px-4 md:px-16 py-12">
      <h1 className="md:text-4xl text-2xl font-medium">
        Need Some Inspiration
      </h1>
      <div className="mt-4 flex gap-4 flex-wrap">
        {[
          "Automatics Cars",
          "SUVs",
          "Electric Cars",
          "New in Stock",
          "Petrol",
          "Diesel",
        ].map((item, index) => (
          <button
            key={index}
            className=" md:text-base text-[#0B0C1E] hover:bg-primary-500 ease-out transition-all text-lg bg-white px-5 py-2 rounded-lg"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NeedInspiration;
