import React from "react";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { BsTelephoneXFill } from "react-icons/bs";
import { useForgotPasswordMutation } from "../../redux/services/api";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row">
      <div className="md:w-1/2 w-[90%]">
        <HeaderLogo />
        <div className="flex items-center flex-col justify-center">
          <div className="phoneIcon  bg-white shadow-xl h-32 w-32 rounded-full flex items-center justify-center shadow-gray-500 text-4xl md:text-7xl text-primary-500">
            <BsTelephoneXFill className="" />
          </div>
          <h2 className="md:text-4xl mt-5 font-semibold mb-3">
            Forgot Password?
          </h2>
          <p className="text-gray-400 md:text-lg text-center md:text-left">
            Do not worry! We will help you recover your password.
          </p>
          <form className="md:w-[55%] w-[90%]">
            <div className="field border-b-[1px] border-black my-2">
              <label className="block py-2 text-lg">Email</label>
              <input
                className="w-full py-2 border-none outline-none px-0 text-lg"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
            <div className="text-center my-3 text-lg text-gray-400">
              Back to{" "}
              <Link className="text-primary-500 hover:underline" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide leftPath={"/login"} rightPath={"/verify-otp"} />
      </div>
    </div>
  );
};

export default ForgotPassword;
