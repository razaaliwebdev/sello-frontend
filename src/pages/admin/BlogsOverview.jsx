import { useState } from "react";
import {
    useGetAllBlogsQuery,
    useGetAllCategoriesQuery,
    useDeleteBlogMutation
} from "../../redux/services/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiEye, FiPlus, FiFilter, FiFileText, FiBook, FiCheckCircle, FiMessageSquare, FiClock, FiAlertCircle, FiGrid } from "react-icons/fi";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const BlogsOverview = () => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const { data: blogsData, isLoading: blogsLoading } = useGetAllBlogsQuery({ page, limit: 10 });
    const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery({ type: "blog" });
    const [deleteBlog] = useDeleteBlogMutation();

    const blogs = blogsData?.blogs || [];
    const pagination = blogsData?.pagination || {};
    const categories = categoriesData || [];

    // Calculate metrics
    const totalBlogs = blogsData?.pagination?.total || 0;
    const draftBlogs = blogs.filter(blog => blog.status === "draft").length;
    const publishedBlogs = blogs.filter(blog => blog.status === "published").length;
    const totalCategories = categories.length;
    const comments = 0; // This would come from a comments API in a real implementation
    const pendingReviews = 0; // This would come from a reviews API in a real implementation

    const handleDeleteClick = (blogId) => {
        setBlogToDelete(blogId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!blogToDelete) return;
        
        try {
            await deleteBlog(blogToDelete).unwrap();
            toast.success("Blog deleted successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete blog");
        } finally {
            setShowDeleteModal(false);
            setBlogToDelete(null);
        }
    };

    // Filter blogs based on status
    const filteredBlogs = blogs.filter(blog => {
        if (filter === "all") return true;
        if (filter === "published") return blog.status === "published";
        if (filter === "draft") return blog.status === "draft";
        if (filter === "scheduled") return blog.status === "scheduled";
        if (filter === "pending") return blog.status === "pending";
        return true;
    }).filter(blog => {
        if (categoryFilter === "") return true;
        return blog.category?._id === categoryFilter;
    });

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Content & Blog Management</h2>
                <p className="text-sm text-gray-500 mt-1">Manage blog posts, categories, and engagement</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                {/* Total Blogs */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Total Blogs</p>
                            <h3 className="text-2xl font-bold text-gray-900">{totalBlogs}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-blue-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiFileText size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Draft Blogs */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Draft Blogs</p>
                            <h3 className="text-2xl font-bold text-gray-900">{draftBlogs}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-yellow-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiClock size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Published Blogs */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Published Blogs</p>
                            <h3 className="text-2xl font-bold text-gray-900">{publishedBlogs}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-green-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiCheckCircle size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Categories</p>
                            <h3 className="text-2xl font-bold text-gray-900">{totalCategories}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-purple-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiBook size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Comments</p>
                            <h3 className="text-2xl font-bold text-gray-900">{comments}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-indigo-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiMessageSquare size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Reviews */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Pending Reviews</p>
                            <h3 className="text-2xl font-bold text-gray-900">{pendingReviews}</h3>
                        </div>
                        <div className="relative flex-shrink-0">
                            <div className="absolute w-20 h-20 bg-red-50 rounded-full blur-2xl opacity-40 -top-3 -right-3"></div>
                            <div className="relative w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-md">
                                <FiAlertCircle size={28} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <Link
                    to="/admin/blog-categories"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors"
                >
                    <FiGrid size={18} />
                    Categories
                </Link>
                <Link
                    to="/admin/blog-comments"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors"
                >
                    <FiMessageSquare size={18} />
                    Comments
                </Link>
                <Link
                    to="/admin/blogs/create"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 transition-colors"
                >
                    <FiPlus size={18} />
                    New Post
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                    
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                            filter === "all"
                                ? "bg-primary-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All
                    </button>
                    
                    <button
                        onClick={() => setFilter("published")}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                            filter === "published"
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Published
                    </button>
                    
                    <button
                        onClick={() => setFilter("draft")}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                            filter === "draft"
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Draft
                    </button>
                    
                    <button
                        onClick={() => setFilter("scheduled")}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                            filter === "scheduled"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Scheduled
                    </button>
                    
                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                            filter === "pending"
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Pending
                    </button>
                    
                    <div className="ml-auto">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Blog Title</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Created Date</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Last Updated</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blogsLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center">
                                        <Spinner size={40} color="text-primary-500" />
                                    </td>
                                </tr>
                            ) : filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        No blogs found
                                    </td>
                                </tr>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{blog.title}</div>
                                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                {blog.excerpt}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                                {blog.category?.name || "Uncategorized"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                blog.status === "published"
                                                    ? "bg-green-100 text-green-800"
                                                    : blog.status === "draft"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}>
                                                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(blog.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(blog.updatedAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/admin/blogs/${blog._id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit"
                                                >
                                                    <FiEdit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(blog._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                                <Link
                                                    to={`/blog/${blog._id}`}
                                                    target="_blank"
                                                    className="text-green-600 hover:text-green-900"
                                                    title="View"
                                                >
                                                    <FiEye size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Blog"
                message="Are you sure you want to delete this blog? This action cannot be undone."
                confirmText="Delete"
                confirmButtonClass="bg-red-500 hover:bg-red-600"
            />
            </div>
        </AdminLayout>
    );
};

export default BlogsOverview;