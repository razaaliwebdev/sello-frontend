import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllBlogsQuery,
    useDeleteBlogMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Blogs = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAllBlogsQuery({ page, limit: 20 });
    const [deleteBlog] = useDeleteBlogMutation();

    const blogs = data?.blogs || [];
    const pagination = data?.pagination || {};

    const handleDelete = async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await deleteBlog(blogId).unwrap();
            toast.success("Blog deleted successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete blog");
        }
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Blogs</h2>
                    <Link
                        to="/admin/blogs/create"
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Create Blog
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size={60} color="text-orange-500" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {blog.excerpt}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>Status: {blog.status}</span>
                                            <span>Views: {blog.views}</span>
                                            <span>Read Time: {blog.readTime} min</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <Link
                                            to={`/admin/blogs/${blog._id}/edit`}
                                            className="text-blue-600 hover:text-blue-900 text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-600 hover:text-red-900 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
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

export default Blogs;

