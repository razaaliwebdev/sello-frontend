import React from "react";
import { threeBtns } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const Btns = () => {
  const navigate = useNavigate();
  const handleShare = () => {
    try {
      const currentUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: "Sello - Car Details",
          text: "Check out this car I found on Sello!",
          url: currentUrl,
        });
      }
    } catch (error) {
      console.log("Share Failed ", error);
    }
  };
  const handleChat = () => {
    navigate("/");
  };
  const handleCall = () => {
    const phoneNumber = "+1234567890"; // Replace with the desired phone number
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
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
  );
};

export default Btns;
