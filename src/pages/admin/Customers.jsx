import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetAllUsersQuery } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";

const Customers = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllUsersQuery({ page, limit: 20, role: "buyer" });

    const customers = data?.users || [];
    const pagination = data?.pagination || {};

    return (
        <AdminLayout>
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Customers</h2>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size={60} color="text-orange-500" />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Purchased Cars
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customers.map((customer) => (
                                    <tr key={customer._id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold overflow-hidden">
                                                        {customer.avatar ? (
                                                            <img
                                                                src={customer.avatar}
                                                                alt={customer.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            customer.name?.charAt(0)?.toUpperCase() || 'U'
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {customer.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{customer.email}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    customer.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.carsPurchased?.length || 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="mt-6 flex justify-center space-x-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {page} of {pagination.pages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= pagination.pages}
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Customers;

