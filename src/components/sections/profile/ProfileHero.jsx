import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdEdit,
  MdCheck,
  MdClose,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import {
  FiUser,
  FiMail,
  FiCheckCircle,
  FiStar,
  FiMessageSquare,
  FiHeart,
  FiFileText,
  FiHelpCircle,
} from "react-icons/fi";
import {
  useGetMeQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetSavedCarsQuery,
} from "../../../redux/services/api";
import { useSupportChat } from "../../../contexts/SupportChatContext";
import NotificationsSection from "./NotificationsSection";
import DealerRequestForm from "../../profile/DealerRequestForm";
import SubscriptionManagement from "../../subscriptions/SubscriptionManagement";

const ProfileHero = () => {
  const navigate = useNavigate();
  const { openSupportChat } = useSupportChat();
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showDealerForm, setShowDealerForm] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
    avatarPreview: null,
  });

  const { data: user, isLoading, isError, error, refetch } = useGetMeQuery(
    undefined,
    {
      skip: !localStorage.getItem("token"),
    }
  );
  const { data: savedCarsData } = useGetSavedCarsQuery(undefined, {
    skip: !user || isLoading,
  });
  const { data: subscriptionData } = useGetMySubscriptionQuery(undefined, {
    skip: !user || isLoading,
  });
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const [metrics, setMetrics] = useState({
    posts: 0,
    activeListings: 0,
    sales: 0,
    earnings: 0,
    savedCount: 0,
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
        user.carsPurchased?.reduce((sum, car) => sum + (car.price || 0), 0) ||
        0;
      setMetrics({
        posts,
        activeListings: posts,
        sales,
        earnings,
        savedCount,
        clicks: 0,
        rating: user.sellerRating || 0,
        ratingCount: user.reviewCount || 0,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-primary-500 mx-auto mb-4"></div>
          <div className="text-gray-500 text-sm">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (isError && error?.status !== 401) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">Error loading profile</div>
          <div className="text-gray-500 text-sm">
            {error?.data?.message || "Failed to load profile"}
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: FiFileText,
      onClick: () => setActiveSection("overview"),
    },
    {
      id: "listings",
      label: "My Posts",
      icon: FiFileText,
      count: metrics.posts,
      onClick: () => navigate("/my-listings"),
    },
    {
      id: "saved",
      label: "Saved Cars",
      icon: FiHeart,
      count: metrics.savedCount,
      onClick: () => navigate("/saved-cars"),
    },
    {
      id: "chats",
      label: "My Chats",
      icon: FiMessageSquare,
      onClick: () => navigate("/my-chats"),
    },
    ...(user?.role === "dealer" && user?.dealerInfo?.verified
      ? [
          {
            id: "dealer-dashboard",
            label: "Dealer Dashboard",
            icon: FiCheckCircle,
            onClick: () => navigate("/dealer/dashboard"),
            highlight: true,
          },
        ]
      : []),
    ...((user?.role === "individual" || user?.role === "dealer")
      ? [
          {
            id: "seller-dashboard",
            label: "My Dashboard",
            icon: FiCheckCircle,
            onClick: () => navigate("/seller/dashboard"),
            highlight: true,
          },
        ]
      : []),
    ...(user?.role !== "dealer"
      ? [
          {
            id: "become-dealer",
            label: user?.role === "dealer" && !user?.dealerInfo?.verified
              ? "Verification Pending"
              : "Become a Dealer",
            icon: FiStar,
            onClick: () => setShowDealerForm(true),
            highlight: !(user?.role === "dealer" && !user?.dealerInfo?.verified),
          },
        ]
      : []),
    // Only show subscription tab if user doesn't have active premium subscription
    ...(subscriptionData?.subscription?.isActive && 
        subscriptionData?.subscription?.endDate && 
        new Date(subscriptionData.subscription.endDate) > new Date() &&
        subscriptionData?.subscription?.plan !== 'free' ? [] : [{
      id: "subscription",
      label: "Subscription",
      icon: FiStar,
      onClick: () => setActiveSection("subscription"),
    }]),
    {
      id: "support",
      label: "Support",
      icon: FiHelpCircle,
      onClick: () => openSupportChat(),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-gray-100 ring-offset-2">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User"
                    )}&background=FFA602&color=fff&size=200`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleProfilePopup}
                className="absolute -bottom-1 -right-1 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-105"
                title="Edit Profile"
              >
                <MdEdit className="text-lg" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </h1>
                {user?.verified && (
                  <FiCheckCircle className="text-primary-500 flex-shrink-0" size={20} />
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4">{user?.email || ""}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.posts}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    {metrics.sales}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">
                    AED {metrics.earnings.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Earnings</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate("/create-post")}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow-md"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : item.highlight
                          ? "text-primary-600 hover:bg-primary-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={isActive ? "text-primary-600" : ""}
                          size={18}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {item.count}
                        </span>
                      )}
                      <MdKeyboardArrowRight
                        className={`text-gray-400 transition-transform ${
                          isActive ? "rotate-90" : ""
                        }`}
                        size={18}
                      />
                    </button>
                  );
                })}
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <MdLogout size={18} />
                  <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {activeSection === "overview" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Total Posts</span>
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <FiFileText className="text-primary-600" size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900">
                      {metrics.posts}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Active Listings</span>
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <FiCheckCircle className="text-green-600" size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900">
                      {metrics.activeListings}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Total Sales</span>
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FiStar className="text-blue-600" size={20} />
                      </div>
                    </div>
                    <div className="text-3xl font-semibold text-gray-900">
                      {metrics.sales}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Earnings</span>
                      <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-600 text-xl">💰</span>
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">
                      AED {metrics.earnings.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <NotificationsSection />
                </div>
              </>
            )}

            {activeSection === "subscription" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {subscriptionData?.subscription?.isActive && 
                 subscriptionData?.subscription?.endDate && 
                 new Date(subscriptionData.subscription.endDate) > new Date() &&
                 subscriptionData?.subscription?.plan !== 'free' ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Active Subscription: {subscriptionData?.planDetails?.name || 'Premium'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your subscription is active until {new Date(subscriptionData.subscription.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      You have unlimited listings and all premium features enabled.
                    </p>
                  </div>
                ) : (
                  <SubscriptionManagement />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dealer Request Form Modal */}
      <DealerRequestForm
        isOpen={showDealerForm}
        onClose={() => setShowDealerForm(false)}
        onSuccess={() => {
          refetch();
          setShowDealerForm(false);
        }}
      />

      {/* Profile Edit Modal */}
      {showProfilePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => {
            if (!isEditing) {
              setShowProfilePopup(false);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowProfilePopup(false);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose size={24} />
            </button>

            <div className="flex flex-col items-center mb-6 pt-4">
              <div className="relative group mb-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-gray-200">
                  <img
                    src={
                      formData.avatarPreview ||
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.name || "User"
                      )}&background=FFA602&color=fff&size=200`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity rounded-full">
                  <MdEdit size={24} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {user?.name || "User"}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{user?.email || ""}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline mr-2" size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                  placeholder="Enter your name"
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="inline mr-2" size={16} />
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 cursor-not-allowed"
                  value={user?.email || ""}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={!isEditing}
                  />
                  <div className="text-sm text-gray-600">
                    {formData.avatar ? "Change Image" : "Click to upload"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    JPG, PNG up to 5MB
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MdEdit size={18} />
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
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isUpdating}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <MdCheck size={18} />
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
