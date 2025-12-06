// components/Spinner.jsx
import React from "react";
import Loader from "./Loader";

const Spinner = ({ fullScreen = false, className = "" }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <Loader />
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader />
    </div>
  );
};

export default Spinner;
