// TeachingStaffDashboard.js
import React from "react";
import Dashboard from "./Dashboard";

const TeachingStaffDashboard = ({ handleLogout, userType }) => {
  return (
    <div>
      <Dashboard handleLogout={handleLogout} userType={userType} />
    </div>
  );
};

export default TeachingStaffDashboard;
