import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLocalStorageItem } from './utils/localStorage';

function ProtectedRoute({ roles, children }) {
  if (getLocalStorageItem('token') && roles.includes(getLocalStorageItem('userRole'))) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
