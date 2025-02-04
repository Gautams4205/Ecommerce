import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectloggedInUser } from "../authSlice";

function ProtectedAdmin({ children }) {
  const User = useSelector(selectloggedInUser);
  if (!User) {
    return <Navigate to="/login"></Navigate>;
  }
  if (User && User.role !== "admin") {
    return <Navigate to="/"></Navigate>;
  }
  return children;
}

export default ProtectedAdmin;
