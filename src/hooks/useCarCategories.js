import { useMemo, useEffect } from "react";
import { useGetAllCategoriesQuery } from "../redux/services/adminApi";

/**
 * Custom hook to fetch and organize car categories (makes, models, years, countries, cities)
 */
export const useCarCategories = () => {
    // Use skip to prevent duplicate queries - RTK Query will cache based on query params
    const { data: allCarCategories, isLoading: carLoading, error: carError } = useGetAllCategoriesQuery({
        type: "car",
        isActive: "true",
    }, {
        // Refetch on mount to ensure fresh data
        refetchOnMountOrArgChange: true,
    });

    const { data: allLocationCategories, isLoading: locationLoading, error: locationError } = useGetAllCategoriesQuery({
        type: "location",
        isActive: "true",
    }, {
        refetchOnMountOrArgChange: true,
    });

    const carCategories = Array.isArray(allCarCategories) ? allCarCategories : [];
    const locationCategories = Array.isArray(allLocationCategories) ? allLocationCategories : [];
    const isLoading = carLoading || locationLoading;

    const makes = useMemo(() => {
        return carCategories.filter(
            (cat) => cat.subType === "make" && cat.isActive
        );
    }, [carCategories]);

    const models = useMemo(() => {
        return carCategories.filter(
            (cat) => cat.subType === "model" && cat.isActive
        );
    }, [carCategories]);

    const years = useMemo(() => {
        return carCategories.filter(
            (cat) => cat.subType === "year" && cat.isActive
        );
    }, [carCategories]);

    const countries = useMemo(() => {
        return locationCategories.filter(
            (cat) => cat.subType === "country" && cat.isActive
        );
    }, [locationCategories]);

    const cities = useMemo(() => {
        return locationCategories.filter(
            (cat) => cat.subType === "city" && cat.isActive
        );
    }, [locationCategories]);

    const getModelsByMake = useMemo(() => {
        const map = {};
        models.forEach((model) => {
            // Skip if no parentCategory
            if (!model.parentCategory) {
                return;
            }
            const makeId =
                typeof model.parentCategory === "object" && model.parentCategory !== null
                    ? model.parentCategory._id
                    : model.parentCategory;
            if (makeId) {
                if (!map[makeId]) {
                    map[makeId] = [];
                }
                map[makeId].push(model);
            }
        });
        return map;
    }, [models]);

    const getYearsByModel = useMemo(() => {
        const map = {};
        years.forEach((year) => {
            // Years are now independent - skip if no parentCategory
            if (!year.parentCategory) {
                return; // Skip years without parent (independent years)
            }
            const modelId =
                typeof year.parentCategory === "object" && year.parentCategory !== null
                    ? year.parentCategory._id
                    : year.parentCategory;
            if (modelId) {
                if (!map[modelId]) {
                    map[modelId] = [];
                }
                map[modelId].push(year);
            }
        });
        return map;
    }, [years]);

    const getCitiesByCountry = useMemo(() => {
        const map = {};
        cities.forEach((city) => {
            // Skip if no parentCategory
            if (!city.parentCategory) {
                return;
            }
            const countryId =
                typeof city.parentCategory === "object" && city.parentCategory !== null
                    ? city.parentCategory._id
                    : city.parentCategory;
            if (countryId) {
                if (!map[countryId]) {
                    map[countryId] = [];
                }
                map[countryId].push(city);
            }
        });
        return map;
    }, [cities]);

    // Debug logging (remove in production)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Categories Data:', {
                makes: makes.length,
                models: models.length,
                years: years.length,
                countries: countries.length,
                cities: cities.length,
                isLoading,
                carError,
                locationError
            });
        }
    }, [makes.length, models.length, years.length, countries.length, cities.length, isLoading, carError, locationError]);

    return {
        makes,
        models,
        years,
        countries,
        cities,
        getModelsByMake,
        getYearsByModel,
        getCitiesByCountry,
        isLoading,
    };
};

