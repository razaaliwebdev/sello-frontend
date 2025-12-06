import React from 'react';
import { useGetSimilarListingsQuery } from '../../../redux/services/api';
import { Link } from 'react-router-dom';
import { FaCar, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import LazyImage from '../../common/LazyImage';
import Spinner from '../../Spinner';

const SimilarListings = ({ carId }) => {
    const { data, isLoading, error } = useGetSimilarListingsQuery(carId, {
        skip: !carId
    });

    const similarCars = Array.isArray(data) ? data : (data?.data || []);

    if (isLoading) {
        return (
            <div className="px-4 md:px-20 py-12 bg-white">
                <div className="flex justify-center">
                    <Spinner fullScreen={false} />
                </div>
            </div>
        );
    }

    if (error || !similarCars || similarCars.length === 0) {
        return null;
    }

    return (
        <div className="px-4 md:px-20 py-12 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                Similar Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {similarCars.map((car) => (
                    <Link
                        key={car._id}
                        to={`/cars/${car._id}`}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <LazyImage
                                src={car.images?.[0] || '/placeholder-car.jpg'}
                                alt={car.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {car.isBoosted && (
                                <span className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                                    Boosted
                                </span>
                            )}
                            {car.isSold && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="bg-red-500 text-white px-4 py-2 rounded font-semibold">
                                        Sold
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
                                {car.title || `${car.make} ${car.model}`}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {car.year}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaCar /> {car.mileage?.toLocaleString() || '0'} km
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                <FaMapMarkerAlt />
                                <span>{car.city}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-primary-500">
                                    AED {car.price?.toLocaleString() || '0'}
                                </span>
                                {car.postedBy?.isVerified && (
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarListings;

