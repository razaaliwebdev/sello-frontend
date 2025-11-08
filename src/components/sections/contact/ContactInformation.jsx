import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactInformation = () => {
  return (
    <div className="w-full md:px-4">
      <h2 className="text-center font-medium md:text-2xl text-xl">
        Contact Information
      </h2>
      <p className="text-gray-500 my-2">
        Contact us for a quote. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Phasellus at luctus nisi. Integer ornare commodo ligula
        sed feugiat. Sed nec sem magna. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Maecenas a ex non sapien mollis aliquam id sit
        amet lorem. Nulla tristique hendrerit condimentum.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 md:gap-6 gap-4 sm:gap-5 my-6">
        <div className="">
          <h3 className="md:text-xl text-lg text-gray-700 my-2">
            Email Address
          </h3>
          <a
            href="mailto:24help@sello.ae"
            className="flex items-center gap-2 text-gray-500 hover:underline"
          >
            <MdEmail size={18} /> 24help@sello.ae
          </a>
          <a
            href="mailto:Help@sello.ae"
            className="flex items-center gap-2 text-gray-500 hover:underline"
          >
            <MdEmail size={18} /> Help@sello.ae
          </a>
        </div>
        <div className="">
          <h3 className="md:text-xl text-lg text-gray-700 my-2">
            Phone Number
          </h3>
          <a
            href="tel:+923001234567"
            className="flex items-center gap-2 text-gray-500 hover:underline"
          >
            <FaPhoneAlt size={18} /> +92 300 1234567
          </a>
        </div>
        <div className="">
          <h3 className="md:text-xl text-lg text-gray-700 my-2">Address</h3>
          <p className="text-gray-500">
            290 Bremner Blvd, Toronto, ON M5V 3L9, Canada
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
