import React, { useEffect } from "react";
import { selectloggedInUser, SignOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function LogOut() {
  const User = useSelector(selectloggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SignOutAsync(User?.id));
    // eslint-disable-next-line
  }, [dispatch]);
  return <>{!User && <Navigate to="/login"></Navigate>}</>;
}

export default LogOut;
