import React from "react";
import { Navigate } from "react-router-dom";

// Function to simulate fetching user data from localStorage
const getUserData = () => {
  // Retrieve user data from localStorage or another state management system
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const ProtectedRoute = ({ children }) => {
  const user = getUserData(); // Fetch the user data

  // Check if the user is authenticated and has the admin role
  const isAuthenticated = user && user.role === "admin";

  // If not authenticated or not an admin, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Render the child component if authenticated
  return children;
};

export default ProtectedRoute;
