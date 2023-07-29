import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const LeaveManagement = ({
  userType,
  leaveApplications,
  setLeaveApplications,
  submittedLeaveApplications,
  handleApplyLeave,
  loggedInUser
}) => {
  const navigate = useNavigate();
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  useEffect(() => {
    // Load leave applications from the new JSON file
    setLeaveApplications(leaveApplications);
  }, []);

  // Other parts of the component (handleLogout, handleApplyLeave, handleApproveRejectLeave) remain the same.

  const applyLeave = (e) => {
    e.preventDefault();

    // Handle leave application submission for student
    if (userType === "student") {
      const newLeaveApplication = {
        id: Date.now(),
        studentFirstName: "John", // Replace with the student's first name
        studentLastName: "Doe", // Replace with the student's last name
        leaveDate,
        leaveReason,
        status: "pending",
      };
      handleApplyLeave(newLeaveApplication); // Call the function to handle leave application submission in App.js
      setLeaveDate("");
      setLeaveReason("");
    }
  };
  const handleApproveRejectLeave = (index, action) => {
    // Handle leave approval/rejection for teacher
    const updatedLeaveApplications = [...leaveApplications];
    updatedLeaveApplications[index].status = action;
    setLeaveApplications(updatedLeaveApplications);

    // Save the updated leave applications to the JSON file
    saveLeaveApplicationsToJSON(updatedLeaveApplications);
  };

  // Function to save leave applications to the JSON file
  const saveLeaveApplicationsToJSON = (leaveApps) => {
    // You can use a server API or a backend service to save the data to the server.
    // For this example, we'll simulate saving by updating the local JSON file.
    try {
      const jsonString = JSON.stringify(leaveApps);
      localStorage.setItem("leaveApplications", jsonString);
    } catch (error) {
      console.error("Error saving leave applications:", error);
    }
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>Leave Management</h3>
        {userType === "student" ? (
          <form onSubmit={applyLeave}>
            {/* ... (existing form fields) */}
            <button type="submit">Apply Leave</button>
          </form>
        ) : (
          // Show leave applications and approve/reject options for teacher
          <div>
            {leaveApplications.length === 0 ? (
              <p>No leave applications to display.</p>
            ) : (
              <ul>
                {leaveApplications.map((application) => (
                  <li key={application.id}>
                    <div>
                      <strong>Leave Date:</strong> {application.leaveDate}
                    </div>
                    <div>
                      <strong>Student Name:</strong>{" "}
                      {`${application.firstName} ${application.lastName}`}
                    </div>
                    <div>
                      <strong>Leave Reason:</strong> {application.leaveReason}
                    </div>
                    <div>
                      <strong>Status:</strong> {application.status}
                    </div>
                    {application.status === "pending" && (
                      <div>
                        <button
                          onClick={() =>
                            handleApproveRejectLeave(application.id, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApproveRejectLeave(application.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default LeaveManagement;
