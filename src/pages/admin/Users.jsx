import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdBlock, MdCheckCircle } from "react-icons/md";

const Users = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Build query params
    const queryParams = { 
        page, 
        limit: 20, 
        search,
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter })
    };
    
    const { data, isLoading, refetch } = useGetAllUsersQuery(queryParams);
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const users = data?.users || [];
    const pagination = data?.pagination || {};

    const handleToggleStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
        try {
            await updateUser({ userId, status: newStatus }).unwrap();
            toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update user status");
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await deleteUser(userId).unwrap();
            toast.success("User deleted successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete user");
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

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage regular users (buyers, sellers, dealers). Admin users are managed in Settings.
                    </p>
                </div>

                {/* Filter Tabs and Search */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Tabs */}
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    onClick={() => setRoleFilter("")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        roleFilter === "" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    All Users
                                </button>
                                <button
                                    onClick={() => setRoleFilter("buyer")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        roleFilter === "buyer" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Buyer
                                </button>
                                <button
                                    onClick={() => setRoleFilter("seller")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        roleFilter === "seller" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Seller
                                </button>
                                <button
                                    onClick={() => setRoleFilter("dealer")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        roleFilter === "dealer" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Dealers
                                </button>
                                <button
                                    onClick={() => setStatusFilter("suspended")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "suspended" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Suspend
                                </button>
                                <button
                                    onClick={() => setStatusFilter("active")}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        statusFilter === "active" 
                                            ? "bg-primary-500 text-white" 
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Activate
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-80">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-lg border border-gray-200">
                        <Spinner size={60} color="text-primary-500" />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Joined Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                                                    user.role === 'dealer' ? 'bg-primary-500 text-white' :
                                                    user.role === 'admin' ? 'bg-purple-500 text-white' :
                                                    user.role === 'seller' ? 'bg-green-500 text-white' :
                                                    'bg-blue-500 text-white'
                                                }`}>
                                                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Buyer'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(user.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    title="Delete user"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleToggleStatus(user._id, user.status)}
                                                    className={`transition-colors ${
                                                        user.status === 'suspended' 
                                                            ? 'text-red-600 hover:text-red-800' 
                                                            : 'text-green-600 hover:text-green-800'
                                                    }`}
                                                    title={user.status === 'suspended' ? 'Activate user' : 'Suspend user'}
                                                >
                                                    {user.status === 'suspended' ? (
                                                        <MdBlock size={20} />
                                                    ) : (
                                                        <MdCheckCircle size={20} />
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-gray-600 hover:text-primary-600 transition-colors"
                                                    title="Edit user"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="mt-6 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-600 font-medium">
                            Page {page} of {pagination.pages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= pagination.pages}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Edit User Modal */}
                {showEditModal && selectedUser && (
                    <EditUserModal
                        user={selectedUser}
                        onClose={() => {
                            setShowEditModal(false);
                            setSelectedUser(null);
                        }}
                        onUpdate={async (formData) => {
                            try {
                                await updateUser({ userId: selectedUser._id, ...formData }).unwrap();
                                toast.success("User updated successfully");
                                setShowEditModal(false);
                                setSelectedUser(null);
                                refetch();
                            } catch (error) {
                                toast.error(error?.data?.message || "Failed to update user");
                            }
                        }}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name || "",
        role: user.role || "buyer",
        status: user.status || "active",
        boostCredits: user.boostCredits || 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(formData);
    };

    // Get role badge color
    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-yellow-500 text-white'; // Primary color
            case 'dealer':
                return 'bg-purple-500 text-white';
            case 'seller':
                return 'bg-green-500 text-white';
            case 'buyer':
                return 'bg-blue-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    // Get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-500 text-white';
            case 'suspended':
                return 'bg-red-500 text-white';
            case 'inactive':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">Edit User</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FiTrash2 size={20} />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <div className="space-y-3">
                            {/* Current Role Badge */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Current:</span>
                                <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getRoleBadgeColor(formData.role)}`}>
                                    {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                                </span>
                            </div>
                            {/* Role Selection */}
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            >
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                                <option value="dealer">Dealer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div className="space-y-3">
                            {/* Current Status Badge */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Current:</span>
                                <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusBadgeColor(formData.status)}`}>
                                    {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                                </span>
                            </div>
                            {/* Status Selection */}
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Boost Credits</label>
                        <input
                            type="number"
                            value={formData.boostCredits}
                            onChange={(e) => setFormData({ ...formData, boostCredits: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                            min="0"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-medium transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Users;
