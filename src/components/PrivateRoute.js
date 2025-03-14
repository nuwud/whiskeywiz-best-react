import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, adminRequired = false }) => {
  const { currentUser } = useAuth();

  // Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if admin access is required
  if (adminRequired && currentUser.email !== 'admin@whiskeywiz.com') {
    return <Navigate to="/" />;
  }

  // User is authenticated and has required permissions
  return children;
};

export default PrivateRoute;