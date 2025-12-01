import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import GeneralSettingsTab from "../../components/admin/settings/GeneralSettingsTab";
import UserRolesTab from "../../components/admin/settings/UserRolesTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general"); // 'general' or 'roles'

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500 mt-1">Configure your marketplace settings</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setActiveTab("general")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "general"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              General Settings
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === "roles"
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              User Role
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          {activeTab === "general" ? (
            <GeneralSettingsTab />
          ) : (
            <UserRolesTab />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
