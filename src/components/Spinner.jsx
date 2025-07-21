// components/Spinner.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <div className="md:w-[5rem] md:h-[5rem] border-4 border-t-transparent border-primary-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
