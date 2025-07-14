import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return Cookies.get("auth_token") !== undefined;
};

const ProtectedRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
