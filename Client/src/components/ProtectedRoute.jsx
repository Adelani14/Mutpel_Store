import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const storedUser = localStorage.getItem("user");

    // console.log("storedUser:", storedUser);

    const user = storedUser ? JSON.parse(storedUser) : null;

    // console.log("user:", user);
    // console.log("role:", user?.role);
    // console.log("allowedRoles:", allowedRoles);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;