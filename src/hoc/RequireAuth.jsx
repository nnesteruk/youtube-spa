import React from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const auth = localStorage.getItem('token');

  if (!auth) {
    alert("You're not authorized to access this page.");
    return <Navigate to="/search" />;
  }
  return children;
};
