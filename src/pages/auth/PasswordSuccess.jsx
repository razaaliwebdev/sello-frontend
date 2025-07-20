import React from "react";
import { useNavigate } from "react-router-dom";
import RightSide from "../../components/utils/RightSide";
import { MdVerifiedUser } from "react-icons/md";
import { images } from "../../assets/assets";

const PasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[89vh] flex">
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="h-[80%] w-[65%] flex flex-col items-center justify-between">
          <div className="">
            <div className="h-[150px] w-[150px] flex items-center justify-center rounded-full bg-white shadow-lg shadow-gray-600">
              <MdVerifiedUser className="text-7xl text-primary-500" />
            </div>
          </div>

          <h3 className="text-primary-500 text-lg font-[300]">
            Your Password Updated Successfully.
          </h3>
          <div className="">
            <img src={images.verified} alt="" />
          </div>

          <button
            onClick={() => navigate("/login")}
            className="bg-primary-500 w-full mt-5  shadow-lg shadow-gray-400 p-4 text-lg font-semibold hover:opacity-95"
          >
            Go To Login
          </button>
        </div>
      </div>

      <div className="w-1/2 h-full hidden md:block">
        <RightSide path={"login"} />
      </div>
    </div>
  );
};

export default PasswordSuccess;
