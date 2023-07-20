// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the custom CSS file

const Dashboard = ({ userType, handleLogout, children }) => {
  return (
    <div>
      <header className="header">
        <h3>School Management Dashboard</h3>
        <nav>
          <ul>
            {/* Common tabs for all users */}
            <li><Link to="/student-notice">Student Notice</Link></li>
            <li><Link to="/leave-management">Leave Management</Link></li>
            
            {/* Tabs for admin */}
            {userType === 'admin' && (
              <>
                <li><Link to="/add-student">Add Student</Link></li>
                <li><Link to="/view-students">View Students</Link></li>
                <li><Link to="/teacher-notice">Teacher/Staff Notice</Link></li>
                <li><Link to="/task-management">Task Management</Link></li>
              </>
            )}

            {/* Tabs for teacher/staff */}
            {userType === 'teachingStaff' && (
              <>
                <li><Link to="/view-students">View Students</Link></li>
                <li><Link to="/teacher-notice">Teacher/Staff Notice</Link></li>
                <li><Link to="/task-management">Task Management</Link></li>
              </>
            )}
          </ul>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        {/* Display the content of the selected tab */}
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
