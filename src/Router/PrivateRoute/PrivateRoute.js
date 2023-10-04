import React, { useContext } from "react";
import { context } from "../../Context/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(context);
  const location = useLocation();
  if (loader) {
    <h2 className="text-5xl">Loading...</h2>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
