import React from "react";

const ViewStudents = ({ students }) => {
  return (
    <div>
      <h3>View Students</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthdate</th>
            <th>Standard</th>
            <th>Division</th>
            <th>Address</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.username}</td>
              <td>{/* Show password in password format */}
                <input
                  type="password"
                  value={student.password}
                  disabled
                />
              </td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.birthdate}</td>
              <td>{student.standard}</td>
              <td>{student.division}</td>
              <td>{student.address}</td>
              <td>
                {/* Display student photo */}
                <img
                  src={student.photo}
                  alt={`${student.firstName} ${student.lastName}`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
