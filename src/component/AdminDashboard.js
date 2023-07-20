// AdminDashboard.js
import React from 'react';

const AdminDashboard = ({ handleLogout }) => {
  return (
    <div>
      <h2>Welcome Admin!</h2>
      {/* Add your Admin specific content here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
