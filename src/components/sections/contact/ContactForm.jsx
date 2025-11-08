import React from "react";
import ContactInformation from "./ContactInformation";

const ContactForm = () => {
  return (
    <section className="md:pt-10 py-14 md:px-16 px-4">
      <h1 className="text-center md:text-4xl text-2xll font-semibold">
        Contact Us
      </h1>
      <div className="md:w-full md:flex md:gap-10">
        <div className="leftSide form md:w-1/3">
          <form>
            {/* Name */}
            <div className="w-full md:flex md:gap-8">
              <div className="field border-b-[1px] border-black my-2 md:w-1/2">
                <label className="block py-2 text-lg">First Name</label>
                <div className="relative">
                  <input
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
              <div className="field border-b-[1px] border-black my-2 md:w-1/2">
                <label className="block py-2 text-lg">Last Name</label>
                <div className="relative">
                  <input
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>
            </div>
            {/* Email Address */}
            <div className="field border-b-[1px] border-black my-2 ">
              <label className="block py-2 text-lg">Email Address</label>
              <div className="relative">
                <input
                  className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                  type="text"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            {/* Subject */}
            <div className="field border-b-[1px] border-black my-2 ">
              <label className="block py-2 text-lg">Subject</label>
              <div className="relative">
                <input
                  className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                  type="text"
                  placeholder="Enter your subject"
                />
              </div>
            </div>
            {/* Message */}
            <div className="field border-b-[1px] border-black my-2 ">
              <label className="block py-2 text-lg">Message</label>
              <div className="relative">
                <textarea
                  name=""
                  className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                  id=""
                ></textarea>
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              className=" h-12 shadow-lg shadow-gray-400 bg-primary-500 font-medium hover:opacity-90 my-4 md:px-6 md:py-2 px-4 py-1.5"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="rightSide md:w-2/3  my-4">
          <ContactInformation />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
