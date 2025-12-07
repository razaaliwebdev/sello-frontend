import React from 'react';
import { useGetRecentlyViewedQuery } from '../../../redux/services/api';
import { Link } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import LazyImage from '../../common/LazyImage';

const RecentlyViewed = () => {
    const { data, isLoading, error } = useGetRecentlyViewedQuery(
        { limit: 6 },
        { skip: !localStorage.getItem('token') }
    );

    const recentlyViewed = data || [];

    // Don't show if user is not logged in
    if (!localStorage.getItem('token')) {
        return null;
    }

    // Don't show anything while loading or on error
    if (error || (!isLoading && (!recentlyViewed || recentlyViewed.length === 0))) {
        return null;
    }

    // Show skeleton while loading
    if (isLoading) {
        return (
            <div className="px-4 md:px-20 py-12 bg-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Recently Viewed
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg shadow-sm animate-pulse">
                            <div className="h-32 bg-gray-200"></div>
                            <div className="p-3">
                                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 md:px-20 py-12 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Recently Viewed
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {recentlyViewed.map((car) => (
                    <Link
                        key={car._id}
                        to={`/cars/${car._id}`}
                        className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                        <div className="relative h-32 overflow-hidden">
                            <LazyImage
                                src={car.images?.[0] || '/placeholder-car.jpg'}
                                alt={car.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-sm mb-1 line-clamp-1 group-hover:text-primary-500 transition-colors">
                                {car.title || `${car.make} ${car.model}`}
                            </h3>
                            <div className="text-xs text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {car.year}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-primary-500">
                                AED {car.price?.toLocaleString() || '0'}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;

