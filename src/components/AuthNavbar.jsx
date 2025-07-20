import React from "react";
import { images } from "../assets/assets";
import { FaBars } from "react-icons/fa";

const AuthNavbar = () => {
  return (
    <nav className="w-full h-20 px-5 bg-primary-500 flex items-center justify-between">
      <div className="logo text-white md:text-6xl text-4xl font-bold">
        {/* SELLO */}
        <img className="w-28 scale-105" src={images.logo} alt="logo" />
      </div>
      {/* <div className="searchBar lg:flex hidden  md:flex px-6 items-center bg-white w-[500px] rounded h-[50px]">
        <input
          className="outline-none text-lg font-medium flex-1"
          type="text"
        />
        <img src={images.searchIcon} className="p-1" alt="" />
      </div> */}
      {/* <div className="text-white text-xl font-semibold">Filters</div> */}
      <div className="hamburger">
        <FaBars className="text-4xl text-white" />
      </div>
    </nav>
  );
};

export default AuthNavbar;
