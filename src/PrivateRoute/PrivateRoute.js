import CircularProgress from '@mui/material/CircularProgress';
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Firebase/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return <CircularProgress color="success" />
  }

  if (user.email) {
    return children;

  }
  return  <Navigate to="/sign-in" state={{ from: location }} />;
};

export default PrivateRoute;