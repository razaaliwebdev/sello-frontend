import React, { useState } from "react";
import RightSide from "../../components/utils/RightSide";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { images } from "../../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Links } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password)
      return toast.error("All fields are required");
    setData({ email: "", password: "", name: "" });
    console.log(data);
  };

  return (
    <div className="flex h-screen flex-wrap flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/2 w-full md:flex-row flex-col flex">
        <div className="h-20">
          <HeaderLogo />
        </div>
        <div className="md:w-[65%] h-full md:mt-12 mt-0 md:p-2 px-5">
          <div className="w-full">
            <img
              className="mx-auto w-14"
              src={images.userIcon}
              alt="userIcon"
            />
          </div>
          <div className="">
            <h2 className="md:text-3xl text-2xl my-1 md:my-2">
              Create an Acouunt as a User
            </h2>
            <p className="text-gray-400 ">Please enter your details.</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="field my-1 md:my-2 border-b-[1px] border-black">
              <label className="block py-1 text-lg">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full py-2 border-none outline-none px-0 text-lg"
                type="text"
                placeholder="Enter full name"
              />
            </div>
            <div className="field my-1 md:my-2 border-b-[1px] border-black mb-1">
              <label className="block py-2 text-lg">Email</label>
              <input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full py-2 border-none outline-none px-0 text-lg"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="field my-1 md:my-2 border-b-[1px] border-black mb-1">
              <label className="block py-2 text-lg">Password</label>
              <div className="relative">
                <input
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>
            <div className="my-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-full border-2 bg-primary-500 border-primary-500"
                />
                <span className="text-sm">
                  I accept the{" "}
                  <Link to={"/"} className="text-primary-500 font-medium">
                    Privacy Services
                  </Link>{" "}
                  and{" "}
                  <Link to={"/"} className="text-primary-500 font-medium">
                    Terms
                  </Link>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-1 md:my-2"
            >
              Sign Up
            </button>
            <div className="googleBtn my-1">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("SignUp Failed");
                }}
              />
            </div>
            <p className="text-center text-gray-400 ">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary-500 hover:underline">
                Sign In
              </Link>
            </p>
            <button
              type="submit"
              className="w-full h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-1 md:my-2"
            >
              Sign Up as Dealer
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:block hidden">
        <RightSide leftPath={"/login"} rightPath={"/home"} />
      </div>
    </div>
  );
};

export default SignUp;
