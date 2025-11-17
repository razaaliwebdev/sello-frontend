import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllNotificationsQuery,
    useCreateNotificationMutation,
    useDeleteNotificationMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";

const Notifications = () => {
    const [showModal, setShowModal] = useState(false);
    const { data, isLoading, refetch } = useGetAllNotificationsQuery({ page: 1, limit: 20 });
    const [createNotification, { isLoading: isCreating }] = useCreateNotificationMutation();
    const [deleteNotification] = useDeleteNotificationMutation();

    const notifications = data?.notifications || [];

    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "system",
        targetAudience: "all",
        actionUrl: "",
        scheduleFor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const notificationData = {
                title: formData.title.trim(),
                message: formData.message.trim(),
                type: formData.type === "system" ? "info" : formData.type, // Map "system" to "info" for backend
                recipient: formData.targetAudience === "all" ? null : formData.targetAudience, // null = broadcast to all
                actionUrl: formData.actionUrl.trim() || null,
                expiresAt: formData.scheduleFor ? new Date(formData.scheduleFor) : null,
            };

            await createNotification(notificationData).unwrap();
            toast.success("Notification created successfully");
            setShowModal(false);
            setFormData({
                title: "",
                message: "",
                type: "system",
                targetAudience: "all",
                actionUrl: "",
                scheduleFor: "",
            });
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create notification");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            title: "",
            message: "",
            type: "system",
            targetAudience: "all",
            actionUrl: "",
            scheduleFor: "",
        });
    };

    const handleDelete = async (notificationId) => {
        if (!window.confirm("Are you sure you want to delete this notification?")) return;
        try {
            await deleteNotification(notificationId).unwrap();
            toast.success("Notification deleted successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete notification");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                        <p className="text-sm text-gray-500 mt-1">Send notifications to users</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 transition-colors"
                    >
                        <FiPlus size={18} />
                        New Notifications
                    </button>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size={60} color="text-primary-500" />
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No notifications found. Create your first one!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Message</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Target</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Created</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {notifications.map((notification) => (
                                    <tr key={notification._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{notification.title}</td>
                                        <td className="px-6 py-4 text-gray-500 max-w-md truncate">{notification.message}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                {notification.type || "info"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {notification.recipient ? notification.recipient?.name || "Specific User" : "All Users"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleDelete(notification._id)}
                                                className="text-red-500 hover:text-red-600 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Create Notification Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">Create New Notification</h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Notification Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notification Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., New Feature Available"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your notification message..."
                                        rows="4"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Notification Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Notification Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="system">System</option>
                                        <option value="info">Info</option>
                                        <option value="success">Success</option>
                                        <option value="warning">Warning</option>
                                        <option value="error">Error</option>
                                    </select>
                                </div>

                                {/* Target Audience */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Audience <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="targetAudience"
                                        value={formData.targetAudience}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="buyers">Buyers</option>
                                        <option value="sellers">Sellers</option>
                                        <option value="dealers">Dealers</option>
                                    </select>
                                </div>

                                {/* Action Link (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Action Link (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        name="actionUrl"
                                        value={formData.actionUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Schedule For (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Schedule For (Optional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="scheduleFor"
                                        value={formData.scheduleFor}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Modal Footer */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
                                    >
                                        {isCreating ? "Creating..." : "Create Notification"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Notifications;
