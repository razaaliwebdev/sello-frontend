import { useMemo } from "react";
import { useGetAllCategoriesQuery } from "../redux/services/adminApi";

/**
 * Custom hook to fetch and organize car categories (makes, models, years)
 */
export const useCarCategories = () => {
    const { data: allCategories, isLoading } = useGetAllCategoriesQuery({
        type: "car",
        isActive: true,
    });

    const categories = allCategories || [];

    const makes = useMemo(() => {
        return categories.filter(
            (cat) => cat.subType === "make" && cat.isActive
        );
    }, [categories]);

    const models = useMemo(() => {
        return categories.filter(
            (cat) => cat.subType === "model" && cat.isActive
        );
    }, [categories]);

    const years = useMemo(() => {
        return categories.filter(
            (cat) => cat.subType === "year" && cat.isActive
        );
    }, [categories]);

    const getModelsByMake = useMemo(() => {
        const map = {};
        models.forEach((model) => {
            const makeId =
                typeof model.parentCategory === "object"
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

    return {
        makes,
        models,
        years,
        getModelsByMake,
        isLoading,
    };
};

