import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdminLoggedIn') === 'true' && localStorage.getItem('admin_token');
};

// For login page - redirect authenticated users to dashboard
export const AdminLoginRoute = ({ children }) => {
  const authenticated = isAdminAuthenticated();
  
  if (authenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

// For protected admin pages - redirect non-authenticated users to login
const ProtectedAdminRoute = ({ children }) => {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedAdminRoute; 