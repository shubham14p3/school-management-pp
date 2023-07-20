// StudentDashboard.js
import React from 'react';

const StudentDashboard = ({ handleLogout }) => {
  return (
    <div>
      <h2>Welcome Student!</h2>
      {/* Add your Student specific content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
