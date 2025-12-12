import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllCustomerRequestsQuery,
    useGetCustomerRequestStatisticsQuery,
    useUpdateCustomerRequestMutation,
    useDeleteCustomerRequestMutation,
    useAddCustomerRequestResponseMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiEdit2, FiTrash2, FiMessageSquare, FiClock, FiCheckCircle, FiEye, FiUser, FiX } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import ConfirmModal from "../../components/admin/ConfirmModal";

const CustomerRequests = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showResponseModal, setShowResponseModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [requestToDelete, setRequestToDelete] = useState(null);

    const { data: stats } = useGetCustomerRequestStatisticsQuery();
    const { data: requestsData, isLoading, refetch: refetchRequests } = useGetAllCustomerRequestsQuery(
        {
            status: activeTab !== "all" ? activeTab : undefined,
            search: searchQuery || undefined,
        },
        {
            pollingInterval: 5000,
            refetchOnMountOrArgChange: true
        }
    );
    const [updateRequest] = useUpdateCustomerRequestMutation();
    const [deleteRequest] = useDeleteCustomerRequestMutation();
    const [addResponse] = useAddCustomerRequestResponseMutation();

    const requests = requestsData?.requests || [];

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            await updateRequest({
                requestId,
                status: newStatus
            }).unwrap();
            toast.success("Request status updated successfully");
            refetchRequests();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handlePriorityChange = async (requestId, newPriority) => {
        try {
            await updateRequest({
                requestId,
                priority: newPriority
            }).unwrap();
            toast.success("Request priority updated successfully");
            refetchRequests();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update priority");
        }
    };

    const handleAssign = async (requestId, assignedTo) => {
        try {
            await updateRequest({
                requestId,
                assignedTo
            }).unwrap();
            toast.success("Request assigned successfully");
            refetchRequests();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to assign request");
        }
    };

    const handleDelete = (requestId) => {
        setRequestToDelete(requestId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!requestToDelete) return;
        try {
            await deleteRequest(requestToDelete).unwrap();
            toast.success("Request deleted successfully");
            refetchRequests();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete request");
        } finally {
            setShowDeleteModal(false);
            setRequestToDelete(null);
        }
    };

    const handleAddResponse = async () => {
        if (!responseMessage.trim() || !selectedRequest) {
            toast.error("Response message is required");
            return;
        }

        try {
            await addResponse({
                requestId: selectedRequest,
                message: responseMessage.trim()
            }).unwrap();
            toast.success("Response added successfully");
            setShowResponseModal(false);
            setResponseMessage("");
            setSelectedRequest(null);
            refetchRequests();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to add response");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "open": return "bg-blue-100 text-blue-800 border-blue-200";
            case "in_progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "resolved": return "bg-green-100 text-green-800 border-green-200";
            case "closed": return "bg-gray-100 text-gray-800 border-gray-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "urgent": return "bg-red-100 text-red-800";
            case "high": return "bg-orange-100 text-orange-800";
            case "medium": return "bg-yellow-100 text-yellow-800";
            case "low": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeLabel = (type) => {
        const types = {
            support: "Support",
            inquiry: "Inquiry",
            complaint: "Complaint",
            feature_request: "Feature Request",
            bug_report: "Bug Report",
            other: "Other"
        };
        return types[type] || type;
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Requests</h1>
                        <p className="text-gray-600 mt-1">Manage support tickets and customer inquiries</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={refetchRequests}
                            className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:text-yellow-600 hover:border-yellow-300 transition-colors duration-200"
                            title="Refresh data"
                        >
                            <FiMessageSquare size={20} />
                        </button>
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center">
                            <FiMessageSquare className="mr-2" size={20} />
                            <span className="font-semibold">{stats?.totalRequests || 0} Total Requests</span>
                        </div>
                    </div>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Open Requests</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {stats?.openRequests || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                                <FiMessageSquare className="text-blue-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">Requests awaiting response</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-yellow-200 p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {stats?.inProgressRequests || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-100">
                                <FiClock className="text-yellow-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">Requests being handled</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-purple-200 p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Requests</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {stats?.totalRequests || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100">
                                <FiMessageSquare className="text-purple-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">All customer requests</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {stats?.resolvedRequests || 0}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100">
                                <FiCheckCircle className="text-green-500 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">Successfully closed</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeTab === "all" 
                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All Requests
                            </button>
                            <button
                                onClick={() => setActiveTab("open")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeTab === "open" 
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Open
                            </button>
                            <button
                                onClick={() => setActiveTab("in_progress")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeTab === "in_progress" 
                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                In Progress
                            </button>
                            <button
                                onClick={() => setActiveTab("resolved")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    activeTab === "resolved" 
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Resolved
                            </button>
                        </div>
                        <div className="relative w-full md:w-80">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by subject, user, or request ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <FiX size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Spinner fullScreen={false} />
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                <FiMessageSquare className="mx-auto text-gray-300 mb-4" size={48} />
                                <p className="text-lg font-medium text-gray-700 mb-2">No requests found</p>
                                <p className="text-gray-500">There are no customer requests matching your criteria</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Request ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Priority
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Assigned To
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {requests.map((request) => (
                                        <tr key={request._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {request._id?.toString().substring(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-sm font-semibold overflow-hidden border-2 border-white shadow-sm">
                                                        {request.user?.avatar ? (
                                                            <img
                                                                src={request.user.avatar}
                                                                alt={request.user.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            (request.user?.name || 'U').charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {request.user?.name || "Unknown User"}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {request.user?.email || "No email"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    {getTypeLabel(request.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                {request.subject}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${{
                                                    urgent: 'bg-red-100 text-red-800 border border-red-200',
                                                    high: 'bg-orange-100 text-orange-800 border border-orange-200',
                                                    medium: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
                                                    low: 'bg-green-100 text-green-800 border border-green-200'
                                                }[request.priority] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                                        request.priority === 'urgent' ? 'bg-red-500' :
                                                        request.priority === 'high' ? 'bg-orange-500' :
                                                        request.priority === 'medium' ? 'bg-yellow-500' :
                                                        request.priority === 'low' ? 'bg-green-500' :
                                                        'bg-gray-500'
                                                    }`}></span>
                                                    {request.priority?.charAt(0).toUpperCase() + request.priority?.slice(1) || 'Medium'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={request.status}
                                                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-full border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all ${{
                                                        open: 'bg-blue-50 text-blue-700 border-blue-200',
                                                        in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                                                        resolved: 'bg-green-50 text-green-700 border-green-200',
                                                        closed: 'bg-gray-50 text-gray-700 border-gray-200'
                                                    }[request.status] || 'bg-gray-50 text-gray-700 border-gray-200'}`}
                                                >
                                                    <option value="open">Open</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {request.assignedTo ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-xs font-semibold overflow-hidden border border-gray-300">
                                                            {request.assignedTo?.avatar ? (
                                                                <img
                                                                    src={request.assignedTo.avatar}
                                                                    alt={request.assignedTo.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                (request.assignedTo?.name || 'A').charAt(0).toUpperCase()
                                                            )}
                                                        </div>
                                                        <span className="font-medium">{request.assignedTo?.name || "Assigned"}</span>
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full text-xs font-medium">
                                                        <FiUser className="mr-1.5" size={14} />
                                                        Unassigned
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {request.createdAt 
                                                    ? formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })
                                                    : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRequest(request._id);
                                                            setShowDetailsModal(true);
                                                        }}
                                                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                        title="View details"
                                                    >
                                                        <FiEye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRequest(request._id);
                                                            setShowResponseModal(true);
                                                        }}
                                                        className="p-2 text-green-600 hover:text-white hover:bg-green-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                        title="Add response"
                                                    >
                                                        <FiMessageSquare size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(request._id)}
                                                        className="p-2 text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
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
                        )}
                    </div>
                </div>
            </div>

            {/* Response Modal */}
            {showResponseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-2xl font-bold text-gray-900">Add Response</h3>
                            <button
                                onClick={() => {
                                    setShowResponseModal(false);
                                    setResponseMessage("");
                                    setSelectedRequest(null);
                                }}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Response Message</label>
                                <textarea
                                    value={responseMessage}
                                    onChange={(e) => setResponseMessage(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition shadow-sm"
                                    rows={6}
                                    placeholder="Enter your detailed response to the customer..."
                                />
                            </div>
                            <div className="flex gap-3 justify-end pt-2">
                                <button
                                    onClick={() => {
                                        setShowResponseModal(false);
                                        setResponseMessage("");
                                        setSelectedRequest(null);
                                    }}
                                    className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddResponse}
                                    disabled={!responseMessage.trim()}
                                    className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <FiMessageSquare size={18} />
                                    Send Response
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900">Request Details</h3>
                            <button
                                onClick={() => {
                                    setShowDetailsModal(false);
                                    setSelectedRequest(null);
                                }}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        {(() => {
                            const request = requests.find(r => r._id === selectedRequest);
                            if (!request) return <div>Request not found</div>;
                            
                            return (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Request ID</p>
                                            <p className="text-sm text-gray-900 font-mono">{request._id}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Type</p>
                                            <p className="text-sm text-gray-900">{getTypeLabel(request.type)}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Status</p>
                                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                {request.status?.replace('_', ' ').charAt(0).toUpperCase() + request.status?.replace('_', ' ').slice(1) || 'Open'}
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Priority</p>
                                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                                                {request.priority?.charAt(0).toUpperCase() + request.priority?.slice(1) || 'Medium'}
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">User</p>
                                            <p className="text-sm text-gray-900">{request.user?.name || "Unknown"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-1">Assigned To</p>
                                            <p className="text-sm text-gray-900">{request.assignedTo?.name || "Unassigned"}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Subject</p>
                                        <p className="text-sm text-gray-900">{request.subject}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{request.description}</p>
                                    </div>
                                    {request.responses && request.responses.length > 0 && (
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700 mb-3">Responses</p>
                                            <div className="space-y-3">
                                                {request.responses.map((response, idx) => (
                                                    <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {response.responder?.name || "Admin"}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(response.createdAt).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <p className="text-sm text-gray-700">{response.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setRequestToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Customer Request"
                message="Are you sure you want to delete this customer request? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </AdminLayout>
    );
};

export default CustomerRequests;

