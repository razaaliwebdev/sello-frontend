import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useCreateBlogMutation, useGetAllCategoriesQuery } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";

const BlogCreate = () => {
    const navigate = useNavigate();
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery({ type: "blog", isActive: true });
    const blogCategories = categoriesData || [];
    
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        featuredImage: null,
        category: "",
        tags: "",
        status: "draft",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "featuredImage") {
            setFormData({ ...formData, featuredImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate category if provided
        if (formData.category && !formData.category.match(/^[0-9a-fA-F]{24}$/)) {
            toast.error("Please select a valid category");
            return;
        }
        
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                if (key === "featuredImage" && formData[key]) {
                    formDataToSend.append("featuredImage", formData[key]);
                } else if (key === "tags" && formData[key]) {
                    // Convert tags string to array
                    const tagsArray = formData[key]
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter((tag) => tag);
                    formDataToSend.append("tags", JSON.stringify(tagsArray));
                } else if (formData[key] && key !== "category") {
                    formDataToSend.append(key, formData[key]);
                }
            });
            
            // Only append category if it's provided and valid
            if (formData.category) {
                formDataToSend.append("category", formData.category);
            }

            await createBlog(formDataToSend).unwrap();
            toast.success("Blog created successfully");
            navigate("/admin/blogs");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create blog");
        }
    };

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Create Blog</h2>
                    <button
                        onClick={() => navigate("/admin/blogs")}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Excerpt *
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Content *
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="10"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Featured Image
                        </label>
                        <input
                            type="file"
                            name="featuredImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category {blogCategories.length > 0 && <span className="text-red-500">*</span>}
                        </label>
                        {categoriesLoading ? (
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                <Spinner size={20} />
                            </div>
                        ) : blogCategories.length > 0 ? (
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select a category</option>
                                {blogCategories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="w-full px-3 py-2 border border-yellow-300 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                                No blog categories found. Please create a blog category first.
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="tag1, tag2, tag3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
                        >
                            {isLoading ? <Spinner size={20} /> : "Create Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default BlogCreate;

