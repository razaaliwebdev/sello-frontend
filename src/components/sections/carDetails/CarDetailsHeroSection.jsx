import React from "react";

const CarDetailsHeroSection = () => {
  return (
    <div
      className="relative w-full h-[60vh] md:h-[30vh] bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1626621394541-b9a48e35a95d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNhcnMlMjBkYXJrfGVufDB8fDB8fHww")',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <h1 className="relative text-3xl md:text-5xl text-white font-semibold text-center px-4">
        Fast, Simple, and Easy
      </h1>
    </div>
  );
};

export default CarDetailsHeroSection;
