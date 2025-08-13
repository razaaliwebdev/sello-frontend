import React, { useState } from "react";

const SpecsUtility = ({ specsTypes, onBodyTypeChange }) => {
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const handleSelect = (titleValue) => {
    setSelectedBodyType(titleValue);
    if (onBodyTypeChange) {
      onBodyTypeChange(titleValue); // Send to parent
    }
  };

  return (
    <div className="flex items-center gap-8 py-4 overflow-x-auto md:scrollbar-hide hideScrollbar">
      {specsTypes.map((item, index) => {
        const isChecked = selectedBodyType === item.titleValue;

        return (
          <div
            key={index}
            onClick={() => handleSelect(item.titleValue)}
            style={{ width: "150px", height: "100px" }}
            className="bg-[#F5F5F5] rounded-lg transition-shadow duration-200 flex flex-col items-center justify-between px-4 py-2 cursor-pointer"
          >
            {/* Image */}
            {item.image && (
              <img
                className="w-16 h-16 object-contain"
                src={item.image}
                alt={item.titleValue}
              />
            )}

            {/* Name & Custom Radio */}
            <div
              className={`flex items-center gap-2 w-full mt-1 ${
                !item.image ? "justify-center items-center h-full" : ""
              }`}
            >
              <span className="text-sm font-medium text-gray-700">
                {item.titleValue}
              </span>

              <label className="relative flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={isChecked}
                  name="custom-radio"
                  readOnly
                  className="peer h-5 w-5 appearance-none rounded-full bg-gray-100 shadow hover:shadow-md border border-gray-300 checked:border-primary-500 cursor-pointer transition-all"
                />
                <span className="absolute text-primary-500 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecsUtility;
