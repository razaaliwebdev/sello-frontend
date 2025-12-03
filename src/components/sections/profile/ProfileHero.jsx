import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  profileOptions,
  sellingOptions,
  sellingOverview,
  profileAssets,
} from "../../../assets/profilePageAssets/profileAssets";
import { MdKeyboardArrowRight, MdEdit, MdCheck, MdClose } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { useGetMeQuery, useLogoutMutation, useUpdateProfileMutation, useGetSavedCarsQuery } from "../../../redux/services/api";
import { useSupportChat } from "../../../contexts/SupportChatContext";
import NotificationsSection from "./NotificationsSection";

const ProfileHero = () => {
  const navigate = useNavigate();
  const { openSupportChat } = useSupportChat();
  const [showPassword, setShowPassword] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showStatsPopup, setShowStatsPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
    avatarPreview: null,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const { data: user, isLoading, isError, error, refetch } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("token"), // Skip if no token
  });
  const { data: savedCarsData } = useGetSavedCarsQuery(undefined, {
    skip: !user || isLoading, // Only fetch if user is logged in
  });
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const [metrics, setMetrics] = useState({
    posts: 0,
    activeListings: 0,
    sales: 0,
    earnings: 0,
    clicks: 0,
    rating: 0,
    ratingCount: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: null,
        avatarPreview: user.avatar || null,
      });
      const posts = user.carsPosted?.length || 0;
      const sales = user.carsPurchased?.length || 0;
      const savedCount = user.savedCars?.length || savedCarsData?.length || 0;
      const earnings =
        user.carsPurchased?.reduce((sum, car) => sum + (car.price || 0), 0) || 0;
      const clicks = 1000; // Sample; replace with real data
      const rating = 4.5; // Sample; replace with real data
      const ratingCount = 10;
      setMetrics({
        posts,
        activeListings: posts,
        sales,
        earnings,
        clicks,
        rating,
        ratingCount,
        savedCount,
      });
    }
  }, [user, savedCarsData]);

  useEffect(() => {
    if (isError && error?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [isError, error, navigate]);

  const handleProfilePopup = () => {
    setShowProfilePopup(true);
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: null,
        avatarPreview: user.avatar || null,
      });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: file,
          avatarPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const formDataToSend = new FormData();
      if (formData.name) {
        formDataToSend.append("name", formData.name);
      }
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      await updateProfile(formDataToSend).unwrap();
      await refetch();
      setIsEditing(false);
      setShowProfilePopup(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert(err?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!showProfilePopup && !showStatsPopup) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowProfilePopup(false);
        setShowStatsPopup(false);
        setIsEditing(false);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showProfilePopup, showStatsPopup]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (isError && error?.status !== 401) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error loading profile</div>
          <div className="text-gray-600">{error?.data?.message || "Failed to load profile"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Profile Header Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  className="h-full w-full object-cover"
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=random&size=200"
                  }
                  alt="User Avatar"
                />
              </div>
              <button
                onClick={handleProfilePopup}
                className="absolute bottom-0 right-0 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                title="Edit Profile"
              >
                <MdEdit className="text-xl" />
              </button>
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {user?.name || "User"}
                </h1>
                {user?.verified && (
                  <FaCheckCircle className="text-white text-xl" title="Verified Account" />
                )}
              </div>
              <p className="text-white/90 text-lg mb-4">{user?.email || ""}</p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white text-sm opacity-90">Posts</div>
                  <div className="text-white text-xl font-bold">{metrics.posts}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white text-sm opacity-90">Sales</div>
                  <div className="text-white text-xl font-bold">{metrics.sales}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white text-sm opacity-90">Earnings</div>
                  <div className="text-white text-xl font-bold">AED {metrics.earnings.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowStatsPopup(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                View Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </button>
              <button
                onClick={() => navigate("/create-post")}
                className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                Create Post
                <MdKeyboardArrowRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Menu Options */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu</h2>
              
              <button
                onClick={handleProfilePopup}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <FaUser className="text-primary-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Edit Profile</span>
                </div>
                <MdKeyboardArrowRight className="text-gray-400 group-hover:text-primary-500" />
              </button>

              <button
                onClick={() => navigate("/my-listings")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <img src={profileAssets.myListIcon} alt="My Listings" className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700 font-medium">My Posts ({metrics.posts})</span>
                </div>
                <MdKeyboardArrowRight className="text-gray-400 group-hover:text-primary-500" />
              </button>

              <button
                onClick={() => navigate("/my-chats")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <img src={profileAssets.chatIcon} alt="Chats" className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700 font-medium">My Chats</span>
                </div>
                <MdKeyboardArrowRight className="text-gray-400 group-hover:text-primary-500" />
              </button>

              <div className="border-t my-2"></div>

              <button
                onClick={() => openSupportChat()}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                    <img src={profileAssets.supportIcon} alt="Support" className="h-6 w-6" />
                  </div>
                  <span className="text-gray-700 font-medium">Support</span>
                </div>
                <MdKeyboardArrowRight className="text-gray-400 group-hover:text-primary-500" />
              </button>

              <div className="border-t my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-lg transition-colors group text-red-600"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex items-center justify-center bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                    <img src={profileAssets.logoutIcon} alt="Logout" className="h-6 w-6" />
                  </div>
                  <span className="font-medium">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Content Area - Stats Cards and Notifications */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 border border-primary-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Total Posts</span>
                    <img src={profileAssets.myListIcon} alt="Posts" className="h-6 w-6 opacity-60" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600">{metrics.posts}</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Total Sales</span>
                    <img src={profileAssets.sellIcon || profileAssets.myListIcon} alt="Sales" className="h-6 w-6 opacity-60" />
                  </div>
                  <div className="text-3xl font-bold text-green-600">{metrics.sales}</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Total Earnings</span>
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">AED {metrics.earnings.toLocaleString()}</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Rating</span>
                    <img src={profileAssets.starIcon} alt="Rating" className="h-6 w-6 opacity-60" />
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">{metrics.rating} ⭐</div>
                </div>
              </div>

              <button
                onClick={() => setShowStatsPopup(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                View Detailed Statistics
                <MdKeyboardArrowRight className="text-xl" />
              </button>
            </div>

            {/* Notifications Section */}
            <NotificationsSection />
          </div>
        </div>
      </div>

      {/* Stats Popup Modal */}
      {showStatsPopup && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setShowStatsPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowStatsPopup(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 transition z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:scale-110"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="p-6">
              <h2 className="text-center pb-4 text-2xl font-semibold text-primary-500 border-b mb-4">
                My Posts & Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                {profileOptions.map((op) => {
                  let dynamicValue = op.values;
                  if (op.title === "Posts") dynamicValue = metrics.posts;
                  if (op.title === "Saved") dynamicValue = metrics.savedCount || 0;
                  if (op.title === "Verified")
                    dynamicValue = user?.verified ? "Yes" : "No";
                  
                  const handleClick = () => {
                    if (op.title === "Saved") {
                      navigate("/saved-cars");
                    }
                  };
                  
                  return (
                    <div
                      key={op.id}
                      onClick={handleClick}
                      className="border-[1px] border-primary-500 rounded flex items-center justify-between p-2 cursor-pointer hover:bg-primary-50 transition-colors"
                    >
                      <div className="h-8 w-8">
                        <img
                          src={op.icon}
                          className="h-full w-full object-cover"
                          alt={op.title}
                        />
                      </div>
                      <div className="text-primary-500 text-sm md:text-base font-semibold">
                        {dynamicValue}
                      </div>
                      <div className="text-sm md:text-base">{op.title}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium my-2">Selling</h2>
                <div className="w-full">
                  {sellingOptions.map((op) => {
                    let dynamicValue = op.values;
                    if (op.title === "Active Listings")
                      dynamicValue = metrics.activeListings;
                    if (op.title === "Sales") dynamicValue = metrics.sales;
                    return (
                      <div
                        className="flex items-center cursor-pointer py-2 px-3 hover:bg-gray-100 justify-between my-2 rounded-md transition-colors"
                        key={op.id}
                      >
                        <img
                          src={op.icon}
                          className="h-7 w-7 md:h-8 md:w-8 object-cover"
                          alt={op.title}
                        />
                        <h4 className="text-sm md:text-base flex-1 ml-3">
                          {op.title}
                          {dynamicValue ? ` (${dynamicValue})` : ""}
                        </h4>
                        <MdKeyboardArrowRight className="text-xl md:text-2xl text-primary-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium my-2">Overview</h2>
                <div className="grid grid-cols-2 gap-3 md:gap-5">
                  {sellingOverview.map((op) => {
                    return (
                      <div
                        className="border-[1px] border-primary-500 rounded flex items-center justify-between p-2 md:p-3 cursor-pointer hover:bg-primary-50 transition-colors"
                        key={op.id}
                      >
                        <img
                          src={op.icon}
                          className="h-6 w-6 md:h-7 md:w-7 object-cover"
                          alt={op.title}
                        />
                        <h4 className="text-sm md:text-base">{op.title}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-medium my-2">Performance</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-3 cursor-pointer hover:bg-primary-50 transition-colors">
                    <h4 className="font-medium text-sm md:text-base">
                      AED{" "}
                      <span className="font-semibold">
                        {metrics.earnings.toLocaleString()}
                      </span>
                    </h4>
                    <p className="text-sm mt-1">
                      {metrics.sales > 0
                        ? `${metrics.sales} Sales History`
                        : "No Pay History"}
                    </p>
                  </div>
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-3 cursor-pointer hover:bg-primary-50 transition-colors">
                    <h4 className="font-semibold text-base md:text-lg">
                      {metrics.clicks.toLocaleString()}
                    </h4>
                    <p className="text-xs md:text-sm mt-1">Clicks On Listings</p>
                    <span className="text-xs">Last 7 Days</span>
                  </div>
                  <div className="border-[1px] border-primary-500 rounded flex flex-col p-3 cursor-pointer hover:bg-primary-50 transition-colors">
                    <div className="flex items-center gap-2 md:gap-5">
                      <h4 className="text-sm md:text-base">{metrics.rating}</h4>
                      <img
                        src={profileAssets.starIcon}
                        alt="star"
                        className="w-5 h-5 md:w-6 md:h-6 object-cover"
                      />
                    </div>
                    <div className="mt-1">
                      <p className="text-xs md:text-sm">Click On Listings</p>
                      <span className="text-xs">
                        {metrics.ratingCount} Ratings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Popup Modal */}
      {showProfilePopup && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!isEditing) {
              setShowProfilePopup(false);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowProfilePopup(false);
                setIsEditing(false);
              }}
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500 transition z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              ✕
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="relative group mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500 shadow-lg">
                  <img
                    src={
                      formData.avatarPreview ||
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User") + "&background=random&size=200"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer transition rounded-full">
                  <MdEdit className="text-2xl" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user?.name || "User"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{user?.email || ""}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition"
                  placeholder="Enter your name"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 cursor-not-allowed"
                  value={user?.email || ""}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={!isEditing}
                  />
                  <div className="text-sm text-gray-600">
                    {formData.avatar ? "Change Image" : "Click to upload new image"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MdEdit className="text-xl" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        avatar: null,
                        avatarPreview: user?.avatar || null,
                      });
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <MdClose className="text-xl" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isUpdating}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <MdCheck className="text-xl" />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHero;
