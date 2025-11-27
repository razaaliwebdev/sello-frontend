import React from "react";
import { FaBars } from "react-icons/fa6";

const HeaderLogo = () => {
  return (
    <div className="bg-primary-500 w-full px-4 md:px-6 py-4 flex items-center justify-between">
      <h1 className="text-white text-xl md:text-2xl font-bold">SELLO</h1>
      <button className="text-white">
        <FaBars size={24} />
      </button>
    </div>
  );
};

export default HeaderLogo;
