import React from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../assets/assets";

const BottomHeader = () => {
  const location = useLocation();

  if (location.pathname === "/cars") return null;

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`${
        location.pathname === "/users" || location.pathname === "/blog"
          ? "bg-primary"
          : ""
      } bg-[#F5F5F5] w-full flex flex-wrap items-center justify-end md:justify-end gap-4 md:gap-12 px-4 md:px-16 py-2 md:py-3 text-sm md:text-base`}
    >
      <Link to={"/"} className="hover:underline">
        Save
      </Link>
      <Link to={"/filter"} className="hover:underline">
        Filter
      </Link>
      <Link to={"/"} className="hover:underline">
        Shot
      </Link>
      <Link to={"/"}>
        <img
          src={images.bell}
          alt="notification"
          className="h-5 w-5 md:h-6 md:w-6 object-contain"
        />
      </Link>
    </div>
  );
};

export default BottomHeader;
