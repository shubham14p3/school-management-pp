import React, { useState } from 'react';
import './StudentNotice.css'; // Import the custom CSS file

const StudentNotice = ({ studentNotices, userType }) => {
  const [selectedNotice, setSelectedNotice] = useState(null);

  // Function to handle opening the individual notice
  const handleOpenNotice = (noticeId) => {
    // Check if the user is an Admin (userType is "admin")
    const isAdmin = userType === "admin";

    // If the user is an Admin, set the selectedNotice to the notice with the given ID
    if (isAdmin) {
      const notice = studentNotices.find((notice) => notice.id === noticeId);
      setSelectedNotice(notice);
    }
  };

  // Function to handle closing the individual notice
  const handleCloseNotice = () => {
    setSelectedNotice(null);
  };

  return (
    <div>
      <h3>Student Notices</h3>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {studentNotices.map((notice) => (
            <tr key={notice.id} onClick={() => handleOpenNotice(notice.id)}>
              <td>{notice.title}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedNotice && (
        <div className="popup">
          <div className="popup-content">
            <h3>{selectedNotice.title}</h3>
            <p>Date: {selectedNotice.date}</p>
            <p>{selectedNotice.content}</p>
            <button onClick={handleCloseNotice}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentNotice;
