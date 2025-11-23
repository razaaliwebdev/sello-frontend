import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useInviteUserMutation, useGetAllRolesQuery } from "../../redux/services/adminApi";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const ROLE_PRESETS = [
    "Super Admin",
    "Marketing Team",
    "Support Agent",
    "Blogs/Content Agent",
    "Custom"
];

const PERMISSION_GROUPS = {
    "User & Role Management": [
        { key: "manageUsers", label: "Manage Users" },
        { key: "createRoles", label: "Create Roles" },
        { key: "editRoles", label: "Edit Roles" },
        { key: "deleteRoles", label: "Delete Roles" },
        { key: "inviteUsers", label: "Invite Users" },
        { key: "resetPasswords", label: "Reset Passwords" }
    ],
    "Listings Management": [
        { key: "viewListings", label: "View Listings" },
        { key: "approveListings", label: "Approve Listings" },
        { key: "editListings", label: "Edit Listings" },
        { key: "deleteListings", label: "Delete Listings" },
        { key: "featureListings", label: "Feature Listings" }
    ],
    "Dealers Management": [
        { key: "viewDealers", label: "View Dealers" },
        { key: "approveDealers", label: "Approve Dealers" },
        { key: "editDealers", label: "Edit Dealers" },
        { key: "manageDealerSubscriptions", label: "Manage Dealer Subscriptions" },
        { key: "viewDealerPerformance", label: "View Dealer Performance" }
    ],
    "Content Management": [
        { key: "manageBlogs", label: "Manage Blogs" },
        { key: "publishBlogs", label: "Publish Blogs" },
        { key: "moderateComments", label: "Moderate Comments" },
        { key: "managePromotions", label: "Manage Promotions" },
        { key: "createPushNotifications", label: "Create Push Notifications" },
        { key: "sendPushNotifications", label: "Send Push Notifications" }
    ],
    "Support & Communication": [
        { key: "accessChatbot", label: "Access Chatbot" },
        { key: "viewChatbotLogs", label: "View Chatbot Logs" },
        { key: "manageSupportTickets", label: "Manage Support Tickets" },
        { key: "respondToInquiries", label: "Respond to Inquiries" },
        { key: "escalateIssues", label: "Escalate Issues" }
    ],
    "Platform Settings": [
        { key: "managePlatformSettings", label: "Manage Platform Settings" },
        { key: "manageLogo", label: "Manage Logo" },
        { key: "manageLanguage", label: "Manage Language" },
        { key: "manageCurrency", label: "Manage Currency" },
        { key: "manageCommission", label: "Manage Commission" },
        { key: "manageIntegrations", label: "Manage Integrations" }
    ],
    "Analytics & Reports": [
        { key: "viewAnalytics", label: "View Analytics" },
        { key: "viewFinancialReports", label: "View Financial Reports" },
        { key: "exportReports", label: "Export Reports" }
    ],
    "Categories & Content": [
        { key: "manageCategories", label: "Manage Categories" },
        { key: "manageCarTypes", label: "Manage Car Types" },
        { key: "manageBanners", label: "Manage Banners" }
    ],
    "Audit & Security": [
        { key: "viewAuditLogs", label: "View Audit Logs" },
        { key: "viewUserProfiles", label: "View User Profiles" },
        { key: "viewFullUserProfiles", label: "View Full User Profiles" },
        { key: "accessSensitiveAreas", label: "Access Sensitive Areas" }
    ]
};

const SENSITIVE_PERMISSIONS = [
    "managePlatformSettings",
    "manageCommission",
    "viewFinancialReports",
    "resetPasswords",
    "createRoles",
    "deleteRoles",
    "accessSensitiveAreas"
];

const InviteUserModal = ({ isOpen, onClose, onSuccess }) => {
    const [inviteUser, { isLoading }] = useInviteUserMutation();
    const { data: rolesData } = useGetAllRolesQuery();
    
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        role: "Marketing Team",
        roleId: null,
        expirationDays: 7
    });
    
    const [permissions, setPermissions] = useState({});

    const roles = rolesData || [];

    // Load permissions when role changes
    useEffect(() => {
        if (formData.role && formData.role !== "Custom") {
            const selectedRole = roles.find(r => r.name === formData.role);
            if (selectedRole) {
                setPermissions(selectedRole.permissions || {});
                setFormData(prev => ({ ...prev, roleId: selectedRole._id }));
            } else {
                // Use preset permissions
                const presetPermissions = getPresetPermissions(formData.role);
                setPermissions(presetPermissions);
            }
        } else if (formData.role === "Custom") {
            // Start with empty permissions for custom
            setPermissions({});
        }
    }, [formData.role, roles]);

    const getPresetPermissions = (roleName) => {
        const presets = {
            "Super Admin": {
                manageUsers: true, createRoles: true, editRoles: true, deleteRoles: true,
                inviteUsers: true, resetPasswords: true, viewListings: true, approveListings: true,
                editListings: true, deleteListings: true, featureListings: true, viewDealers: true,
                approveDealers: true, editDealers: true, manageDealerSubscriptions: true,
                viewDealerPerformance: true, manageBlogs: true, publishBlogs: true,
                moderateComments: true, managePromotions: true, createPushNotifications: true,
                sendPushNotifications: true, accessChatbot: true, viewChatbotLogs: true,
                manageSupportTickets: true, respondToInquiries: true, escalateIssues: true,
                managePlatformSettings: true, manageLogo: true, manageLanguage: true,
                manageCurrency: true, manageCommission: true, manageIntegrations: true,
                viewAnalytics: true, viewFinancialReports: true, exportReports: true,
                manageCategories: true, manageCarTypes: true, viewAuditLogs: true,
                viewUserProfiles: true, viewFullUserProfiles: true, accessSensitiveAreas: true
            },
            "Marketing Team": {
                viewDealers: true, approveDealers: true, editDealers: true,
                manageDealerSubscriptions: true, viewDealerPerformance: true,
                viewUserProfiles: true, manageBlogs: true, publishBlogs: true,
                editListings: true, moderateComments: true, managePromotions: true,
                manageSupportTickets: true, respondToInquiries: true, escalateIssues: true,
                manageCategories: true
            },
            "Support Agent": {
                viewDealers: true, editDealers: true, viewListings: true,
                editListings: true, accessChatbot: true, viewChatbotLogs: true,
                manageSupportTickets: true, respondToInquiries: true, escalateIssues: true
            },
            "Blogs/Content Agent": {
                manageBlogs: true,
                publishBlogs: true,
                moderateComments: true,
                createPushNotifications: true,
                sendPushNotifications: true,
                managePromotions: true,
                manageCategories: true,
                manageBanners: true
            }
        };
        return presets[roleName] || {};
    };

    const handlePermissionToggle = (key) => {
        setPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.fullName) {
            toast.error("Email and Full Name are required");
            return;
        }

        try {
            const payload = {
                email: formData.email,
                fullName: formData.fullName,
                role: formData.role,
                roleId: formData.roleId,
                permissions: formData.role === "Custom" ? permissions : undefined,
                expirationDays: formData.expirationDays
            };

            await inviteUser(payload).unwrap();
            toast.success("Invitation sent successfully");
            handleClose();
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send invitation");
        }
    };

    const handleClose = () => {
        setFormData({
            email: "",
            fullName: "",
            role: "Marketing Team",
            roleId: null,
            expirationDays: 7
        });
        setPermissions({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Invite User</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            {ROLE_PRESETS.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Permissions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Permissions {formData.role === "Custom" && <span className="text-red-500">*</span>}
                        </label>
                        <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
                            {Object.entries(PERMISSION_GROUPS).map(([groupName, groupPermissions]) => (
                                <div key={groupName} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <h4 className="font-semibold text-gray-800 mb-2">{groupName}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {groupPermissions.map(({ key, label }) => {
                                            const isSensitive = SENSITIVE_PERMISSIONS.includes(key);
                                            const isEnabled = permissions[key] || false;
                                            return (
                                                <label
                                                    key={key}
                                                    className={`flex items-center gap-2 p-2 rounded ${
                                                        isSensitive ? "bg-yellow-50" : ""
                                                    } ${isEnabled ? "bg-primary-50" : ""}`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isEnabled}
                                                        onChange={() => handlePermissionToggle(key)}
                                                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                                    />
                                                    <span className={`text-sm ${isSensitive ? "text-yellow-800 font-medium" : "text-gray-700"}`}>
                                                        {label}
                                                        {isSensitive && <span className="ml-1 text-yellow-600">⚠</span>}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expiration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invitation Expiration (days)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={formData.expirationDays}
                            onChange={(e) => setFormData(prev => ({ ...prev, expirationDays: parseInt(e.target.value) || 7 }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Spinner size={16} color="text-white" />
                                    Sending...
                                </>
                            ) : (
                                "Send Invite"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteUserModal;
