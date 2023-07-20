// TeachingStaffDashboard.js
import React from 'react';

const TeachingStaffDashboard = ({ handleLogout }) => {
  return (
    <div>
      <h2>Welcome Teaching Staff!</h2>
      {/* Add your Teaching Staff specific content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TeachingStaffDashboard;
