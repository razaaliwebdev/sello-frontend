import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useGetAnalyticsQuery } from "../../redux/services/adminApi";
import Spinner from "../../components/Spinner";
import { FiDownload, FiDollarSign, FiZap, FiEye, FiTrendingUp } from "react-icons/fi";
import { HiCurrencyRupee } from "react-icons/hi";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
    const { data, isLoading } = useGetAnalyticsQuery({ period: 30 });
    const analytics = data || {};

    const formatCurrency = (amount) => {
        return `Rs ${amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`;
    };

    const formatViews = (views) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views?.toLocaleString() || '0';
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text('Sello Admin - Reports & Analytics', 14, 20);
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        
        let yPosition = 40;

        // Key Metrics
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text('Key Metrics', 14, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        doc.text(`Total Earnings: ${formatCurrency(analytics.earnings?.total || 0)}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Total Promotions: ${analytics.promotions?.total || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Total Views: ${formatViews(analytics.views?.total || 0)}`, 14, yPosition);
        yPosition += 15;

        // Most Viewed Cars Table
        if (analytics.mostViewedCars && analytics.mostViewedCars.length > 0) {
            doc.setFontSize(16);
            doc.setTextColor(40, 40, 40);
            doc.text('Most Viewed Cars', 14, yPosition);
            yPosition += 10;

            const tableData = analytics.mostViewedCars.map((car, index) => [
                index + 1,
                car.title || `${car.make} ${car.model}`,
                car.make || 'N/A',
                formatCurrency(car.price || 0),
                car.views?.toLocaleString() || '0',
                car.isSold ? 'Sold' : 'Active'
            ]);

            doc.autoTable({
                startY: yPosition,
                head: [['Rank', 'Car', 'Brand', 'Price', 'Views', 'Status']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [255, 166, 2] },
                styles: { fontSize: 8 },
                margin: { left: 14, right: 14 }
            });

            yPosition = doc.lastAutoTable.finalY + 15;
        }

        // User Statistics
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text('User Statistics', 14, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        doc.text(`Total Users: ${analytics.users?.total || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`New Users: ${analytics.users?.new || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Active Users: ${analytics.users?.active || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Total Dealers: ${analytics.users?.dealers?.total || 0}`, 14, yPosition);
        yPosition += 15;

        // Car Statistics
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text('Car Statistics', 14, yPosition);
        yPosition += 10;

        doc.setFontSize(10);
        doc.text(`Total Cars: ${analytics.cars?.total || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Approved Cars: ${analytics.cars?.approved || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Pending Cars: ${analytics.cars?.pending || 0}`, 14, yPosition);
        yPosition += 7;
        doc.text(`Boosted Cars: ${analytics.cars?.boosted || 0}`, 14, yPosition);

        // Save PDF
        doc.save(`sello-report-${new Date().toISOString().split('T')[0]}.pdf`);
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
                    <Spinner fullScreen={false} />
                </div>
            </AdminLayout>
        );
    }

    const mostViewedCars = analytics.mostViewedCars || [];

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            View site earnings and performance metrics
                        </p>
                    </div>
                    <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 text-sm shadow-sm"
                    >
                        <FiDownload size={18} />
                        Export Report
                    </button>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Earnings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-2">Total Earnings</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {formatCurrency(analytics.earnings?.total || 0)}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center shadow-lg">
                                <HiCurrencyRupee className="text-white" size={32} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiTrendingUp size={14} className="text-green-500" />
                            <span className={`text-xs font-medium ${
                                analytics.earnings?.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {analytics.earnings?.change >= 0 ? '+' : ''}{analytics.earnings?.change || 12}%
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    </div>

                    {/* Total Promotions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-2">Total Promotions</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {analytics.promotions?.total || 0}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
                                <FiZap className="text-white" size={28} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiTrendingUp size={14} className="text-green-500" />
                            <span className={`text-xs font-medium ${
                                analytics.promotions?.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {analytics.promotions?.change >= 0 ? '+' : ''}{analytics.promotions?.change || 12}%
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    </div>

                    {/* Total Views */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 mb-2">Total Views</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {formatViews(analytics.views?.total || 0)}
                                </p>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg">
                                <FiEye className="text-white" size={28} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiTrendingUp size={14} className="text-green-500" />
                            <span className={`text-xs font-medium ${
                                analytics.views?.change >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {analytics.views?.change >= 0 ? '+' : ''}{analytics.views?.change || 12}%
                            </span>
                            <span className="text-xs text-gray-500">vs last month</span>
                        </div>
                    </div>
                </div>

                {/* Most Viewed Cars Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900">Most Viewed Cars</h3>
                    </div>
                    {mostViewedCars.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-base">No found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Rank</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Car</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Views</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mostViewedCars.map((car, index) => (
                                        <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {car.images && car.images.length > 0 ? (
                                                        <img
                                                            src={car.images[0]}
                                                            alt={car.title}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-xs text-gray-400">No Image</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {car.title || `${car.make} ${car.model}`}
                                                        </p>
                                                        {car.postedBy && (
                                                            <p className="text-xs text-gray-500">
                                                                {typeof car.postedBy === 'object' ? car.postedBy.name : 'N/A'}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {car.make || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {formatCurrency(car.price || 0)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {car.views?.toLocaleString() || '0'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    car.isSold
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {car.isSold ? 'Sold' : 'Active'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Reports;

