import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../redux/services/api";
import { canAccessMenu } from "../../utils/roleAccess";
import Spinner from "../Spinner";

const AdminRoute = () => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const { data: user, isLoading, isError } = useGetMeQuery(undefined, {
        skip: !token,
    });

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size={80} color="text-primary-500" thickness={5} speed="fast" />
            </div>
        );
    }

    if (isError || !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Check if user has access to the current route based on their role
    const currentPath = location.pathname;
    
    // Allow dashboard for all admins
    if (currentPath === "/admin/dashboard") {
        return <Outlet />;
    }

    // Check role-based access for other routes
    if (!canAccessMenu(user, currentPath)) {
        // Redirect to dashboard if user doesn't have access
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;

