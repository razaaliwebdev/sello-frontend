import React, { useState } from "react";
import HeaderLogo from "../../components/utils/HeaderLogo";
import { FaRegEye, FaRegEyeSlash, FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useRegisterUserMutation,
} from "../../redux/services/api";
import Spinner from "../../components/Spinner";
import { FiX, FiChevronDown } from "react-icons/fi";

const DealerSignup = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [cnicFile, setCnicFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dealerName: "",
    ownerFullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    city: "",
    area: "",
    vehicleTypes: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const cities = [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", 
    "Fujairah", "Umm Al Quwain", "Al Ain"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "avatar") {
        setAvatar(file);
      } else if (type === "cnic") {
        setCnicFile(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.dealerName.trim()) {
      newErrors.dealerName = "Dealer/Showroom name is required";
    }

    if (!formData.ownerFullName.trim()) {
      newErrors.ownerFullName = "Owner full name is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Please enter a valid mobile number";
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.whatsappNumber.trim())) {
      newErrors.whatsappNumber = "Please enter a valid WhatsApp number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.vehicleTypes.trim()) {
      newErrors.vehicleTypes = "Type of vehicles is required";
    }

    if (!cnicFile) {
      newErrors.cnicFile = "CNIC/Business License is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    // Create default avatar if none provided
    let avatarFile = avatar;
    if (!avatarFile) {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#FFA602";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "80px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(formData.dealerName.charAt(0).toUpperCase(), 100, 100);
      
      canvas.toBlob((blob) => {
        avatarFile = new File([blob], "avatar.png", { type: "image/png" });
        submitForm(avatarFile);
      }, "image/png");
      return;
    }

    submitForm(avatarFile);
  };

  const submitForm = async (avatarFile) => {
    const registrationData = new FormData();
    registrationData.append("name", formData.ownerFullName);
    registrationData.append("email", formData.email);
    registrationData.append("password", formData.password);
    registrationData.append("role", "dealer");
    registrationData.append("avatar", avatarFile);
    
    // Dealer-specific information
    registrationData.append("dealerName", formData.dealerName);
    registrationData.append("mobileNumber", formData.mobileNumber);
    registrationData.append("whatsappNumber", formData.whatsappNumber);
    registrationData.append("city", formData.city);
    registrationData.append("area", formData.area);
    registrationData.append("vehicleTypes", formData.vehicleTypes);
    registrationData.append("cnicFile", cnicFile);

    try {
      setLoading(true);
      const res = await registerUser(registrationData).unwrap();
      toast.success("Dealer registration submitted successfully! Pending admin verification.");
      setFormData({
        dealerName: "",
        ownerFullName: "",
        mobileNumber: "",
        whatsappNumber: "",
        email: "",
        city: "",
        area: "",
        vehicleTypes: "",
        password: "",
        confirmPassword: "",
      });
      setAvatar(null);
      setCnicFile(null);
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800">Dealer Registration</h2>
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            )}
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              {/* Row 1: Dealer Name & Owner Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dealer/Showroom Name *
                  </label>
                  <input
                    name="dealerName"
                    value={formData.dealerName}
                    onChange={handleChange}
                    className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.dealerName ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Enter dealer/showroom name"
                  />
                  {errors.dealerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.dealerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Full Name *
                  </label>
                  <input
                    name="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={handleChange}
                    className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.ownerFullName ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Enter owner full name"
                  />
                  {errors.ownerFullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.ownerFullName}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Mobile & WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.mobileNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    type="tel"
                    placeholder="+971 XX XXX XXXX"
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.whatsappNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    type="tel"
                    placeholder="+971 XX XXX XXXX"
                  />
                  {errors.whatsappNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Email (Full Width) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  type="email"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Row 4: City & Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City & Area *
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area *
                  </label>
                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.area ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Enter area"
                  />
                  {errors.area && (
                    <p className="text-red-500 text-xs mt-1">{errors.area}</p>
                  )}
                </div>
              </div>

              {/* Row 5: Vehicle Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Vehicles *
                </label>
                <input
                  name="vehicleTypes"
                  value={formData.vehicleTypes}
                  onChange={handleChange}
                  className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.vehicleTypes ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="New, Used. Bikes, SUVs, alt etc."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple types with commas (e.g., New Cars, Used Cars, Bikes)
                </p>
                {errors.vehicleTypes && (
                  <p className="text-red-500 text-xs mt-1">{errors.vehicleTypes}</p>
                )}
              </div>

              {/* Row 6: CNIC/Business License Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CNIC / Business License *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, "cnic")}
                    className="hidden"
                    id="cnic-upload"
                  />
                  <label
                    htmlFor="cnic-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <FaUpload className="text-gray-400 mb-2" size={24} />
                    <span className="text-sm text-gray-600">
                      {cnicFile ? cnicFile.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF, JPG, PNG (Max 5MB)
                    </span>
                  </label>
                </div>
                {errors.cnicFile && (
                  <p className="text-red-500 text-xs mt-1">{errors.cnicFile}</p>
                )}
              </div>

              {/* Row 7: Password & Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full py-2 px-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10 ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    I accept the{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary-500 hover:underline font-medium"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/terms-conditon"
                      className="text-primary-500 hover:underline font-medium"
                    >
                      Terms & Conditions
                    </Link>
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors mb-4 disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block"></span>
                ) : (
                  "Register Now"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary-500 hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealerSignup;

