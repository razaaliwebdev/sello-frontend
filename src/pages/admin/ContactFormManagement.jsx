import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetAllContactFormsQuery, useConvertToChatMutation, useUpdateContactFormStatusMutation, useDeleteContactFormMutation } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiSearch, FiTrash2, FiMessageSquare, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const ContactFormManagement = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedForm, setSelectedForm] = useState(null);

    const { data: formsData, isLoading, refetch } = useGetAllContactFormsQuery({
        status: filterStatus !== "all" ? filterStatus : undefined,
        search: searchQuery || undefined,
    });

    const [convertToChat] = useConvertToChatMutation();
    const [updateStatus] = useUpdateContactFormStatusMutation();
    const [deleteForm] = useDeleteContactFormMutation();

    const contactForms = formsData?.contactForms || [];

    const handleConvertToChat = async (formId) => {
        try {
            const result = await convertToChat(formId).unwrap();
            toast.success("Contact form converted to chat successfully!");
            refetch();
            if (result?.data?.chat?._id) {
                // Redirect to support chat with the new chat ID
                window.location.href = `/admin/support-chat?chatId=${result.data.chat._id}`;
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to convert to chat");
        }
    };

    const handleStatusChange = async (formId, status) => {
        try {
            await updateStatus({ id: formId, status }).unwrap();
            toast.success("Status updated successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    const handleDelete = async (formId) => {
        if (!window.confirm("Are you sure you want to delete this contact form?")) return;

        try {
            await deleteForm(formId).unwrap();
            toast.success("Contact form deleted successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete contact form");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "new":
                return <FiClock className="text-blue-500" />;
            case "in_progress":
                return <FiMessageSquare className="text-yellow-500" />;
            case "resolved":
                return <FiCheckCircle className="text-green-500" />;
            default:
                return <FiXCircle className="text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new":
                return "bg-blue-100 text-blue-800";
            case "in_progress":
                return "bg-yellow-100 text-yellow-800";
            case "resolved":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Form Management</h1>
                    <p className="text-gray-600">Manage and respond to contact form submissions</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or subject..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                        >
                            <option value="all">All Status</option>
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Spinner size={50} color="text-primary-500" />
                        </div>
                    ) : contactForms.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No contact forms found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Message
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {contactForms.map((form) => (
                                        <tr
                                            key={form._id}
                                            className={`hover:bg-gray-50 cursor-pointer ${
                                                selectedForm === form._id ? "bg-blue-50" : ""
                                            }`}
                                            onClick={() => setSelectedForm(selectedForm === form._id ? null : form._id)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {form.firstName} {form.lastName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{form.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {form.subject}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {form.message}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {formatDistanceToNow(new Date(form.createdAt), { addSuffix: true })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                        form.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(form.status)}
                                                    {form.status.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    {!form.chatId && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleConvertToChat(form._id);
                                                            }}
                                                            className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
                                                            title="Convert to Chat"
                                                        >
                                                            <FiMessageSquare size={16} />
                                                            <span className="hidden md:inline">Chat</span>
                                                        </button>
                                                    )}
                                                    {form.chatId && (
                                                        <a
                                                            href={`/admin/support-chat?chatId=${form.chatId}`}
                                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                            title="View Chat"
                                                        >
                                                            <FiMessageSquare size={16} />
                                                            <span className="hidden md:inline">View Chat</span>
                                                        </a>
                                                    )}
                                                    <select
                                                        value={form.status}
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            handleStatusChange(form._id, e.target.value);
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="in_progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(form._id);
                                                        }}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Selected Form Details */}
                {selectedForm && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                        {(() => {
                            const form = contactForms.find(f => f._id === selectedForm);
                            if (!form) return null;
                            return (
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Contact Form Details</h3>
                                        <button
                                            onClick={() => setSelectedForm(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Name</label>
                                            <p className="text-gray-900">{form.firstName} {form.lastName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <p className="text-gray-900">{form.email}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-sm font-medium text-gray-500">Subject</label>
                                            <p className="text-gray-900">{form.subject}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-sm font-medium text-gray-500">Message</label>
                                            <p className="text-gray-900 whitespace-pre-wrap">{form.message}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Status</label>
                                            <p className="text-gray-900">
                                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(form.status)}`}>
                                                    {form.status.replace("_", " ")}
                                                </span>
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Submitted</label>
                                            <p className="text-gray-900">
                                                {new Date(form.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        {form.chatId && (
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-500">Chat</label>
                                                <a
                                                    href={`/admin/support-chat?chatId=${form.chatId}`}
                                                    className="text-primary-500 hover:underline"
                                                >
                                                    View Chat Conversation
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    {!form.chatId && (
                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleConvertToChat(form._id)}
                                                className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition"
                                            >
                                                Convert to Chat
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ContactFormManagement;

