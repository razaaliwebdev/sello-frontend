import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaSave, FaSpinner, FaGlobe, FaShieldAlt, FaCheckCircle, FaBell, FaCamera, FaUpload } from "react-icons/fa";

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
      checked ? "bg-orange-500" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const GeneralSettingsTab = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({
    // General
    siteName: "",
    contactEmail: "",
    businessLogo: "", // URL
    maxListingsPerDealer: 50,
    commissionRate: 5,
    
    // Security
    allowRegistration: true,
    requireEmailVerification: false,
    maintenanceMode: false,
    
    // Approvals
    autoApproveDealers: false,
    autoApproveListings: false,
    
    // Notifications
    enableEmailNotifications: true,
    enablePushNotifications: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/settings`,
        { withCredentials: true }
      );

      if (response.data.success) {
        const fetchedSettings = {};
        const flatSettings = response.data.data.flat || [];
        
        flatSettings.forEach(s => {
          // Convert value based on type
          let parsedValue = s.value;
          if (s.type === "boolean") {
            parsedValue = s.value === true || s.value === "true" || s.value === 1;
          } else if (s.type === "number") {
            parsedValue = Number(s.value) || 0;
          }
          fetchedSettings[s.key] = parsedValue;
        });

        setSettings(prev => ({
          ...prev,
          ...fetchedSettings
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      if (response.data.success) {
        handleChange("businessLogo", response.data.data.url);
        toast.success("Logo uploaded successfully");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!settings.siteName?.trim()) {
      toast.error("Site name is required");
      return;
    }
    if (!settings.contactEmail?.trim() || !/^\S+@\S+\.\S+$/.test(settings.contactEmail)) {
      toast.error("Please enter a valid contact email");
      return;
    }

    setSaving(true);
    try {
      const settingsToSave = [
        { key: "siteName", value: settings.siteName, category: "general", type: "string" },
        { key: "contactEmail", value: settings.contactEmail, category: "general", type: "string" },
        { key: "businessLogo", value: settings.businessLogo || "", category: "general", type: "string" },
        { key: "maxListingsPerDealer", value: settings.maxListingsPerDealer || 50, category: "general", type: "number" },
        { key: "commissionRate", value: settings.commissionRate || 5, category: "payment", type: "number" },
        { key: "allowRegistration", value: settings.allowRegistration || false, category: "general", type: "boolean" },
        { key: "requireEmailVerification", value: settings.requireEmailVerification || false, category: "email", type: "boolean" },
        { key: "maintenanceMode", value: settings.maintenanceMode || false, category: "general", type: "boolean" },
        { key: "autoApproveDealers", value: settings.autoApproveDealers || false, category: "general", type: "boolean" },
        { key: "autoApproveListings", value: settings.autoApproveListings || false, category: "general", type: "boolean" },
        { key: "enableEmailNotifications", value: settings.enableEmailNotifications || false, category: "email", type: "boolean" },
        { key: "enablePushNotifications", value: settings.enablePushNotifications || false, category: "general", type: "boolean" }
      ];

      const promises = settingsToSave.map(setting => 
        axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/settings`,
          setting,
          { withCredentials: true }
        )
      );

      await Promise.all(promises);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Marketplace Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-orange-500" />
            <h3 className="font-bold text-gray-800">General Settings</h3>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <FaSave /> Save All Settings
              </>
            )}
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Upload Section */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mb-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                {settings.businessLogo ? (
                  <img src={settings.businessLogo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <FaCamera className="text-gray-300 text-3xl" />
                )}
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <FaSpinner className="text-white animate-spin" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-medium text-gray-800">Business Logo</h4>
              <p className="text-sm text-gray-500 mb-3">
                Upload your business logo. Recommended size: 512x512px.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                <FaUpload />
                <span>{uploading ? "Uploading..." : "Upload New Logo"}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoUpload} 
                  disabled={uploading}
                  className="hidden" 
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Max Listings Per Dealer
            </label>
            <input
              type="number"
              value={settings.maxListingsPerDealer}
              onChange={(e) => handleChange("maxListingsPerDealer", Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Commission Rate (%)
            </label>
            <input
              type="number"
              value={settings.commissionRate}
              onChange={(e) => handleChange("commissionRate", Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaShieldAlt className="text-orange-500" />
          <h3 className="font-bold text-gray-800">Security & Access</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Allow User Registration</h4>
              <p className="text-sm text-gray-500">Let new users sign up for an account</p>
            </div>
            <ToggleSwitch 
              checked={settings.allowRegistration} 
              onChange={(val) => handleChange("allowRegistration", val)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Email Verification</h4>
              <p className="text-sm text-gray-500">Require email verification before login</p>
            </div>
            <ToggleSwitch 
              checked={settings.requireEmailVerification} 
              onChange={(val) => handleChange("requireEmailVerification", val)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Maintenance Mode</h4>
              <p className="text-sm text-gray-500">Show maintenance page to all non-admin users</p>
            </div>
            <ToggleSwitch 
              checked={settings.maintenanceMode} 
              onChange={(val) => handleChange("maintenanceMode", val)} 
            />
          </div>
        </div>
      </div>

      {/* Approval Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaCheckCircle className="text-orange-500" />
          <h3 className="font-bold text-gray-800">Approval Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Auto-Approve Dealers</h4>
              <p className="text-sm text-gray-500">Automatically approve new dealer applications</p>
            </div>
            <ToggleSwitch 
              checked={settings.autoApproveDealers} 
              onChange={(val) => handleChange("autoApproveDealers", val)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Auto-Approve Listings</h4>
              <p className="text-sm text-gray-500">Automatically approve new car listings</p>
            </div>
            <ToggleSwitch 
              checked={settings.autoApproveListings} 
              onChange={(val) => handleChange("autoApproveListings", val)} 
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
          <FaBell className="text-orange-500" />
          <h3 className="font-bold text-gray-800">Notification Settings</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send system emails to users</p>
            </div>
            <ToggleSwitch 
              checked={settings.enableEmailNotifications} 
              onChange={(val) => handleChange("enableEmailNotifications", val)} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Push Notifications</h4>
              <p className="text-sm text-gray-500">Send push notifications to mobile devices</p>
            </div>
            <ToggleSwitch 
              checked={settings.enablePushNotifications} 
              onChange={(val) => handleChange("enablePushNotifications", val)} 
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default GeneralSettingsTab;
