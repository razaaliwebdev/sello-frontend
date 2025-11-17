import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllDealersQuery,
    useVerifyDealerMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiGrid, FiCheckCircle, FiXCircle, FiEye, FiEdit2 } from "react-icons/fi";

const Dealers = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const { data, isLoading, refetch } = useGetAllDealersQuery({ 
        page, 
        limit: 20,
        search 
    });
    const [verifyDealer] = useVerifyDealerMutation();

    const dealers = data?.dealers || [];
    const pagination = data?.pagination || {};

    // Reset to page 1 when search changes
    useEffect(() => {
        setPage(1);
    }, [search]);

    const handleVerify = async (userId, verified) => {
        try {
            await verifyDealer({ userId, verified }).unwrap();
            toast.success(`Dealer ${verified ? "verified" : "unverified"} successfully`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update dealer");
        }
    };

    const getPlanBadge = (plan) => {
        const planColors = {
            free: "bg-gray-100 text-gray-800",
            basic: "bg-blue-100 text-blue-800",
            premium: "bg-purple-100 text-purple-800",
            dealer: "bg-primary-100 text-primary-800"
        };
        return planColors[plan] || planColors.free;
    };

    const getStatusBadge = (dealer) => {
        if (dealer.dealerInfo?.verified) {
            return (
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center gap-1">
                    <FiCheckCircle size={12} />
                    Verified
                </span>
            );
        }
        return (
            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 flex items-center gap-1">
                <FiXCircle size={12} />
                Not Verified
            </span>
        );
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Dealer Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage verified dealers and subscriptions
                    </p>
                </div>

                {/* All Dealers Label and Search */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900">All Dealers</h3>
                            <div className="flex-1 max-w-md ml-4">
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Spinner size={60} color="text-yellow-500" />
                    </div>
                ) : dealers.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No dealers found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Business Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Plan</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Listings Limit</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Sales</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {dealers.map((dealer) => (
                                        <tr key={dealer._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden">
                                                        {dealer.avatar ? (
                                                            <img
                                                                src={dealer.avatar}
                                                                alt={dealer.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            (dealer.name?.charAt(0) || 'D').toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {dealer.dealerInfo?.businessName || dealer.name || "N/A"}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {dealer.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm text-gray-900">{dealer.email || "N/A"}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {dealer.dealerInfo?.businessPhone || dealer.contactNumber || "N/A"}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {dealer.dealerInfo?.businessAddress || dealer.city || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanBadge(dealer.subscription?.plan || 'free')}`}>
                                                    {(dealer.subscription?.plan || 'free').charAt(0).toUpperCase() + (dealer.subscription?.plan || 'free').slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(dealer)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {dealer.listingsCount || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {dealer.salesCount || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleVerify(dealer._id, !dealer.dealerInfo?.verified)}
                                                        className={`${
                                                            dealer.dealerInfo?.verified
                                                                ? 'text-yellow-600 hover:text-yellow-700'
                                                                : 'text-green-600 hover:text-green-700'
                                                        } transition-colors`}
                                                        title={dealer.dealerInfo?.verified ? "Unverify" : "Verify"}
                                                    >
                                                        {dealer.dealerInfo?.verified ? (
                                                            <FiXCircle size={18} />
                                                        ) : (
                                                            <FiCheckCircle size={18} />
                                                        )}
                                                    </button>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-700 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <FiEye size={18} />
                                                    </button>
                                                    <button
                                                        className="text-gray-600 hover:text-gray-700 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="mt-6 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-700">
                            Page {page} of {pagination.pages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= pagination.pages}
                            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Dealers;
