import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ roles, children }) {
  if (localStorage.getItem('token') && roles.includes(localStorage.getItem('userRole'))) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
