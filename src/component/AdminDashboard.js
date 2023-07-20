// AdminDashboard.js
import React from "react";
import Dashboard from "./Dashboard";

const AdminDashboard = ({ handleLogout, userType }) => {
  return (
    <div>
      <Dashboard handleLogout={handleLogout} userType={userType} />
    </div>
  );
};

export default AdminDashboard;
