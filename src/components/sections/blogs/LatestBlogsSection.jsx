
import React from "react";
import { Link } from "react-router-dom";
import { blogAssets } from "../../../assets/blogs/blogAssets";

const LatestBlogsSection = () => {
  return (
    <div className="md:h-[125vh] w-full p-4">
      {/* 👉 stack on small screens, row only on md+ */}
      <div className="flex flex-col md:flex-row w-full h-full p-3 gap-10">
        {/* Left section */}
        <div className="w-full md:w-1/2 h-full">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-semibold my-5">Latest </h2>
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={blogAssets.latestSectionCarImg}
              alt=""
            />
          </div>
          <div className="w-full py-3 text-gray-500 text-sm md:text-base">
            By{" "}
            <span className="text-base md:text-lg text-primary-500 font-medium">
              Sello
            </span>{" "}
            | March 12, 2025
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold my-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius,
              iste aliquam?
            </h2>
            <p className="text-base md:text-lg text-gray-700 py-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
              corporis quos fugit voluptate accusamus sit id magnam distinctio
              dicta expedita at odio soluta, incidunt quisquam provident impedit
              earum neque, corrupti aliquam recusandae nobis nostrum minima
              voluptatum harum! Incidunt, ipsum tempore?
            </p>
            <button className="px-5 md:px-6 py-2 text-base md:text-lg font-medium bg-primary-500 text-white rounded-lg my-5 hover:opacity-90">
              Read more
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="w-full md:w-1/2 h-full">
          <div className="flex flex-col md:flex-row mt-5 items-start md:items-center justify-between w-full gap-2 md:gap-0">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Trending Blogs
            </h2>
            <Link to={"/blogs"} className="text-sm md:text-base">
              See all
            </Link>
          </div>

          {/* First blog */}
          <div className="w-full py-3 text-gray-500 text-sm md:text-base">
            By{" "}
            <span className="text-base md:text-lg text-primary-500 font-medium">
              Sello
            </span>{" "}
            | March 12, 2025
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold pr-0 md:pr-7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta?
          </h3>

          {/* Highlighted blog */}
          <div className="bg-primary-500 flex items-start justify-center flex-col my-10 rounded-tr-[40px] rounded-bl-[40px] px-5 py-3">
            <div className="py-3 text-gray-50 text-sm md:text-base">
              By{" "}
              <span className="text-base md:text-lg text-black my-3 font-medium">
                Sello
              </span>{" "}
              | March 12, 2025
            </div>
            <h3 className="text-2xl md:text-3xl font-medium py-4 md:py-6 text-white">
              Lorem ipsum dolor, sit amet consectetur{" "}
              <br className="hidden md:block" /> adipisicing elit. Libero!
            </h3>
          </div>

          {/* More blogs */}
          <div className="mt-10">
            <div className="w-full py-3 text-gray-500 text-sm md:text-base">
              By{" "}
              <span className="text-base md:text-lg text-primary-500 font-medium">
                Sello
              </span>{" "}
              | March 12, 2025
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold pr-0 md:pr-7">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta?
            </h3>
          </div>

          <div className="mt-10">
            <div className="w-full py-3 text-gray-500 text-sm md:text-base">
              By{" "}
              <span className="text-base md:text-lg text-primary-500 font-medium">
                Sello
              </span>{" "}
              | March 12, 2025
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold pr-0 md:pr-7">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta?
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogsSection;
