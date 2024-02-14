import React from "react";
import { useSelector } from "react-redux";
import { userReducer } from "../store/userSlice.js";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector(userReducer);

  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} replace={true} />;
};
export default PrivateRoute;
