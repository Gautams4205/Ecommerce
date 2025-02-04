import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectloggedInUser } from "../authSlice";

function Protected({ children }) {
  const User = useSelector(selectloggedInUser);
  if (!User) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
}

export default Protected;
