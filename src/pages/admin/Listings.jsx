import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllListingsQuery,
    useApproveCarMutation,
    useFeatureCarMutation,
    useDeleteCarMutation,
    usePromoteCarMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiEdit2, FiTrash2, FiEye, FiGrid, FiZap } from "react-icons/fi";
import ConfirmModal from "../../components/admin/ConfirmModal";
import PromptModal from "../../components/admin/PromptModal";

const Listings = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [brandFilter, setBrandFilter] = useState("all");
    const [brands, setBrands] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [showChargeModal, setShowChargeModal] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);
    const [carToPromote, setCarToPromote] = useState(null);
    const [promoteDuration, setPromoteDuration] = useState("7");

    const { data, isLoading, refetch } = useGetAllListingsQuery({ 
        page, 
        limit: 20, 
        search,
        status: statusFilter,
        brand: brandFilter
    });

    const [approveCar] = useApproveCarMutation();
    const [featureCar] = useFeatureCarMutation();
    const [deleteCar] = useDeleteCarMutation();
    const [promoteCar, { isLoading: isPromoting }] = usePromoteCarMutation();

    const cars = data?.cars || [];
    const pagination = data?.pagination || {};

    // Extract brands from response
    useEffect(() => {
        if (data?.brands) {
            setBrands(data.brands);
        }
    }, [data]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [statusFilter, brandFilter, search]);

    const handleApprove = async (carId, isApproved) => {
        try {
            await approveCar({ carId, isApproved }).unwrap();
            toast.success(`Car ${isApproved ? "approved" : "rejected"} successfully`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update car");
        }
    };

    const handleFeature = async (carId, featured) => {
        try {
            await featureCar({ carId, featured }).unwrap();
            toast.success(`Car ${featured ? "featured" : "unfeatured"} successfully`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update car");
        }
    };

    const handleDelete = (carId) => {
        setCarToDelete(carId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!carToDelete) return;
        try {
            await deleteCar(carToDelete).unwrap();
            toast.success("Car deleted successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete car");
        } finally {
            setShowDeleteModal(false);
            setCarToDelete(null);
        }
    };

    const handlePromote = (carId) => {
        setCarToPromote(carId);
        setPromoteDuration("7");
        setShowPromoteModal(true);
    };

    const handlePromoteDurationConfirm = (duration) => {
        setPromoteDuration(duration);
        setShowPromoteModal(false);
        setShowChargeModal(true);
    };

    const handlePromoteConfirm = async (chargeUser) => {
        if (!carToPromote) return;
        const days = parseInt(promoteDuration) || 7;
        
        try {
            await promoteCar({
                carId: carToPromote,
                duration: days,
                chargeUser: chargeUser,
                priority: 100
            }).unwrap();
            toast.success(`Car promoted for ${days} days${chargeUser ? ' (user will be charged)' : ' (free promotion)'}`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to promote car");
        } finally {
            setShowChargeModal(false);
            setCarToPromote(null);
            setPromoteDuration("7");
        }
    };

    const getStatusBadge = (car) => {
        if (car.isSold) {
            return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Sold</span>;
        }
        if (car.isApproved === false && car.rejectionReason) {
            return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Rejected</span>;
        }
        if (car.isApproved === true) {
            return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Approved</span>;
        }
        return <span className="px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">Pending</span>;
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Car Listings Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Review and manage all car listings
                    </p>
                </div>

                {/* Filter Tabs and Search */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Status Tabs */}
                        <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => setStatusFilter("all")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "all" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setStatusFilter("pending")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "pending" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Pending
                                </button>
                                <button
                                    onClick={() => setStatusFilter("approved")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "approved" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Approved
                                </button>
                                <button
                                    onClick={() => setStatusFilter("rejected")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "rejected" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Rejected
                                </button>
                                <button
                                    onClick={() => setStatusFilter("sold")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "sold" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Sold
                                </button>
                            </div>

                            {/* Search and Brand Filter */}
                            <div className="flex gap-2 w-full lg:w-auto">
                                <div className="relative flex-1 lg:w-64">
                                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search by title Or Brand..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                                    />
                                </div>
                                <select
                                    value={brandFilter}
                                    onChange={(e) => setBrandFilter(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                                >
                                    <option value="all">All Brands</option>
                                    {brands.map((brand) => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Spinner fullScreen={false} />
                    </div>
                ) : cars.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No listings found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">User ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Upload</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cars.map((car) => (
                                        <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                    {car.images && car.images.length > 0 ? (
                                                        <img
                                                            src={car.images[0]}
                                                            alt={car.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-900">{car.make}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900">
                                                    ${car.price?.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {car.city || car.location || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(car)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {car.postedBy?.name || "N/A"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {formatDate(car.createdAt)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {!car.isSold && car.isApproved !== true && (
                                                        <button
                                                            onClick={() => handleApprove(car._id, true)}
                                                            className="text-green-600 hover:text-green-700 transition-colors"
                                                            title="Approve"
                                                        >
                                                            <FiEdit2 size={18} />
                                                        </button>
                                                    )}
                                                    {!car.isSold && car.isApproved === true && (
                                                        <button
                                                            onClick={() => handleApprove(car._id, false)}
                                                            className="text-primary-600 hover:text-primary-700 transition-colors"
                                                            title="Unapprove"
                                                        >
                                                            <FiEdit2 size={18} />
                                                        </button>
                                                    )}
                                                    {!car.isSold && (
                                                        <button
                                                            onClick={() => handleFeature(car._id, !car.featured)}
                                                            className={`${car.featured ? 'text-purple-600 hover:text-purple-700' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                                                            title={car.featured ? "Unfeature" : "Feature"}
                                                        >
                                                            <FiEye size={18} />
                                                        </button>
                                                    )}
                                                    {!car.isSold && car.isApproved === true && (
                                                        <button
                                                            onClick={() => handlePromote(car._id)}
                                                            disabled={isPromoting}
                                                            className={`${car.isBoosted ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'} transition-colors disabled:opacity-50`}
                                                            title={car.isBoosted ? "Already Promoted" : "Promote Post"}
                                                        >
                                                            <FiZap size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(car._id)}
                                                        className="text-red-600 hover:text-red-700 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 size={18} />
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

                {/* Delete Confirmation Modal */}
                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setCarToDelete(null);
                    }}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Car Listing"
                    message="Are you sure you want to delete this car listing? This action cannot be undone."
                    confirmText="Delete"
                    variant="danger"
                />

                {/* Promote Duration Modal */}
                <PromptModal
                    isOpen={showPromoteModal}
                    onClose={() => {
                        setShowPromoteModal(false);
                        setCarToPromote(null);
                    }}
                    onConfirm={handlePromoteDurationConfirm}
                    title="Promote Car Listing"
                    message="Enter promotion duration in days:"
                    placeholder="7"
                    defaultValue="7"
                    type="number"
                    confirmText="Continue"
                />

                {/* Charge User Confirmation Modal */}
                <ConfirmModal
                    isOpen={showChargeModal}
                    onClose={() => {
                        setShowChargeModal(false);
                        setCarToPromote(null);
                    }}
                    onConfirm={() => handlePromoteConfirm(true)}
                    onCancel={() => handlePromoteConfirm(false)}
                    title="Charge User?"
                    message={`Charge the user for this ${promoteDuration}-day promotion?`}
                    confirmText="Yes, Charge User"
                    cancelText="No, Free Promotion"
                    variant="warning"
                />
            </div>
        </AdminLayout>
    );
};

export default Listings;
