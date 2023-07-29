// StudentDashboard.js
import React from "react";
import Dashboard from "./Dashboard";

const StudentDashboard = ({ handleLogout, userType, loggedInUser }) => {
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

export default StudentDashboard;
