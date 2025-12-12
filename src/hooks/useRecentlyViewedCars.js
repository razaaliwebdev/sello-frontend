import { useState, useEffect } from "react";

const STORAGE_KEY = "recentlyViewedCars";
const MAX_RECENT_CARS = 10; // Maximum number of recently viewed cars to store

/**
 * Hook to manage recently viewed cars
 * Stores car IDs in localStorage and provides methods to add and retrieve them
 */
export const useRecentlyViewedCars = () => {
  const [recentCars, setRecentCars] = useState([]);

  // Load recently viewed cars from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentCars(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading recently viewed cars:", error);
      setRecentCars([]);
    }
  }, []);

  /**
   * Add a car to recently viewed
   * @param {Object} car - Car object with _id
   */
  const addRecentlyViewed = (car) => {
    if (!car || !car._id) return;

    try {
      setRecentCars((prev) => {
        // Remove if already exists (to avoid duplicates)
        const filtered = prev.filter((c) => c._id !== car._id);
        
        // Add to beginning and limit to MAX_RECENT_CARS
        const updated = [
          {
            _id: car._id,
            title: car.title || `${car.make} ${car.model}`,
            make: car.make,
            model: car.model,
            year: car.year,
            price: car.price,
            images: car.images || [],
            vehicleType: car.vehicleType || "Car",
            viewedAt: new Date().toISOString(),
          },
          ...filtered,
        ].slice(0, MAX_RECENT_CARS);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Error saving recently viewed car:", error);
    }
  };

  /**
   * Clear all recently viewed cars
   */
  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentCars([]);
    } catch (error) {
      console.error("Error clearing recently viewed cars:", error);
    }
  };

  return {
    recentCars,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
};

