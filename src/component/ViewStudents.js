import React, { useState } from "react";

const ViewStudents = ({ students, handleEditStudent, handleDeleteStudent }) => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null); // State to store the student being edited
  const studentsPerPage = 5; // Number of students to show per page

  // Filter students based on first name
  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(filterText.toLowerCase())
  );

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Function to set the student to be edited
  const startEditing = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    setEditingStudent(studentToEdit);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingStudent(null);
  };

  // Function to handle save after editing
  const saveEditing = () => {
    if (editingStudent) {
      handleEditStudent(editingStudent.id, editingStudent);
      setEditingStudent(null);
    }
  };

  // Function to handle field changes during editing
  const handleFieldChange = (e, fieldName) => {
    const newValue = e.target.value;
    setEditingStudent((prevStudent) => ({
      ...prevStudent,
      [fieldName]: newValue,
    }));
  };

  return (
    <div>
      <h3>View Students</h3>
      <div>
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter by First Name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
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
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.username}</td>
              <td>
                {/* Show password in password format */}
                <input type="password" value={student.password} disabled />
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editingStudent.firstName}
                    onChange={(e) => handleFieldChange(e, "firstName")}
                  />
                ) : (
                  student.firstName
                )}
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editingStudent.lastName}
                    onChange={(e) => handleFieldChange(e, "lastName")}
                  />
                ) : (
                  student.lastName
                )}
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <input
                    type="date"
                    value={editingStudent.birthdate}
                    onChange={(e) => handleFieldChange(e, "birthdate")}
                  />
                ) : (
                  student.birthdate
                )}
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editingStudent.standard}
                    onChange={(e) => handleFieldChange(e, "standard")}
                  />
                ) : (
                  student.standard
                )}
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <input
                    type="text"
                    value={editingStudent.division}
                    onChange={(e) => handleFieldChange(e, "division")}
                  />
                ) : (
                  student.division
                )}
              </td>
              <td>
                {editingStudent && editingStudent.id === student.id ? (
                  <textarea
                    value={editingStudent.address}
                    onChange={(e) => handleFieldChange(e, "address")}
                  />
                ) : (
                  student.address
                )}
              </td>
              <td>
                {/* Display student photo */}
                <img
                  src={student.photo}
                  alt={`${student.firstName} ${student.lastName}`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                {/* Edit and Delete Buttons */}
                {editingStudent && editingStudent.id === student.id ? (
                  <>
                    <button onClick={saveEditing}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(student.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteStudent(student.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        {Array.from(
          { length: Math.ceil(filteredStudents.length / studentsPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ViewStudents;
