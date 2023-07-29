import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
const LeaveManagement = ({ userType }) => {
  console.log(userType)
  const navigate = useNavigate();
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const handleLogout = () => {
  };
  const handleApplyLeave = (e) => {
    e.preventDefault();
    // Handle leave application submission for student
    if (userType === "student") {
      const newLeaveApplication = { leaveDate, leaveReason, status: "pending" };
      setLeaveApplications([...leaveApplications, newLeaveApplication]);
      setLeaveDate("");
      setLeaveReason("");
    }
  };

  const handleApproveRejectLeave = (index, action) => {
    // Handle leave approval/rejection for teacher
    const updatedLeaveApplications = [...leaveApplications];
    updatedLeaveApplications[index].status = action;
    setLeaveApplications(updatedLeaveApplications);
  };

  // Sample leave applications for demonstration (for teacher view)
  if (
    userType === "teacher" ||
    (userType === "admin" && leaveApplications.length === 0)
  ) {
    setLeaveApplications([
      {
        leaveDate: "2023-07-25",
        leaveReason: "Personal reasons",
        status: "pending",
      },
      {
        leaveDate: "2023-07-28",
        leaveReason: "Medical appointment",
        status: "pending",
      },
    ]);
  }

  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>Leave Management</h3>
        {userType === "student" ? (
          <form onSubmit={handleApplyLeave}>
            <div>
              <label htmlFor="leaveDate">Leave Date</label>
              <input
                type="date"
                id="leaveDate"
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="leaveReason">Leave Reason</label>
              <textarea
                id="leaveReason"
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
              />
            </div>
            <button type="submit">Apply Leave</button>
          </form>
        ) : (
          // Show leave applications and approve/reject options for teacher
          <div>
            {leaveApplications.length === 0 ? (
              <p>No leave applications to display.</p>
            ) : (
              <ul>
                {leaveApplications.map((application, index) => (
                  <li key={index}>
                    <div>
                      <strong>Leave Date:</strong> {application.leaveDate}
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
                            handleApproveRejectLeave(index, "approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApproveRejectLeave(index, "rejected")
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
