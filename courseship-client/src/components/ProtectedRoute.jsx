import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) return <Navigate to="/login" />;

  // Role check
  if (role && user.role !== role) {
    return <div className="text-center mt-5 text-danger"><h4>Access Denied: Unauthorized Role</h4></div>;
  }

  return children;
};

export default ProtectedRoute;
