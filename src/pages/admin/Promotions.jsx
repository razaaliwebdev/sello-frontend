import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllPromotionsQuery,
    useCreatePromotionMutation,
    useUpdatePromotionMutation,
    useDeletePromotionMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiPlus, FiX, FiEdit, FiTrash2 } from "react-icons/fi";

const Promotions = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const { data, isLoading } = useGetAllPromotionsQuery({ page: 1, limit: 20 });
    const [createPromotion, { isLoading: isCreating }] = useCreatePromotionMutation();
    const [updatePromotion, { isLoading: isUpdating }] = useUpdatePromotionMutation();
    const [deletePromotion] = useDeletePromotionMutation();

    const promotions = data?.promotions || [];

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        promoCode: "",
        discountType: "percentage",
        discountValue: "",
        usageLimit: "",
        startDate: "",
        endDate: "",
        targetAudience: "all",
        status: "active",
        minPurchaseAmount: "",
        maxDiscountAmount: "",
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
            const promotionData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                promoCode: formData.promoCode.trim(),
                discountType: formData.discountType,
                discountValue: parseFloat(formData.discountValue),
                usageLimit: parseInt(formData.usageLimit),
                startDate: formData.startDate,
                endDate: formData.endDate,
                targetAudience: formData.targetAudience,
                status: formData.status,
                minPurchaseAmount: formData.minPurchaseAmount ? parseFloat(formData.minPurchaseAmount) : 0,
                maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
            };

            if (editingPromotion) {
                await updatePromotion({ promotionId: editingPromotion._id, ...promotionData }).unwrap();
                toast.success("Promotion updated successfully");
            } else {
                await createPromotion(promotionData).unwrap();
                toast.success("Promotion created successfully");
            }
            
            setShowModal(false);
            setEditingPromotion(null);
            resetForm();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to save promotion");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            promoCode: "",
            discountType: "percentage",
            discountValue: "",
            usageLimit: "",
            startDate: "",
            endDate: "",
            targetAudience: "all",
            status: "active",
            minPurchaseAmount: "",
            maxDiscountAmount: "",
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingPromotion(null);
        resetForm();
    };

    const handleEdit = (promotion) => {
        setEditingPromotion(promotion);
        setFormData({
            title: promotion.title || "",
            description: promotion.description || "",
            promoCode: promotion.promoCode || "",
            discountType: promotion.discountType || "percentage",
            discountValue: promotion.discountValue?.toString() || "",
            usageLimit: promotion.usageLimit?.toString() || "",
            startDate: promotion.startDate ? new Date(promotion.startDate).toISOString().split('T')[0] : "",
            endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().split('T')[0] : "",
            targetAudience: promotion.targetAudience || "all",
            status: promotion.status || "active",
            minPurchaseAmount: promotion.minPurchaseAmount?.toString() || "",
            maxDiscountAmount: promotion.maxDiscountAmount?.toString() || "",
        });
        setShowModal(true);
    };

    const handleDelete = async (promotionId) => {
        if (!window.confirm("Are you sure you want to delete this promotion?")) return;
        
        try {
            await deletePromotion(promotionId).unwrap();
            toast.success("Promotion deleted successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete promotion");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (promotion) => {
        const now = new Date();
        const endDate = new Date(promotion.endDate);
        const isExpired = endDate < now || promotion.usedCount >= promotion.usageLimit;
        
        if (isExpired || promotion.status === 'expired') {
            return "bg-red-100 text-red-800";
        } else if (promotion.status === 'active') {
            return "bg-green-100 text-green-800";
        } else {
            return "bg-gray-100 text-gray-800";
        }
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
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{promo.title}</div>
                                            {promo.description && (
                                                <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                    {promo.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono font-semibold text-primary-600">
                                                {promo.promoCode}
                                            </span>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Used: {promo.usedCount || 0} / {promo.usageLimit}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {promo.discountType === "percentage" 
                                                ? `${promo.discountValue}%` 
                                                : `$${promo.discountValue.toFixed(2)}`}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {formatDate(promo.startDate)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {formatDate(promo.endDate)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(promo)}`}>
                                                {promo.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(promo)}
                                                    className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
                                                >
                                                    <FiEdit size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo._id)}
                                                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                                                >
                                                    <FiTrash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
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
                            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                <h3 className="text-xl font-bold">
                                    {editingPromotion ? "Edit Promotion" : "Create New Promotion"}
                                </h3>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-white hover:text-gray-200 transition-colors"
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
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="promoCode"
                                            value={formData.promoCode}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g., SUMMER2024"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 uppercase"
                                            style={{ textTransform: 'uppercase' }}
                                        />
                                        {!editingPromotion && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase() + 
                                                                      Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                                                    setFormData(prev => ({ ...prev, promoCode: randomCode }));
                                                }}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Generate
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Promo code will be automatically converted to uppercase
                                    </p>
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

                                {/* Usage Limit and Min Purchase */}
                                <div className="grid grid-cols-2 gap-4">
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Min Purchase Amount
                                        </label>
                                        <input
                                            type="number"
                                            name="minPurchaseAmount"
                                            value={formData.minPurchaseAmount}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            placeholder="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                {/* Max Discount Amount (for percentage) */}
                                {formData.discountType === "percentage" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Max Discount Amount (Optional)
                                        </label>
                                        <input
                                            type="number"
                                            name="maxDiscountAmount"
                                            value={formData.maxDiscountAmount}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            placeholder="No limit"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Maximum discount amount when using percentage discount
                                        </p>
                                    </div>
                                )}

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
                                        disabled={isCreating || isUpdating}
                                        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                    >
                                        {(isCreating || isUpdating) && <Spinner size={16} color="text-white" />}
                                        {editingPromotion ? "Update Promotion" : "Create Promotion"}
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
