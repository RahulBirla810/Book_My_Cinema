import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }
  if (user.accountType === "Admin") {
    return children;
  } else {
    alert("This is protected Route for Admin");
    return <Navigate to="/"></Navigate>;
  }
};

export default AdminProtected;
