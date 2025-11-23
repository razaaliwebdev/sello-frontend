import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllSettingsQuery,
    useUpsertSettingMutation,
} from "../../redux/services/adminApi";
import {
    useGetAllUsersQuery,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiUserPlus, FiShield, FiDownload } from "react-icons/fi";
import InviteUserModal from "../../components/admin/InviteUserModal";
import RolesList from "../../components/admin/RolesList";
import { useGetPermissionMatrixQuery } from "../../redux/services/adminApi";
import { useGetMeQuery } from "../../redux/services/api";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");
    const { data: settingsData, isLoading: settingsLoading, refetch: refetchSettings } = useGetAllSettingsQuery({});
    const [upsertSetting, { isLoading: isSaving }] = useUpsertSettingMutation();
    
    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({ page: 1, limit: 20, role: "admin" });
    const { data: currentUser } = useGetMeQuery();
    const { data: permissionMatrixData } = useGetPermissionMatrixQuery(undefined, {
        skip: activeTab !== "roles"
    });
    
    const [searchQuery, setSearchQuery] = useState("");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);

    const settings = settingsData?.settings || {};
    const flatSettings = settingsData?.flat || [];
    const adminUsers = usersData?.users || [];

    // Get setting value helper
    const getSetting = (key, defaultValue = "") => {
        const setting = flatSettings.find(s => s.key === key);
        return setting?.value || defaultValue;
    };

    // Form state for General Settings
    const [generalSettings, setGeneralSettings] = useState({
        siteName: "CanMarket",
        contactEmail: "admin@canmarket.com",
        maxListingsPerDealer: "50",
        commissionRate: "50",
        businessLogo: null,
    });

    // Toggle states
    const [toggles, setToggles] = useState({
        allowUserRegistration: true,
        emailVerification: true,
        maintenanceMode: true,
        autoApproveDealers: true,
        autoApproveListings: true,
        emailNotifications: true,
        pushNotifications: true,
    });

    // Admin Permissions & Features toggle states
    const [adminPermissions, setAdminPermissions] = useState({
        allLeadsOverview: true,
        leadStatusManagement: true,
        leadAssignment: true,
        spamFiltering: true,
        createAdminRoles: true,
        assignPermissions: true,
        activityLogs: true,
        twoFactorAuthentication: false,
    });

    // Update state when settings data loads
    useEffect(() => {
        if (flatSettings.length > 0) {
            const getSettingValue = (key, defaultValue = "") => {
                const setting = flatSettings.find(s => s.key === key);
                return setting?.value || defaultValue;
            };

            setGeneralSettings({
                siteName: getSettingValue("siteName", "CanMarket"),
                contactEmail: getSettingValue("contactEmail", "admin@canmarket.com"),
                maxListingsPerDealer: getSettingValue("maxListingsPerDealer", "50"),
                commissionRate: getSettingValue("commissionRate", "50"),
                businessLogo: null,
            });

            setToggles({
                allowUserRegistration: getSettingValue("allowUserRegistration", "true") === "true" || getSettingValue("allowUserRegistration", "true") === true,
                emailVerification: getSettingValue("emailVerification", "true") === "true" || getSettingValue("emailVerification", "true") === true,
                maintenanceMode: getSettingValue("maintenanceMode", "true") === "true" || getSettingValue("maintenanceMode", "true") === true,
                autoApproveDealers: getSettingValue("autoApproveDealers", "true") === "true" || getSettingValue("autoApproveDealers", "true") === true,
                autoApproveListings: getSettingValue("autoApproveListings", "true") === "true" || getSettingValue("autoApproveListings", "true") === true,
                emailNotifications: getSettingValue("emailNotifications", "true") === "true" || getSettingValue("emailNotifications", "true") === true,
                pushNotifications: getSettingValue("pushNotifications", "true") === "true" || getSettingValue("pushNotifications", "true") === true,
            });

            setAdminPermissions({
                allLeadsOverview: getSettingValue("allLeadsOverview", "true") === "true" || getSettingValue("allLeadsOverview", "true") === true,
                leadStatusManagement: getSettingValue("leadStatusManagement", "true") === "true" || getSettingValue("leadStatusManagement", "true") === true,
                leadAssignment: getSettingValue("leadAssignment", "true") === "true" || getSettingValue("leadAssignment", "true") === true,
                spamFiltering: getSettingValue("spamFiltering", "true") === "true" || getSettingValue("spamFiltering", "true") === true,
                createAdminRoles: getSettingValue("createAdminRoles", "true") === "true" || getSettingValue("createAdminRoles", "true") === true,
                assignPermissions: getSettingValue("assignPermissions", "true") === "true" || getSettingValue("assignPermissions", "true") === true,
                activityLogs: getSettingValue("activityLogs", "true") === "true" || getSettingValue("activityLogs", "true") === true,
                twoFactorAuthentication: getSettingValue("twoFactorAuthentication", "false") === "true" || getSettingValue("twoFactorAuthentication", "false") === true,
            });
        }
    }, [flatSettings]);

    const handleGeneralChange = (e) => {
        const { name, value } = e.target;
        setGeneralSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setGeneralSettings(prev => ({
            ...prev,
            businessLogo: e.target.files[0]
        }));
    };

    const handleToggle = (key) => {
        setToggles(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleAdminPermissionToggle = (key) => {
        setAdminPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSaveAllSettings = async () => {
        try {
            // Save general settings
            const settingsToSave = [
                { key: "siteName", value: generalSettings.siteName, type: "string", category: "general" },
                { key: "contactEmail", value: generalSettings.contactEmail, type: "string", category: "general" },
                { key: "maxListingsPerDealer", value: generalSettings.maxListingsPerDealer, type: "number", category: "general" },
                { key: "commissionRate", value: generalSettings.commissionRate, type: "number", category: "general" },
                { key: "allowUserRegistration", value: String(toggles.allowUserRegistration), type: "boolean", category: "security" },
                { key: "emailVerification", value: String(toggles.emailVerification), type: "boolean", category: "security" },
                { key: "maintenanceMode", value: String(toggles.maintenanceMode), type: "boolean", category: "security" },
                { key: "autoApproveDealers", value: String(toggles.autoApproveDealers), type: "boolean", category: "approval" },
                { key: "autoApproveListings", value: String(toggles.autoApproveListings), type: "boolean", category: "approval" },
                { key: "emailNotifications", value: String(toggles.emailNotifications), type: "boolean", category: "notifications" },
                { key: "pushNotifications", value: String(toggles.pushNotifications), type: "boolean", category: "notifications" },
                // Admin Permissions & Features
                { key: "allLeadsOverview", value: String(adminPermissions.allLeadsOverview), type: "boolean", category: "admin_permissions" },
                { key: "leadStatusManagement", value: String(adminPermissions.leadStatusManagement), type: "boolean", category: "admin_permissions" },
                { key: "leadAssignment", value: String(adminPermissions.leadAssignment), type: "boolean", category: "admin_permissions" },
                { key: "spamFiltering", value: String(adminPermissions.spamFiltering), type: "boolean", category: "admin_permissions" },
                { key: "createAdminRoles", value: String(adminPermissions.createAdminRoles), type: "boolean", category: "admin_permissions" },
                { key: "assignPermissions", value: String(adminPermissions.assignPermissions), type: "boolean", category: "admin_permissions" },
                { key: "activityLogs", value: String(adminPermissions.activityLogs), type: "boolean", category: "admin_permissions" },
                { key: "twoFactorAuthentication", value: String(adminPermissions.twoFactorAuthentication), type: "boolean", category: "admin_permissions" },
            ];

            // Save all settings
            await Promise.all(settingsToSave.map(setting => 
                upsertSetting(setting).unwrap()
            ));

            toast.success("All settings saved successfully");
            refetchSettings();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to save settings");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const filteredUsers = adminUsers.filter(user => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            user.name?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query)
        );
    });

    if (settingsLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <Spinner size={60} color="text-primary-500" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    {activeTab === "general" ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                            <p className="text-sm text-gray-500 mt-1">Configure your marketplace settings</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage users and permissions</p>
                        </>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab("general")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === "general"
                                ? "bg-primary-500 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        General Settings
                    </button>
                    <button
                        onClick={() => setActiveTab("userRole")}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeTab === "userRole"
                                ? "bg-primary-500 text-white"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        User Role
                    </button>
                    {currentUser?.role === "admin" && (
                        <button
                            onClick={() => setActiveTab("roles")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                                activeTab === "roles"
                                    ? "bg-primary-500 text-white"
                                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                            <FiShield size={18} />
                            Roles & Permissions
                        </button>
                    )}
                </div>

                {/* General Settings Tab */}
                {activeTab === "general" && (
                    <div className="space-y-6">
                        {/* General Settings Subsection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                                <button
                                    onClick={handleSaveAllSettings}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? "Saving..." : "Save All Settings"}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        name="siteName"
                                        value={generalSettings.siteName}
                                        onChange={handleGeneralChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={generalSettings.contactEmail}
                                        onChange={handleGeneralChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Max Listings Per Dealer
                                    </label>
                                    <input
                                        type="number"
                                        name="maxListingsPerDealer"
                                        value={generalSettings.maxListingsPerDealer}
                                        onChange={handleGeneralChange}
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Commission Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="commissionRate"
                                        value={generalSettings.commissionRate}
                                        onChange={handleGeneralChange}
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Business Logo
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <label className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <span className="text-sm text-gray-700">Choose File</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="text-sm text-gray-500">
                                            {generalSettings.businessLogo ? generalSettings.businessLogo.name : "No File Chosen"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security & Access Subsection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Access</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Allow User Registration</p>
                                        <p className="text-xs text-gray-500">Let new users sign up</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("allowUserRegistration")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.allowUserRegistration ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.allowUserRegistration ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Email Verification</p>
                                        <p className="text-xs text-gray-500">Require email verification</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("emailVerification")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.emailVerification ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.emailVerification ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Maintenance Mode</p>
                                        <p className="text-xs text-gray-500">Show maintenance page</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("maintenanceMode")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.maintenanceMode ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.maintenanceMode ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Approval Settings Subsection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Auto-Approve Dealers</p>
                                        <p className="text-xs text-gray-500">Automatically approve new dealers</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("autoApproveDealers")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.autoApproveDealers ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.autoApproveDealers ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Auto-Approve Listings</p>
                                        <p className="text-xs text-gray-500">Automatically approve new listings</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("autoApproveListings")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.autoApproveListings ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.autoApproveListings ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notification Settings Subsection */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                                        <p className="text-xs text-gray-500">Send email notifications</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("emailNotifications")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.emailNotifications ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.emailNotifications ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                                        <p className="text-xs text-gray-500">Send push notifications</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle("pushNotifications")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            toggles.pushNotifications ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                toggles.pushNotifications ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Role Tab */}
                {activeTab === "userRole" && (
                    <div className="space-y-6">
                        {/* Header with Invite Button */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                            </div>
                            {currentUser?.role === "admin" && (
                                <button 
                                    onClick={() => setShowInviteModal(true)}
                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 transition-colors"
                                >
                                    <FiUserPlus size={18} />
                                    Invite User
                                </button>
                            )}
                        </div>

                        {/* Search Bar */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {usersLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Spinner size={40} color="text-primary-500" />
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Joined</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Number</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                                    No admin users found
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map((user) => (
                                                <tr key={user._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name || "N/A"}</td>
                                                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                                                            {user.role || "Admin"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                                        {formatDate(user.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">
                                                        {user.phone || user.contactNumber || "N/A"}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Admin Permissions & Features */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Admin Permissions & Features</h3>
                                <button
                                    onClick={handleSaveAllSettings}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? "Saving..." : "Save Permissions"}
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">All Leads Overview</p>
                                        <p className="text-xs text-gray-500">View and manage all leads in the system</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("allLeadsOverview")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.allLeadsOverview ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.allLeadsOverview ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Lead Status Management</p>
                                        <p className="text-xs text-gray-500">Manage lead status: New → Contacted → Closed</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("leadStatusManagement")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.leadStatusManagement ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.leadStatusManagement ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Lead Assignment</p>
                                        <p className="text-xs text-gray-500">Assign leads to dealers or sellers</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("leadAssignment")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.leadAssignment ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.leadAssignment ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Spam Filtering</p>
                                        <p className="text-xs text-gray-500">Filter and manage spam leads</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("spamFiltering")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.spamFiltering ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.spamFiltering ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Create Admin Roles</p>
                                        <p className="text-xs text-gray-500">Create and manage admin roles</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("createAdminRoles")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.createAdminRoles ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.createAdminRoles ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Assign Permissions</p>
                                        <p className="text-xs text-gray-500">Assign permissions to users and roles</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("assignPermissions")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.assignPermissions ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.assignPermissions ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Activity Logs</p>
                                        <p className="text-xs text-gray-500">View and monitor system activity logs</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("activityLogs")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.activityLogs ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.activityLogs ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                                        <p className="text-xs text-gray-500">Enable two-factor authentication (optional)</p>
                                    </div>
                                    <button
                                        onClick={() => handleAdminPermissionToggle("twoFactorAuthentication")}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            adminPermissions.twoFactorAuthentication ? "bg-primary-500" : "bg-gray-300"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                adminPermissions.twoFactorAuthentication ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Roles & Permissions Tab */}
                {activeTab === "roles" && currentUser?.role === "admin" && (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Roles & Permissions</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Manage roles and permissions for admin users
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {permissionMatrixData && (
                                    <button
                                        onClick={() => {
                                            // Export as JSON
                                            const dataStr = JSON.stringify(permissionMatrixData, null, 2);
                                            const dataBlob = new Blob([dataStr], { type: 'application/json' });
                                            const url = URL.createObjectURL(dataBlob);
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.download = `permission-matrix-${new Date().toISOString().split('T')[0]}.json`;
                                            link.click();
                                            URL.revokeObjectURL(url);
                                            toast.success("Permission matrix exported");
                                        }}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors"
                                    >
                                        <FiDownload size={18} />
                                        Export JSON
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (permissionMatrixData) {
                                            // Export as CSV
                                            const matrix = permissionMatrixData.matrix || [];
                                            const headers = ["Role", "Display Name", "Access Level", "Purpose", ...Object.keys(matrix[0]?.permissions || {})];
                                            const rows = matrix.map(row => [
                                                row.role,
                                                row.displayName,
                                                row.accessLevel,
                                                row.purpose,
                                                ...Object.values(row.permissions || {})
                                            ]);
                                            const csvContent = [
                                                headers.join(","),
                                                ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
                                            ].join("\n");
                                            const blob = new Blob([csvContent], { type: 'text/csv' });
                                            const url = URL.createObjectURL(blob);
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.download = `permission-matrix-${new Date().toISOString().split('T')[0]}.csv`;
                                            link.click();
                                            URL.revokeObjectURL(url);
                                            toast.success("Permission matrix exported as CSV");
                                        }
                                    }}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors"
                                >
                                    <FiDownload size={18} />
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Roles List */}
                        <RolesList onCreateRole={(role) => {
                            setEditingRole(role);
                            setShowInviteModal(true);
                        }} />
                    </div>
                )}
            </div>

            {/* Invite User Modal */}
            {showInviteModal && (
                <InviteUserModal
                    isOpen={showInviteModal}
                    onClose={() => {
                        setShowInviteModal(false);
                        setEditingRole(null);
                    }}
                    onSuccess={() => {
                        // Refetch data if needed
                    }}
                />
            )}
        </AdminLayout>
    );
};

export default Settings;
