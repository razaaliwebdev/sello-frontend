import React, { useState } from "react";
import { useRequestDealerMutation, useGetMeQuery } from "../../redux/services/api";
import toast from "react-hot-toast";
import { FiX, FiCheckCircle, FiAlertCircle, FiBriefcase, FiFileText, FiMapPin, FiPhone } from "react-icons/fi";
import Spinner from "../Spinner";

const DealerRequestForm = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessLicense: "",
    businessAddress: "",
    businessPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [requestDealer, { isLoading }] = useRequestDealerMutation();
  const { data: user, refetch } = useGetMeQuery();

  // Check if user is already a dealer
  const isDealer = user?.role === "dealer";
  const isVerifiedDealer = user?.dealerInfo?.verified === true;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    } else if (formData.businessName.trim().length < 3) {
      newErrors.businessName = "Business name must be at least 3 characters";
    }

    if (!formData.businessLicense.trim()) {
      newErrors.businessLicense = "Business license number is required";
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = "Business address is required";
    } else if (formData.businessAddress.trim().length < 10) {
      newErrors.businessAddress = "Please provide a complete address";
    }

    if (!formData.businessPhone.trim()) {
      newErrors.businessPhone = "Business phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.businessPhone.trim())) {
      newErrors.businessPhone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const result = await requestDealer({
        businessName: formData.businessName.trim(),
        businessLicense: formData.businessLicense.trim(),
        businessAddress: formData.businessAddress.trim(),
        businessPhone: formData.businessPhone.trim(),
      }).unwrap();

      toast.success("Dealer request submitted successfully! Pending admin verification.");
      setFormData({
        businessName: "",
        businessLicense: "",
        businessAddress: "",
        businessPhone: "",
      });
      setErrors({});
      refetch();
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit dealer request. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  // Show status if already a dealer
  if (isDealer) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Dealer Status</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="p-6">
            {isVerifiedDealer ? (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FiCheckCircle className="text-green-600" size={32} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Verified Dealer</h4>
                <p className="text-gray-600 mb-4">
                  Your dealer account has been verified by our admin team.
                </p>
                {user?.dealerInfo?.businessName && (
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <p className="text-sm text-gray-600 mb-1">Business Name</p>
                    <p className="font-medium text-gray-900">{user.dealerInfo.businessName}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <FiAlertCircle className="text-yellow-600" size={32} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Pending Verification</h4>
                <p className="text-gray-600 mb-4">
                  Your dealer request is pending admin verification. You will be notified once your account is verified.
                </p>
                {user?.dealerInfo?.businessName && (
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <p className="text-sm text-gray-600 mb-1">Business Name</p>
                    <p className="font-medium text-gray-900">{user.dealerInfo.businessName}</p>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={onClose}
              className="w-full mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold text-white">Become a Verified Dealer</h3>
            <p className="text-primary-100 text-sm mt-1">
              Get verified and unlock dealer benefits
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiBriefcase className="inline mr-2" size={16} />
              Business Name *
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.businessName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
            )}
          </div>

          {/* Business License */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiFileText className="inline mr-2" size={16} />
              Business License Number *
            </label>
            <input
              type="text"
              name="businessLicense"
              value={formData.businessLicense}
              onChange={handleChange}
              placeholder="Enter your business license number"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.businessLicense ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.businessLicense && (
              <p className="text-red-500 text-xs mt-1">{errors.businessLicense}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              This will be verified by our admin team
            </p>
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiMapPin className="inline mr-2" size={16} />
              Business Address *
            </label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="Enter your complete business address"
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none ${
                errors.businessAddress ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.businessAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.businessAddress}</p>
            )}
          </div>

          {/* Business Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FiPhone className="inline mr-2" size={16} />
              Business Phone Number *
            </label>
            <input
              type="tel"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              placeholder="+971 XX XXX XXXX"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                errors.businessPhone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.businessPhone && (
              <p className="text-red-500 text-xs mt-1">{errors.businessPhone}</p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">What happens next?</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Your request will be reviewed by our admin team</li>
              <li>• Verification typically takes 1-3 business days</li>
              <li>• You'll receive an email notification once verified</li>
              <li>• Verified dealers get priority listing placement</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Spinner fullScreen={false} />
                  Submitting...
                </>
              ) : (
                <>
                  <FiCheckCircle size={16} />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealerRequestForm;

