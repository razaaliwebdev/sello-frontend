import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetListingHistoryQuery } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import { FiSearch } from "react-icons/fi";

const ListingHistory = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [autoDeletedFilter, setAutoDeletedFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetListingHistoryQuery({
    page,
    limit: 20,
    status: statusFilter,
    isAutoDeleted: autoDeletedFilter === "all" ? undefined : autoDeletedFilter,
    search: search || undefined,
  });

  const history = data?.history || [];
  const pagination = data?.pagination || {};

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Listing History
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View auto-deleted and manually deleted/sold listings (no images)
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {["all", "sold", "expired", "deleted"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <select
                value={autoDeletedFilter}
                onChange={(e) => {
                  setAutoDeletedFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm"
              >
                <option value="all">All Deletion Types</option>
                <option value="true">Auto-deleted</option>
                <option value="false">Manually deleted</option>
              </select>

              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by title, make or model..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
            <Spinner size={60} color="text-primary-500" />
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg">No history records found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Listing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Year / Mileage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Final Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Sold / Deleted At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Deleted By
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.make} {item.model}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {item.oldListingId}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>Year: {item.year}</div>
                        <div>Mileage: {item.mileage ?? 0} km</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.finalStatus === "sold"
                              ? "bg-green-100 text-green-800"
                              : item.finalStatus === "expired"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.finalStatus.toUpperCase()}
                        </span>
                        <div className="mt-1 text-xs text-gray-500">
                          {item.isAutoDeleted ? "Auto-deleted" : "Manually deleted"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>Sold: {formatDate(item.finalSellingDate)}</div>
                        <div>Deleted: {formatDate(item.deletedAt)}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{item.sellerUser?.name || "N/A"}</div>
                        <div className="text-xs text-gray-500">
                          {item.sellerUser?.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.deletedBy ? (
                          <>
                            <div>{item.deletedBy.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.deletedBy.email}
                            </div>
                          </>
                        ) : (
                          <span className="text-xs text-gray-400">
                            System (cron)
                          </span>
                        )}
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
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, pagination.pages))}
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

export default ListingHistory;


