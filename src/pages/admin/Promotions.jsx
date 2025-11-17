import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllPromotionsQuery,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";

const Promotions = () => {
    const [showModal, setShowModal] = useState(false);
    const { data, isLoading, refetch } = useGetAllPromotionsQuery({ page: 1, limit: 20 });

    const promotions = data?.promotions || data || [];

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        promoCode: "SUMMER2024",
        discountType: "percentage",
        discountValue: "5",
        usageLimit: "5000",
        startDate: "",
        endDate: "",
        targetAudience: "all",
        status: "active",
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
        
        // TODO: Implement create promotion API endpoint
        toast.success("Promotion created successfully");
        setShowModal(false);
        setFormData({
            title: "",
            description: "",
            promoCode: "SUMMER2024",
            discountType: "percentage",
            discountValue: "5",
            usageLimit: "5000",
            startDate: "",
            endDate: "",
            targetAudience: "all",
            status: "active",
        });
        refetch();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            title: "",
            description: "",
            promoCode: "SUMMER2024",
            discountType: "percentage",
            discountValue: "5",
            usageLimit: "5000",
            startDate: "",
            endDate: "",
            targetAudience: "all",
            status: "active",
        });
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Promotions</h2>
                        <p className="text-sm text-gray-500 mt-1">Create and manage promotional campaigns</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 transition-colors"
                    >
                        <FiPlus size={18} />
                        New Promotion
                    </button>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size={60} color="text-primary-500" />
                    </div>
                ) : promotions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No promotions found. Create your first one!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Promo Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Discount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Start Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">End Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {promotions.map((promo) => (
                                    <tr key={promo._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{promo.title}</td>
                                        <td className="px-6 py-4 text-gray-500">{promo.promoCode}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {promo.discountType === "percentage" ? `${promo.discountValue}%` : `$${promo.discountValue}`}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {promo.startDate ? new Date(promo.startDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {promo.endDate ? new Date(promo.endDate).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                promo.status === "active" 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {promo.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary-500 hover:text-primary-600">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Create Promotion Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">Create New Promotion</h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Promotion Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Promotion Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Summer Sale 2024"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe your promotion..."
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Promo Code */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Promo Code <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="promoCode"
                                        value={formData.promoCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Discount Type and Value */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discount Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="discountType"
                                            value={formData.discountType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="percentage">Percentage</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discount Value <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="discountValue"
                                            value={formData.discountValue}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Usage Limit */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Usage Limit <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="usageLimit"
                                        value={formData.usageLimit}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>

                                {/* Start Date and End Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Target Audience and Status */}
                                <div className="grid grid-cols-2 gap-4">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Status <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
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
                                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                                    >
                                        Create Post
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

export default Promotions;
