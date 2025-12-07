import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../assets/assets";
import { FaArrowRight } from "react-icons/fa6";

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
            {/* <Link
              to="https://sello.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-lg font-medium"
            >
              GAP insurance and warranty
            </Link> */}
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
            {/* <Link
              to="https://amingarage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline text-lg font-medium"
            >
              GAP insurance and warranty
            </Link> */}
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
       <div className="flex items-center gap-10">

          <div className="partenerLogo h-50 w-45">
            <img src={images.servicoLogo} alt="Partener Logo" className="" />
          </div>

          <div className="partenerLogo h-50 w-45">
            <img src={images.amingarageLogo} alt="Partener Logo" className="" />
          </div>

          <div className="partenerLogo h-50 w-45">
            <img src={images.wbDigitalLogo} alt="Partener Logo" className="w-full h-full object-cover" />
          </div>

          
       </div>
      </div>

      {/* Sell Your Car Section */}
      <div>
        

            <div className="btn w-full items-center justify-center">
                <button className="px-6 py-2 flex items-center text-lg font-semibold hover:opacity-90 gap-2 bg-primary rounded mx-auto">
                    <img src={images.electricSvg3} alt="electricSvg" className="h-14" />
                  Sell your car <FaArrowRight /></button>
              </div>  
          
         
      </div>
    </div>
  );
};

export default PartnerOffersSection;

