import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  profileOptions,
  sellingOptions,
  sellingOverview,
  profileAssets,
} from "../../../assets/profilePageAssets/profileAssets";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfileHero = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [showProfilePopup, setShowProfilePopup] = useState(false);

  // Handle Profile Popup
  const handleProfilePopup = () => {
    setShowProfilePopup(true);
  };

  return (
    <div className="md:h-[128vh] h-full w-full bg-white">
      <div className="md:h-[95%]  h-auto  w-full bg-primary-500 flex items-end">
        <div className="md:h-[90%] h-auto relative w-full px-5 flex items-center justify-between">
          {/* LeftSide */}
          <div className="md:h-full h-screen md:w-[43%] w-full relative p-5  rounded-lg">
            {/* Avatar */}
            <div className="">
              <div className=" mx-auto absolute -top-14 left-[43%]  h-20 w-20 rounded-3xl bg-black overflow-hidden border-2 border-white ">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1672567711579-a8615fe2d373?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vZGVscyUyMG9yYW5nZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                />
              </div>
            </div>
            {/* Add POSTS Button */}
            <div
              onClick={() => navigate("/create-post")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.AddPostIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Add Posts</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* User profile */}
            <div
              onClick={handleProfilePopup}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer relative"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.userIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Profile</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
              {/* Profile Popup */}
              {showProfilePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                  {/* Popup Box */}
                  <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-6 relative animate-fadeIn">
                    {/* Close Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProfilePopup(false);
                      }}
                      className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500 transition"
                    >
                      ✕
                    </button>

                    {/* Profile Image + Upload */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary-500 group">
                        <img
                          src={
                            profileAssets.profileImg ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        {/* Upload Overlay */}
                        <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer transition z-[1000]">
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                const imgUrl = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                // You can store this in state
                                console.log("New Image Selected:", imgUrl);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <h3 className="mt-3 font-semibold text-lg">Raza Ali</h3>
                      <p className="text-gray-500 text-sm">razaali@email.com</p>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full mt-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-400 outline-none"
                          defaultValue="razaali@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full mt-1 border rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary-400 outline-none"
                            defaultValue="12345"
                          />
                          {showPassword ? (
                            <FaEye
                              onClick={() => setShowPassword(false)}
                              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-primary-500"
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => setShowPassword(true)}
                              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-primary-500"
                            />
                          )}
                        </div>
                        <p
                          onClick={() => navigate("/reset-password")}
                          className="text-right my-2 text-primary-500"
                        >
                          Reset Password
                        </p>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="mt-6 flex justify-center">
                      <button className="bg-primary-500 px-6 py-2 rounded-lg hover:opacity-90 transition">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* My Posts */}
            <div
              onClick={() => navigate("/users")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.myListIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">My Posts</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Current City */}
            <div className="flex items-center justify-between w-[55%] mt-7 cursor-pointer">
              <div className="h-9 w-9">
                <img
                  src={profileAssets.buildingIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">City</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Hr :) Horizontal Rule */}
            <div className="border-[1px] border-white w-full my-5"></div>
            {/* Blogs */}
            <div
              onClick={() => navigate("/blogs")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.blogIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Blogs</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Support  */}
            <div
              onClick={() => navigate("/contact")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.supportIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Support</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Terms & Condition */}
            <div
              onClick={() => navigate("/terms-conditon")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.termAndCondition}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Terms & Condition</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Advertising */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.addsIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Advertising</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Security */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.lockIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Security</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Notification */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.bellIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Notification</h5>
              <MdKeyboardArrowRight className="text-white text-xl" size={25} />
            </div>
            {/* Logout */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-between w-[55%] mt-7 cursor-pointer"
            >
              <div className="h-9 w-9">
                <img
                  src={profileAssets.logoutIcon}
                  alt="Add post icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <h5 className="md:text-xl text-white">Logout</h5>
              <div className=""></div>
            </div>
          </div>
          {/* RightSide */}
          <div className="md:h-full h-screen md:w-[43%] w-full absolute  right-5 ">
            <h2 className="text-center pb-1 text-xl  text-white font-semibold">
              My Posts
            </h2>
            <div className="h-full w-full bg-white shadow-xl rounded-lg shadow-gray-500 p-5 ">
              {/* profile Options */}
              <div className="grid grid-cols-2 gap-5">
                {profileOptions.map((op) => {
                  return (
                    <div
                      onClick={() => {
                        alert("hello");
                      }}
                      key={op.id}
                      className="border-[1px] border-primary-500 rounded flex items-center justify-between p-2 cursor-pointer"
                    >
                      <div className="h-8 w-8">
                        <img
                          src={op.icon}
                          className="h-full w-full object-cover"
                          alt={op.title}
                        />
                      </div>
                      <div className="text-primary-500">{op.values}</div>
                      <div className="">{op.title}</div>
                    </div>
                  );
                })}
              </div>
              {/* Selling Option or Activities */}
              <div className="">
                <h2 className="text-lg font-medium my-2">Selling</h2>
                <div className="w-1/2">
                  {sellingOptions.map((op) => {
                    return (
                      <div
                        className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100 justify-between my-2 rounded-md"
                        key={op.id}
                      >
                        <img
                          src={op.icon}
                          className="h-8 w-8 object-cover"
                          alt={op.title}
                        />
                        <h4 className="">
                          {op.title}
                          {op.values ? ` (${op.values})` : ""}
                        </h4>
                        <MdKeyboardArrowRight className="text-2xl text-primary-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Overview */}
              <div className="">
                <h2 className="text-lg font-medium my-2">Overview</h2>
                <div className="grid grid-cols-2 gap-5">
                  {sellingOverview.map((op) => {
                    return (
                      <div
                        className="border-[1px] border-primary-500 rounded flex items-center justify-between p-3 cursor-pointer"
                        key={op.id}
                      >
                        <img
                          src={op.icon}
                          className="h-7 w-7 object-cover"
                          alt={op.title}
                        />
                        <h4 className="">{op.title}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Performance */}
              <div className="">
                <h2 className="text-lg font-medium my-2">Performance</h2>
                <div className="grid grid-cols-2 gap-5">
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-1 cursor-pointer">
                    <h4 className="font-medium">
                      AED <span className="font-semibold">0.000</span>
                    </h4>
                    <p className="text-sm">No Pay History</p>
                  </div>
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-1 cursor-pointer">
                    <h4 className="font-semibold text-lg">000000</h4>
                    <p className="text-sm">Clicks On Listings</p>
                    <span className="text-xs">Last 7 Days</span>
                  </div>
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-1 cursor-pointer">
                    <div className="flex items-center gap-5">
                      <h4>2</h4>
                      <img
                        src={profileAssets.starIcon}
                        alt="star"
                        className="w-5 h-5 object-cover"
                      />
                    </div>
                    <div className="">
                      <p className="text-sm">Click On Listings</p>
                      <span className="text-xs">4 Ratings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
