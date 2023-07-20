// ViewStudents.js
import React from 'react';

const ViewStudents = ({ students, handleDeleteStudent }) => {
  return (
    <div>
      <h3>View Students</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName}
            <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewStudents;
