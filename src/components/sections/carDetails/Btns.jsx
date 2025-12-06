import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useGetSingleCarQuery, 
  useGetMeQuery,
  useSaveCarMutation,
  useUnsaveCarMutation,
  useGetSavedCarsQuery,
  useTrackRecentlyViewedMutation
} from "../../../redux/services/api";
import CarChatWidget from "../../carChat/CarChatWidget";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart, FaShareAlt, FaPhone, FaCommentDots } from "react-icons/fa";

const Btns = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: car } = useGetSingleCarQuery(id, { skip: !id });
  const { data: currentUser } = useGetMeQuery();
  const { data: savedCarsData } = useGetSavedCarsQuery(undefined, { skip: !currentUser });
  const [saveCar, { isLoading: isSaving }] = useSaveCarMutation();
  const [unsaveCar, { isLoading: isUnsaving }] = useUnsaveCarMutation();
  const [trackRecentlyViewed] = useTrackRecentlyViewedMutation();
  const [showChat, setShowChat] = useState(false);
  
  const savedCars = savedCarsData || [];
  const isSaved = savedCars.some(savedCar => savedCar._id === id);
  
  // Track recently viewed when car loads
  useEffect(() => {
    if (id && currentUser) {
      trackRecentlyViewed(id).catch(err => console.error('Failed to track view:', err));
    }
  }, [id, currentUser, trackRecentlyViewed]);

  const handleShare = () => {
    try {
      const currentUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: "Sello - Car Details",
          text: "Check out this car I found on Sello!",
          url: currentUrl,
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(currentUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.log("Share Failed ", error);
    }
  };
  
  const isSold = !!car?.isSold;

  const handleChat = () => {
    if (!currentUser) {
      toast.error("Please login to chat with seller");
      return;
    }
    if (car && currentUser._id === car.postedBy?._id) {
      toast.error("You cannot chat with yourself");
      return;
    }
    if (isSold) {
      toast.error("This car has been sold. Chat is disabled.");
      return;
    }
    setShowChat(true);
  };
  
  const handleCall = () => {
    if (isSold) {
      toast.error("This car has been sold. Calling is disabled.");
      return;
    }
    if (car && car.contactNumber) {
      window.location.href = `tel:${car.contactNumber}`;
    } else {
      toast.error("Contact number not available");
    }
  };

  const handleSaveListing = async () => {
    if (!currentUser) {
      toast.error("Please login to save listings");
      navigate("/login");
      return;
    }

    try {
      if (isSaved) {
        await unsaveCar(id).unwrap();
        toast.success("Listing removed from saved");
      } else {
        await saveCar(id).unwrap();
        toast.success("Listing saved successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save listing");
    }
  };

  return (
    <>
      <div className="px-4 md:px-20 py-6 bg-[#F9FAFB] border-b border-gray-200">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Left Side - Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Contact Seller / Chat Button */}
            {!isSold && (
              <button
                onClick={handleChat}
                disabled={!currentUser || (car && currentUser._id === car.postedBy?._id)}
                className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCommentDots />
                {currentUser && car && currentUser._id === car.postedBy?._id
                  ? "Your Listing"
                  : "Contact Seller"}
              </button>
            )}

            {/* Call Button */}
            {!isSold && car?.contactNumber && (
              <button
                onClick={handleCall}
                className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                <FaPhone />
                Call Now
              </button>
            )}

            {/* Save Listing Button */}
            {currentUser && (
              <button
                onClick={handleSaveListing}
                disabled={isSaving || isUnsaving}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isSaved
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50`}
              >
                {isSaved ? <FaHeart /> : <FaRegHeart />}
                {isSaved ? "Saved" : "Save Listing"}
              </button>
            )}

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-primary-100 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
            >
              <FaShareAlt />
              Share
            </button>
          </div>

          {/* Right Side - Status & Report */}
          <div className="flex items-center gap-4">
            {isSold && (
              <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold">
                Sold
              </span>
            )}
            
            {/* Report Button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  toast.error("Please login to report");
                  navigate("/login");
                  return;
                }
                const reason = prompt("Please enter reason for reporting:");
                if (reason) {
                  // TODO: Implement report API call
                  toast.success("Report submitted for review");
                }
              }}
              className="px-4 py-2 text-red-600 hover:text-red-700 text-sm font-medium border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Report
            </button>
          </div>
        </div>
      </div>

      {/* Car Chat Widget */}
      {showChat && car && currentUser && (
        <CarChatWidget
          carId={car._id}
          sellerId={car.postedBy?._id || car.postedBy}
          carTitle={`${car.make} ${car.model} - ${car.year}`}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default Btns;
