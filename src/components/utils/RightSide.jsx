import React from "react";
import { images } from "../../assets/assets";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const RightSide = ({ path }) => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full  relative">
      <img src={images.car1} className="h-full w-full object-cover" alt="" />
      <div
        className="absolute bottom-0 border-[1px] border-white w-full bg-white/30 backdrop-blur-lg p-3
      "
      >
        <p className="md:text-xl text-md py-1 font-md text-white px-3">
          " It was popularised in the 2025s with the release of Letraset <br />
          sheets containing Lorem Ipsum passages, and more recently <br />
          with desktop publishing software like Aldus Marker versions. "
        </p>
        <div className="flex items-center justify-between">
          <div className="pl-3 my-2">
            <div className="name text-white md:text-2xl font-medium">
              Jim Bowden
            </div>
            <div className="location md:text-lg text-white">UAE</div>
          </div>
          <div className=" my-2 ">
            <div className="flex py-2 md:gap-3 gap-1">
              {" "}
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-white text-sm" />
              ))}
            </div>

            <div className="arrows flex md:gap-3 gap-2">
              <button
                onClick={() => navigate(-1)}
                className=" border-[1px] border-white rounded-full text-white md:p-1 hover:bg-primary-500 transition-all duration-500 ease-out "
              >
                <MdKeyboardArrowLeft className="md:text-4xl text-3xl" />
              </button>
              <button
                onClick={() => navigate(`/${path}`)}
                className=" border-[1px] border-white rounded-full text-white md:p-1 hover:bg-primary-500 transition-all duration-500 ease-out "
              >
                <MdKeyboardArrowRight className="md:text-4xl text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
