import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetAnalyticsQuery } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import { FiTrendingUp, FiUsers, FiList, FiDollarSign } from "react-icons/fi";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const Analytics = () => {
    const [period, setPeriod] = useState(30);
    const { data, isLoading } = useGetAnalyticsQuery({ period });

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <Spinner size={60} color="text-orange-500" />
                </div>
            </AdminLayout>
        );
    }

    const analytics = data || {};

    // Prepare chart data
    const userGrowthData = analytics.users?.growth?.map((item) => ({
        date: item._id,
        users: item.count,
    })) || [];

    const carGrowthData = analytics.cars?.growth?.map((item) => ({
        date: item._id,
        cars: item.count,
    })) || [];

    const userStatusData = [
        { name: "Active", value: analytics.users?.active || 0 },
        { name: "Suspended", value: analytics.users?.suspended || 0 },
        { name: "Inactive", value: (analytics.users?.total || 0) - (analytics.users?.active || 0) - (analytics.users?.suspended || 0) },
    ];

    const carStatusData = [
        { name: "Approved", value: analytics.cars?.approved || 0 },
        { name: "Pending", value: analytics.cars?.pending || 0 },
        { name: "Boosted", value: analytics.cars?.boosted || 0 },
    ];

    const blogStatusData = [
        { name: "Published", value: analytics.blogs?.published || 0 },
        { name: "Draft", value: analytics.blogs?.draft || 0 },
    ];

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Reports & Analytics
                    </h2>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(Number(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value={7}>Last 7 days</option>
                        <option value={30}>Last 30 days</option>
                        <option value={90}>Last 90 days</option>
                        <option value={365}>Last year</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {analytics.users?.total || 0}
                                </p>
                            </div>
                            <FiUsers className="text-blue-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Cars</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {analytics.cars?.total || 0}
                                </p>
                            </div>
                            <FiList className="text-green-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    ${analytics.revenue?.total?.toLocaleString() || 0}
                                </p>
                            </div>
                            <FiDollarSign className="text-orange-500" size={32} />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {analytics.users?.active || 0}
                                </p>
                            </div>
                            <FiTrendingUp className="text-purple-500" size={32} />
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* User Growth Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            User Growth (Last 7 Days)
                        </h3>
                        {userGrowthData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="users"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        name="New Users"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                No data available
                            </div>
                        )}
                    </div>

                    {/* Car Growth Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Car Listings Growth (Last 7 Days)
                        </h3>
                        {carGrowthData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={carGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="cars"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        name="New Cars"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-64 text-gray-500">
                                No data available
                            </div>
                        )}
                    </div>
                </div>

                {/* Pie Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* User Status Distribution */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            User Status Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={userStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {userStatusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Car Status Distribution */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Car Status Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={carStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {carStatusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Blog Status Distribution */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Blog Status Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={blogStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {blogStatusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* User Statistics Bar Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            User Statistics
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[
                                    {
                                        name: "Total",
                                        value: analytics.users?.total || 0,
                                    },
                                    {
                                        name: "New",
                                        value: analytics.users?.new || 0,
                                    },
                                    {
                                        name: "Active",
                                        value: analytics.users?.active || 0,
                                    },
                                    {
                                        name: "Suspended",
                                        value: analytics.users?.suspended || 0,
                                    },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Car Statistics Bar Chart */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Car Statistics
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={[
                                    {
                                        name: "Total",
                                        value: analytics.cars?.total || 0,
                                    },
                                    {
                                        name: "New",
                                        value: analytics.cars?.new || 0,
                                    },
                                    {
                                        name: "Approved",
                                        value: analytics.cars?.approved || 0,
                                    },
                                    {
                                        name: "Pending",
                                        value: analytics.cars?.pending || 0,
                                    },
                                    {
                                        name: "Boosted",
                                        value: analytics.cars?.boosted || 0,
                                    },
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Additional Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            User Statistics
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">New Users ({period} days)</span>
                                <span className="font-semibold">{analytics.users?.new || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Active Users</span>
                                <span className="font-semibold">{analytics.users?.active || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Suspended Users</span>
                                <span className="font-semibold">
                                    {analytics.users?.suspended || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Dealers</span>
                                <span className="font-semibold">
                                    {analytics.users?.dealers?.total || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Verified Dealers</span>
                                <span className="font-semibold">
                                    {analytics.users?.dealers?.verified || 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Car Statistics
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">New Cars ({period} days)</span>
                                <span className="font-semibold">{analytics.cars?.new || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Approved Cars</span>
                                <span className="font-semibold">
                                    {analytics.cars?.approved || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pending Cars</span>
                                <span className="font-semibold">
                                    {analytics.cars?.pending || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Boosted Cars</span>
                                <span className="font-semibold">
                                    {analytics.cars?.boosted || 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Views</span>
                                <span className="font-semibold">
                                    {analytics.cars?.totalViews?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Analytics;

