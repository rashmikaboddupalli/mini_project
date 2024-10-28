import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  return token ? element : <Navigate to="/parent-login" />; // If no token, redirect to login
};

export default ProtectedRoute;
