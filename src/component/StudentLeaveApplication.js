import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { Modal, Button, Table } from "react-bootstrap";
import "./StudentLeaveApplication.css"; // Import the custom CSS file

const StudentLeaveApplication = ({
  handleApplyLeave,
  loggedInUser,
  userType,
  leaveApplications,
}) => {
  const navigate = useNavigate();
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const studentLeaveHistory = leaveApplications.filter(
    (leave) => leave.studentID === loggedInUser.id
  );

  const applyLeave = (e) => {
    e.preventDefault();

    // Check if leave date is a past date
    const today = new Date().toISOString().slice(0, 10);
    if (leaveDate < today) {
      alert("Leave date cannot be in the past.");
      return;
    }

    // Check if leave reason exceeds 100 characters
    if (leaveReason.length > 100) {
      alert("Leave reason cannot exceed 100 characters.");
      return;
    }

    // Handle leave application submission for student
    const newLeaveApplication = {
      id: Date.now(),
      firstName: loggedInUser.firstName ? loggedInUser.firstName : "No Data",
      lastName: loggedInUser.lastName ? loggedInUser.lastName : "No Data",
      leaveDate,
      leaveReason,
      status: "pending",
      studentID: loggedInUser.id,
    };
    handleApplyLeave(newLeaveApplication); // Call the function to handle leave application submission in App.js

    setShowSuccessMessage(true); // Show the success message
  };

  const handleLogout = () => {
    navigate("/");
  };

  const closeModal = () => {
    setLeaveDate("");
    setLeaveReason("");
    setShowSuccessMessage(false);
  };

  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>Leave Application</h3>
        <form onSubmit={applyLeave}>
          <label htmlFor="leaveDate">Leave Date:</label>
          <input
            type="date"
            id="leaveDate"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            min={new Date().toISOString().slice(0, 10)} // Restrict past dates
          />
          <br />
          <label htmlFor="leaveReason">Leave Reason:</label>
          <textarea
            id="leaveReason"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            maxLength={100} // Limit the input to 100 characters
          />
          <br />
          <button type="submit">Apply Leave</button>
        </form>
      </div>

      {loggedInUser && (
        <Modal show={showSuccessMessage} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Leave Application Submitted Successfully!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Student Name: {loggedInUser.firstName} {loggedInUser.lastName}
            </p>
            <p>Leave Date: {leaveDate}</p>
            <p>Leave Reason: {leaveReason}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <div>
        <h3>Leave History</h3>
        {studentLeaveHistory.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Leave Date</th>
                <th>Leave Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentLeaveHistory.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveDate}</td>
                  <td>{leave.leaveReason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No leave history for this student.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default StudentLeaveApplication;
