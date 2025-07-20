// components/Spinner.jsx
import React from "react";
// import "./spinner.css"; // optional for custom styles

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <div className="w-16 h-16 border-4 border-t-transparent border-primary-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
