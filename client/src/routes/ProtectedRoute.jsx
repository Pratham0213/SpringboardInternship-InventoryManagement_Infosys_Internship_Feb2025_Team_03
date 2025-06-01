import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ adminOnly = false }) => {
  const { user } = useContext(UserContext);

  // If no user, redirect to authentication
  if (!user) return <Navigate to="/authentication" />;

  // If admin-only route but user is not admin, redirect to home
  if (adminOnly && !user.admin) return <Navigate to="/shop" />;

  return <Outlet />;
};

export default ProtectedRoutes; 