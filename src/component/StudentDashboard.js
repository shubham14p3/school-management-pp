// StudentDashboard.js
import React from "react";
import Dashboard from "./Dashboard";

const StudentDashboard = ({ handleLogout, userType }) => {
  return (
    <div>
      <Dashboard handleLogout={handleLogout} userType={userType} />
    </div>
  );
};

export default StudentDashboard;
