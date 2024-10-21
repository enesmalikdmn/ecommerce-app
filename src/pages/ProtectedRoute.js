import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isLoginSucces } = useAuth();

  return isLoginSucces ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
