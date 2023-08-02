import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dashboard.css"; // Import the custom CSS file

const Dashboard = ({ userType, handleLogout, children, loggedInUser }) => {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/dashboard";
  const [user, setUser] = useState(loggedInUser || "");
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
                  <Link to="/student-notice">Student Notice</Link>
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
                  <Link to="/student-notice">Student Notice</Link>
                </li>
                <li>
                  <Link to="/leave-management">Leave Management</Link>
                </li>
              </>
            )}
            {userType === "student" && (
              <>
                <li>
                  <Link to="/student-notice">Student Notice</Link>
                </li>
                <li>
                  <Link to="/leave-management">Leave Management</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* Show the "Logout" button only on the "/dashboard" page */}
        {isDashboardPage && <button onClick={handleLogout}>Logout</button>}
      </header>
      <main>
        {/* Display the content of the selected tab */}
        {isDashboardPage ? (
          <div className="dashboard-children">
            Welcome{" "}
            {user
              ? `${user.firstName} ${user.lastName} you have logged in as "${user.role}"`
              : ""}{" "}
            to Dashboard
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default Dashboard;
