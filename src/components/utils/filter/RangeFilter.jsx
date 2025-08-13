import React, { useState } from "react";

const RangeFilter = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(80);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="relative w-full">
        {/* Track background */}
        <div className="absolute top-1/2 left-0 right-0 h-3 rounded-full bg-gray-300 shadow-inner transform -translate-y-1/2" />

        {/* Active track */}
        <div
          className="absolute top-1/2 h-3 rounded-full bg-[#0A0E2C] shadow-md transform -translate-y-1/2 transition-all duration-200"
          style={{
            left: `${(minValue / 100) * 100}%`,
            right: `${100 - (maxValue / 100) * 100}%`,
          }}
        />

        {/* Value labels */}
        <div
          className="absolute -top-7 text-xs font-semibold text-[#0A0E2C]"
          style={{ left: `calc(${minValue}% - 10px)` }}
        >
          {minValue}
        </div>
        <div
          className="absolute -top-7 text-xs font-semibold text-[#0A0E2C]"
          style={{ left: `calc(${maxValue}% - 10px)` }}
        >
          {maxValue}
        </div>

        {/* Min thumb */}
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10"
          style={{ zIndex: minValue > maxValue - 10 ? "5" : "3" }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-auto z-10"
        />

        {/* Thumb styling */}
        <style jsx>{`
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            height: 0;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 26px;
            width: 26px;
            border-radius: 50%;
            background: #0a0e2c;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            margin-top: -11px;
            transition: transform 0.2s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
          }
          input[type="range"]::-moz-range-thumb {
            height: 26px;
            width: 26px;
            border-radius: 50%;
            background: #0a0e2c;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          input[type="range"]::-moz-range-thumb:hover {
            transform: scale(1.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default RangeFilter;
