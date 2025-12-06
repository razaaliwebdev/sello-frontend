import React, { useState } from "react";
import ContactInformation from "./ContactInformation";
import axios from "axios";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  // Ensure API_URL correctly points to the /api endpoint
  const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;
  
  console.log('Contact form API URL:', `${API_URL}/contact-form`);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Submitting contact form:', formData);
      const response = await axios.post(`${API_URL}/contact-form`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Contact form response:', response.data);
      if (response.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(response.data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      console.error('Error response:', error?.response?.data);
      toast.error(error?.response?.data?.message || error?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="md:pt-10 py-14 md:px-16 px-4">
      <h1 className="text-center md:text-4xl text-2xll font-semibold">
        Contact Us
      </h1>
      <div className="md:w-full md:flex md:gap-10">
        <div className="leftSide form md:w-1/3">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="w-full md:flex md:gap-8">
              <div className="field border-b-[1px] border-black my-2 md:w-1/2">
                <label className="block py-2 text-lg">First Name</label>
                <div className="relative">
                  <input
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
              </div>
              <div className="field border-b-[1px] border-black my-2 md:w-1/2">
                <label className="block py-2 text-lg">Last Name</label>
                <div className="relative">
                  <input
                    className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
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
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
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
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter your subject"
                  required
                />
              </div>
            </div>
            {/* Message */}
            <div className="field border-b-[1px] border-black my-2 ">
              <label className="block py-2 text-lg">Message</label>
              <div className="relative">
                <textarea
                  name="message"
                  className="w-full py-2 border-none outline-none px-0 text-lg pr-10"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 shadow-lg shadow-gray-400 bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors my-4 md:px-6 md:py-2 px-4 py-1.5 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
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
