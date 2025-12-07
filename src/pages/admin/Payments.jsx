import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllPaymentsQuery,
    useGetAllSubscriptionsQuery,
    useAdminUpdateSubscriptionMutation,
    useAdminCancelSubscriptionMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiDollarSign, FiCreditCard, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";

const Payments = () => {
    const [activeTab, setActiveTab] = useState("payments"); // payments or subscriptions
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");

    const { data: paymentsData, isLoading: paymentsLoading, refetch: refetchPayments } = useGetAllPaymentsQuery({ 
        page, 
        limit: 50 
    });
    const { data: subscriptionsData, isLoading: subscriptionsLoading, refetch: refetchSubscriptions } = useGetAllSubscriptionsQuery({ 
        page, 
        limit: 50,
        status: statusFilter === "all" ? undefined : statusFilter
    });
    const [updateSubscription] = useAdminUpdateSubscriptionMutation();
    const [cancelSubscription] = useAdminCancelSubscriptionMutation();

    const payments = paymentsData?.payments || [];
    const subscriptions = subscriptionsData?.subscriptions || [];

    const handleUpdateSubscription = async (userId, plan, duration) => {
        try {
            await updateSubscription({ userId, plan, duration }).unwrap();
            toast.success("Subscription updated successfully");
            refetchSubscriptions();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update subscription");
        }
    };

    const handleCancelSubscription = async (userId) => {
        if (!window.confirm("Are you sure you want to cancel this subscription?")) return;
        try {
            await cancelSubscription(userId).unwrap();
            toast.success("Subscription cancelled successfully");
            refetchSubscriptions();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to cancel subscription");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            completed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800"
        };
        return badges[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage all payments and subscriptions
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("payments")}
                                className={`px-6 py-3 font-medium text-sm ${
                                    activeTab === "payments"
                                        ? "border-b-2 border-primary-500 text-primary-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <FiCreditCard className="inline mr-2" />
                                All Payments
                            </button>
                            <button
                                onClick={() => setActiveTab("subscriptions")}
                                className={`px-6 py-3 font-medium text-sm ${
                                    activeTab === "subscriptions"
                                        ? "border-b-2 border-primary-500 text-primary-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                <FiCalendar className="inline mr-2" />
                                Subscriptions
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {activeTab === "payments" && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        {paymentsLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner fullScreen={false} />
                            </div>
                        ) : payments.length === 0 ? (
                            <div className="p-12 text-center">
                                <p className="text-gray-500">No payments found</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Purpose</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Method</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Transaction ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {payments.map((payment) => (
                                            <tr key={payment._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{payment.userName}</p>
                                                        <p className="text-xs text-gray-500">{payment.userEmail}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        ${payment.amount?.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600 capitalize">{payment.purpose}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600 capitalize">{payment.paymentMethod || 'N/A'}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payment.status)}`}>
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-600">{formatDate(payment.createdAt)}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-gray-500 font-mono">{payment.transactionId || 'N/A'}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "subscriptions" && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setPage(1);
                                    }}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>

                        {/* Subscriptions List */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            {subscriptionsLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Spinner fullScreen={false} />
                                </div>
                            ) : subscriptions.length === 0 ? (
                                <div className="p-12 text-center">
                                    <p className="text-gray-500">No subscriptions found</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Plan</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Start Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">End Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Total Spent</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {subscriptions.map((sub) => (
                                                <tr key={sub.userId} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{sub.userName}</p>
                                                            <p className="text-xs text-gray-500">{sub.userEmail}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-gray-900 capitalize">{sub.plan}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {sub.isActive ? (
                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                                                                <FiCheckCircle size={12} />
                                                                Active
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 flex items-center gap-1 w-fit">
                                                                <FiXCircle size={12} />
                                                                Expired
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">{formatDate(sub.startDate)}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm text-gray-600">{formatDate(sub.endDate)}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-medium text-gray-900">${sub.totalSpent?.toFixed(2) || '0.00'}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {!sub.isActive && (
                                                                <button
                                                                    onClick={() => {
                                                                        const plan = prompt("Enter plan (basic/premium/dealer):", "basic");
                                                                        const duration = prompt("Enter duration in days:", "30");
                                                                        if (plan && duration) {
                                                                            handleUpdateSubscription(sub.userId, plan, parseInt(duration));
                                                                        }
                                                                    }}
                                                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                                                >
                                                                    Activate
                                                                </button>
                                                            )}
                                                            {sub.isActive && (
                                                                <button
                                                                    onClick={() => handleCancelSubscription(sub.userId)}
                                                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Payments;

