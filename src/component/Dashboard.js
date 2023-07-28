import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css"; // Import the custom CSS file

const Dashboard = ({ userType, handleLogout, children }) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div>
      <header className="header">
        <Link to="/dashboard">
          <h3>School Management Dashboard</h3>
        </Link>
        <nav>
          <ul>
            {/* Tabs for admin */}
            {userType === "admin" && (
              <>
                <li>
                  <Link to="/add-student">Add Student</Link>
                </li>
                <li>
                  <Link to="/view-students">View Students</Link>
                </li>
                <li>
                  <Link to="/teacher-notice">Teacher/Staff Notice</Link>
                </li>
                <li>
                  <Link to="/task-management">Task Management</Link>
                </li>
              </>
            )}

            {/* Tabs for teacher/staff */}
            {userType === "teachingStaff" && (
              <>
                <li>
                  <Link to="/view-students">View Students</Link>
                </li>
                <li>
                  <Link to="/teacher-notice">Teacher/Staff Notice</Link>
                </li>
                <li>
                  <Link to="/task-management">Task Management</Link>
                </li>
              </>
            )}
            {/* Common tabs for all users */}
            <li>
              <Link to="/student-notice">Student Notice</Link>
            </li>
            <li>
              <Link to="/leave-management">Leave Management</Link>
            </li>
          </ul>
        </nav>
        {/* Show the "Logout" button only on the "/dashboard" page */}
        {isDashboardPage && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main>
        {/* Display the content of the selected tab */}
        {isDashboardPage ? (
          <div id="dashboard-children">Welcome to Dashboard</div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default Dashboard;
