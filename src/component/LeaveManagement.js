// LeaveManagement.js
import React, { useState } from 'react';

const LeaveManagement = ({ userType }) => {
  const [leaveDate, setLeaveDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  const handleApplyLeave = (e) => {
    e.preventDefault();
    // Handle leave application submission
    // For student, submit leaveDate and leaveReason
    // For teacher, handle approval/rejection of leave applications
    console.log('Leave Date:', leaveDate);
    console.log('Leave Reason:', leaveReason);
  };

  return (
    <div>
      <h3>Leave Management</h3>
      {userType === 'student' ? (
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
        // Show leave applications and approve/reject options for teachers
        <div>
          {/* Implement the leave management view for teachers here */}
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
