// TeachingStaffDashboard.js
import React from "react";
import Dashboard from "./Dashboard";

const TeachingStaffDashboard = ({ handleLogout, userType, loggedInUser }) => {
  return (
    <div>
      <Dashboard
        handleLogout={handleLogout}
        userType={userType}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default TeachingStaffDashboard;
