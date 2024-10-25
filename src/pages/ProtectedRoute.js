import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoginSucces, user } = useAuth(); // Assuming 'user' contains user info including admin status

  if (!isLoginSucces) {
    // Redirect to sign-in page if the user is not logged in
    return <Navigate to="/signin" />;
  }

  // Check if the user is an admin when 'isAdmin' is true
  if (!(user?.role === "admin")) {
    return <Navigate to="/" />; // Redirect to home if the user is not an admin
  }

  // If user is logged in and (if admin route, user is admin), render the outlet
  return <Outlet />;
}

export default ProtectedRoute;
