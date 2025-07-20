import { useGetCurrentUserQuery } from "../redux/services/api";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { data, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoutes;
