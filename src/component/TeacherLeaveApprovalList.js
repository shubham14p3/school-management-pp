import React from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./TeacherLeaveApprovalList.css"; // Import the custom CSS file for styling

const TeacherLeaveApprovalList = ({
  leaveApplications,
  handleApproveRejectLeave,
  userType,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleApprove = (applicationId) => {
    handleApproveRejectLeave(applicationId, "approved");
  };

  const handleReject = (applicationId) => {
    handleApproveRejectLeave(applicationId, "rejected");
  };

  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>Leave Approval List</h3>
        {leaveApplications.length === 0 ? (
          <p>No leave applications to display.</p>
        ) : (
          <div className="table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Leave Date</th>
                  <th>Student Name</th>
                  <th>Leave Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveApplications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.leaveDate}</td>
                    <td>{`${application.firstName} ${application.lastName}`}</td>
                    <td>{application.leaveReason}</td>
                    <td>{application.status}</td>
                    <td>
                      {application.status === "pending" && (
                        <div>
                          <button
                            className="btn btn-success"
                            onClick={() => handleApprove(application.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleReject(application.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default TeacherLeaveApprovalList;
