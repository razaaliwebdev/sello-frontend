import React, { useState } from "react";
import { threeBtns } from "../../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleCarQuery, useGetMeQuery } from "../../../redux/services/api";
import CarChatWidget from "../../carChat/CarChatWidget";
import toast from "react-hot-toast";

const Btns = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: car } = useGetSingleCarQuery(id, { skip: !id });
  const { data: currentUser } = useGetMeQuery();
  const [showChat, setShowChat] = useState(false);

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
  
  const handleChat = () => {
    if (!currentUser) {
      toast.error("Please login to chat with seller");
      return;
    }
    if (car && currentUser._id === car.postedBy?._id) {
      toast.error("You cannot chat with yourself");
      return;
    }
    if (car && car.isSold) {
      toast.error("This car has been sold");
      return;
    }
    setShowChat(true);
  };
  
  const handleCall = () => {
    if (car && car.contactNumber) {
      window.location.href = `tel:${car.contactNumber}`;
    } else {
      toast.error("Contact number not available");
    }
  };

  return (
    <>
      <div className="px-4 md:px-20 py-12 bg-[#F9FAFB]">
        <div className="flex gap-8 items-center md:justify-between">
          {threeBtns.map((btn) => (
            <button
              onClick={() => {
                if (btn.name === "call") handleCall();
                if (btn.name === "chat") handleChat();
                if (btn.name === "share") handleShare();
              }}
              className=""
              key={btn.id}
            >
              <img className="md:h-14 h-8" src={btn.image} alt={btn.name} />
            </button>
          ))}
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
