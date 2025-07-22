import React from "react";
import { images } from "../../assets/assets";

const SearchBar = () => {
  return (
    <div className="border border-gray-500 rounded-lg flex items-center gap-2 px-4 py-2 bg-white">
      <input
        className="outline-none flex-1"
        type="text"
        pleaceholder="Search"
      />
      <img className="w-4" src={images.searchIcon} alt="search" />
    </div>
  );
};

export default SearchBar;
