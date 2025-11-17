import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlogMutation, useGetAllCategoriesQuery } from "../../redux/services/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiBold, FiItalic, FiUnderline, FiList, FiHash, FiLink, FiImage, FiAlignLeft, FiAlignCenter, FiAlignRight, FiX, FiCalendar, FiClock, FiSave, FiSend, FiArrowLeft } from "react-icons/fi";

const BlogCreateEnhanced = () => {
    const navigate = useNavigate();
    const [createBlog, { isLoading }] = useCreateBlogMutation();
    const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery({ type: "blog", isActive: true });
    const blogCategories = categoriesData || [];
    
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: null,
        category: "",
        tags: "",
        status: "draft",
        metaTitle: "",
        metaDescription: "",
        publishDate: "",
        publishTime: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "featuredImage") {
            setFormData({ ...formData, featuredImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e, status) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.title || !formData.content) {
            toast.error("Title and content are required");
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
            
            // Only append category if it's provided
            if (formData.category) {
                formDataToSend.append("category", formData.category);
            }
            
            // Set status
            formDataToSend.append("status", status);

            await createBlog(formDataToSend).unwrap();
            toast.success(status === "published" ? "Blog published successfully" : "Blog saved as draft");
            navigate("/admin/blogs");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create blog");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/blogs")}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Back to Blogs"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Create New Blog Post</h2>
                            <p className="text-sm text-gray-500 mt-1">Create and manage your blog content</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => handleSubmit(e, "draft")}
                            disabled={isLoading}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                        >
                            <FiSave size={18} />
                            Save Draft
                        </button>
                        <button
                            onClick={(e) => handleSubmit(e, "published")}
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2 disabled:opacity-50"
                        >
                            <FiSend size={18} />
                            Publish
                        </button>
                    </div>
                </div>

            <form className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title and Slug */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="space-y-4">
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
                                        placeholder="Enter blog post title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Blog URL (Slug)
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        placeholder="auto-generated-from-title"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Short Summary */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Short Summary *
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        placeholder="Enter a brief summary of your blog post"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Post Content *
                                    </label>
                                    
                                    {/* Toolbar */}
                                    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-t-lg border border-gray-300 border-b-0">
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Bold">
                                            <FiBold size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Italic">
                                            <FiItalic size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Underline">
                                            <FiUnderline size={16} />
                                        </button>
                                        <div className="w-px bg-gray-300 mx-1"></div>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Bullet List">
                                            <FiList size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Numbered List">
                                            <FiHash size={16} />
                                        </button>
                                        <div className="w-px bg-gray-300 mx-1"></div>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Link">
                                            <FiLink size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Image">
                                            <FiImage size={16} />
                                        </button>
                                        <div className="w-px bg-gray-300 mx-1"></div>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Left">
                                            <FiAlignLeft size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Center">
                                            <FiAlignCenter size={16} />
                                        </button>
                                        <button type="button" className="p-2 rounded hover:bg-gray-200" title="Align Right">
                                            <FiAlignRight size={16} />
                                        </button>
                                    </div>
                                    
                                    {/* Editor */}
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        required
                                        rows="15"
                                        placeholder="Write your blog post content here..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-b-lg rounded-t-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Title
                                    </label>
                                    <input
                                        type="text"
                                        name="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={handleChange}
                                        placeholder="Enter meta title for SEO"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Meta Description
                                    </label>
                                    <textarea
                                        name="metaDescription"
                                        value={formData.metaDescription}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Enter meta description for SEO"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publishing Options */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="pending">Pending Review</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Publish Date & Time
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="date"
                                            name="publishDate"
                                            value={formData.publishDate}
                                            onChange={handleChange}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <input
                                            type="time"
                                            name="publishTime"
                                            value={formData.publishTime}
                                            onChange={handleChange}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    {categoriesLoading ? (
                                        <Spinner size={20} color="text-primary-500" />
                                    ) : (
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="">Select a category</option>
                                            {blogCategories.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="Enter tags separated by commas"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="file"
                                        name="featuredImage"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                {formData.featuredImage && (
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">Selected: {formData.featuredImage.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Footer */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/blogs")}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, "draft")}
                            disabled={isLoading}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <Spinner size={16} color="text-white" />}
                            <FiSave size={18} />
                            Save Draft
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, "published")}
                            disabled={isLoading}
                            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <Spinner size={16} color="text-white" />}
                            <FiSend size={18} />
                            Publish
                        </button>
                    </div>
                </div>
            </form>
            </div>
        </AdminLayout>
    );
};

export default BlogCreateEnhanced;