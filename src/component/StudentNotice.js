// StudentNotice.js
import React from 'react';

const StudentNotice = ({ studentNotices }) => {
  return (
    <div>
      <h3>Student Notices</h3>
      <ul>
        {studentNotices.map((notice) => (
          <li key={notice.id}>
            {notice.title} - {notice.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentNotice;
