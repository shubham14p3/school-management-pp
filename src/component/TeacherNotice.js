// TeacherNotice.js
import React from 'react';

const TeacherNotice = ({ teacherNotices }) => {
  return (
    <div>
      <h3>Teacher Notices</h3>
      <ul>
        {teacherNotices.map((notice) => (
          <li key={notice.id}>
            {notice.title} - {notice.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherNotice;
