import { useState, useMemo, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { FiGrid, FiUpload, FiX, FiEdit2, FiTrash2, FiEye, FiEyeOff } from "react-icons/fi";

const Categories = () => {
    const [activeTab, setActiveTab] = useState("brands"); // brands, models, years, city, state, country
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        model: "",
        year: "",
        country: "",
        display: "show",
        status: "active",
        image: null,
        imagePreview: null
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Fetch all categories (car + location, active + inactive)
    const { data, isLoading, refetch } = useGetAllCategoriesQuery({});

    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const categories = data || [];

    // Filter categories by active tab
    const filteredCategories = useMemo(() => {
        if (activeTab === "brands") {
            return categories.filter(cat => cat.subType === "make");
        } else if (activeTab === "models") {
            return categories.filter(cat => cat.subType === "model");
        } else if (activeTab === "years") {
            return categories.filter(cat => cat.subType === "year");
        } else if (activeTab === "city") {
            return categories.filter(cat => cat.subType === "city");
        } else if (activeTab === "state") {
            return categories.filter(cat => cat.subType === "state");
        } else if (activeTab === "country") {
            return categories.filter(cat => cat.subType === "country");
        }
        return [];
    }, [categories, activeTab]);

    // Apply search & sort
    const processedCategories = useMemo(() => {
        let list = [...filteredCategories];

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            list = list.filter(cat => cat.name.toLowerCase().includes(term));
        }

        list.sort((a, b) => {
            const dir = sortDirection === "asc" ? 1 : -1;
            if (sortField === "status") {
                return (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1) * dir;
            }
            
            // Special sorting for years: numeric sort
            if (activeTab === "years") {
                const yearA = parseInt(a.name) || 0;
                const yearB = parseInt(b.name) || 0;
                return (yearA - yearB) * dir;
            }
            
            // default sort by name
            return a.name.localeCompare(b.name) * dir;
        });

        return list;
    }, [filteredCategories, searchTerm, sortField, sortDirection, activeTab]);

    const totalPages = Math.max(1, Math.ceil(processedCategories.length / pageSize));

    const pagedCategories = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return processedCategories.slice(start, start + pageSize);
    }, [processedCategories, currentPage, pageSize]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    // Get brands for model/year parent selection
    const brands = useMemo(() => {
        return categories.filter(cat => cat.subType === "make" && cat.isActive);
    }, [categories]);

    // Get models for year parent selection
    const models = useMemo(() => {
        if (!formData.brand) return [];
        const selectedBrand = brands.find(b => b._id === formData.brand);
        if (!selectedBrand) return [];
        return categories.filter(cat =>
            cat.subType === "model" &&
            (cat.parentCategory?._id === selectedBrand._id || cat.parentCategory === selectedBrand._id) &&
            cat.isActive
        );
    }, [categories, brands, formData.brand]);

    // Countries for city parent selection
    const countries = useMemo(() => {
        return categories.filter(cat => cat.subType === "country" && cat.isActive);
    }, [categories]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenModal = () => {
        setEditingCategory(null);
        setFormData({
            name: "",
            brand: "",
            model: "",
            year: "",
            display: "show",
            status: "active",
            image: null,
            imagePreview: null
        });
        setShowModal(true);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);

        const baseForm = {
            name: category.name || "",
            brand: "",
            model: "",
            year: "",
            country: "",
            display: category.isActive ? "show" : "hide",
            status: category.isActive ? "active" : "inactive",
            image: null,
            imagePreview: category.image || null
        };

        if (category.subType === "model") {
            baseForm.brand = category.parentCategory?._id || category.parentCategory || "";
        } else if (category.subType === "year") {
            baseForm.year = category.name || "";
            // Years are independent, no parent category
        } else if (category.subType === "city") {
            baseForm.country = category.parentCategory?._id || category.parentCategory || "";
        }

        setFormData(baseForm);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isCreating || isUpdating) return;
        
        try {
            const submitData = new FormData();
            
            if (activeTab === "brands") {
                submitData.append("name", formData.name);
                submitData.append("type", "car");
                submitData.append("subType", "make");
                submitData.append("isActive", formData.status === "active");
                if (formData.image) {
                    submitData.append("image", formData.image);
                }
            } else if (activeTab === "models") {
                if (!formData.brand) {
                    toast.error("Please select a brand");
                    return;
                }
                submitData.append("name", formData.name);
                submitData.append("type", "car");
                submitData.append("subType", "model");
                submitData.append("parentCategory", formData.brand);
                submitData.append("isActive", formData.status === "active");
            } else if (activeTab === "years") {
                // Years are independent (standalone) - no parent category required
                submitData.append("name", formData.year || formData.name);
                submitData.append("type", "car");
                submitData.append("subType", "year");
                // No parentCategory - years are independent
                submitData.append("isActive", formData.status === "active");
            } else if (activeTab === "city") {
                if (!formData.country) {
                    toast.error("Please select a country");
                    return;
                }
                submitData.append("name", formData.name);
                submitData.append("type", "location");
                submitData.append("subType", "city");
                submitData.append("parentCategory", formData.country);
                submitData.append("isActive", formData.status === "active");
            } else if (activeTab === "state") {
                submitData.append("name", formData.name);
                submitData.append("type", "location");
                submitData.append("subType", "state");
                submitData.append("isActive", formData.status === "active");
            } else if (activeTab === "country") {
                submitData.append("name", formData.name);
                submitData.append("type", "location");
                submitData.append("subType", "country");
                submitData.append("isActive", formData.status === "active");
            }

            if (editingCategory) {
                // For update, we need to send the existing image URL if no new image is uploaded
                if (!formData.image && formData.imagePreview && formData.imagePreview.startsWith('http')) {
                    submitData.append("image", formData.imagePreview);
                }
                await updateCategory({ 
                    categoryId: editingCategory._id, 
                    data: submitData 
                }).unwrap();
                toast.success("Category updated successfully");
            } else {
                await createCategory(submitData).unwrap();
                toast.success("Category created successfully");
            }
            
            setShowModal(false);
            setEditingCategory(null);
            setFormData({
                name: "",
                brand: "",
                model: "",
                year: "",
                country: "",
                display: "show",
                status: "active",
                image: null,
                imagePreview: null
            });
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to save category");
        }
    };

    const handleDelete = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            await deleteCategory(categoryId).unwrap();
            toast.success("Category deleted successfully");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete category");
        }
    };

    const handleToggleStatus = async (category) => {
        try {
            await updateCategory({
                categoryId: category._id,
                data: { isActive: !category.isActive }
            }).unwrap();
            toast.success(`Category ${!category.isActive ? "activated" : "deactivated"} successfully`);
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update category");
        }
    };

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage car brands, models, and years
                    </p>
                </div>

                {/* Tabs and Add Button */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex gap-2">
                                {['brands', 'models', 'years', 'country', 'state', 'city'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            activeTab === tab
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name"
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <button
                                    onClick={handleOpenModal}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 text-sm"
                                >
                                    <span className="text-lg">+</span>
                                    Add New Category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Spinner size={60} color="text-primary-500" />
                    </div>
                ) : processedCategories.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No categories found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th
                                            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer"
                                            onClick={() => {
                                                setSortField("name");
                                                setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
                                            }}
                                        >
                                            Name
                                        </th>
                                        {activeTab === "brands" && (
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Logo</th>
                                        )}
                                        <th
                                            className="px-6 py-3 text-left text-xs font-semibold text-gray-700 cursor-pointer"
                                            onClick={() => {
                                                setSortField("status");
                                                setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
                                            }}
                                        >
                                            Status
                                        </th>
                                        {(activeTab === "models" || activeTab === "city") && (
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                                {activeTab === "models" ? "Brand" : "Country"}
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Display</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {pagedCategories.map((category) => (
                                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {category.name}
                                                    </p>
                                                    {category.parentCategory && (
                                                        <p className="text-xs text-gray-500">
                                                            {typeof category.parentCategory === 'object' 
                                                                ? category.parentCategory.name 
                                                                : 'Parent'}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            {activeTab === "brands" && (
                                                <td className="px-6 py-4">
                                                    {category.image ? (
                                                        <img
                                                            src={category.image}
                                                            alt={category.name}
                                                            className="w-12 h-12 object-contain rounded"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-gray-400">No logo</span>
                                                    )}
                                                </td>
                                            )}
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    category.isActive
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}>
                                                    {category.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            {(activeTab === "models" || activeTab === "city") && (
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">
                                                        {category.parentCategory 
                                                            ? (typeof category.parentCategory === 'object' 
                                                                ? category.parentCategory.name 
                                                                : 'N/A')
                                                            : 'N/A'}
                                                    </p>
                                                </td>
                                            )}
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleToggleStatus(category)}
                                                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                                        category.isActive
                                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {category.isActive ? (
                                                        <>
                                                            <FiEye size={14} />
                                                            Show
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiEyeOff size={14} />
                                                            Hide
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(category)}
                                                        className="text-blue-600 hover:text-blue-700 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category._id)}
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
                        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 text-sm text-gray-600">
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    className="px-2 py-1 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingCategory(null);
                                    setFormData({
                                        name: "",
                                        brand: "",
                                        model: "",
                                        year: "",
                                        display: "show",
                                        status: "active",
                                        image: null,
                                        imagePreview: null
                                    });
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <FiX size={24} />
                            </button>

                            <h3 className="text-xl font-bold mb-4">
                                {editingCategory ? "Edit Category" : "Add New Category"}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {activeTab === "brands" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Brand Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter brand name"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Logo
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                                {formData.imagePreview ? (
                                                    <div className="space-y-2">
                                                        <img
                                                            src={formData.imagePreview}
                                                            alt="Preview"
                                                            className="w-32 h-32 object-contain mx-auto rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    image: null,
                                                                    imagePreview: null
                                                                });
                                                            }}
                                                            className="text-sm text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <FiUpload className="mx-auto mb-2 text-gray-400" size={32} />
                                                        <p className="text-sm text-gray-600 mb-2">Upload Logo Here</p>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                            id="logo-upload"
                                                        />
                                                        <label
                                                            htmlFor="logo-upload"
                                                            className="cursor-pointer inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 text-sm"
                                                        >
                                                            Choose File
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === "models" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Brand *
                                            </label>
                                            <select
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="">Select Brand</option>
                                                {brands.map((brand) => (
                                                    <option key={brand._id} value={brand._id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Model Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter model name"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Display
                                            </label>
                                            <select
                                                name="display"
                                                value={formData.display}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="show">Show</option>
                                                <option value="hide">Hide</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === "years" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Year *
                                            </label>
                                            <input
                                                type="number"
                                                name="year"
                                                value={formData.year || formData.name}
                                                onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        year: e.target.value,
                                                        name: e.target.value
                                                    }));
                                                }}
                                                placeholder="e.g., 2024"
                                                min="1900"
                                                max="2100"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === "city" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                City Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter city name"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country *
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country._id} value={country._id}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === "state" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                State Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter state name"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {activeTab === "country" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Country Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter country name"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingCategory(null);
                                            setFormData({
                                                name: "",
                                                brand: "",
                                                model: "",
                                                year: "",
                                                display: "show",
                                                status: "active",
                                                image: null,
                                                imagePreview: null
                                            });
                                        }}
                                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isCreating || isUpdating}
                                        className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {(isCreating || isUpdating) ? (
                                            <>
                                                <Spinner size={16} color="text-white" />
                                                {editingCategory ? "Updating..." : "Creating..."}
                                            </>
                                        ) : (
                                            editingCategory ? "Update" : "Create"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default Categories;
