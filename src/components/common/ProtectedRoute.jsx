import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../../redux/services/api";
import Spinner from "../Spinner";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const { data: user, isLoading, isError } = useGetMeQuery(undefined, {
        skip: !token,
    });

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size={80} color="text-purple-500" thickness={5} speed="fast" />
            </div>
        );
    }

    if (isError || !user) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

