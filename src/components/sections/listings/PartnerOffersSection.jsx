import React from "react";
import { Link } from "react-router-dom";

const PartnerOffersSection = () => {
  return (
    <div className="px-4 md:px-20 py-12 bg-white">
      {/* Exclusive Partner Offers */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Exclusive partner offers for you:
        </h2>
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          {/* First Partner Offer */}
          <div className="flex flex-col gap-2">
            <Link
              to="https://sello.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-lg font-medium"
            >
              GAP insurance and warranty
            </Link>
            <Link
              to="https://sello.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-sm"
            >
              https://sello.ae/
            </Link>
            <p className="text-gray-600 text-sm">offers from ALA</p>
          </div>

          {/* Second Partner Offer */}
          <div className="flex flex-col gap-2">
            <Link
              to="https://amingarage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-lg font-medium"
            >
              GAP insurance and warranty
            </Link>
            <Link
              to="https://amingarage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-sm"
            >
              https://amingarage.com/
            </Link>
            <p className="text-gray-600 text-sm">offers from ALA</p>
          </div>
        </div>
      </div>

      {/* Expert Advice Section */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Expert advice and opinion – as seen, heard and read here (and many
          other places as well!):
        </h2>
        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          {/* News Channel Logos */}
          <div className="flex items-center justify-center w-32 h-20 bg-gray-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🌐</div>
              <p className="text-gray-800 font-bold text-sm">NEWS</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 bg-teal-100 rounded-lg p-4">
            <div className="text-center">
              <div className="text-teal-600 text-xl mb-1">📰</div>
              <p className="text-teal-600 font-semibold text-sm">NEWS</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 bg-orange-50 rounded-lg p-4 border-2 border-orange-300">
            <div className="text-center">
              <div className="text-orange-500 text-2xl mb-1 font-bold">G</div>
              <p className="text-blue-600 font-semibold text-sm">geo</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 bg-green-600 rounded-lg p-4">
            <div className="text-center text-white">
              <div className="text-xl mb-1">🌍</div>
              <p className="font-bold text-xs">LIVE</p>
              <p className="font-bold text-xs">PAKISTAN</p>
              <p className="font-bold text-xs">NEWS TV</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 bg-red-600 rounded-lg p-4">
            <div className="text-center text-white">
              <p className="font-bold text-lg">ARY</p>
              <p className="font-bold text-sm">NEWS</p>
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 bg-green-800 rounded-lg p-4">
            <div className="text-center text-white flex items-center gap-2">
              <div className="text-xl">🌙⭐</div>
              <div>
                <p className="font-bold text-sm">Pak</p>
                <p className="font-bold text-xs">News</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sell Your Car Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Sell your car
        </h2>
        <div className="flex items-center justify-center md:justify-start">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Gradient Background Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-primary-500 via-primary-400 to-red-500 rounded-full opacity-30 blur-2xl"></div>
            </div>
            
            {/* Handshake and Car Icon */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Handshake Icon */}
              <div className="text-7xl md:text-8xl mb-6">🤝</div>
              {/* Car Silhouette */}
              <svg
                className="w-40 h-20"
                viewBox="0 0 200 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="20"
                  y="40"
                  width="160"
                  height="40"
                  rx="8"
                  fill="#1F2937"
                />
                <rect
                  x="30"
                  y="50"
                  width="140"
                  height="20"
                  rx="4"
                  fill="#374151"
                />
                <circle cx="50" cy="85" r="8" fill="#4B5563" />
                <circle cx="150" cy="85" r="8" fill="#4B5563" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOffersSection;

